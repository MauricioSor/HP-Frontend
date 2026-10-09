import type { Metadata } from 'next'
import FormDatosPersonales from '@/components/FormDatosPersonales'

export const metadata: Metadata = {
  title: 'Finalizá el registro | FinBootcamp',
  description: 'Completá los datos de persona que no vienen con la cuenta de Google.',
}

export default function DatosPersonalesPage() {
  return <FormDatosPersonales />
}
