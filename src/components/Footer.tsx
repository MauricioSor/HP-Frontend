'use client';

import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { useAuth } from '@/components/AuthProvider';

const plataforma = [
  { href: '/mercado-bursatil', label: 'Mercado Bursátil' },
  { href: '/cripto', label: 'Cripto' },
  { href: '/simulador', label: 'Simulador' },
  { href: '/cotizaciones', label: 'Cotizaciones' },
  { href: '/cartera', label: 'Cartera' },
  { href: '/recomendado', label: 'Recomendado' },
  { href: '/test-inversor', label: 'Test del inversor' },
  { href: '/mis-datos', label: 'Mis datos' },
  { href: '/suscripcion', label: 'Plan Premium' },
];

const recursos = [
  { href: '/glosario', label: 'Glosario Financiero' },
  { href: '/guias', label: 'Guías Paso a Paso' },
  { href: '/guias/bonos-soberanos#impuestos', label: 'Información Impositiva' },
  { href: '/calculadoras', label: 'Calculadoras' },
];

export default function Footer() {
  const { isAuthenticated } = useAuth();

  return (
    <footer className="relative overflow-hidden bg-[#0f2a22] text-[#f4f1ea]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(212,175,106,0.08),transparent_36%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 gap-10 ${isAuthenticated ? 'md:grid-cols-3' : ''}`}>
          <div>
            <Logo tone="light" className="mb-6" />
            {isAuthenticated && (
              <>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4af6a]">Plataforma</h3>
                <ul className="space-y-2.5 text-emerald-50/75">
                  {plataforma.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="transition hover:text-white">{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {isAuthenticated && (
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4af6a]">Recursos</h3>
              <ul className="space-y-2.5 text-emerald-50/75">
                {recursos.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="transition hover:text-white">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4af6a]">Legal</h3>
            <ul className="space-y-2.5 text-emerald-50/75">
              <li><Link href="/privacidad" className="transition hover:text-white">Política de Privacidad</Link></li>
              <li><Link href="/terminos" className="transition hover:text-white">Términos y Condiciones</Link></li>
              <li><Link href="/contacto" className="transition hover:text-white">Acerca de y contacto</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-emerald-100/45">
          <p>© {new Date().getFullYear()} FinBootcamp. Proyecto educativo · No constituye asesoramiento financiero.</p>
        </div>
      </div>
    </footer>
  );
}
