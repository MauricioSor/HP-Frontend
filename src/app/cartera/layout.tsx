import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cartera | FinBootcamp',
  description: 'Tablero de los instrumentos que marcaste como favoritos.',
}

export default function CarteraLayout({ children }: { children: React.ReactNode }) {
  return children
}
