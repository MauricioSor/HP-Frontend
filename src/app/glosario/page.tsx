import type { Metadata } from 'next';
import Link from 'next/link';
import { BookA, ChevronRight, Calculator, TrendingUp } from 'lucide-react';
import GlosarioInteractivo from '@/components/GlosarioInteractivo';
import AdBanner from '@/components/AdBanner';

export const metadata: Metadata = {
  title: 'Glosario Financiero Argentino: TNA, TEA, MEP, CCL, TIR y más | FinBootcamp',
  description:
    'Diccionario financiero completo sobre el mercado argentino: qué significan TNA, TEA, CFTEA, Dólar MEP, CCL, CER, UVA, LECAP, TIR, Paridad, CEDEAR y Caución.',
};

export default function GlosarioPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-stone-500">
        <Link href="/" className="transition hover:text-[#12372c]">
          Inicio
        </Link>
        <ChevronRight className="h-4 w-4 text-stone-400" />
        <span className="font-semibold text-[#12372c]">Glosario Financiero</span>
      </nav>

      <header className="relative mb-10 overflow-hidden rounded-[2rem] bg-[#12372c] px-6 py-10 text-[#f4f1ea] shadow-[0_40px_80px_-45px_rgba(18,55,44,0.8)] sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_-20%,rgba(212,175,106,0.28),transparent_45%),radial-gradient(ellipse_at_95%_10%,rgba(110,231,183,0.18),transparent_42%)]" />
        <div className="grain-overlay" />
        <div className="relative max-w-3xl">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#d4af6a]">
            <BookA className="h-4 w-4" />
            Diccionario del inversor local
          </p>
          <h1 className="text-3xl font-medium sm:text-5xl">Glosario Financiero Argentino</h1>
          <p className="mt-4 text-lg leading-relaxed text-emerald-50/85">
            Todas las siglas y conceptos del mercado de capitales local explicados en criollo y con ejemplos
            reales: tasas, bonos, dólares financieros, inflación, impuestos y criptoactivos.
          </p>
        </div>
      </header>

      <AdBanner slot="glosario-horizontal" format="horizontal" className="mb-8" />

      <GlosarioInteractivo />

      <AdBanner slot="glosario-cierre" format="horizontal" className="mt-10" />

      <section className="mt-12 grid gap-6 rounded-[1.8rem] bg-[#12372c] p-6 text-[#f4f1ea] sm:p-10 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="text-2xl font-medium sm:text-3xl">Llevá la teoría a la práctica</h2>
          <p className="mt-2 text-emerald-50/80">
            Usá el simulador para ver cómo cambia una inversión cuando capitaliza mensualmente (TEA) o explorá
            las fichas completas de cada instrumento.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <Link
            href="/simulador"
            className="inline-flex items-center gap-2 rounded-full bg-[#f4f1ea] px-6 py-3 text-sm font-semibold text-[#12372c] transition hover:bg-white"
          >
            <Calculator className="h-4 w-4" />
            Ir al simulador
          </Link>
          <Link
            href="/mercado-bursatil"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-[#f4f1ea] transition hover:bg-white/20"
          >
            <TrendingUp className="h-4 w-4" />
            Ver instrumentos
          </Link>
        </div>
      </section>
    </div>
  );
}
