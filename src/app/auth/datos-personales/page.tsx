import type { Metadata } from 'next'
import FormDatosPersonales from '@/components/FormDatosPersonales'

export const metadata: Metadata = {
  title: 'Completá tus datos | FinBootcamp',
  description: 'Completá los datos de persona asociados a tu cuenta.',
}

export default function DatosPersonalesPage() {
  return <FormDatosPersonales />
}
