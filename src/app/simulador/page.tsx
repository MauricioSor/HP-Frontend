'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { instruments } from '@/data/instruments';
import { simulateInvestment, type CapitalizationFrequency, type SimulationResult } from '@/lib/simulator';
import { formatCurrency, formatPercent } from '@/lib/utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calculator, Info, TrendingUp } from 'lucide-react';

function SimuladorContent() {
  const searchParams = useSearchParams();
  const preselectedInstrument = searchParams?.get('instrument');

  const [capital, setCapital] = useState<number>(100000);
  const [instrumentSlug, setInstrumentSlug] = useState<string>(preselectedInstrument || instruments[0]?.slug || '');
  const [rate, setRate] = useState<number>(0.45);
  const [months, setMonths] = useState<number>(12);
  const [frequency, setFrequency] = useState<CapitalizationFrequency>('mensual');
  const [result, setResult] = useState<SimulationResult | null>(null);

  const selectedInstrument = instruments.find(i => i.slug === instrumentSlug);

  useEffect(() => {
    if (selectedInstrument && selectedInstrument.defaultRate) {
      setRate(selectedInstrument.defaultRate);
    }
  }, [instrumentSlug, selectedInstrument]);

  const handleSimulate = () => {
    const sim = simulateInvestment(capital, rate, months, frequency);
    setResult(sim);
  };

  useEffect(() => {
    handleSimulate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 flex items-center justify-center">
          <Calculator className="w-8 h-8 mr-3 text-emerald-600" />
          Simulador de Inversión
        </h1>
        <p className="text-lg text-slate-600">
          Proyectá tus ganancias usando interés compuesto y compará diferentes escenarios.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Panel */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 shadow-sm border border-slate-200 h-fit sticky top-24">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Parámetros</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Capital Inicial (ARS)
              </label>
              <input
                type="number"
                min="1000"
                step="10000"
                value={capital}
                onChange={(e) => setCapital(Number(e.target.value))}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Instrumento de Referencia
              </label>
              <select
                value={instrumentSlug}
                onChange={(e) => setInstrumentSlug(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                {instruments.map(inst => (
                  <option key={inst.slug} value={inst.slug}>{inst.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tasa Anual Estimada (decimal, ej: 0.45 = 45%)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="5"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              <p className="text-xs text-slate-500 mt-1">
                Tasa actual: {(rate * 100).toFixed(1)}% anual
              </p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="block text-sm font-medium text-slate-700">
                  Plazo
                </label>
                <span className="text-sm font-bold text-emerald-600">{months} meses</span>
              </div>
              <input
                type="range"
                min="1"
                max="120"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>1 mes</span>
                <span>10 años</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Frecuencia de Capitalización
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as CapitalizationFrequency)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="mensual">Mensual</option>
                <option value="trimestral">Trimestral</option>
                <option value="anual">Anual</option>
                <option value="al_vencimiento">Al Vencimiento</option>
              </select>
            </div>

            <button
              onClick={handleSimulate}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              Simular Inversión
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-8 space-y-6">
          {result && (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <p className="text-sm text-slate-500 mb-1">Valor Final</p>
                  <p className="text-xl font-bold text-slate-900">{formatCurrency(result.summary.finalValue)}</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-emerald-200 shadow-sm">
                  <p className="text-sm text-slate-500 mb-1">Ganancia Total</p>
                  <p className="text-xl font-bold text-emerald-600">{formatCurrency(result.summary.totalEarnings)}</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <p className="text-sm text-slate-500 mb-1">Rendimiento</p>
                  <p className="text-xl font-bold text-blue-600">+{formatPercent(result.summary.netReturn)}</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <p className="text-sm text-slate-500 mb-1">Ganancia Mensual Prom.</p>
                  <p className="text-xl font-bold text-slate-900">{formatCurrency(result.summary.totalEarnings / months)}</p>
                </div>
              </div>

              {/* Chart */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-emerald-600" />
                  Proyección de Crecimiento
                </h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={result.dataPoints} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#059669" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis
                        dataKey="month"
                        stroke="#64748b"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `M${value}`}
                      />
                      <YAxis
                        stroke="#64748b"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                      />
                      <Tooltip
                        formatter={(value) => [formatCurrency(Number(value)), 'Capital']}
                        labelFormatter={(label) => `Mes ${label}`}
                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
                      />
                      <Area type="monotone" dataKey="capital" stroke="#059669" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Comparison Table */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Comparativa</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3 font-semibold text-slate-700">Escenario</th>
                        <th className="px-4 py-3 font-semibold text-slate-700">Tasa Anual</th>
                        <th className="px-4 py-3 font-semibold text-slate-700">Valor Final</th>
                        <th className="px-4 py-3 font-semibold text-slate-700">Ganancia</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="bg-emerald-50">
                        <td className="px-4 py-3 font-medium text-emerald-800">
                          Tu simulación ({selectedInstrument?.name || 'Personalizado'})
                        </td>
                        <td className="px-4 py-3 text-emerald-700">{(rate * 100).toFixed(1)}%</td>
                        <td className="px-4 py-3 font-bold text-emerald-800">{formatCurrency(result.summary.finalValue)}</td>
                        <td className="px-4 py-3 text-emerald-700">{formatCurrency(result.summary.totalEarnings)}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-slate-700">Plazo Fijo (referencia)</td>
                        <td className="px-4 py-3 text-slate-600">35.0%</td>
                        <td className="px-4 py-3 font-bold text-slate-700">
                          {formatCurrency(simulateInvestment(capital, 0.35, months, 'mensual').summary.finalValue)}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {formatCurrency(simulateInvestment(capital, 0.35, months, 'mensual').summary.totalEarnings)}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-rose-700">Inflación estimada</td>
                        <td className="px-4 py-3 text-rose-600">50.0%</td>
                        <td className="px-4 py-3 font-bold text-rose-700">
                          {formatCurrency(simulateInvestment(capital, 0.50, months, 'mensual').summary.finalValue)}
                        </td>
                        <td className="px-4 py-3 text-rose-600">
                          {formatCurrency(simulateInvestment(capital, 0.50, months, 'mensual').summary.totalEarnings)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-400 mt-3">
                  * Los valores son estimaciones con fines educativos. Rendimientos pasados no garantizan resultados futuros.
                </p>
              </div>

              {/* Tax Info Note */}
              {selectedInstrument?.taxInfo && (
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start">
                  <Info className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900">Información Impositiva</h4>
                    <p className="text-sm text-blue-800 mt-1">
                      Según el instrumento seleccionado (<strong>{selectedInstrument.name}</strong>), tu ganancia por compraventa está{' '}
                      <span className={`font-bold ${selectedInstrument.taxInfo.ganancias === 'exento' ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {selectedInstrument.taxInfo.ganancias}
                      </span>{' '}
                      del Impuesto a las Ganancias, y{' '}
                      <span className={`font-bold ${selectedInstrument.taxInfo.bienesPersonales === 'exento' ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {selectedInstrument.taxInfo.bienesPersonales === 'exento' ? 'exenta' : 'gravada'}
                      </span>{' '}
                      en Bienes Personales.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SimuladorPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-slate-500">Cargando simulador...</p>
      </div>
    }>
      <SimuladorContent />
    </Suspense>
  );
}
