import type { MetadataRoute } from 'next'
import { urlDelSitio } from '@/lib/sitio'
import { instruments } from '@/data/instruments'
import { cryptoTopics } from '@/data/crypto-topics'
import { guias } from '@/data/guias'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = urlDelSitio()
  const ahora = new Date()

  const rutasEstaticas: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: ahora, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/mercado-bursatil`, lastModified: ahora, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/cripto`, lastModified: ahora, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/guias`, lastModified: ahora, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/glosario`, lastModified: ahora, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/simulador`, lastModified: ahora, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/calculadoras`, lastModified: ahora, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/cotizaciones`, lastModified: ahora, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/test-inversor`, lastModified: ahora, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/suscripcion`, lastModified: ahora, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contacto`, lastModified: ahora, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${baseUrl}/privacidad`, lastModified: ahora, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/terminos`, lastModified: ahora, changeFrequency: 'yearly', priority: 0.5 },
  ]

  const rutasInstrumentos: MetadataRoute.Sitemap = instruments.map((inst) => ({
    url: `${baseUrl}/mercado-bursatil/${inst.slug}`,
    lastModified: ahora,
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

  const rutasCripto: MetadataRoute.Sitemap = cryptoTopics.map((topic) => ({
    url: `${baseUrl}/cripto/${topic.slug}`,
    lastModified: ahora,
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

  const rutasGuias: MetadataRoute.Sitemap = guias.map((guia) => ({
    url: `${baseUrl}/guias/${guia.slug}`,
    lastModified: new Date(`${guia.fecha}T12:00:00`),
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

  return [...rutasEstaticas, ...rutasInstrumentos, ...rutasCripto, ...rutasGuias]
}
