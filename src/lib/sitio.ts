export function urlDelSitio() {
  const explicita = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (explicita) return explicita.replace(/\/$/, '')

  const produccion = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
  if (produccion) return `https://${produccion}`

  const vercel = process.env.VERCEL_URL?.trim()
  if (vercel) return `https://${vercel}`

  return 'http://localhost:3000'
}
