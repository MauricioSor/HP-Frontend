import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Rutas públicas que no requieren autenticación
const publicPaths = ['/', '/auth/login', '/auth/registro', '/auth/callback']
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
    const url = request.nextUrl.clone()
    url.pathname = destino === '/auth/login' ? '/' : destino
    url.search = ''
    return redirigirConCookies(supabaseResponse, url)
  }

  if (!user && !isPublic) {
    // No hay usuario y la ruta no es pública → redirigir al login
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    url.searchParams.set('redirect', pathname)
    return redirigirConCookies(supabaseResponse, url)
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  return supabaseResponse
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
