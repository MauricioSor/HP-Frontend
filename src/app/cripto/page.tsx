import Link from 'next/link';
import { cryptoTopics } from '@/data/crypto-topics';
import { ArrowUpRight, Bitcoin, Brain, Coins, Cpu, Flame, Rocket } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import BotonFavorito from '@/components/BotonFavorito';
import { LogoTile } from '@/components/LogoInstrumento';
import { cn } from '@/lib/utils';

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

interface MetaTema {
  icon: LucideIcon;
  gradiente: string;
  sombra: string;
  halo: string;
}

const META_TEMAS: Record<string, MetaTema> = {
  'principales-criptos': {
    icon: Coins,
    gradiente: 'from-amber-600 via-amber-500 to-yellow-300',
    sombra: 'shadow-[0_14px_28px_-12px_rgba(217,119,6,0.75)]',
    halo: 'bg-amber-300/30',
  },
  'fundamentos-bitcoin': {
    icon: Bitcoin,
    gradiente: 'from-orange-600 via-orange-500 to-amber-300',
    sombra: 'shadow-[0_14px_28px_-12px_rgba(234,88,12,0.75)]',
    halo: 'bg-orange-300/30',
  },
  minado: {
    icon: Cpu,
    gradiente: 'from-slate-800 via-slate-600 to-sky-400',
    sombra: 'shadow-[0_14px_28px_-12px_rgba(51,65,85,0.75)]',
    halo: 'bg-sky-300/30',
  },
  fomo: {
    icon: Brain,
    gradiente: 'from-violet-700 via-violet-500 to-fuchsia-300',
    sombra: 'shadow-[0_14px_28px_-12px_rgba(109,40,217,0.7)]',
    halo: 'bg-violet-300/30',
  },
  'quemado-monedas': {
    icon: Flame,
    gradiente: 'from-rose-700 via-red-500 to-orange-300',
    sombra: 'shadow-[0_14px_28px_-12px_rgba(225,29,72,0.7)]',
    halo: 'bg-rose-300/30',
  },
  memecoins: {
    icon: Rocket,
    gradiente: 'from-fuchsia-700 via-pink-500 to-amber-300',
    sombra: 'shadow-[0_14px_28px_-12px_rgba(192,38,211,0.7)]',
    halo: 'bg-fuchsia-300/30',
  },
};

const META_DEFAULT = META_TEMAS['principales-criptos'];

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
              {cryptoTopics.map((topic, i) => {
                const meta = META_TEMAS[topic.slug] ?? META_DEFAULT;
                return (
                  <LogoTile
                    key={topic.id}
                    icon={meta.icon}
                    gradiente={meta.gradiente}
                    sombra={meta.sombra}
                    className={cn('h-16 w-16', i % 2 === 0 ? 'translate-y-2' : '-translate-y-2')}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cryptoTopics.map((topic) => {
          const meta = META_TEMAS[topic.slug] ?? META_DEFAULT;
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
                  <LogoTile
                    icon={meta.icon}
                    gradiente={meta.gradiente}
                    sombra={meta.sombra}
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
