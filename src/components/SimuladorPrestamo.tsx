'use client'

import { useMemo, useState } from 'react'
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { BookOpen, CalendarRange, Coins, DollarSign, Info, Landmark, Wallet } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { formatCurrency, formatPercent, cn } from '@/lib/utils'
import {
  simularPrestamo,
  type MonedaPrestamo,
  type SistemaAmortizacion,
  type TipoTasa,
} from '@/lib/prestamo'
import {
  Atajos,
  Campo,
  Dato,
  Desplegable,
  Grupo,
  Segmentado,
  inputClass,
  tarjetaClass,
  tooltipStyle,
} from '@/components/SimuladorUI'

const ejemplos: Record<
  MonedaPrestamo,
  {
    monto: number
    plazo: number
    tasa: number
    gastos: number
    seguro: number
    iva: number
  }
> = {
  pesos: { monto: 2_000_000, plazo: 24, tasa: 55, gastos: 2, seguro: 8_000, iva: 21 },
  uva: { monto: 40_000_000, plazo: 180, tasa: 6.5, gastos: 1, seguro: 0, iva: 0 },
  dolares: { monto: 8_000, plazo: 24, tasa: 9, gastos: 1, seguro: 0, iva: 0 },
}

const COLORES_DESGLOSE = ['bg-[#12372c]', 'bg-[#2e8a69]', 'bg-[#d4af6a]', 'bg-sky-400', 'bg-rose-400']

function formatoContrato(valor: number, unidad: 'ARS' | 'UVA' | 'USD') {
  if (unidad === 'ARS') return formatCurrency(valor)
  if (unidad === 'USD') {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(valor)
  }
  return `${new Intl.NumberFormat('es-AR', { maximumFractionDigits: 2 }).format(valor)} UVA`
}

function aniosYMeses(meses: number) {
  const anios = Math.floor(meses / 12)
  const resto = meses % 12
  if (anios === 0) return `${meses} meses`
  if (resto === 0) return `${anios} ${anios === 1 ? 'año' : 'años'}`
  return `${anios} ${anios === 1 ? 'año' : 'años'} y ${resto} m`
}

export default function SimuladorPrestamo() {
  const [moneda, setMoneda] = useState<MonedaPrestamo>('pesos')
  const [monto, setMonto] = useState(ejemplos.pesos.monto)
  const [plazo, setPlazo] = useState(ejemplos.pesos.plazo)
  const [tasa, setTasa] = useState(ejemplos.pesos.tasa)
  const [tipoTasa, setTipoTasa] = useState<TipoTasa>('tna')
  const [sistema, setSistema] = useState<SistemaAmortizacion>('frances')
  const [gastos, setGastos] = useState(ejemplos.pesos.gastos)
  const [seguro, setSeguro] = useState(ejemplos.pesos.seguro)
  const [iva, setIva] = useState(ejemplos.pesos.iva)
  const [valorUva, setValorUva] = useState(1500)
  const [inflacion, setInflacion] = useState(2)
  const [tipoCambio, setTipoCambio] = useState(1200)
  const [devaluacion, setDevaluacion] = useState(1.5)
  const [ingreso, setIngreso] = useState(0)

  function elegirMoneda(siguiente: MonedaPrestamo) {
    const ejemplo = ejemplos[siguiente]
    setMoneda(siguiente)
    setMonto(ejemplo.monto)
    setPlazo(ejemplo.plazo)
    setTasa(ejemplo.tasa)
    setGastos(ejemplo.gastos)
    setSeguro(ejemplo.seguro)
    setIva(ejemplo.iva)
    setTipoTasa('tna')
    setSistema('frances')
  }

  const resultado = useMemo(
    () =>
      simularPrestamo({
        moneda,
        monto,
        plazoMeses: plazo,
        tasa: tasa / 100,
        tipoTasa,
        sistema,
        gastosOtorgamiento: gastos / 100,
        seguroMensual: seguro,
        iva: iva / 100,
        inflacionMensual: inflacion / 100,
        devaluacionMensual: devaluacion / 100,
        valorUva,
        tipoCambio,
      }),
    [moneda, monto, plazo, tasa, tipoTasa, sistema, gastos, seguro, iva, inflacion, devaluacion, valorUva, tipoCambio]
  )

  const unidad = moneda === 'uva' ? 'UVA' : moneda === 'dolares' ? 'USD' : 'ARS'
  const cuotaCambia =
    resultado !== null && Math.abs(resultado.cuotaFinalPesos - resultado.cuotaInicialPesos) > 1
  const pesoInicial = resultado && ingreso > 0 ? resultado.cuotaInicialPesos / ingreso : null
  const pesoFinal = resultado && ingreso > 0 ? resultado.cuotaFinalPesos / ingreso : null

  const resumenCostos = [
    `${gastos}% gastos`,
    seguro > 0 ? `seguro ${formatoContrato(seguro, unidad)}` : 'sin seguro',
    iva > 0 ? `IVA ${String(iva).replace('.', ',')}%` : 'sin IVA',
  ].join(' · ')

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <BotonMoneda
          activo={moneda === 'pesos'}
          icono={Wallet}
          titulo="Pesos a tasa fija"
          detalle="La cuota no se mueve. La tasa ya intenta cubrir la inflación."
          onClick={() => elegirMoneda('pesos')}
        />
        <BotonMoneda
          activo={moneda === 'uva'}
          icono={Landmark}
          titulo="UVA"
          detalle="Tasa baja y real. La cuota en pesos sube con la inflación."
          onClick={() => elegirMoneda('uva')}
        />
        <BotonMoneda
          activo={moneda === 'dolares'}
          icono={DollarSign}
          titulo="Dólares"
          detalle="Tasa en dólares. Si el dólar sube y cobrás en pesos, la cuota sube."
          onClick={() => elegirMoneda('dolares')}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[22rem_minmax(0,1fr)] lg:gap-8">
        {/* Datos de la oferta */}
        <aside className={cn(tarjetaClass, 'h-fit space-y-6 p-6 lg:sticky lg:top-28')}>
          <div>
            <h2 className="text-lg font-medium text-[#12372c]">Datos de la oferta</h2>
            <p className="mt-1 text-xs text-stone-500">Los números iniciales son un ejemplo. Reemplazalos por los del contrato.</p>
          </div>

          <Campo
            etiqueta={
              moneda === 'dolares' ? 'Monto en dólares' : moneda === 'uva' ? 'Monto en pesos de hoy' : 'Monto del préstamo'
            }
            ayuda={
              moneda === 'uva'
                ? 'El banco lo convierte a UVA con el valor del día. La cuota se calcula sobre esas UVA.'
                : 'Es el capital sobre el que se calcula la cuota, no siempre lo que te acreditan.'
            }
          >
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-stone-400">
                {moneda === 'dolares' ? 'US$' : '$'}
              </span>
              <input
                type="number"
                min="1"
                value={monto || ''}
                onChange={(e) => setMonto(Number(e.target.value))}
                className={cn(inputClass, 'text-lg', moneda === 'dolares' ? 'pl-12' : 'pl-8')}
              />
            </div>
          </Campo>

          {moneda === 'uva' && (
            <Campo
              etiqueta="Valor UVA de hoy"
              ayuda="Está publicado por el BCRA. Si este número está viejo, la cuota en pesos también."
            >
              <input
                type="number"
                min="1"
                step="0.01"
                value={valorUva}
                onChange={(e) => setValorUva(Number(e.target.value))}
                className={inputClass}
              />
            </Campo>
          )}

          {moneda === 'dolares' && (
            <Campo
              etiqueta="Tipo de cambio de hoy"
              ayuda="Usá el dólar con el que el banco calcula la cuota: oficial, MEP o el que diga el contrato."
            >
              <input
                type="number"
                min="1"
                step="1"
                value={tipoCambio}
                onChange={(e) => setTipoCambio(Number(e.target.value))}
                className={inputClass}
              />
            </Campo>
          )}

          <Campo
            etiqueta="Plazo"
            valor={aniosYMeses(plazo)}
            ayuda="Más meses bajan la cuota y suben el interés total que pagás en todo el plazo."
          >
            <input
              type="range"
              min="1"
              max="360"
              value={plazo}
              onChange={(e) => setPlazo(Number(e.target.value))}
              className="w-full accent-[#12372c]"
            />
            <Atajos
              valor={plazo}
              onChange={setPlazo}
              opciones={[
                { valor: 12, etiqueta: '1 año' },
                { valor: 24, etiqueta: '2 años' },
                { valor: 60, etiqueta: '5 años' },
                { valor: 120, etiqueta: '10 años' },
                { valor: 240, etiqueta: '20 años' },
              ]}
            />
          </Campo>

          <Campo etiqueta="Tasa anual" ayuda={textoTasa(moneda, tipoTasa)}>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={tasa}
                  onChange={(e) => setTasa(Number(e.target.value))}
                  className={cn(inputClass, 'pr-8')}
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-stone-400">%</span>
              </div>
              <Segmentado
                className="w-32 shrink-0"
                valor={tipoTasa}
                onChange={setTipoTasa}
                opciones={[
                  { valor: 'tna', etiqueta: 'TNA' },
                  { valor: 'tea', etiqueta: 'TEA' },
                ]}
              />
            </div>
          </Campo>

          <Campo
            etiqueta="Sistema de amortización"
            ayuda={
              sistema === 'frances'
                ? 'El más común. La cuota pura (interés + capital) es pareja. Al principio casi todo es interés.'
                : 'Cada mes devolvés la misma cantidad de capital. La cuota baja porque el interés se calcula sobre un saldo menor.'
            }
          >
            <Segmentado
              valor={sistema}
              onChange={setSistema}
              opciones={[
                { valor: 'frances', etiqueta: 'Francés' },
                { valor: 'aleman', etiqueta: 'Alemán' },
              ]}
            />
          </Campo>

          <div className="space-y-3">
            <Grupo titulo="Costos extra" resumen={resumenCostos}>
              <Campo
                etiqueta="Gastos de otorgamiento (%)"
                ayuda="Se descuentan al acreditar. Pedís un monto y recibís menos, pero la cuota se calcula sobre el monto completo."
              >
                <input
                  type="number"
                  min="0"
                  max="40"
                  step="0.1"
                  value={gastos}
                  onChange={(e) => setGastos(Number(e.target.value))}
                  className={inputClass}
                />
              </Campo>
              <Campo
                etiqueta={`Seguro y cargos por mes (${unidad})`}
                ayuda="Seguro de vida, seguro del bien o comisión de mantenimiento, si no están dentro de la cuota del aviso."
              >
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={seguro}
                  onChange={(e) => setSeguro(Number(e.target.value))}
                  className={inputClass}
                />
              </Campo>
              <Campo
                etiqueta="IVA sobre intereses"
                ayuda="Una hipoteca de vivienda única suele estar exenta. Un préstamo personal en general no. Mirá el contrato."
              >
                <Segmentado
                  valor={iva}
                  onChange={setIva}
                  opciones={[
                    { valor: 0, etiqueta: 'Sin IVA' },
                    { valor: 10.5, etiqueta: '10,5%' },
                    { valor: 21, etiqueta: '21%' },
                  ]}
                />
              </Campo>
            </Grupo>

            {moneda !== 'pesos' && (
              <Grupo
                titulo="Escenario"
                resumen={
                  moneda === 'uva'
                    ? `Inflación ${inflacion}% por mes`
                    : `Devaluación ${devaluacion}% por mes`
                }
              >
                {moneda === 'uva' ? (
                  <Campo
                    etiqueta="Inflación mensual (%)"
                    ayuda={`Supuesto para ver cómo se mueve la cuota. ${inflacion}% por mes es ${formatPercent((1 + inflacion / 100) ** 12 - 1)} por año. No es una predicción.`}
                  >
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={inflacion}
                      onChange={(e) => setInflacion(Number(e.target.value))}
                      className={inputClass}
                    />
                  </Campo>
                ) : (
                  <Campo
                    etiqueta="Devaluación mensual (%)"
                    ayuda={`Supuesto para ver la cuota en pesos. ${devaluacion}% por mes es ${formatPercent((1 + devaluacion / 100) ** 12 - 1)} por año. No es una predicción.`}
                  >
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={devaluacion}
                      onChange={(e) => setDevaluacion(Number(e.target.value))}
                      className={inputClass}
                    />
                  </Campo>
                )}
              </Grupo>
            )}

            <Grupo titulo="Tu ingreso (opcional)" resumen={ingreso > 0 ? formatCurrency(ingreso) : 'Para ver cuánto pesa la cuota'}>
              <Campo
                etiqueta="Ingreso mensual en pesos"
                ayuda="Sirve para ver qué parte del ingreso se lleva la cuota. No cambia el cálculo del préstamo."
              >
                <input
                  type="number"
                  min="0"
                  value={ingreso || ''}
                  placeholder="Por ejemplo, 1500000"
                  onChange={(e) => setIngreso(Number(e.target.value))}
                  className={inputClass}
                />
              </Campo>
            </Grupo>
          </div>
        </aside>

        {/* Resultados */}
        <div className="min-w-0 space-y-6">
          {resultado ? (
            <>
              <section className="relative overflow-hidden rounded-[1.8rem] bg-gradient-to-br from-[#12372c] via-[#17503f] to-[#1f6b52] p-6 text-[#f4f1ea] shadow-[0_30px_60px_-36px_rgba(18,55,44,0.8)] sm:p-8">
                <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-[#d4af6a]/20 blur-3xl" />
                <div className="grain-overlay" />
                <div className="relative grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-end">
                  <div>
                    <p className="text-sm text-emerald-50/75">{cuotaCambia ? 'Cuota del primer mes' : 'Cuota mensual'}</p>
                    <p className="mt-1 font-heading text-5xl tabular-nums sm:text-6xl">
                      {formatCurrency(resultado.cuotaInicialPesos)}
                    </p>
                    <p className="mt-3 text-sm text-emerald-50/65">
                      {unidad === 'ARS'
                        ? 'Interés + capital + IVA + seguro'
                        : `${formatoContrato(resultado.cuotaInicial, unidad)} de este mes`}
                    </p>
                    {cuotaCambia && (
                      <span className="mt-4 inline-flex items-center rounded-full bg-[#d4af6a]/20 px-3 py-1 text-sm font-semibold text-[#f0d08a] ring-1 ring-[#d4af6a]/40">
                        Última cuota: {formatCurrency(resultado.cuotaFinalPesos)}
                      </span>
                    )}
                  </div>
                  <dl className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/10">
                      <dt className="text-xs text-emerald-50/65">Total a pagar</dt>
                      <dd className="mt-1 font-heading text-xl tabular-nums">{formatCurrency(resultado.totalPagadoPesos)}</dd>
                      <dd className="mt-0.5 text-xs text-emerald-50/50">{resultado.filas.length} cuotas</dd>
                    </div>
                    <div className="rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/10">
                      <dt className="text-xs text-emerald-50/65">CFTEA estimada</dt>
                      <dd className="mt-1 font-heading text-xl tabular-nums text-[#f0d08a]">{formatPercent(resultado.cftea)}</dd>
                      <dd className="mt-0.5 text-xs text-emerald-50/50">TEA {formatPercent(resultado.tea)}</dd>
                    </div>
                  </dl>
                </div>
              </section>

              <div className="grid gap-4 sm:grid-cols-3">
                <Dato
                  titulo="Te acreditan"
                  valor={formatCurrency(resultado.recibidoPesos)}
                  detalle="Después de los gastos de otorgamiento"
                />
                <Dato
                  titulo="Interés de la tasa"
                  valor={formatPercent(resultado.porcentajeInteres)}
                  detalle={`${formatoContrato(resultado.interesesContrato, resultado.unidad)} sobre el capital`}
                  tono="dorado"
                />
                <Dato
                  titulo="Costo total"
                  valor={formatPercent(resultado.porcentajeCosto)}
                  detalle={`${formatCurrency(resultado.costoTotalPesos)} de más sobre lo que recibís`}
                  tono="negativo"
                />
              </div>

              {pesoInicial !== null && pesoFinal !== null && (
                <section className="rounded-[1.6rem] border border-[#d4af6a]/40 bg-[#d4af6a]/10 p-5 text-sm text-[#5c4413]">
                  <div className="flex flex-wrap items-center gap-4">
                    <MedidorIngreso porcentaje={pesoInicial} etiqueta="Primera cuota" />
                    {cuotaCambia && <MedidorIngreso porcentaje={pesoFinal} etiqueta="Última cuota" />}
                  </div>
                  <p className="mt-3 leading-relaxed">
                    {moneda === 'uva'
                      ? 'Si tu sueldo sube al mismo ritmo que la UVA, el peso de la cuota se parece al del primer mes. El riesgo aparece cuando el ingreso se queda atrás de la inflación.'
                      : moneda === 'dolares'
                        ? `Si cobrás en dólares, la cuota estable es la de dólares (${formatoContrato(resultado.cuotaInicial, 'USD')}), no la de pesos. Si cobrás en pesos, el riesgo es que el dólar le gane a tu ingreso.`
                        : `Sobre un ingreso de ${formatCurrency(ingreso)} por mes.`}
                  </p>
                </section>
              )}

              {/* Desglose */}
              <section className={cn(tarjetaClass, 'p-5 sm:p-6')}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-medium text-[#12372c]">Qué pagás de más</h3>
                  <p className="font-heading text-2xl tabular-nums text-[#12372c]">{formatCurrency(resultado.costoTotalPesos)}</p>
                </div>
                <Desglose
                  filas={[
                    ['Interés de la tasa', resultado.interesesPesos],
                    [
                      moneda === 'uva'
                        ? 'Ajuste por la UVA'
                        : moneda === 'dolares'
                          ? 'Ajuste por el dólar'
                          : 'Ajuste de capital',
                      resultado.ajustePesos,
                    ],
                    ['IVA sobre intereses', resultado.ivaPesos],
                    ['Seguros y cargos', resultado.seguroPesos],
                    ['Gastos de otorgamiento', resultado.gastosPesos],
                  ]}
                  total={resultado.costoTotalPesos}
                  recibido={resultado.recibidoPesos}
                />
                <p className="mt-5 flex items-start gap-2 rounded-xl bg-[#12372c]/[0.04] px-4 py-3 text-xs leading-relaxed text-stone-600">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-stone-400" />
                  {textoCosto(moneda, resultado.tea)}
                </p>
              </section>

              {/* Gráfico */}
              <section className={cn(tarjetaClass, 'p-5 sm:p-6')}>
                <h3 className="text-lg font-medium text-[#12372c]">Cómo se mueve la cuota en pesos</h3>
                <p className="mb-4 mt-1 text-sm text-stone-500">
                  {moneda === 'pesos'
                    ? 'A tasa fija la cuota casi no cambia. Una baja chica, si la hay, es el IVA sobre un interés que se achica.'
                    : moneda === 'uva'
                      ? 'La cuota en UVA se multiplica por el valor UVA de cada mes, con la inflación que cargaste.'
                      : 'La cuota en dólares se multiplica por el tipo de cambio de cada mes, con la devaluación que cargaste.'}
                </p>
                <div className="h-[260px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={resultado.filas} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
                      <XAxis
                        dataKey="mes"
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
                        tickFormatter={(value) =>
                          Number(value) >= 1_000_000
                            ? `$${(Number(value) / 1_000_000).toFixed(1)}M`
                            : `$${(Number(value) / 1000).toFixed(0)}k`
                        }
                      />
                      <Tooltip
                        formatter={(value) => [formatCurrency(Number(value)), 'Cuota']}
                        labelFormatter={(label) => `Mes ${label}`}
                        contentStyle={tooltipStyle}
                        itemStyle={{ color: '#f4f1ea' }}
                        labelStyle={{ color: '#d4af6a', fontWeight: 600 }}
                      />
                      <Line type="monotone" dataKey="cuotaPesos" stroke="#12372c" strokeWidth={3} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </section>

              <Desplegable
                titulo="Cuotas mes a mes"
                subtitulo={`Primera cuota: interés ${formatoContrato(resultado.filas[0].interes, resultado.unidad)} y capital ${formatoContrato(resultado.filas[0].amortizacion, resultado.unidad)}`}
                icono={<CalendarRange className="h-5 w-5" />}
              >
                <div className="max-h-96 overflow-auto rounded-xl ring-1 ring-stone-200">
                  <table className="w-full text-left text-sm">
                    <thead className="sticky top-0 bg-[#12372c] text-[#f4f1ea]">
                      <tr>
                        <th className="px-3 py-2 font-medium">Mes</th>
                        <th className="px-3 py-2 font-medium">Cuota en pesos</th>
                        {unidad !== 'ARS' && <th className="px-3 py-2 font-medium">Cuota {unidad}</th>}
                        <th className="px-3 py-2 font-medium">Interés</th>
                        <th className="px-3 py-2 font-medium">Capital</th>
                        <th className="px-3 py-2 font-medium">Saldo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 tabular-nums">
                      {resultado.filas.map((fila) => (
                        <tr key={fila.mes} className="odd:bg-white even:bg-[#faf9f5]">
                          <td className="px-3 py-2 text-stone-500">{fila.mes}</td>
                          <td className="px-3 py-2 font-semibold text-[#12372c]">{formatCurrency(fila.cuotaPesos)}</td>
                          {unidad !== 'ARS' && (
                            <td className="px-3 py-2 text-stone-700">{formatoContrato(fila.cuota, unidad)}</td>
                          )}
                          <td className="px-3 py-2 text-stone-600">{formatoContrato(fila.interes, unidad)}</td>
                          <td className="px-3 py-2 text-stone-600">{formatoContrato(fila.amortizacion, unidad)}</td>
                          <td className="px-3 py-2 text-stone-600">{formatoContrato(fila.saldo, unidad)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Desplegable>
            </>
          ) : (
            <div className={cn(tarjetaClass, 'p-6 text-stone-600')}>
              Completá un monto, un plazo y, si corresponde, el valor UVA o el tipo de cambio. Los gastos de otorgamiento
              tienen que ser menores al 100%.
            </div>
          )}

          <Desplegable
            titulo="Qué leer antes de pedirlo"
            subtitulo="La cuota del aviso casi nunca es el costo del préstamo."
            icono={<BookOpen className="h-5 w-5" />}
          >
            <Guia moneda={moneda} />
          </Desplegable>
        </div>
      </div>
    </div>
  )
}

function textoTasa(moneda: MonedaPrestamo, tipo: TipoTasa) {
  const base =
    tipo === 'tna'
      ? 'La cuota del mes usa TNA ÷ 12. La TEA, más alta, es la misma tasa con capitalización mensual.'
      : 'La TEA ya incluye la capitalización. La tasa del mes sale de esa TEA, no de dividirla por 12.'
  if (moneda === 'uva') {
    return `${base} En un UVA esta tasa es real: se aplica al saldo en UVA. La inflación no está adentro.`
  }
  if (moneda === 'dolares') {
    return `${base} En un préstamo en dólares esta tasa es en dólares. La suba del dólar no está adentro.`
  }
  return `${base} En pesos, la tasa del aviso ya intenta incluir la inflación esperada. Por eso se ve mucho más alta que una tasa UVA o en dólares.`
}

function textoCosto(moneda: MonedaPrestamo, tea: number) {
  if (moneda === 'uva') {
    return `La tasa del contrato (TEA ${formatPercent(tea)}) no es el costo en pesos. Esa tasa se paga en UVA. Encima, el capital en pesos crece con la UVA, que sigue a la inflación (CER). El costo en pesos de este escenario es tasa real + inflación + IVA, seguros y gastos.`
  }
  if (moneda === 'dolares') {
    return `La tasa del contrato (TEA ${formatPercent(tea)}) no es el costo en pesos. Esa tasa se paga en dólares. Encima, cada cuota en pesos depende del tipo de cambio. El costo en pesos de este escenario es tasa en dólares + devaluación + IVA, seguros y gastos.`
  }
  return `La TEA (${formatPercent(tea)}) es solo el interés, anualizado. El costo total y la CFTEA suben cuando hay IVA, seguro o gastos de otorgamiento. Para comparar dos ofertas, usá el CFT o la CFTEA del banco, no la TNA del aviso.`
}

function BotonMoneda({
  activo,
  icono: Icono,
  titulo,
  detalle,
  onClick,
}: {
  activo: boolean
  icono: LucideIcon
  titulo: string
  detalle: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activo}
      className={cn(
        'flex items-start gap-3 rounded-[1.4rem] p-4 text-left transition',
        activo
          ? 'bg-[#12372c] text-[#f4f1ea] shadow-[0_18px_40px_-24px_rgba(18,55,44,0.9)]'
          : 'bg-white/85 ring-1 ring-stone-200/70 hover:-translate-y-0.5 hover:ring-[#d4af6a]'
      )}
    >
      <span
        className={cn(
          'grid h-10 w-10 shrink-0 place-items-center rounded-xl',
          activo ? 'bg-[#d4af6a] text-[#12372c]' : 'bg-[#12372c]/[0.07] text-[#12372c]'
        )}
      >
        <Icono className="h-5 w-5" />
      </span>
      <span>
        <span className={cn('block font-semibold', activo ? 'text-[#f4f1ea]' : 'text-[#12372c]')}>{titulo}</span>
        <span className={cn('mt-0.5 block text-xs leading-relaxed', activo ? 'text-emerald-50/75' : 'text-stone-500')}>
          {detalle}
        </span>
      </span>
    </button>
  )
}

function MedidorIngreso({ porcentaje, etiqueta }: { porcentaje: number; etiqueta: string }) {
  const tono = porcentaje > 0.4 ? 'bg-rose-500' : porcentaje > 0.3 ? 'bg-amber-500' : 'bg-emerald-600'
  return (
    <div className="min-w-[12rem] flex-1">
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="font-semibold">{etiqueta}</span>
        <span className="font-heading text-xl tabular-nums">{formatPercent(porcentaje)}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/70">
        <div className={cn('h-full rounded-full', tono)} style={{ width: `${Math.min(100, porcentaje * 100)}%` }} />
      </div>
      <span className="mt-1 block text-xs opacity-75">del ingreso</span>
    </div>
  )
}

function Desglose({
  filas,
  total,
  recibido,
}: {
  filas: [string, number][]
  total: number
  recibido: number
}) {
  const visibles = filas.map((fila, i) => ({ nombre: fila[0], valor: fila[1], color: COLORES_DESGLOSE[i] }))

  return (
    <div className="mt-4">
      <div className="flex h-3 overflow-hidden rounded-full bg-stone-100">
        {visibles
          .filter((fila) => fila.valor > 0)
          .map((fila) => (
            <div
              key={fila.nombre}
              className={cn('h-full', fila.color)}
              style={{ width: `${total > 0 ? (fila.valor / total) * 100 : 0}%` }}
              title={fila.nombre}
            />
          ))}
      </div>
      <ul className="mt-4 divide-y divide-stone-100">
        {visibles.map((fila) => (
          <li
            key={fila.nombre}
            className={cn('flex items-center justify-between gap-3 py-2.5 text-sm', fila.valor <= 0 && 'opacity-45')}
          >
            <span className="flex items-center gap-2.5 text-stone-700">
              <span className={cn('h-2.5 w-2.5 rounded-full', fila.color)} />
              {fila.nombre}
            </span>
            <span className="flex items-baseline gap-3 tabular-nums">
              <span className="font-semibold text-[#12372c]">{formatCurrency(fila.valor)}</span>
              <span className="w-14 text-right text-xs text-stone-400">
                {recibido > 0 ? formatPercent(fila.valor / recibido) : '—'}
              </span>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-right text-xs text-stone-400">% sobre lo que recibís</p>
    </div>
  )
}

function Guia({ moneda }: { moneda: MonedaPrestamo }) {
  const consejos: [string, string][] = [
    [
      'CFT o CFTEA, no la TNA del aviso.',
      'El costo financiero total junta la tasa, los seguros, las comisiones y los impuestos. Dos préstamos con la misma TNA pueden tener un CFT muy distinto. Compará ofertas por el CFT.',
    ],
    [
      'Si la tasa es TNA o TEA.',
      'La TNA es nominal: el banco suele dividirla por 12 para la cuota del mes. La TEA es esa misma tasa con capitalización, y siempre da más alta. Una TNA de 60% es una TEA de casi 80%.',
    ],
    [
      'Cuota total, no cuota pura.',
      'Preguntá si el número incluye seguro de vida, seguro del bien, comisiones e IVA. La cuota pura es solo interés más capital.',
    ],
    [
      'Cuánto te acreditan.',
      'Los gastos de otorgamiento, el sellado y la tasación se descuentan. Podés deber $1.000.000 y recibir $970.000. La cuota igual se calcula sobre $1.000.000.',
    ],
    [
      'Plazo y sistema.',
      'Alargar el plazo baja la cuota y aumenta el interés de toda la vida del préstamo. En el sistema francés, durante mucho tiempo casi no baja el capital. En el alemán la cuota empieza más alta y va bajando.',
    ],
    [
      'Moneda.',
      'La tasa solo se entiende junto con la moneda. Una tasa de un dígito en UVA o en dólares no es “más barata” que una tasa alta en pesos: la inflación o el dólar se cobran aparte.',
    ],
    [
      'Mora y cancelación anticipada.',
      'Los punitorios y la comisión por precancelar no entran en esta simulación. Están en el contrato y cambian el costo si pagás tarde o querés salir antes.',
    ],
  ]

  return (
    <div className="space-y-6">
      <ol className="space-y-4">
        {consejos.map(([titulo, texto], i) => (
          <li key={titulo} className="flex items-start gap-4 text-sm text-stone-700">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#d4af6a]/70 font-heading text-sm text-[#8a6420]">
              {i + 1}
            </span>
            <p className="leading-relaxed">
              <strong className="font-semibold text-[#12372c]">{titulo}</strong> {texto}
            </p>
          </li>
        ))}
      </ol>

      <div className="grid gap-4 md:grid-cols-2">
        <div
          className={cn(
            'rounded-2xl p-5 ring-1',
            moneda === 'uva' ? 'bg-emerald-50 ring-emerald-300' : 'bg-stone-50 ring-stone-200'
          )}
        >
          <h4 className="flex items-center gap-2 font-semibold text-[#12372c]">
            <Landmark className="h-4 w-4 text-[#c99a45]" />
            Préstamo UVA
          </h4>
          <div className="mt-2 space-y-2 text-sm leading-relaxed text-stone-700">
            <p>
              La UVA (Unidad de Valor Adquisitivo) sigue al CER, o sea a la inflación. El capital queda expresado en UVA. Si hoy la UVA vale $1.500 y pedís $15.000.000, debés 10.000 UVA, no una cantidad fija de pesos.
            </p>
            <p>
              La tasa del contrato es una <strong>tasa real</strong>: se calcula sobre esas UVA. Por eso se ve baja, a veces de un solo dígito. La cuota en UVA, en el sistema francés, es estable. La cuota en pesos es esa cuota multiplicada por el valor UVA del mes. Si la inflación del mes fue 3%, la cuota en pesos sube cerca de 3%.
            </p>
            <p>
              El costo en pesos no es esa tasa chica. Es la tasa real más la inflación que acumule la UVA, más seguros e impuestos. Conviene cuando tu ingreso también se ajusta (un sueldo que acompaña a la inflación). Si el ingreso queda fijo en pesos, la cuota se come una parte cada vez más grande.
            </p>
            <p>
              Antes de firmar: valor UVA del día, TNA y TEA en UVA, si hay tope de cuota, cada cuánto se actualiza y qué pasa si la cuota supera ese tope.
            </p>
          </div>
        </div>

        <div
          className={cn(
            'rounded-2xl p-5 ring-1',
            moneda === 'dolares' ? 'bg-emerald-50 ring-emerald-300' : 'bg-stone-50 ring-stone-200'
          )}
        >
          <h4 className="flex items-center gap-2 font-semibold text-[#12372c]">
            <Coins className="h-4 w-4 text-[#c99a45]" />
            Préstamo en dólares
          </h4>
          <div className="mt-2 space-y-2 text-sm leading-relaxed text-stone-700">
            <p>
              Capital y cuota están en dólares. La tasa también: es una tasa en dólares, y por eso también se ve baja. El banco no está absorbiendo la inflación en pesos. El riesgo de que el dólar suba lo tomás vos, salvo que cobres en dólares.
            </p>
            <p>
              La cuota en dólares no cambia por el tipo de cambio. La cuota en pesos de cada mes es la cuota en dólares por el dólar que el contrato diga (oficial, MEP o el del banco). Una TNA del 8% en dólares, con un dólar que sube todos los meses, no es un préstamo al 8% en pesos.
            </p>
            <p>
              El costo en pesos es la tasa en dólares más la devaluación del escenario, más seguros e impuestos. Si tus ingresos son en pesos, estás apostando a que el dólar no le gane a tu sueldo. Si tus ingresos son en dólares, la cuota previsible es la de dólares.
            </p>
            <p>
              Antes de firmar: qué dólar usa la cuota, qué pasa si hay un salto de tipo de cambio, y si podés precancelar sin una comisión que se coma el ahorro.
            </p>
          </div>
        </div>
      </div>

      <p className="flex items-start gap-2 text-xs leading-relaxed text-stone-500">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        Es una herramienta educativa. La cuota de un banco puede diferir por redondeos, seguros sobre el saldo, días de interés del primer mes o un índice distinto. No es una oferta ni un asesoramiento para endeudarte.
      </p>
    </div>
  )
}
