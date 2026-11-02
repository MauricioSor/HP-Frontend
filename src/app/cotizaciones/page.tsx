import type { Metadata } from 'next';
import CotizacionesCliente from '@/components/CotizacionesCliente';

export const metadata: Metadata = {
  title: 'Cotizaciones en Vivo: Merval, Bonos, CEDEARs, Dólar MEP y Cripto | FinBootcamp',
  description:
    'Pizarra de cotizaciones del mercado argentino y cripto: índice S&P Merval, bonos soberanos (AL30, GD30), acciones de BYMA, CEDEARs y tipos de cambio MEP y CCL.',
};

export default function CotizacionesPage() {
  return <CotizacionesCliente />;
}
