import { imagenIcono } from '@/lib/imagen-marca'

export const size = { width: 512, height: 512 }
export const contentType = 'image/png'

export default function Icon() {
  return imagenIcono(size.width)
}
