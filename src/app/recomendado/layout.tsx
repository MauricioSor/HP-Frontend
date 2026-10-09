import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recomendado | FinBootcamp',
  description: 'Instrumentos alineados al perfil que obtuviste en el test del inversor.',
}

export default function RecomendadoLayout({ children }: { children: React.ReactNode }) {
  return children
}
