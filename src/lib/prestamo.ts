export type MonedaPrestamo = 'pesos' | 'uva' | 'dolares'
export type SistemaAmortizacion = 'frances' | 'aleman'
export type TipoTasa = 'tna' | 'tea'

export interface DatosPrestamo {
  moneda: MonedaPrestamo
  /** Pesos si la moneda es pesos o UVA. Dólares si la moneda es dólares. */
  monto: number
  plazoMeses: number
  /** TNA o TEA, según `tipoTasa`, en decimal (0.6 = 60%). */
  tasa: number
  tipoTasa: TipoTasa
  sistema: SistemaAmortizacion
  /** Porción del capital que el banco descuenta al acreditar. 0.02 = 2%. */
  gastosOtorgamiento: number
  /** Cargo fijo por mes, en la moneda del contrato (pesos, UVA o dólares). */
  seguroMensual: number
  /** IVA sobre los intereses. 0.21 = 21%. */
  iva: number
  /** Suba mensual del valor UVA. Solo se usa en préstamos UVA. */
  inflacionMensual: number
  /** Suba mensual del tipo de cambio. Solo se usa en préstamos en dólares. */
  devaluacionMensual: number
  /** Pesos por UVA al momento de tomar el préstamo. */
  valorUva: number
  /** Pesos por dólar al momento de tomar el préstamo. */
  tipoCambio: number
}

export interface CuotaDetalle {
  mes: number
  interes: number
  amortizacion: number
  iva: number
  seguro: number
  cuota: number
  saldo: number
  /** Pesos por cada unidad de la moneda del contrato en ese mes. */
  indice: number
  cuotaPesos: number
}

export interface ResultadoPrestamo {
  filas: CuotaDetalle[]
  unidad: 'ARS' | 'UVA' | 'USD'
  capitalContrato: number
  tasaMensual: number
  tna: number
  tea: number
  cuotaInicial: number
  cuotaFinal: number
  cuotaInicialPesos: number
  cuotaFinalPesos: number
  interesesContrato: number
  porcentajeInteres: number
  ajustePesos: number
  interesesPesos: number
  ivaPesos: number
  seguroPesos: number
  gastosPesos: number
  recibidoPesos: number
  totalPagadoPesos: number
  costoTotalPesos: number
  porcentajeCosto: number
  /** Costo financiero total efectivo anual de este escenario, en pesos. */
  cftea: number
}

function tasaMensualDe(tasa: number, tipo: TipoTasa): number {
  if (tasa <= 0) return 0
  if (tipo === 'tea') return (1 + tasa) ** (1 / 12) - 1
  return tasa / 12
}

function cuotaFrancesa(capital: number, tasaMensual: number, meses: number): number {
  if (capital <= 0 || meses <= 0) return 0
  if (tasaMensual === 0) return capital / meses
  const factor = (1 + tasaMensual) ** meses
  return (capital * tasaMensual * factor) / (factor - 1)
}

function indiceDelMes(datos: DatosPrestamo, mes: number): number {
  if (datos.moneda === 'uva') {
    return datos.valorUva * (1 + datos.inflacionMensual) ** mes
  }
  if (datos.moneda === 'dolares') {
    return datos.tipoCambio * (1 + datos.devaluacionMensual) ** mes
  }
  return 1
}

function indiceInicial(datos: DatosPrestamo): number {
  if (datos.moneda === 'uva') return datos.valorUva
  if (datos.moneda === 'dolares') return datos.tipoCambio
  return 1
}

/** Tasa mensual implícita de los flujos de caja. `recibido` entra en el mes 0. */
function tirMensual(recibido: number, pagos: number[]): number {
  if (recibido <= 0 || pagos.length === 0) return 0
  const total = pagos.reduce((suma, pago) => suma + pago, 0)
  if (total <= recibido) return 0

  let tasa = 0.01
  for (let intento = 0; intento < 60; intento++) {
    let valor = recibido
    let derivada = 0
    for (let mes = 1; mes <= pagos.length; mes++) {
      const descuento = (1 + tasa) ** mes
      valor -= pagos[mes - 1] / descuento
      derivada += (mes * pagos[mes - 1]) / (1 + tasa) ** (mes + 1)
    }
    if (Math.abs(derivada) < 1e-12) break
    const siguiente = tasa - valor / derivada
    if (!Number.isFinite(siguiente) || siguiente <= -0.99) break
    if (Math.abs(siguiente - tasa) < 1e-12) return siguiente
    tasa = siguiente
  }
  return tasa
}

export function simularPrestamo(datos: DatosPrestamo): ResultadoPrestamo | null {
  const plazo = Math.round(datos.plazoMeses)
  if (datos.monto <= 0 || plazo < 1 || plazo > 480) return null
  if (datos.moneda === 'uva' && datos.valorUva <= 0) return null
  if (datos.moneda === 'dolares' && datos.tipoCambio <= 0) return null
  if (datos.gastosOtorgamiento < 0 || datos.gastosOtorgamiento >= 1) return null

  const capitalContrato = datos.moneda === 'uva' ? datos.monto / datos.valorUva : datos.monto
  const tasaMensual = tasaMensualDe(Math.max(0, datos.tasa), datos.tipoTasa)
  const cuotaPuraFrancesa = cuotaFrancesa(capitalContrato, tasaMensual, plazo)
  const amortizacionAlemana = capitalContrato / plazo
  const pesosPorUnidadInicial = indiceInicial(datos)

  const filas: CuotaDetalle[] = []
  let saldo = capitalContrato

  for (let mes = 1; mes <= plazo; mes++) {
    const interes = saldo * tasaMensual
    const amortizacionBase =
      datos.sistema === 'frances' ? cuotaPuraFrancesa - interes : amortizacionAlemana
    const amortizacion = mes === plazo ? saldo : Math.min(Math.max(amortizacionBase, 0), saldo)
    const iva = interes * Math.max(0, datos.iva)
    const seguro = Math.max(0, datos.seguroMensual)
    const cuota = interes + amortizacion + iva + seguro
    saldo = Math.max(0, saldo - amortizacion)
    const indice = indiceDelMes(datos, mes)

    filas.push({
      mes,
      interes,
      amortizacion,
      iva,
      seguro,
      cuota,
      saldo,
      indice,
      cuotaPesos: cuota * indice,
    })
  }

  const interesesContrato = filas.reduce((suma, fila) => suma + fila.interes, 0)
  const interesesPesos = filas.reduce((suma, fila) => suma + fila.interes * fila.indice, 0)
  const ivaPesos = filas.reduce((suma, fila) => suma + fila.iva * fila.indice, 0)
  const seguroPesos = filas.reduce((suma, fila) => suma + fila.seguro * fila.indice, 0)
  const capitalDevueltoPesos = filas.reduce((suma, fila) => suma + fila.amortizacion * fila.indice, 0)
  const capitalInicialPesos = capitalContrato * pesosPorUnidadInicial
  const ajustePesos = capitalDevueltoPesos - capitalInicialPesos
  const gastosPesos = capitalInicialPesos * datos.gastosOtorgamiento
  const recibidoPesos = capitalInicialPesos - gastosPesos
  const totalPagadoPesos = filas.reduce((suma, fila) => suma + fila.cuotaPesos, 0)
  const costoTotalPesos = totalPagadoPesos - recibidoPesos
  const tir = tirMensual(
    recibidoPesos,
    filas.map((fila) => fila.cuotaPesos)
  )

  return {
    filas,
    unidad: datos.moneda === 'uva' ? 'UVA' : datos.moneda === 'dolares' ? 'USD' : 'ARS',
    capitalContrato,
    tasaMensual,
    tna: tasaMensual * 12,
    tea: (1 + tasaMensual) ** 12 - 1,
    cuotaInicial: filas[0]?.cuota ?? 0,
    cuotaFinal: filas[filas.length - 1]?.cuota ?? 0,
    cuotaInicialPesos: filas[0]?.cuotaPesos ?? 0,
    cuotaFinalPesos: filas[filas.length - 1]?.cuotaPesos ?? 0,
    interesesContrato,
    porcentajeInteres: capitalContrato > 0 ? interesesContrato / capitalContrato : 0,
    ajustePesos,
    interesesPesos,
    ivaPesos,
    seguroPesos,
    gastosPesos,
    recibidoPesos,
    totalPagadoPesos,
    costoTotalPesos,
    porcentajeCosto: recibidoPesos > 0 ? costoTotalPesos / recibidoPesos : 0,
    cftea: (1 + tir) ** 12 - 1,
  }
}
