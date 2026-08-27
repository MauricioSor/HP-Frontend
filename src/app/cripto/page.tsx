import Link from 'next/link';
import { cryptoTopics } from '@/data/crypto-topics';
import { ShieldAlert, BookOpen, Bitcoin } from 'lucide-react';

export const metadata = {
  title: 'Mercado Cripto | FinBootcamp',
  description: 'Todo lo que necesitás saber sobre criptomonedas',
};

const getRiskColor = (risk: string) => {
  switch (risk?.toLowerCase()) {
    case 'bajo': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
    case 'medio': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
    case 'alto': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
  }
};

export default function CryptoPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 flex items-center justify-center md:justify-start">
          <Bitcoin className="w-10 h-10 mr-3 text-amber-500" />
          Mercado Cripto
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
          Todo lo que necesitás saber sobre criptomonedas. Desde los conceptos básicos hasta estrategias avanzadas y finanzas descentralizadas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cryptoTopics.map((topic) => (
          <Link href={`/cripto/${topic.slug}`} key={topic.id}>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700 h-full p-6 flex flex-col group">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-lg group-hover:bg-amber-100 dark:group-hover:bg-amber-900/40 transition-colors">
                  <BookOpen className="w-6 h-6" />
                </div>
                {topic.risk && (
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getRiskColor(topic.risk)}`}>
                    Riesgo {topic.risk}
                  </span>
                )}
              </div>
              
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                {topic.title}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow">
                {topic.shortDescription}
              </p>
              
              <div className="text-amber-600 dark:text-amber-400 text-sm font-medium flex items-center mt-auto">
                Leer más &rarr;
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
