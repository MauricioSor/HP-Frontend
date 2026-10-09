import Link from 'next/link';
import { instruments } from '@/data/instruments';
import { ArrowUpRight, Landmark } from 'lucide-react';
import BotonFavorito from '@/components/BotonFavorito';

export const metadata = {
  title: 'Mercado Bursátil | FinBootcamp',
  description: 'Explorá los principales instrumentos de inversión en Argentina',
};

const getRiskColor = (risk: string) => {
  switch (risk?.toLowerCase()) {
    case 'bajo':
      return 'bg-emerald-100 text-emerald-800';
    case 'medio':
      return 'bg-amber-100 text-amber-900';
    case 'alto':
      return 'bg-rose-100 text-rose-800';
    default:
      return 'bg-stone-100 text-stone-700';
  }
};

export default function MercadoBursatilPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-12 max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-800">Mercado local</p>
        <h1 className="text-4xl font-medium text-[#12372c] sm:text-5xl">Mercado Bursátil</h1>
        <p className="mt-4 text-lg text-stone-600">
          Bonos, letras, acciones, ETFs y el resto de la caja de herramientas. Cada ficha con riesgo, horizonte e impuestos.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {instruments.map((instrument) => (
          <Link href={`/mercado-bursatil/${instrument.slug}`} key={instrument.id} className="group">
            <div className="flex h-full flex-col rounded-[1.6rem] border border-stone-200/80 bg-white/85 p-6 shadow-[0_20px_50px_-38px_rgba(18,55,44,0.5)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_-34px_rgba(18,55,44,0.5)]">
              <div className="mb-5 flex items-start justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#12372c] text-[#f4f1ea]">
                  <Landmark className="h-5 w-5" />
                </div>
                <div className="flex items-center gap-2">
                  <BotonFavorito slug={instrument.slug} tipo="bursatil" riesgo={instrument.risk} compacto />
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getRiskColor(instrument.risk)}`}>
                    Riesgo {instrument.risk}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-medium text-[#12372c]">
                {instrument.name}
              </h3>

              <p className="mt-2 mb-6 flex-grow text-sm leading-relaxed text-stone-600">
                {instrument.shortDescription}
              </p>

              <div className="flex items-center justify-between border-t border-stone-100 pt-4 text-sm text-stone-500">
                <span>{instrument.horizon}</span>
                <ArrowUpRight className="h-4 w-4 text-[#d4af6a] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
