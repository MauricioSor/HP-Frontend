import { cintaTickers } from '@/data/carrusel-inicio'

export default function CintaTickers({ tono = 'oscuro' }: { tono?: 'oscuro' | 'claro' }) {
  const fila = [...cintaTickers, ...cintaTickers]
  const oscuro = tono === 'oscuro'

  return (
    <div
      className={`relative overflow-hidden border-y ${
        oscuro ? 'border-white/10 bg-[#0d261e]' : 'border-stone-200/80 bg-[#f7f4ee]'
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r ${
          oscuro ? 'from-[#0d261e]' : 'from-[#f7f4ee]'
        } to-transparent`}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l ${
          oscuro ? 'from-[#0d261e]' : 'from-[#f7f4ee]'
        } to-transparent`}
      />
      <div className="cinta-tickers flex w-max gap-10 py-3 pr-10">
        {fila.map((ticker, index) => (
          <span
            key={`${ticker}-${index}`}
            className={`flex items-center gap-10 text-[11px] font-semibold uppercase tracking-[0.28em] ${
              oscuro ? 'text-emerald-100/70' : 'text-[#12372c]/70'
            }`}
          >
            {ticker}
            <span className={oscuro ? 'text-emerald-400/50' : 'text-emerald-700/40'}>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
