import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plan Libre y Plan Premium sin Anuncios | FinBootcamp',
  description:
    'Conocé cómo funciona el acceso libre y gratuito a todo el contenido educativo de FinBootcamp y la opción de navegación sin publicidad.',
};

export default function SuscripcionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
