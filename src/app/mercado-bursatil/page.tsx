import Link from 'next/link';
import { instruments } from '@/data/instruments';
import { ArrowUpRight, Clock } from 'lucide-react';
import BotonFavorito from '@/components/BotonFavorito';
import { LogoInstrumento, metaInstrumento } from '@/components/LogoInstrumento';
import { cn } from '@/lib/utils';
import AdBanner from '@/components/AdBanner';

export const metadata = {
  title: 'Mercado Bursátil | FinBootcamp',
  description: 'Explorá los principales instrumentos de inversión en Argentina',
};

const RIESGO = {
  bajo: { nivel: 1, chip: 'bg-emerald-100 text-emerald-800', barra: 'bg-emerald-500' },
  medio: { nivel: 2, chip: 'bg-amber-100 text-amber-900', barra: 'bg-amber-500' },
  alto: { nivel: 3, chip: 'bg-rose-100 text-rose-800', barra: 'bg-rose-500' },
} as const;

function separarNombre(nombre: string) {
  const match = nombre.match(/^(.*?)\s*\((.*)\)\s*$/);
  return match ? { titulo: match[1], detalle: match[2] } : { titulo: nombre, detalle: null };
}

function MedidorRiesgo({ riesgo }: { riesgo: keyof typeof RIESGO }) {
  const r = RIESGO[riesgo] ?? RIESGO.medio;
  return (
    <span className="flex items-end gap-0.5" aria-hidden="true">
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          className={cn('w-1 rounded-full', n <= r.nivel ? r.barra : 'bg-stone-300/70')}
          style={{ height: `${0.5 + n * 0.2}rem` }}
        />
      ))}
    </span>
  );
}

export default function MercadoBursatilPage() {
  const porRiesgo = {
    bajo: instruments.filter((i) => i.risk === 'bajo').length,
    medio: instruments.filter((i) => i.risk === 'medio').length,
    alto: instruments.filter((i) => i.risk === 'alto').length,
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Hero */}
      <section className="relative mb-12 overflow-hidden rounded-[2rem] bg-[#12372c] text-[#f4f1ea] shadow-[0_40px_80px_-45px_rgba(18,55,44,0.8)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_-20%,rgba(212,175,106,0.28),transparent_45%),radial-gradient(ellipse_at_95%_10%,rgba(110,231,183,0.22),transparent_42%),radial-gradient(ellipse_at_60%_120%,rgba(56,189,248,0.14),transparent_45%)]" />
        <div className="grain-overlay" />
        <div className="relative grid items-center gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[1.25fr_1fr]">
          <div className="animate-fade-up">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#d4af6a]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              Mercado local
            </p>
            <h1 className="text-4xl font-medium sm:text-6xl">Mercado Bursátil</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-emerald-50/80">
              Bonos, letras, acciones, ETFs y el resto de la caja de herramientas. Cada ficha con riesgo,
              horizonte e impuestos.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-sm">
                <div className="font-heading text-3xl">{instruments.length}</div>
                <div className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-emerald-100/60">
                  Instrumentos
                </div>
              </div>
              {(['bajo', 'medio', 'alto'] as const).map((nivel) => (
                <div
                  key={nivel}
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-3xl">{porRiesgo[nivel]}</span>
                    <MedidorRiesgo riesgo={nivel} />
                  </div>
                  <div className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-emerald-100/60">
                    Riesgo {nivel}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mosaico de logos */}
          <div className="relative hidden lg:block" aria-hidden="true">
            <div className="grid grid-cols-4 gap-4 [transform:rotate(-4deg)]">
              {instruments.map((instrument, i) => (
                <div
                  key={instrument.id}
                  className={cn('transition-transform duration-500', i % 2 === 0 ? 'translate-y-3' : '-translate-y-3')}
                >
                  <LogoInstrumento slug={instrument.slug} size="md" className="h-auto w-full aspect-square" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AdBanner slot="mercado-horizontal" format="horizontal" className="mb-10" />

      {/* Grilla */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {instruments.map((instrument) => {
          const meta = metaInstrumento(instrument.slug);
          const riesgo = RIESGO[instrument.risk] ?? RIESGO.medio;
          const { titulo, detalle } = separarNombre(instrument.name);

          return (
            <Link href={`/mercado-bursatil/${instrument.slug}`} key={instrument.id} className="group">
              <article className="relative flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-white/80 bg-white/80 p-6 shadow-[0_22px_50px_-36px_rgba(18,55,44,0.55)] ring-1 ring-stone-200/70 backdrop-blur-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_65px_-34px_rgba(18,55,44,0.6)]">
                <div
                  className={cn(
                    'pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full blur-3xl transition duration-500 group-hover:scale-125',
                    meta.halo
                  )}
                />

                <div className="relative mb-5 flex items-start justify-between">
                  <LogoInstrumento slug={instrument.slug} className="transition duration-300 group-hover:-rotate-3 group-hover:scale-105" />
                  <div className="flex items-center gap-2">
                    <BotonFavorito slug={instrument.slug} tipo="bursatil" riesgo={instrument.risk} compacto />
                    <span
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
                        riesgo.chip
                      )}
                    >
                      <MedidorRiesgo riesgo={instrument.risk} />
                      {instrument.risk.charAt(0).toUpperCase() + instrument.risk.slice(1)}
                    </span>
                  </div>
                </div>

                <h3 className="relative text-xl font-medium leading-snug text-[#12372c]">{titulo}</h3>
                {detalle && (
                  <p className={cn('relative mt-0.5 text-xs font-semibold uppercase tracking-[0.14em]', meta.acento)}>
                    {detalle}
                  </p>
                )}

                <p className="relative mt-3 mb-5 flex-grow text-sm leading-relaxed text-stone-600">
                  {instrument.shortDescription}
                </p>

                <div className="relative mb-5 flex flex-wrap gap-1.5">
                  {meta.etiquetas.map((etiqueta) => (
                    <span
                      key={etiqueta}
                      className="rounded-md border border-stone-200 bg-stone-50 px-2 py-0.5 font-mono text-[0.7rem] font-medium text-stone-600"
                    >
                      {etiqueta}
                    </span>
                  ))}
                </div>

                <div className="relative flex items-center justify-between border-t border-stone-100 pt-4 text-sm text-stone-500">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-stone-400" />
                    {instrument.horizon.replace(/\s*\(.*\)/, '')}
                  </span>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[#12372c] text-[#f4f1ea] transition group-hover:bg-[#d4af6a] group-hover:text-[#12372c]">
                    <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
