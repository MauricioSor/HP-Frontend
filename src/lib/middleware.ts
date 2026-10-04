import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { esRolAdministrador } from '@/lib/roles'

// Rutas públicas que no requieren autenticación
const publicPaths = ['/', '/auth/login', '/auth/registro', '/auth/callback', '/suscripcion']
const publicPrefixes = ['/api/usuarios', '/_next/', '/favicon.ico']

export async function updateSession(request: NextRequest) {
  // El callback de Google trae el verificador PKCE en una cookie.
  // getUser() puede borrarla si no hay sesión todavía, y el canje del código falla.
  if (request.nextUrl.pathname === '/auth/callback') {
    return NextResponse.next({ request })
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Permitir rutas públicas sin autenticación
  const isPublic =
    publicPaths.includes(pathname) ||
    publicPrefixes.some((prefix) => pathname.startsWith(prefix)) ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|css|js|woff|woff2|ttf|eot)$/)

  if (user && pathname === '/auth/login') {
    const pedido = request.nextUrl.searchParams.get('redirect') || '/'
    const destino = pedido.startsWith('/') && !pedido.startsWith('//') ? pedido : '/'
    const url = urlPublica(request)
    url.pathname = destino === '/auth/login' ? '/' : destino
    url.search = ''
    return redirigirConCookies(supabaseResponse, url)
  }

  if (user && pathname.startsWith('/admin')) {
    const nombre = user.user_metadata?.usuario || user.email || ''
    const { data: fila } = await supabase
      .from('usuario')
      .select('rol')
      .eq('usuario', nombre)
      .maybeSingle()
    const admin = esRolAdministrador(fila?.rol)
    if (!admin) {
      const url = urlPublica(request)
      url.pathname = '/'
      url.search = ''
      return redirigirConCookies(supabaseResponse, url)
    }
  }

  if (!user && !isPublic) {
    // No hay usuario y la ruta no es pública → redirigir al login
    const url = urlPublica(request)
    url.pathname = '/auth/login'
    url.searchParams.set('redirect', pathname)
    return redirigirConCookies(supabaseResponse, url)
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  return supabaseResponse
}

function urlPublica(request: NextRequest) {
  const url = request.nextUrl.clone()
  const reenviado = request.headers.get('x-forwarded-host')?.split(',')[0]?.trim()
  const host = reenviado || request.headers.get('host')
  const proto = request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim()

  if (host) {
    const local = host.startsWith('localhost') || host.startsWith('127.0.0.1')
    url.host = host
    url.protocol = proto
      ? proto.endsWith(':')
        ? proto
        : `${proto}:`
      : local
        ? 'http:'
        : 'https:'
  }

  return url
}

function redirigirConCookies(origen: NextResponse, url: URL) {
  const destino = NextResponse.redirect(url)
  const setCookies = origen.headers.getSetCookie?.() ?? []

  if (setCookies.length > 0) {
    for (const cookie of setCookies) {
      destino.headers.append('set-cookie', cookie)
    }
    return destino
  }

  origen.cookies.getAll().forEach((cookie) => {
    destino.cookies.set(cookie.name, cookie.value)
  })
  return destino
}
