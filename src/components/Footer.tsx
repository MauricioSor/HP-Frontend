import Link from 'next/link';
import { Logo } from '@/components/Logo';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0f2a22] text-[#f4f1ea]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(212,175,106,0.08),transparent_36%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <Logo tone="light" className="mb-6" />
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4af6a]">Plataforma</h3>
            <ul className="space-y-2.5 text-emerald-50/75">
              <li><Link href="/mercado-bursatil" className="transition hover:text-white">Mercado Bursátil</Link></li>
              <li><Link href="/cripto" className="transition hover:text-white">Cripto</Link></li>
              <li><Link href="/simulador" className="transition hover:text-white">Simulador</Link></li>
              <li><Link href="/cotizaciones" className="transition hover:text-white">Cotizaciones</Link></li>
              <li><Link href="/cartera" className="transition hover:text-white">Cartera</Link></li>
              <li><Link href="/recomendado" className="transition hover:text-white">Recomendado</Link></li>
              <li><Link href="/test-inversor" className="transition hover:text-white">Test del inversor</Link></li>
              <li><Link href="/suscripcion" className="transition hover:text-white">Plan Premium</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4af6a]">Recursos</h3>
            <ul className="space-y-2.5 text-emerald-50/75">
              <li><Link href="/glosario" className="transition hover:text-white">Glosario Financiero</Link></li>
              <li><Link href="/guias" className="transition hover:text-white">Guías Paso a Paso</Link></li>
              <li><Link href="/guias/bonos-soberanos#impuestos" className="transition hover:text-white">Información Impositiva</Link></li>
              <li><Link href="/calculadoras" className="transition hover:text-white">Calculadoras</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4af6a]">Legal</h3>
            <ul className="space-y-2.5 text-emerald-50/75">
              <li><Link href="/privacidad" className="transition hover:text-white">Política de Privacidad</Link></li>
              <li><Link href="/terminos" className="transition hover:text-white">Términos y Condiciones</Link></li>
              <li><Link href="/contacto" className="transition hover:text-white">Contacto</Link></li>
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
