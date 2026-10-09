'use client';

import { useMemo, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { instruments } from '@/data/instruments';
import { simulateInvestment, type CapitalizationFrequency } from '@/lib/simulator';
import { formatCurrency, formatPercent, cn } from '@/lib/utils';
import { Area, ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Banknote, Calculator, CheckCircle2, AlertTriangle, TrendingUp, Receipt } from 'lucide-react';
import SimuladorPrestamo from '@/components/SimuladorPrestamo';
import { LogoInstrumento } from '@/components/LogoInstrumento';
import { Atajos, Campo, Dato, Segmentado, inputClass, tarjetaClass, tooltipStyle } from '@/components/SimuladorUI';
import AdBanner from '@/components/AdBanner';

const TASA_PLAZO_FIJO = 0.35;
const TASA_INFLACION = 0.5;

function SimuladorContent() {
  const params = useSearchParams();
  const [pestana, setPestana] = useState<'inversion' | 'prestamo'>(
    params?.get('vista') === 'prestamo' ? 'prestamo' : 'inversion'
  );

  function cambiarPestana(siguiente: 'inversion' | 'prestamo') {
    setPestana(siguiente);
    const url = siguiente === 'prestamo' ? '/simulador?vista=prestamo' : '/simulador';
    window.history.replaceState(null, '', url);
  }

  const pestanas = [
    { id: 'inversion' as const, etiqueta: 'Inversión', icono: TrendingUp },
    { id: 'prestamo' as const, etiqueta: 'Préstamo', icono: Banknote },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="relative mb-8 overflow-hidden rounded-[2rem] bg-[#12372c] text-[#f4f1ea] shadow-[0_40px_80px_-45px_rgba(18,55,44,0.8)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_-30%,rgba(212,175,106,0.28),transparent_45%),radial-gradient(ellipse_at_100%_0%,rgba(110,231,183,0.2),transparent_42%)]" />
        <div className="grain-overlay" />
        <div className="relative flex flex-col gap-6 px-6 py-8 sm:px-10 sm:py-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#d4af6a]">
              <Calculator className="h-4 w-4" />
              Calculadoras
            </p>
            <h1 className="text-4xl font-medium sm:text-5xl">
              {pestana === 'inversion' ? 'Simulador de inversión' : 'Simulador de préstamo'}
            </h1>
            <p className="mt-3 max-w-xl text-emerald-50/80">
              {pestana === 'inversion'
                ? 'Proyectá cuánto crece tu plata con interés compuesto y comparala contra el plazo fijo y la inflación.'
                : 'Armá la cuota con los datos de la oferta y mirá cuánto es interés, ajuste de la moneda y costo total.'}
            </p>
          </div>

          <div className="inline-flex shrink-0 rounded-full bg-white/10 p-1 ring-1 ring-white/15 backdrop-blur-sm">
            {pestanas.map(({ id, etiqueta, icono: Icono }) => (
              <button
                key={id}
                type="button"
                onClick={() => cambiarPestana(id)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition',
                  pestana === id ? 'bg-[#f4f1ea] text-[#12372c] shadow' : 'text-emerald-50/80 hover:text-white'
                )}
              >
                <Icono className="h-4 w-4" />
                {etiqueta}
              </button>
            ))}
          </div>
        </div>
      </header>

      <AdBanner slot="simulador-horizontal" format="horizontal" className="mb-8" />

      {pestana === 'prestamo' ? <SimuladorPrestamo /> : <SimuladorInversion />}
    </div>
  );
}

function SimuladorInversion() {
  const searchParams = useSearchParams();
  const preseleccionado = instruments.find((i) => i.slug === searchParams?.get('instrument')) ?? instruments[0];

  const [capital, setCapital] = useState<number>(100000);
  const [instrumentSlug, setInstrumentSlug] = useState<string>(preseleccionado?.slug ?? '');
  const [tasaPct, setTasaPct] = useState<number>(Math.round((preseleccionado?.defaultRate ?? 0.45) * 100));
  const [months, setMonths] = useState<number>(12);
  const [frequency, setFrequency] = useState<CapitalizationFrequency>(preseleccionado?.capitalization ?? 'mensual');
  const selectedInstrument = instruments.find((i) => i.slug === instrumentSlug);

  function elegirInstrumento(slug: string) {
    setInstrumentSlug(slug);
    const instrumento = instruments.find((i) => i.slug === slug);
    if (instrumento) {
      setTasaPct(Math.round(instrumento.defaultRate * 100));
      setFrequency(instrumento.capitalization);
    }
  }

  const valido = capital > 0 && months >= 1 && tasaPct >= 0;
  const rate = tasaPct / 100;

  const calculo = useMemo(() => {
    if (!valido) return null;
    const sim = simulateInvestment(capital, rate, months, frequency);
    const plazoFijo = simulateInvestment(capital, TASA_PLAZO_FIJO, months, 'mensual');
    const inflacion = simulateInvestment(capital, TASA_INFLACION, months, 'mensual');
    const serie = sim.dataPoints.map((punto, i) => ({
      month: punto.month,
      capital: punto.capital,
      inflacion: inflacion.dataPoints[i]?.capital ?? 0,
    }));
    return { sim, plazoFijo, inflacion, serie };
  }, [valido, capital, rate, months, frequency]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[22rem_minmax(0,1fr)] lg:gap-8">
      {/* Parámetros */}
      <aside className={cn(tarjetaClass, 'h-fit space-y-6 p-6 lg:sticky lg:top-28')}>
        <h2 className="text-lg font-medium text-[#12372c]">Tus datos</h2>

        <Campo etiqueta="Capital inicial" ayuda="El monto que invertís hoy, en pesos.">
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-stone-400">$</span>
            <input
              type="number"
              min="1000"
              step="10000"
              value={capital || ''}
              onChange={(e) => setCapital(Number(e.target.value))}
              className={cn(inputClass, 'pl-8 text-lg')}
            />
          </div>
          <Atajos
            valor={capital}
            onChange={setCapital}
            opciones={[
              { valor: 100000, etiqueta: '$100k' },
              { valor: 500000, etiqueta: '$500k' },
              { valor: 1000000, etiqueta: '$1M' },
              { valor: 5000000, etiqueta: '$5M' },
            ]}
          />
        </Campo>

        <Campo etiqueta="Instrumento" ayuda="Carga la tasa y la capitalización de referencia del instrumento. Después podés ajustarlas.">
          <div className="flex items-center gap-3">
            {selectedInstrument && <LogoInstrumento slug={selectedInstrument.slug} size="sm" />}
            <select
              value={instrumentSlug}
              onChange={(e) => elegirInstrumento(e.target.value)}
              className={cn(inputClass, 'min-w-0 flex-1 text-sm')}
            >
              {instruments.map((inst) => (
                <option key={inst.slug} value={inst.slug}>
                  {inst.name}
                </option>
              ))}
            </select>
          </div>
        </Campo>

        <Campo
          etiqueta="Tasa nominal anual"
          valor={`${tasaPct}%`}
          ayuda="Es una estimación. Un 45% anual equivale a 3,75% por mes antes de capitalizar."
        >
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="150"
              value={tasaPct}
              onChange={(e) => setTasaPct(Number(e.target.value))}
              className="w-full accent-[#12372c]"
            />
            <div className="relative w-24 shrink-0">
              <input
                type="number"
                min="0"
                step="0.5"
                value={tasaPct}
                onChange={(e) => setTasaPct(Number(e.target.value))}
                className={cn(inputClass, 'pr-7 text-sm')}
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-stone-400">%</span>
            </div>
          </div>
        </Campo>

        <Campo etiqueta="Plazo" valor={months >= 12 && months % 12 === 0 ? `${months / 12} ${months === 12 ? 'año' : 'años'}` : `${months} meses`}>
          <input
            type="range"
            min="1"
            max="120"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full accent-[#12372c]"
          />
          <Atajos
            valor={months}
            onChange={setMonths}
            opciones={[
              { valor: 3, etiqueta: '3m' },
              { valor: 6, etiqueta: '6m' },
              { valor: 12, etiqueta: '1 año' },
              { valor: 24, etiqueta: '2 años' },
              { valor: 60, etiqueta: '5 años' },
            ]}
          />
        </Campo>

        <Campo
          etiqueta="Capitalización"
          ayuda="Cada cuánto los intereses se suman al capital y empiezan a generar intereses propios."
        >
          <Segmentado
            valor={frequency}
            onChange={setFrequency}
            opciones={[
              { valor: 'mensual', etiqueta: 'Mensual' },
              { valor: 'trimestral', etiqueta: 'Trim.' },
              { valor: 'anual', etiqueta: 'Anual' },
              { valor: 'al_vencimiento', etiqueta: 'Al final' },
            ]}
          />
        </Campo>
      </aside>

      {/* Resultados */}
      <div className="min-w-0 space-y-6">
        {calculo ? (
          <ResultadosInversion
            capital={capital}
            months={months}
            rate={rate}
            nombreInstrumento={selectedInstrument?.name.replace(/\s*\(.*\)/, '') ?? 'Personalizado'}
            calculo={calculo}
            taxInfo={selectedInstrument?.taxInfo}
          />
        ) : (
          <div className={cn(tarjetaClass, 'p-6 text-stone-600')}>
            Cargá un capital mayor a cero y un plazo de al menos un mes.
          </div>
        )}
      </div>
    </div>
  );
}

type Calculo = {
  sim: ReturnType<typeof simulateInvestment>;
  plazoFijo: ReturnType<typeof simulateInvestment>;
  inflacion: ReturnType<typeof simulateInvestment>;
  serie: { month: number; capital: number; inflacion: number }[];
};

function ResultadosInversion({
  capital,
  months,
  rate,
  nombreInstrumento,
  calculo,
  taxInfo,
}: {
  capital: number;
  months: number;
  rate: number;
  nombreInstrumento: string;
  calculo: Calculo;
  taxInfo?: (typeof instruments)[number]['taxInfo'];
}) {
  const { sim, plazoFijo, inflacion, serie } = calculo;
  const diferenciaInflacion = sim.summary.finalValue - inflacion.summary.finalValue;
  const leGana = diferenciaInflacion >= 0;

  const escenarios = [
    { nombre: `Tu simulación · ${nombreInstrumento}`, tasa: rate, final: sim.summary.finalValue, color: 'bg-[#12372c]', destacado: true },
    { nombre: 'Plazo fijo (referencia)', tasa: TASA_PLAZO_FIJO, final: plazoFijo.summary.finalValue, color: 'bg-[#d4af6a]', destacado: false },
    { nombre: 'Inflación estimada', tasa: TASA_INFLACION, final: inflacion.summary.finalValue, color: 'bg-rose-400', destacado: false },
  ];
  const maximo = Math.max(...escenarios.map((e) => e.final));

  return (
    <>
      {/* Resultado principal */}
      <section className="relative overflow-hidden rounded-[1.8rem] bg-gradient-to-br from-[#12372c] via-[#17503f] to-[#1f6b52] p-6 text-[#f4f1ea] shadow-[0_30px_60px_-36px_rgba(18,55,44,0.8)] sm:p-8">
        <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-[#d4af6a]/20 blur-3xl" />
        <div className="grain-overlay" />
        <div className="relative">
          <p className="text-sm text-emerald-50/75">
            Valor final en {months} {months === 1 ? 'mes' : 'meses'}
          </p>
          <p className="mt-1 font-heading text-5xl tabular-nums sm:text-6xl">{formatCurrency(sim.summary.finalValue)}</p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-300/15 px-3 py-1 text-sm font-semibold text-emerald-200 ring-1 ring-emerald-300/30">
              <TrendingUp className="h-4 w-4" />+{formatCurrency(sim.summary.totalEarnings)} de ganancia
            </span>
            <span className="inline-flex items-center rounded-full bg-[#d4af6a]/20 px-3 py-1 text-sm font-semibold text-[#f0d08a] ring-1 ring-[#d4af6a]/40">
              +{formatPercent(sim.summary.netReturn)} de rendimiento
            </span>
          </div>
          <p className="mt-5 text-sm text-emerald-50/60">
            Invertís {formatCurrency(capital)} en {nombreInstrumento} a una TNA de {formatPercent(rate)}.
          </p>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-3">
        <Dato
          titulo="Ganancia por mes"
          valor={formatCurrency(sim.summary.totalEarnings / months)}
          detalle="Promedio de todo el plazo"
          tono="positivo"
        />
        <Dato
          titulo="Tasa efectiva anual"
          valor={formatPercent(sim.summary.effectiveRate)}
          detalle="Con la capitalización elegida"
          tono="dorado"
        />
        <Dato
          titulo="Contra la inflación"
          valor={`${leGana ? '+' : '−'}${formatCurrency(Math.abs(diferenciaInflacion))}`}
          detalle={leGana ? 'Le ganás al escenario de inflación' : 'Perdés poder de compra'}
          tono={leGana ? 'positivo' : 'negativo'}
        />
      </div>

      {/* Gráfico */}
      <section className={cn(tarjetaClass, 'p-5 sm:p-6')}>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-medium text-[#12372c]">Cómo crece tu capital</h3>
          <div className="flex items-center gap-4 text-xs font-semibold text-stone-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#12372c]" /> Tu inversión
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-0.5 w-4 rounded-full bg-rose-400" /> Inflación estimada
            </span>
          </div>
        </div>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={serie} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="relleno-capital" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#12372c" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="#12372c" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
              <XAxis
                dataKey="month"
                stroke="#a8a29e"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `M${value}`}
              />
              <YAxis
                stroke="#a8a29e"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={56}
                domain={[(min: number) => Math.floor(min * 0.95), (max: number) => Math.ceil(max * 1.02)]}
                tickFormatter={(value) =>
                  value >= 1_000_000 ? `$${(value / 1_000_000).toFixed(1)}M` : `$${(value / 1000).toFixed(0)}k`
                }
              />
              <Tooltip
                formatter={(value, name) => [
                  formatCurrency(Number(value)),
                  name === 'capital' ? 'Tu inversión' : 'Inflación estimada',
                ]}
                labelFormatter={(label) => `Mes ${label}`}
                contentStyle={tooltipStyle}
                itemStyle={{ color: '#f4f1ea' }}
                labelStyle={{ color: '#d4af6a', fontWeight: 600 }}
              />
              <Area type="monotone" dataKey="capital" stroke="#12372c" strokeWidth={3} fill="url(#relleno-capital)" />
              <Line type="monotone" dataKey="inflacion" stroke="#fb7185" strokeWidth={2} strokeDasharray="6 5" dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Comparativa */}
      <section className={cn(tarjetaClass, 'p-5 sm:p-6')}>
        <h3 className="text-lg font-medium text-[#12372c]">Comparativa</h3>
        <div
          className={cn(
            'mt-4 flex items-start gap-3 rounded-2xl px-4 py-3 text-sm',
            leGana ? 'bg-emerald-50 text-emerald-900' : 'bg-rose-50 text-rose-900'
          )}
        >
          {leGana ? (
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
          ) : (
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" />
          )}
          <p>
            {leGana
              ? `Con esta tasa terminás ${formatCurrency(diferenciaInflacion)} por encima del escenario de inflación.`
              : `Con esta tasa terminás ${formatCurrency(Math.abs(diferenciaInflacion))} por debajo del escenario de inflación: en términos reales, perdés.`}
          </p>
        </div>

        <div className="mt-5 space-y-4">
          {escenarios.map((escenario) => (
            <div key={escenario.nombre}>
              <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
                <span className={cn('truncate', escenario.destacado ? 'font-semibold text-[#12372c]' : 'text-stone-600')}>
                  {escenario.nombre}
                  <span className="ml-2 text-xs font-medium text-stone-400">{formatPercent(escenario.tasa)} TNA</span>
                </span>
                <span className={cn('shrink-0 tabular-nums', escenario.destacado ? 'font-bold text-[#12372c]' : 'font-semibold text-stone-700')}>
                  {formatCurrency(escenario.final)}
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-stone-100">
                <div
                  className={cn('h-full rounded-full transition-all duration-500', escenario.color)}
                  style={{ width: `${maximo > 0 ? (escenario.final / maximo) * 100 : 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs text-stone-400">
          Valores estimados con fines educativos. Rendimientos pasados no garantizan resultados futuros.
        </p>
      </section>

      {/* Impuestos */}
      {taxInfo && (
        <section className={cn(tarjetaClass, 'flex flex-wrap items-center gap-3 p-5')}>
          <span className="flex items-center gap-2 text-sm font-semibold text-[#12372c]">
            <Receipt className="h-4 w-4 text-[#c99a45]" />
            Impuestos de {nombreInstrumento}
          </span>
          <ChipImpuesto nombre="Ganancias" exento={taxInfo.ganancias === 'exento'} />
          <ChipImpuesto nombre="Bienes Personales" exento={taxInfo.bienesPersonales === 'exento'} />
        </section>
      )}
    </>
  );
}

function ChipImpuesto({ nombre, exento }: { nombre: string; exento: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
        exento ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
      )}
    >
      {nombre}: {exento ? 'exento' : 'gravado'}
    </span>
  );
}

export default function SimuladorPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-12 text-center">
          <p className="text-stone-500">Cargando simulador...</p>
        </div>
      }
    >
      <SimuladorContent />
    </Suspense>
  );
}
