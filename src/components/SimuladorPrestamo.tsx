'use client'

import { useMemo, useState, type ReactNode } from 'react'
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Banknote, BookOpen, Info } from 'lucide-react'
import { formatCurrency, formatPercent, cn } from '@/lib/utils'
import {
  simularPrestamo,
  type MonedaPrestamo,
  type SistemaAmortizacion,
  type TipoTasa,
} from '@/lib/prestamo'

const inputClass =
  'w-full px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none'

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
  if (resto === 0) return `${meses} meses (${anios} ${anios === 1 ? 'año' : 'años'})`
  return `${meses} meses (${anios} ${anios === 1 ? 'año' : 'años'} y ${resto} meses)`
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 flex items-center justify-center">
          <Banknote className="w-8 h-8 mr-3 text-emerald-600" />
          Simulador de préstamo
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Armá la cuota con los datos de la oferta y mirá cuánto es interés, cuánto es ajuste de la moneda y cuánto termina saliendo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
        <BotonMoneda
          activo={moneda === 'pesos'}
          titulo="Pesos a tasa fija"
          detalle="La cuota en pesos no se mueve. La tasa es alta porque ya intenta cubrir la inflación."
          onClick={() => elegirMoneda('pesos')}
        />
        <BotonMoneda
          activo={moneda === 'uva'}
          titulo="UVA"
          detalle="La tasa es baja y real. La cuota en pesos sube cuando sube la inflación."
          onClick={() => elegirMoneda('uva')}
        />
        <BotonMoneda
          activo={moneda === 'dolares'}
          titulo="Dólares"
          detalle="La tasa es en dólares. Si el dólar sube y cobrás en pesos, la cuota en pesos sube."
          onClick={() => elegirMoneda('dolares')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 shadow-sm border border-slate-200 h-fit lg:sticky lg:top-24">
          <h2 className="text-xl font-bold text-slate-900 mb-1">Datos de la oferta</h2>
          <p className="text-sm text-slate-500 mb-6">
            Los números iniciales son un ejemplo. Reemplazalos por los del contrato.
          </p>

          <div className="space-y-5">
            <Campo
              etiqueta={
                moneda === 'dolares'
                  ? 'Monto en dólares'
                  : moneda === 'uva'
                    ? 'Monto en pesos de hoy'
                    : 'Monto del préstamo (ARS)'
              }
              ayuda={
                moneda === 'uva'
                  ? 'El banco lo convierte a UVA con el valor del día. La cuota se calcula sobre esas UVA.'
                  : 'Es el capital sobre el que se calcula la cuota, no siempre lo que te acreditan.'
              }
            >
              <input
                type="number"
                min="1"
                value={monto}
                onChange={(e) => setMonto(Number(e.target.value))}
                className={inputClass}
              />
            </Campo>

            {moneda === 'uva' && (
              <Campo
                etiqueta="Valor UVA de hoy (pesos)"
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
                etiqueta="Tipo de cambio de hoy (pesos por dólar)"
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

            <div>
              <div className="flex justify-between mb-2">
                <label className="block text-sm font-medium text-slate-700">Plazo</label>
                <span className="text-sm font-bold text-emerald-600">{aniosYMeses(plazo)}</span>
              </div>
              <input
                type="range"
                min="1"
                max="360"
                value={plazo}
                onChange={(e) => setPlazo(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <p className="text-xs text-slate-500 mt-1">
                Más meses bajan la cuota y suben el interés total que pagás en todo el plazo.
              </p>
            </div>

            <Campo
              etiqueta={tipoTasa === 'tna' ? 'Tasa nominal anual (TNA)' : 'Tasa efectiva anual (TEA)'}
              ayuda={textoTasa(moneda, tipoTasa)}
            >
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={tasa}
                  onChange={(e) => setTasa(Number(e.target.value))}
                  className={inputClass}
                />
                <select
                  value={tipoTasa}
                  onChange={(e) => setTipoTasa(e.target.value as TipoTasa)}
                  className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-900"
                >
                  <option value="tna">TNA</option>
                  <option value="tea">TEA</option>
                </select>
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
              <select
                value={sistema}
                onChange={(e) => setSistema(e.target.value as SistemaAmortizacion)}
                className={inputClass}
              >
                <option value="frances">Francés (cuota pura fija)</option>
                <option value="aleman">Alemán (capital fijo)</option>
              </select>
            </Campo>

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
              etiqueta={`Seguro y otros cargos por mes (${unidad})`}
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
              <select
                value={iva}
                onChange={(e) => setIva(Number(e.target.value))}
                className={inputClass}
              >
                <option value={0}>Sin IVA</option>
                <option value={10.5}>10,5%</option>
                <option value={21}>21%</option>
              </select>
            </Campo>

            {moneda === 'uva' && (
              <Campo
                etiqueta="Inflación mensual del escenario (%)"
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
            )}

            {moneda === 'dolares' && (
              <Campo
                etiqueta="Devaluación mensual del escenario (%)"
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

            <Campo
              etiqueta="Tu ingreso mensual en pesos (opcional)"
              ayuda="Sirve para ver qué parte del ingreso se lleva la cuota. No cambia el cálculo del préstamo."
            >
              <input
                type="number"
                min="0"
                value={ingreso || ''}
                placeholder="Por ejemplo, 1.500.000"
                onChange={(e) => setIngreso(Number(e.target.value))}
                className={inputClass}
              />
            </Campo>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          {resultado ? (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <Tarjeta
                  titulo={cuotaCambia ? 'Cuota del primer mes' : 'Cuota'}
                  valor={formatCurrency(resultado.cuotaInicialPesos)}
                  detalle={
                    unidad === 'ARS'
                      ? 'Interés + capital + IVA + seguro'
                      : `${formatoContrato(resultado.cuotaInicial, unidad)} de este mes`
                  }
                />
                <Tarjeta
                  titulo={cuotaCambia ? 'Cuota del último mes' : 'Cuota en el último mes'}
                  valor={formatCurrency(resultado.cuotaFinalPesos)}
                  detalle={
                    moneda !== 'pesos'
                      ? 'Con la inflación o el dólar de este escenario'
                      : cuotaCambia
                        ? 'Baja porque el IVA se calcula sobre el interés, y el interés es menor al final'
                        : 'En pesos queda en el mismo nivel'
                  }
                  destacada={cuotaCambia}
                />
                <Tarjeta
                  titulo="Interés total de la tasa"
                  valor={formatPercent(resultado.porcentajeInteres)}
                  detalle={`${formatoContrato(resultado.interesesContrato, resultado.unidad)} de intereses sobre el capital, en todo el plazo`}
                />
                <Tarjeta
                  titulo="Costo total de este escenario"
                  valor={formatPercent(resultado.porcentajeCosto)}
                  detalle={`${formatCurrency(resultado.costoTotalPesos)} de más sobre los ${formatCurrency(resultado.recibidoPesos)} que recibís`}
                  destacada
                />
                <Tarjeta
                  titulo="CFTEA estimada"
                  valor={formatPercent(resultado.cftea)}
                  detalle={`TNA ${formatPercent(resultado.tna)} · TEA ${formatPercent(resultado.tea)}. El CFTEA incluye gastos, seguro, IVA y, si corresponde, el ajuste.`}
                />
                <Tarjeta
                  titulo="Total a pagar"
                  valor={formatCurrency(resultado.totalPagadoPesos)}
                  detalle={`${resultado.filas.length} cuotas, en pesos de cada mes`}
                />
              </div>

              {pesoInicial !== null && pesoFinal !== null && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-950">
                  <p>
                    La cuota inicial se lleva <strong>{formatPercent(pesoInicial)}</strong> de un ingreso de {formatCurrency(ingreso)}.
                    {cuotaCambia && (
                      <>
                        {' '}
                        Si ese ingreso no se mueve y se cumple el escenario, la última cuota se lleva{' '}
                        <strong>{formatPercent(pesoFinal)}</strong>.
                      </>
                    )}
                  </p>
                  {moneda === 'uva' && (
                    <p className="mt-2">
                      Si tu sueldo sube al mismo ritmo que la UVA, el peso de la cuota se parece al del primer mes. El riesgo aparece cuando el ingreso se queda atrás de la inflación.
                    </p>
                  )}
                  {moneda === 'dolares' && (
                    <p className="mt-2">
                      Si cobrás en dólares, la cuota estable es la de dólares ({formatoContrato(resultado.cuotaInicial, 'USD')}), no la de pesos. Si cobrás en pesos, el riesgo es que el dólar le gane a tu ingreso.
                    </p>
                  )}
                </div>
              )}

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4">De qué está hecho lo que pagás de más</h3>
                <Desglose
                  filas={[
                    ['Interés de la tasa', resultado.interesesPesos],
                    [moneda === 'uva' ? 'Ajuste del capital por la UVA' : moneda === 'dolares' ? 'Ajuste del capital por el dólar' : 'Ajuste de capital', resultado.ajustePesos],
                    ['IVA sobre intereses', resultado.ivaPesos],
                    ['Seguros y cargos', resultado.seguroPesos],
                    ['Gastos de otorgamiento', resultado.gastosPesos],
                  ]}
                  total={resultado.costoTotalPesos}
                  recibido={resultado.recibidoPesos}
                />
                <p className="text-sm text-slate-600 mt-4">
                  {textoCosto(moneda, resultado.tea)}
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Cómo se mueve la cuota en pesos</h3>
                <p className="text-sm text-slate-500 mb-4">
                  {moneda === 'pesos'
                    ? 'En un préstamo en pesos a tasa fija la cuota casi no cambia. Una baja chica, si la hay, es el IVA: se calcula solo sobre el interés, y el interés baja a medida que devolvés capital.'
                    : moneda === 'uva'
                      ? 'La cuota en UVA es la del sistema francés o alemán. En pesos se multiplica por el valor UVA de cada mes. La curva usa la inflación que cargaste.'
                      : 'La cuota en dólares es la del sistema francés o alemán. En pesos se multiplica por el tipo de cambio de cada mes. La curva usa la devaluación que cargaste.'}
                </p>
                <div className="h-[280px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={resultado.filas} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis
                        dataKey="mes"
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
                        tickFormatter={(value) => `$${(Number(value) / 1000).toFixed(0)}k`}
                      />
                      <Tooltip
                        formatter={(value) => [formatCurrency(Number(value)), 'Cuota']}
                        labelFormatter={(label) => `Mes ${label}`}
                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
                      />
                      <Line type="monotone" dataKey="cuotaPesos" stroke="#059669" strokeWidth={3} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Cuotas</h3>
                <p className="text-sm text-slate-500 mb-4">
                  Primera cuota desarmada: interés {formatoContrato(resultado.filas[0].interes, resultado.unidad)}, capital {formatoContrato(resultado.filas[0].amortizacion, resultado.unidad)}
                  {resultado.filas[0].iva > 0 ? `, IVA ${formatoContrato(resultado.filas[0].iva, resultado.unidad)}` : ''}
                  {resultado.filas[0].seguro > 0 ? `, seguro ${formatoContrato(resultado.filas[0].seguro, resultado.unidad)}` : ''}.
                </p>
                <div className="overflow-auto max-h-96">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 sticky top-0">
                      <tr>
                        <th className="px-3 py-2 font-semibold text-slate-700">Mes</th>
                        <th className="px-3 py-2 font-semibold text-slate-700">Cuota en pesos</th>
                        {unidad !== 'ARS' && <th className="px-3 py-2 font-semibold text-slate-700">Cuota {unidad}</th>}
                        <th className="px-3 py-2 font-semibold text-slate-700">Interés</th>
                        <th className="px-3 py-2 font-semibold text-slate-700">Capital</th>
                        <th className="px-3 py-2 font-semibold text-slate-700">Saldo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {resultado.filas.map((fila) => (
                        <tr key={fila.mes}>
                          <td className="px-3 py-2 text-slate-600">{fila.mes}</td>
                          <td className="px-3 py-2 font-medium text-slate-900">{formatCurrency(fila.cuotaPesos)}</td>
                          {unidad !== 'ARS' && (
                            <td className="px-3 py-2 text-slate-700">{formatoContrato(fila.cuota, unidad)}</td>
                          )}
                          <td className="px-3 py-2 text-slate-600">{formatoContrato(fila.interes, unidad)}</td>
                          <td className="px-3 py-2 text-slate-600">{formatoContrato(fila.amortizacion, unidad)}</td>
                          <td className="px-3 py-2 text-slate-600">{formatoContrato(fila.saldo, unidad)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-6 text-slate-600">
              Completá un monto, un plazo y, si corresponde, el valor UVA o el tipo de cambio. Los gastos de otorgamiento tienen que ser menores al 100%.
            </div>
          )}

          <Guia moneda={moneda} />
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
  titulo,
  detalle,
  onClick,
}: {
  activo: boolean
  titulo: string
  detalle: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'text-left rounded-2xl border p-4 transition-colors cursor-pointer',
        activo
          ? 'bg-emerald-50 border-emerald-500 shadow-sm'
          : 'bg-white border-slate-200 hover:border-emerald-300'
      )}
    >
      <p className={cn('font-semibold', activo ? 'text-emerald-800' : 'text-slate-900')}>{titulo}</p>
      <p className="text-sm text-slate-600 mt-1">{detalle}</p>
    </button>
  )
}

function Campo({
  etiqueta,
  ayuda,
  children,
}: {
  etiqueta: string
  ayuda: string
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 mb-2">{etiqueta}</span>
      {children}
      <span className="block text-xs text-slate-500 mt-1">{ayuda}</span>
    </label>
  )
}

function Tarjeta({
  titulo,
  valor,
  detalle,
  destacada = false,
}: {
  titulo: string
  valor: string
  detalle: string
  destacada?: boolean
}) {
  return (
    <div className={cn('bg-white p-5 rounded-xl border shadow-sm', destacada ? 'border-emerald-300' : 'border-slate-200')}>
      <p className="text-sm text-slate-500 mb-1">{titulo}</p>
      <p className={cn('text-xl font-bold', destacada ? 'text-emerald-700' : 'text-slate-900')}>{valor}</p>
      <p className="text-xs text-slate-500 mt-2">{detalle}</p>
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
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-3 py-2 font-semibold text-slate-700">Concepto</th>
            <th className="px-3 py-2 font-semibold text-slate-700">Pesos</th>
            <th className="px-3 py-2 font-semibold text-slate-700">Sobre lo que recibís</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {filas.map(([nombre, valor]) => (
            <tr key={nombre}>
              <td className="px-3 py-2 text-slate-700">{nombre}</td>
              <td className="px-3 py-2 text-slate-900">{formatCurrency(valor)}</td>
              <td className="px-3 py-2 text-slate-600">{recibido > 0 ? formatPercent(valor / recibido) : '—'}</td>
            </tr>
          ))}
          <tr className="bg-emerald-50">
            <td className="px-3 py-2 font-semibold text-emerald-900">Todo lo que pagás de más</td>
            <td className="px-3 py-2 font-bold text-emerald-900">{formatCurrency(total)}</td>
            <td className="px-3 py-2 font-semibold text-emerald-800">
              {recibido > 0 ? formatPercent(total / recibido) : '—'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function Guia({ moneda }: { moneda: MonedaPrestamo }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-start gap-3">
        <BookOpen className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-lg font-bold text-slate-900">Qué leer antes de pedirlo</h3>
          <p className="text-sm text-slate-600 mt-1">
            La cuota del aviso casi nunca es el costo del préstamo. Estos son los datos que tienen que estar en la oferta.
          </p>
        </div>
      </div>

      <ol className="space-y-4 text-sm text-slate-700 list-decimal pl-5">
        <li>
          <strong className="text-slate-900">CFT o CFTEA, no la TNA del aviso.</strong> El costo financiero total junta la tasa, los seguros, las comisiones y los impuestos. Dos préstamos con la misma TNA pueden tener un CFT muy distinto. Compará ofertas por el CFT.
        </li>
        <li>
          <strong className="text-slate-900">Si la tasa es TNA o TEA.</strong> La TNA es nominal: el banco suele dividirla por 12 para la cuota del mes. La TEA es esa misma tasa con capitalización, y siempre da más alta. Una TNA de 60% es una TEA de casi 80%.
        </li>
        <li>
          <strong className="text-slate-900">Cuota total, no cuota pura.</strong> Preguntá si el número incluye seguro de vida, seguro del bien, comisiones e IVA. La cuota pura es solo interés más capital.
        </li>
        <li>
          <strong className="text-slate-900">Cuánto te acreditan.</strong> Los gastos de otorgamiento, el sellado y la tasación se descuentan. Podés deber $1.000.000 y recibir $970.000. La cuota igual se calcula sobre $1.000.000.
        </li>
        <li>
          <strong className="text-slate-900">Plazo y sistema.</strong> Alargar el plazo baja la cuota y aumenta el interés de toda la vida del préstamo. En el sistema francés, durante mucho tiempo casi no baja el capital. En el alemán la cuota empieza más alta y va bajando.
        </li>
        <li>
          <strong className="text-slate-900">Moneda.</strong> La tasa solo se entiende junto con la moneda. Una tasa de un dígito en UVA o en dólares no es “más barata” que una tasa alta en pesos: la inflación o el dólar se cobran aparte.
        </li>
        <li>
          <strong className="text-slate-900">Mora y cancelación anticipada.</strong> Los punitorios y la comisión por precancelar no entran en esta simulación. Están en el contrato y cambian el costo si pagás tarde o querés salir antes.
        </li>
      </ol>

      <div className={cn('rounded-xl border p-4', moneda === 'uva' ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200 bg-slate-50')}>
        <h4 className="font-semibold text-slate-900">Préstamo UVA</h4>
        <div className="text-sm text-slate-700 mt-2 space-y-2">
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

      <div className={cn('rounded-xl border p-4', moneda === 'dolares' ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200 bg-slate-50')}>
        <h4 className="font-semibold text-slate-900">Préstamo en dólares</h4>
        <div className="text-sm text-slate-700 mt-2 space-y-2">
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

      <div className="flex items-start gap-3 text-sm text-slate-500">
        <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <p>
          Es una herramienta educativa. La cuota de un banco puede diferir por redondeos, seguros sobre el saldo, días de interés del primer mes o un índice distinto. No es una oferta ni un asesoramiento para endeudarte.
        </p>
      </div>
    </div>
  )
}
