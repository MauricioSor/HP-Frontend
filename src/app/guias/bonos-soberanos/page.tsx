import type { Metadata } from 'next'
import Link from 'next/link'
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  Calculator,
  CheckCircle2,
  ChevronRight,
  Landmark,
  Scale,
  Shield,
} from 'lucide-react'
import AdBanner from '@/components/AdBanner'
import { bonosPrincipales } from '@/data/bonos-soberanos'

export const metadata: Metadata = {
  title: 'Guía de bonos soberanos AL30, GD30, AL35, GD35 y AE38 | FinBootcamp',
  description:
    'Aprendé cómo funcionan los 5 principales bonos soberanos de Argentina: cupones, amortizaciones, paridad y si se pagan Ganancias o Bienes Personales.',
}

const indice = [
  { href: '#como-funcionan', label: 'Cómo funciona un bono' },
  { href: '#los-cinco', label: 'Los 5 principales' },
  { href: '#impuestos', label: 'Impuestos: cupones y amortizaciones' },
  { href: '#antes-de-comprar', label: 'Qué mirar antes de comprar' },
]

export default function GuiaBonosSoberanosPage() {
  return (
    <article className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14">
      <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-emerald-700">
          Inicio
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/guias" className="hover:text-emerald-700">
          Guías
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-slate-800">Bonos soberanos</span>
      </nav>

      <header className="mb-10 max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800">
          Guía de ayuda · Renta fija
        </p>
        <h1 className="text-4xl font-medium text-[#12372c] sm:text-5xl">
          Los 5 principales bonos soberanos de Argentina
        </h1>
        <p className="mt-5 text-lg text-slate-600">
          AL30, GD30, AL35, GD35 y AE38 son los títulos en dólares que más se operan. Esta guía
          explica cómo cobran, cómo se amortizan y si una persona humana tiene que pagar impuestos
          por esos pagos.
        </p>
      </header>

      <AdBanner slot="guia-bonos-horizontal" format="horizontal" className="mb-10" />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="space-y-10">
          <section className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-medium text-[#12372c]">En una frase</h2>
            <p className="mt-3 text-slate-600">
              Comprás un bono soberano y le prestás dólares al Estado. A cambio recibís{' '}
              <strong>cupones</strong> (interés) y <strong>amortizaciones</strong> (devolución del
              capital). Para una persona humana residente, esos cobros y la ganancia por vender el
              título están <strong>exentos</strong> de Ganancias y el bono no entra en Bienes
              Personales.
            </p>
          </section>

          <section id="como-funcionan" className="scroll-mt-24 space-y-6">
            <h2 className="text-3xl font-medium text-[#12372c]">Cómo funciona un bono soberano</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-stone-200 bg-white p-6">
                <h3 className="text-xl font-medium text-slate-900">Cupón (renta)</h3>
                <p className="mt-2 text-slate-600">
                  Es el interés. Se paga dos veces al año, sobre el <em>residual</em>: el capital que
                  todavía no se devolvió. Si el residual ya bajó, el cupón en plata también es menor,
                  aunque la tasa del prospecto no haya cambiado.
                </p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white p-6">
                <h3 className="text-xl font-medium text-slate-900">Amortización</h3>
                <p className="mt-2 text-slate-600">
                  Es la devolución del préstamo, no una ganancia. Estos cinco bonos no pagan todo el
                  capital el último día: lo van devolviendo en cuotas. Cada cuota reduce el residual
                  y, por lo tanto, los próximos intereses.
                </p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white p-6">
                <h3 className="text-xl font-medium text-slate-900">Paridad y residual</h3>
                <p className="mt-2 text-slate-600">
                  La paridad es el precio de mercado comparado con el capital que falta cobrar. Un
                  AL30 a 70 no significa que pagás 70 por cada 100 originales si el bono ya amortizó:
                  el precio se lee contra el residual.
                </p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white p-6">
                <h3 className="text-xl font-medium text-slate-900">TIR</h3>
                <p className="mt-2 text-slate-600">
                  La Tasa Interna de Retorno junta todos los cupones y amortizaciones que faltan, al
                  precio de hoy. Es el número que hay que comparar entre bonos, no el cupón suelto.
                  Si vendés antes, tu resultado real es otro.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <h3 className="flex items-center gap-2 text-lg font-medium text-amber-950">
                <Scale className="h-5 w-5" />
                Ley local (AL / AE) vs ley Nueva York (GD)
              </h3>
              <p className="mt-2 text-amber-950/80">
                AL30 y AL35 (Bonares) y AE38 se rigen por ley argentina. GD30 y GD35 (Globales) se
                rigen por ley de Nueva York. El cronograma de pagos puede ser el mismo; lo que cambia
                es qué podés reclamar si el Estado no paga. Por eso el Global suele cotizar con una
                prima. El tratamiento impositivo para una persona humana residente es el mismo.
              </p>
            </div>
          </section>

          <section id="los-cinco" className="scroll-mt-24 space-y-6">
            <h2 className="text-3xl font-medium text-[#12372c]">Los 5 principales</h2>
            <p className="text-slate-600">
              Son los hard-dollar más líquidos de BYMA. Se operan en pesos (MEP), en dólares
              (ticker + D) y en Cable (ticker + C). Los datos de cupón y amortización salen del
              prospecto de la reestructuración 2020; un canje futuro puede cambiarlos.
            </p>

            <div className="space-y-5">
              {bonosPrincipales.map((bono) => (
                <article
                  key={bono.ticker}
                  id={bono.ticker.toLowerCase()}
                  className="scroll-mt-24 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
                        {bono.nombre}
                      </p>
                      <h3 className="mt-1 text-3xl font-medium text-[#12372c]">{bono.ticker}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {bono.moneda}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        Ley {bono.ley}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        Vence {bono.vencimiento}
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-slate-700">{bono.perfil}</p>
                  <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm font-semibold text-slate-500">Cupón</dt>
                      <dd className="mt-1 text-slate-700">{bono.cupon}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-semibold text-slate-500">Amortización</dt>
                      <dd className="mt-1 text-slate-700">{bono.amortizacion}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-semibold text-slate-500">Para qué se usa</dt>
                      <dd className="mt-1 text-slate-700">{bono.paraQueSirve}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-semibold text-slate-500">Riesgo a tener presente</dt>
                      <dd className="mt-1 text-slate-700">{bono.riesgo}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </section>

          <section id="impuestos" className="scroll-mt-24 space-y-6">
            <h2 className="text-3xl font-medium text-[#12372c]">
              ¿Hay que pagar impuestos por los pagos del bono?
            </h2>
            <p className="text-slate-600">
              Para una <strong>persona humana residente en Argentina</strong>, la respuesta corta es
              no: ni el cupón, ni la amortización, ni la diferencia si vendés más caro están gravados
              por Ganancias. El stock al 31 de diciembre no paga Bienes Personales.
            </p>

            <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Qué cobrás o tenés</th>
                    <th className="px-5 py-3 font-semibold">Ganancias</th>
                    <th className="px-5 py-3 font-semibold">Bienes Personales</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-5 py-4">
                      <strong>Cupón / renta</strong>
                      <p className="mt-1 text-slate-500">El interés semestral que acredita la ALyC.</p>
                    </td>
                    <td className="px-5 py-4 font-semibold text-emerald-700">Exento</td>
                    <td className="px-5 py-4 text-slate-500">No aplica al cobro</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4">
                      <strong>Amortización</strong>
                      <p className="mt-1 text-slate-500">
                        Devolución de capital. Aunque hayas comprado bajo la par, para personas
                        humanas ese resultado está exento.
                      </p>
                    </td>
                    <td className="px-5 py-4 font-semibold text-emerald-700">Exento</td>
                    <td className="px-5 py-4 text-slate-500">No aplica al cobro</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4">
                      <strong>Venta en el mercado</strong>
                      <p className="mt-1 text-slate-500">
                        Compraste a 62 y vendiste a 70. Esa diferencia también está exenta.
                      </p>
                    </td>
                    <td className="px-5 py-4 font-semibold text-emerald-700">Exento</td>
                    <td className="px-5 py-4 text-slate-500">No aplica a la venta</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4">
                      <strong>Tenencia al 31/12</strong>
                      <p className="mt-1 text-slate-500">AL30, GD30, AL35, GD35, AE38 y el resto de títulos públicos.</p>
                    </td>
                    <td className="px-5 py-4 text-slate-500">No aplica a la tenencia</td>
                    <td className="px-5 py-4 font-semibold text-emerald-700">Exento</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
                <h3 className="flex items-center gap-2 text-lg font-medium text-emerald-950">
                  <CheckCircle2 className="h-5 w-5" />
                  Por qué está exento
                </h3>
                <p className="mt-2 text-emerald-950/80">
                  Los títulos públicos nacionales, provinciales y municipales están exentos para
                  personas humanas en el Impuesto a las Ganancias (art. 26 de la ley, con las
                  reformas de la Ley 27.541) y en Bienes Personales. Vale para Bonares y Globales:
                  el emisor es la República Argentina, aunque el GD se rija por ley extranjera.
                </p>
              </div>
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6">
                <h3 className="flex items-center gap-2 text-lg font-medium text-rose-950">
                  <AlertCircle className="h-5 w-5" />
                  Cuándo sí se paga
                </h3>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-rose-950/80">
                  <li>Sociedades y otros sujetos empresa: el tratamiento es otro, en general gravado.</li>
                  <li>No residentes: rigen normas distintas de fuente argentina.</li>
                  <li>
                    Otros instrumentos (acciones extranjeras vía CEDEAR, crypto, etc.) no heredan
                    esta exención.
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
              <h3 className="text-xl font-medium text-slate-900">Ejemplo de un cobro</h3>
              <p className="mt-3 text-slate-600">
                Tenés 10.000 valor nominal residual de AL30. En la fecha de pago la ALyC te acredita,
                por ejemplo, USD 75 de cupón y USD 769 de amortización. Los USD 769 son devolución
                del capital que prestaste. Los USD 75 son interés. En los dos casos, si sos persona
                humana residente, <strong>no retenés ni liquidás Ganancias</strong> por ese
                movimiento. El dinero queda en la comitente y podés reinvertirlo o transferirlo a tu
                banco.
              </p>
              <p className="mt-3 text-slate-600">
                IVA no aplica. El impuesto al cheque tampoco suele aplicar en transferencias entre tu
                cuenta bancaria y tu comitente propia.
              </p>
            </div>
          </section>

          <section id="antes-de-comprar" className="scroll-mt-24 space-y-5">
            <h2 className="text-3xl font-medium text-[#12372c]">Qué mirar antes de comprar</h2>
            <ol className="space-y-3">
              {[
                'Ticker y especie: AL30 (pesos), AL30D (dólar MEP), AL30C (Cable). No es lo mismo el precio ni el tipo de cambio implícito.',
                'Residual y próxima fecha de pago. Si comprás justo antes de un cupón, parte del precio es interés corrido.',
                'TIR en la moneda en la que realmente cobrás, no solo la paridad.',
                'Legislación: si te importa el reclamo en un default, el GD no es un detalle cosmético.',
                'Liquidez: AL30/GD30 se venden en minutos; AE38 puede tener un pozo más ancho.',
                'Comisiones de la ALyC y el parking si estás armando MEP o Cable.',
              ].map((item, index) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 text-slate-700"
                >
                  <span className="font-semibold text-emerald-800">{index + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </section>

          <p className="rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4 text-sm text-slate-500">
            Contenido educativo actualizado en octubre de 2026. No es asesoramiento financiero ni
            impositivo. Las leyes y los prospectos pueden cambiar; confirmá con un contador y con el
            prospecto publicado por el Ministerio de Economía / BYMA.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/cotizaciones"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#12372c] px-5 py-3 font-semibold text-[#f4f1ea] hover:bg-[#0f2e25]"
            >
              Ver cotizaciones
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/mercado-bursatil/bonos-soberanos"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-5 py-3 font-semibold text-[#12372c] hover:bg-stone-50"
            >
              Ficha del instrumento
            </Link>
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-stone-200 bg-white p-5">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-500">
              <BookOpen className="h-4 w-4" />
              En esta guía
            </p>
            <ul className="space-y-2 text-sm">
              {indice.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-slate-700 hover:text-emerald-700">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-5">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-500">
              <Landmark className="h-4 w-4" />
              Los 5 tickers
            </p>
            <ul className="space-y-2 text-sm">
              {bonosPrincipales.map((bono) => (
                <li key={bono.ticker}>
                  <a href={`#${bono.ticker.toLowerCase()}`} className="text-slate-700 hover:text-emerald-700">
                    {bono.ticker} · {bono.nombre}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-emerald-50 p-5 text-sm text-emerald-950">
            <p className="flex items-center gap-2 font-semibold">
              <Shield className="h-4 w-4" />
              Persona humana
            </p>
            <p className="mt-2">
              Cupón, amortización y venta: exentos de Ganancias. Tenencia: exenta de Bienes
              Personales.
            </p>
            <a href="#impuestos" className="mt-3 inline-flex items-center gap-1 font-semibold text-emerald-800">
              Ver detalle
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <Link
            href="/simulador"
            className="flex items-center gap-2 rounded-2xl border border-stone-200 bg-white p-5 text-sm font-semibold text-[#12372c] hover:border-emerald-300"
          >
            <Calculator className="h-4 w-4" />
            Ir al simulador
          </Link>
        </aside>
      </div>
    </article>
  )
}
