import { imagenTarjeta } from '@/lib/imagen-marca'

export const alt = 'FinBootcamp, educación financiera'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return imagenTarjeta(size.width, size.height)
}
