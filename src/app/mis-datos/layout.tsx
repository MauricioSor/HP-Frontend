import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mis datos | FinBootcamp',
  description: 'Consultá y actualizá los datos de tu usuario y tu persona.',
}

export default function MisDatosLayout({ children }: { children: React.ReactNode }) {
  return children
}
