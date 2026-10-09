import Link from 'next/link';
import { notFound } from 'next/navigation';
import { instruments } from '@/data/instruments';
import {
  ChevronRight,
  Calculator,
  AlertCircle,
  Info,
  ShieldAlert,
  Clock,
  DollarSign,
  BookOpen,
  ArrowLeft,
  TrendingUp,
} from 'lucide-react';
import BotonFavorito from '@/components/BotonFavorito';
import { LogoInstrumento, metaInstrumento } from '@/components/LogoInstrumento';
import { cn } from '@/lib/utils';

export function generateStaticParams() {
  return instruments.map((instrument) => ({
    slug: instrument.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const instrument = instruments.find((i) => i.slug === slug);

  if (!instrument) {
    return { title: 'Instrumento no encontrado' };
  }

  return {
    title: `${instrument.name} | Mercado Bursátil | FinBootcamp`,
    description: instrument.shortDescription,
  };
}

const getRiskColor = (risk: string) => {
  switch (risk?.toLowerCase()) {
    case 'bajo': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'medio': return 'bg-amber-100 text-amber-900 border-amber-200';
    case 'alto': return 'bg-rose-100 text-rose-800 border-rose-200';
    default: return 'bg-stone-100 text-stone-700 border-stone-200';
  }
};

const getTaxColor = (status: string) => {
  return status?.toLowerCase().includes('exento')
    ? 'text-emerald-700 font-semibold'
    : 'text-rose-700 font-semibold';
};

const tarjeta =
  'rounded-[1.8rem] bg-white/85 p-6 shadow-[0_22px_50px_-38px_rgba(18,55,44,0.55)] ring-1 ring-stone-200/70 backdrop-blur-sm md:p-8';

export default async function InstrumentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const instrument = instruments.find((i) => i.slug === slug);

  if (!instrument) {
    notFound();
  }

  const meta = metaInstrumento(instrument.slug);
  const tasaPorcentaje = Math.round(instrument.defaultRate * 100);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-stone-500">
        <Link href="/" className="transition-colors hover:text-[#12372c]">Inicio</Link>
        <ChevronRight className="h-4 w-4 text-stone-400" />
        <Link href="/mercado-bursatil" className="transition-colors hover:text-[#12372c]">Mercado Bursátil</Link>
        <ChevronRight className="h-4 w-4 text-stone-400" />
        <span className="font-semibold text-[#12372c]">{instrument.name}</span>
      </nav>

      {/* Header */}
      <header className="relative mb-8 overflow-hidden rounded-[2rem] bg-[#12372c] text-[#f4f1ea] shadow-[0_40px_80px_-45px_rgba(18,55,44,0.8)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_-30%,rgba(212,175,106,0.28),transparent_45%),radial-gradient(ellipse_at_100%_0%,rgba(110,231,183,0.2),transparent_42%)]" />
        <div className="grain-overlay" />
        <div className="relative flex flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:px-10 sm:py-10">
          <LogoInstrumento slug={instrument.slug} size="lg" />
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-medium sm:text-5xl">{instrument.name}</h1>
            <p className="mt-3 max-w-2xl text-emerald-50/80">{instrument.shortDescription}</p>
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold',
                  getRiskColor(instrument.risk)
                )}
              >
                <ShieldAlert className="h-4 w-4" />
                Riesgo {instrument.risk}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-medium text-emerald-50">
                <Clock className="h-4 w-4" />
                {instrument.horizon}
              </span>
              {meta.etiquetas.map((etiqueta) => (
                <span
                  key={etiqueta}
                  className="rounded-md border border-white/15 bg-white/5 px-2 py-1 font-mono text-xs text-emerald-100/80"
                >
                  {etiqueta}
                </span>
              ))}
            </div>
          </div>
          <div className="self-start sm:self-center">
            <BotonFavorito slug={instrument.slug} tipo="bursatil" riesgo={instrument.risk} />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          {instrument.slug === 'bonos-soberanos' && (
            <Link
              href="/guias/bonos-soberanos"
              className="flex items-start gap-4 rounded-[1.6rem] border border-emerald-200 bg-emerald-50/90 p-5 transition hover:bg-emerald-100/80"
            >
              <BookOpen className="mt-0.5 h-6 w-6 shrink-0 text-emerald-700" />
              <div>
                <p className="font-semibold text-emerald-950">Guía de los 5 principales</p>
                <p className="mt-1 text-sm text-emerald-900/80">
                  AL30, GD30, AL35, GD35 y AE38: cómo pagan cupón y amortización, y si hay que
                  tributar Ganancias o Bienes Personales.
                </p>
              </div>
            </Link>
          )}

          {/* ¿Qué es? */}
          <section className={tarjeta}>
            <h2 className="mb-4 flex items-center gap-3 text-2xl font-medium text-[#12372c]">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-sky-100 text-sky-700">
                <Info className="h-5 w-5" />
              </span>
              ¿Qué es?
            </h2>
            <p className="whitespace-pre-line leading-relaxed text-stone-700">{instrument.description}</p>
          </section>

          {/* Ejemplo práctico */}
          {instrument.example && (
            <section className="rounded-[1.8rem] border border-sky-200/80 bg-sky-50/80 p-6 md:p-8">
              <h2 className="mb-4 flex items-center gap-3 text-xl font-medium text-sky-950">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-sky-700 ring-1 ring-sky-200">
                  <Calculator className="h-5 w-5" />
                </span>
                Ejemplo práctico
              </h2>
              <p className="leading-relaxed text-sky-900">{instrument.example}</p>
            </section>
          )}

          {/* Información impositiva */}
          {instrument.taxInfo && (
            <section className={tarjeta}>
              <h2 className="mb-6 flex items-center gap-3 text-2xl font-medium text-[#12372c]">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-100 text-amber-700">
                  <AlertCircle className="h-5 w-5" />
                </span>
                Información impositiva
              </h2>
              <div className="overflow-hidden rounded-2xl ring-1 ring-stone-200">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-[#12372c] text-[#f4f1ea]">
                      <th className="px-4 py-3 font-medium">Impuesto</th>
                      <th className="px-4 py-3 font-medium">Tratamiento</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    <tr>
                      <td className="px-4 py-4 text-stone-700">Impuesto a las Ganancias</td>
                      <td className={`px-4 py-4 capitalize ${getTaxColor(instrument.taxInfo.ganancias)}`}>
                        {instrument.taxInfo.ganancias}
                      </td>
                    </tr>
                    <tr className="bg-[#faf9f5]">
                      <td className="px-4 py-4 text-stone-700">Bienes Personales</td>
                      <td className={`px-4 py-4 capitalize ${getTaxColor(instrument.taxInfo.bienesPersonales)}`}>
                        {instrument.taxInfo.bienesPersonales}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-stone-700">Impuesto a los Débitos y Créditos (ITF)</td>
                      <td
                        className={`px-4 py-4 font-semibold ${instrument.taxInfo.itf ? 'text-amber-700' : 'text-emerald-700'}`}
                      >
                        {instrument.taxInfo.itf ? 'Aplica' : 'No aplica'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {instrument.taxInfo.notes && (
                <p className="mt-4 text-sm italic text-stone-500">Nota: {instrument.taxInfo.notes}</p>
              )}
            </section>
          )}

          {/* Simulá tu inversión */}
          <section className="relative overflow-hidden rounded-[1.8rem] bg-gradient-to-br from-[#12372c] via-[#17503f] to-[#2e8a69] p-6 text-white shadow-[0_30px_60px_-36px_rgba(18,55,44,0.8)] md:p-8">
            <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-[#d4af6a]/25 blur-3xl" />
            <div className="relative flex flex-col items-center justify-between gap-6 md:flex-row">
              <div>
                <h2 className="mb-2 text-2xl font-medium">Simulá tu inversión</h2>
                <p className="max-w-md text-emerald-100/90">
                  Descubrí cuánto podría crecer tu capital invirtiendo en {instrument.name} a lo largo del tiempo.
                </p>
              </div>
              <Link
                href={`/simulador?instrument=${instrument.slug}`}
                className="flex items-center whitespace-nowrap rounded-full bg-[#f4f1ea] px-6 py-3 font-semibold text-[#12372c] shadow-sm transition-colors hover:bg-white"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Ir al simulador
              </Link>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className={cn(tarjeta, 'sticky top-28 p-6 md:p-6')}>
            <h3 className="mb-6 text-lg font-medium text-[#12372c]">Resumen del instrumento</h3>

            <div className="space-y-6">
              <div>
                <span className="mb-1 block text-sm text-stone-500">Riesgo</span>
                <span
                  className={cn(
                    'inline-flex rounded-full border px-3 py-1 text-sm font-semibold capitalize',
                    getRiskColor(instrument.risk)
                  )}
                >
                  {instrument.risk}
                </span>
              </div>

              <div>
                <span className="mb-1 block text-sm text-stone-500">Horizonte recomendado</span>
                <span className="flex items-center font-medium text-[#12372c]">
                  <Clock className="mr-2 h-4 w-4 text-stone-400" />
                  {instrument.horizon}
                </span>
              </div>

              {instrument.minInvestment && (
                <div>
                  <span className="mb-1 block text-sm text-stone-500">Inversión mínima</span>
                  <span className="flex items-center font-medium text-[#12372c]">
                    <DollarSign className="mr-2 h-4 w-4 text-stone-400" />
                    {instrument.minInvestment}
                  </span>
                </div>
              )}

              {instrument.defaultRate > 0 && (
                <div>
                  <span className="mb-1 block text-sm text-stone-500">Tasa de referencia (simulador)</span>
                  <span className="flex items-center gap-2 font-heading text-3xl text-emerald-700">
                    <TrendingUp className="h-6 w-6" />~{tasaPorcentaje}%
                    <span className="font-sans text-sm font-normal text-stone-500">anual</span>
                  </span>
                </div>
              )}
            </div>

            <hr className="my-6 border-stone-200" />

            <Link
              href="/mercado-bursatil"
              className="flex items-center justify-center gap-2 text-sm font-semibold text-[#12372c] transition hover:text-emerald-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a todos los instrumentos
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
