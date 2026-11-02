import type { MetadataRoute } from 'next'
import { urlDelSitio } from '@/lib/sitio'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = urlDelSitio()

  return {
    rules: [
      {
        userAgent: 'Mediapartners-Google',
        allow: '/',
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
