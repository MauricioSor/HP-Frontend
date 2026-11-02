import type { Metadata } from 'next';
import SimuladorCliente from '@/components/SimuladorCliente';

export const metadata: Metadata = {
  title: 'Simulador de Inversión y Préstamos (Pesos, UVA y Dólares) | FinBootcamp',
  description:
    'Proyectá rendimientos con interés compuesto frente al plazo fijo y la inflación, o calculá la cuota y CFTEA de un préstamo en pesos, UVA o dólares.',
};

export default function SimuladorPage() {
  return <SimuladorCliente />;
}
