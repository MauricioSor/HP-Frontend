import { imagenIcono } from '@/lib/imagen-marca'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return imagenIcono(size.width)
}