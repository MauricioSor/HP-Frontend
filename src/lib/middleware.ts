import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { esRolAdministrador } from '@/lib/roles'

// Rutas públicas que no requieren autenticación
const publicPaths = ['/', '/auth/login', '/auth/registro', '/auth/callback', '/suscripcion', '/ads.txt', '/icon.svg', '/test-inversor']
const publicPrefixes = ['/api/usuarios', '/_next/', '/favicon.ico', '/guias']

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

function esLoopback(host: string) {
  const nombre = host.split(':')[0]?.toLowerCase() ?? ''
  return nombre === 'localhost' || nombre === '127.0.0.1' || nombre === '0.0.0.0' || nombre === '[::1]'
}

function urlPublica(request: NextRequest) {
  const url = request.nextUrl.clone()
  const candidatos = [request.headers.get('host'), request.headers.get('x-forwarded-host')]
    .flatMap((valor) => (valor ? valor.split(',') : []))
    .map((valor) => valor.trim())
    .filter(Boolean)
  const publico = candidatos.find((host) => !esLoopback(host))
  // En el servidor el host de la petición suele ser localhost. En Vercel el dominio real está en estas variables.
  const vercel =
    process.env.VERCEL_ENV === 'production'
      ? process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
      : process.env.VERCEL_URL
  const host = publico || (vercel && !esLoopback(vercel) ? vercel : candidatos[0] || url.host)
  const local = esLoopback(host)

  url.host = host
  url.protocol = local ? 'http:' : 'https:'
  return url
}

function redirigirConCookies(origen: NextResponse, url: URL) {
  const destino = NextResponse.redirect(url)
  // Ruta relativa: el navegador la resuelve contra el dominio que está visitando,
  // aunque el servidor crea que la petición llegó a localhost.
  destino.headers.set('Location', `${url.pathname}${url.search}`)
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
