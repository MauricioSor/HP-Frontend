import { NextResponse, type NextRequest } from 'next/server'

// Rutas que NO requieren autenticación
const publicPaths = [
  '/',
  '/auth/login',
  '/auth/registro',
]

// Prefijos que siempre se dejan pasar
const publicPrefixes = [
  '/api/auth/',
  '/api/usuarios',
  '/_next/',
  '/favicon.ico',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Permitir archivos estáticos y assets
  if (
    publicPrefixes.some((prefix) => pathname.startsWith(prefix)) ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|css|js|woff|woff2|ttf|eot)$/)
  ) {
    return NextResponse.next()
  }

  // Permitir rutas públicas exactas
  if (publicPaths.includes(pathname)) {
    return NextResponse.next()
  }

  // Verificar cookie de sesión
  const session = request.cookies.get('finbootcamp-session')

  if (!session?.value) {
    // No hay sesión → redirigir al login
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/auth/login'
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
