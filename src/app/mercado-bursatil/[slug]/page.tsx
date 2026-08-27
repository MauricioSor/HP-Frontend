import Link from 'next/link';
import { notFound } from 'next/navigation';
import { instruments } from '@/data/instruments';
import { ChevronRight, Calculator, AlertCircle, Info, ShieldAlert, BarChart3, Clock, DollarSign } from 'lucide-react';

export function generateStaticParams() {
  return instruments.map((instrument) => ({
    slug: instrument.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const instrument = instruments.find((i) => i.slug === params.slug);
  
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
    case 'bajo': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
    case 'medio': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800';
    case 'alto': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800';
    default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
  }
};

const getTaxColor = (status: string) => {
  return status?.toLowerCase().includes('exento') 
    ? 'text-emerald-600 dark:text-emerald-400 font-medium' 
    : 'text-red-600 dark:text-red-400 font-medium';
};

export default function InstrumentDetailPage({ params }: { params: { slug: string } }) {
  const instrument = instruments.find((i) => i.slug === params.slug);
  
  if (!instrument) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-slate-500 dark:text-slate-400 mb-8 items-center space-x-2">
        <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Inicio</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/mercado-bursatil" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Mercado Bursátil</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">{instrument.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-10">
          {/* Header */}
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-4 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
                <BarChart3 className="w-8 h-8" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                {instrument.name}
              </h1>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-4">
              <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getRiskColor(instrument.risk)} flex items-center`}>
                <ShieldAlert className="w-4 h-4 mr-2" />
                Riesgo {instrument.risk}
              </span>
              <span className="px-3 py-1 text-sm font-medium rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Horizonte: {instrument.horizon}
              </span>
            </div>
          </div>

          {/* Section 1: ¿Qué es? */}
          <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
              <Info className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
              ¿Qué es?
            </h2>
            <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
              <p className="whitespace-pre-line">{instrument.description}</p>
            </div>
          </section>

          {/* Section 2: Ejemplo Práctico */}
          {instrument.example && (
            <section className="bg-blue-50 dark:bg-blue-900/10 rounded-2xl p-6 md:p-8 border border-blue-100 dark:border-blue-900/30">
              <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center">
                <Calculator className="w-5 h-5 mr-2" />
                Ejemplo Práctico
              </h2>
              <p className="text-blue-800 dark:text-blue-200">{instrument.example}</p>
            </section>
          )}

          {/* Section 3: Información Impositiva */}
          {instrument.taxInfo && (
            <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                <AlertCircle className="w-6 h-6 mr-2 text-amber-500" />
                Información Impositiva
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 rounded-tl-lg">Impuesto</th>
                      <th className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 rounded-tr-lg">Tratamiento</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100 dark:border-slate-700/50">
                      <td className="py-4 px-4 text-slate-700 dark:text-slate-300">Impuesto a las Ganancias</td>
                      <td className={`py-4 px-4 ${getTaxColor(instrument.taxInfo.ganancias)}`}>{instrument.taxInfo.ganancias}</td>
                    </tr>
                    <tr className="border-b border-slate-100 dark:border-slate-700/50">
                      <td className="py-4 px-4 text-slate-700 dark:text-slate-300">Bienes Personales</td>
                      <td className={`py-4 px-4 ${getTaxColor(instrument.taxInfo.bienesPersonales)}`}>{instrument.taxInfo.bienesPersonales}</td>
                    </tr>
                    <tr className="border-b border-slate-100 dark:border-slate-700/50">
                      <td className="py-4 px-4 text-slate-700 dark:text-slate-300">Impuesto a los Débitos y Créditos (ITF)</td>
                      <td className={`py-4 px-4 font-semibold ${instrument.taxInfo.itf ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {instrument.taxInfo.itf ? 'Aplica' : 'No aplica'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {instrument.taxInfo.notes && (
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 italic">
                  Nota: {instrument.taxInfo.notes}
                </p>
              )}
            </section>
          )}

          {/* Section 4: Simulá tu inversión */}
          <section className="bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-2xl p-6 md:p-8 text-white shadow-md">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Simulá tu inversión</h2>
                <p className="text-emerald-100 max-w-md">Descubrí cuánto podría crecer tu capital invirtiendo en {instrument.name} a lo largo del tiempo.</p>
              </div>
              <Link href={`/simulador?instrument=${instrument.slug}`} className="px-6 py-3 bg-white text-emerald-700 hover:bg-emerald-50 rounded-lg font-semibold transition-colors shadow-sm whitespace-nowrap flex items-center">
                <Calculator className="w-5 h-5 mr-2" />
                Ir al simulador
              </Link>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-8 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Resumen del Instrumento</h3>
            
            <div className="space-y-6">
              <div>
                <span className="text-sm text-slate-500 dark:text-slate-400 block mb-1">Riesgo</span>
                <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getRiskColor(instrument.risk)}`}>
                  {instrument.risk}
                </span>
              </div>
              
              <div>
                <span className="text-sm text-slate-500 dark:text-slate-400 block mb-1">Horizonte Recomendado</span>
                <span className="text-slate-900 dark:text-white font-medium flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-slate-400" />
                  {instrument.horizon}
                </span>
              </div>
              
              {instrument.minInvestment && (
                <div>
                  <span className="text-sm text-slate-500 dark:text-slate-400 block mb-1">Inversión Mínima</span>
                  <span className="text-slate-900 dark:text-white font-medium flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-slate-400" />
                    {instrument.minInvestment}
                  </span>
                </div>
              )}
              
              {instrument.defaultRate && (
                <div>
                  <span className="text-sm text-slate-500 dark:text-slate-400 block mb-1">Rendimiento Histórico/Estimado</span>
                  <span className="text-slate-900 dark:text-white font-medium text-xl text-emerald-600 dark:text-emerald-400">
                    ~{instrument.defaultRate}% <span className="text-sm font-normal text-slate-500">anual</span>
                  </span>
                </div>
              )}
            </div>
            
            <hr className="my-6 border-slate-200 dark:border-slate-700" />
            
            <Link href="/mercado-bursatil" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium flex items-center justify-center">
              Volver a todos los instrumentos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
