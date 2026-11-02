import { updateSession } from '@/lib/middleware'
import { type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, ads.txt, robots.txt, sitemap.xml
     * - image/font files
     */
    '/((?!_next/static|_next/image|favicon.ico|ads\\.txt|robots\\.txt|sitemap\\.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
