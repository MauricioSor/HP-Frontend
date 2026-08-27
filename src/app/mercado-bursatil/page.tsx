import Link from 'next/link';
import { instruments } from '@/data/instruments';
import { TrendingUp, BarChart3 } from 'lucide-react';

export const metadata = {
  title: 'Mercado Bursátil | FinBootcamp',
  description: 'Explorá los principales instrumentos de inversión en Argentina',
};

const getRiskColor = (risk: string) => {
  switch (risk?.toLowerCase()) {
    case 'bajo':
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
    case 'medio':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
    case 'alto':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    default:
      return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
  }
};

export default function MercadoBursatilPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Mercado Bursátil
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
          Explorá los principales instrumentos de inversión en Argentina. Conocé sus características, riesgos y beneficios para armar tu portafolio ideal.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {['Todos', 'Renta Fija', 'Renta Variable', 'Fondos', 'Otros'].map((cat) => (
          <button key={cat} className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors">
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {instruments.map((instrument) => (
          <Link href={`/mercado-bursatil/${instrument.slug}`} key={instrument.id}>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700 h-full p-6 flex flex-col group">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getRiskColor(instrument.risk)}`}>
                  Riesgo {instrument.risk}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                {instrument.name}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow">
                {instrument.shortDescription}
              </p>
              
              <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
                <TrendingUp className="w-4 h-4 mr-2" />
                <span>Horizonte: {instrument.horizon}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
