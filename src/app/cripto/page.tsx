import Link from 'next/link';
import { cryptoTopics } from '@/data/crypto-topics';
import { ArrowUpRight } from 'lucide-react';
import BotonFavorito from '@/components/BotonFavorito';
import { LogoTema, metaTema } from '@/components/LogoCripto';
import { cn } from '@/lib/utils';
import AdBanner from '@/components/AdBanner';

export const metadata = {
  title: 'Mercado Cripto | FinBootcamp',
  description: 'Todo lo que necesitás saber sobre criptomonedas',
};

const getRiskColor = (risk: string) => {
  switch (risk?.toLowerCase()) {
    case 'bajo': return 'bg-emerald-100 text-emerald-800';
    case 'medio': return 'bg-amber-100 text-amber-900';
    case 'alto': return 'bg-rose-100 text-rose-800';
    case 'muy_alto': return 'bg-fuchsia-100 text-fuchsia-800';
    default: return 'bg-stone-100 text-stone-700';
  }
};

export default function CryptoPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Hero */}
      <section className="relative mb-12 overflow-hidden rounded-[2rem] bg-[#12372c] text-[#f4f1ea] shadow-[0_40px_80px_-45px_rgba(18,55,44,0.8)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_-20%,rgba(251,191,36,0.3),transparent_45%),radial-gradient(ellipse_at_95%_10%,rgba(110,231,183,0.2),transparent_42%),radial-gradient(ellipse_at_60%_120%,rgba(167,139,250,0.18),transparent_45%)]" />
        <div className="grain-overlay" />
        <div className="relative grid items-center gap-8 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[1.4fr_1fr]">
          <div className="animate-fade-up">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#d4af6a]">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
              Activos digitales
            </p>
            <h1 className="text-4xl font-medium sm:text-6xl">Mercado Cripto</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-emerald-50/80">
              Todo lo que necesitás saber sobre criptomonedas. Desde los conceptos básicos hasta estrategias
              avanzadas y finanzas descentralizadas.
            </p>
          </div>
          <div className="hidden justify-end lg:flex" aria-hidden="true">
            <div className="grid grid-cols-3 gap-4 [transform:rotate(-4deg)]">
              {cryptoTopics.map((topic, i) => (
                <LogoTema
                  key={topic.id}
                  slug={topic.slug}
                  className={cn(i % 2 === 0 ? 'translate-y-2' : '-translate-y-2')}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <AdBanner slot="cripto-horizontal" format="horizontal" className="mb-10" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cryptoTopics.map((topic) => {
          const meta = metaTema(topic.slug);
          return (
            <Link href={`/cripto/${topic.slug}`} key={topic.id} className="group">
              <article className="relative flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-white/80 bg-white/80 p-6 shadow-[0_22px_50px_-36px_rgba(18,55,44,0.55)] ring-1 ring-stone-200/70 backdrop-blur-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_65px_-34px_rgba(18,55,44,0.6)]">
                <div
                  className={cn(
                    'pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full blur-3xl transition duration-500 group-hover:scale-125',
                    meta.halo
                  )}
                />
                <div className="relative mb-5 flex items-start justify-between">
                  <LogoTema
                    slug={topic.slug}
                    className="transition duration-300 group-hover:-rotate-3 group-hover:scale-105"
                  />
                  <div className="flex items-center gap-2">
                    <BotonFavorito slug={topic.slug} tipo="cripto" riesgo={topic.risk} compacto />
                    {topic.risk && (
                      <span className={cn('rounded-full px-2.5 py-1 text-xs font-semibold', getRiskColor(topic.risk))}>
                        Riesgo {topic.risk.replace('_', ' ')}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="relative text-xl font-medium leading-snug text-[#12372c]">{topic.title}</h3>

                <p className="relative mt-3 mb-6 flex-grow text-sm leading-relaxed text-stone-600">
                  {topic.shortDescription}
                </p>

                <div className="relative flex items-center justify-between border-t border-stone-100 pt-4 text-sm font-semibold text-[#12372c]">
                  Leer más
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
