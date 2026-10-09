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

  if (user && pathname.startsWith('/admin')) {
    const nombre = user.user_metadata?.usuario || user.email || ''
    const { data: fila } = await supabase
      .from('usuario')
      .select('rol')
      .eq('usuario', nombre)
      .maybeSingle()
    const admin = esRolAdministrador(fila?.rol)
    if (!admin) {
      return redirigirConCookies(supabaseResponse, request, '/')
    }
  }

  if (!user && !isPublic) {
    return redirigirConCookies(
      supabaseResponse,
      request,
      `/auth/login?redirect=${encodeURIComponent(pathname)}`
    )
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  return supabaseResponse
}

function rutaRelativa(pedido: string) {
  if (!pedido.startsWith('/') || pedido.startsWith('//')) return '/'
  return pedido
}

function redirigirConCookies(origen: NextResponse, request: NextRequest, destinoRelativo: string) {
  const path = rutaRelativa(destinoRelativo)
  const url = request.nextUrl.clone()
  const parsed = new URL(path, 'http://n.local')
  url.pathname = parsed.pathname
  url.search = parsed.search
  url.hash = ''
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
