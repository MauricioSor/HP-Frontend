import type { MetadataRoute } from 'next'
import { urlDelSitio } from '@/lib/sitio'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = urlDelSitio()
  const ahora = new Date()

  return [
    { url: `${baseUrl}/`, lastModified: ahora, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/contacto`, lastModified: ahora, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${baseUrl}/privacidad`, lastModified: ahora, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/terminos`, lastModified: ahora, changeFrequency: 'yearly', priority: 0.5 },
  ]
}
