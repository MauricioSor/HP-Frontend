import type { Metadata } from 'next'
import TestInversor from '@/components/TestInversor'

export const metadata: Metadata = {
  title: 'Test del inversor | FinBootcamp',
  description: 'Respondé seis preguntas y obtené tu perfil: conservador, moderado o agresivo.',
}

export default function TestInversorPage() {
  return <TestInversor />
}
