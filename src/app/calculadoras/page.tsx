import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Calculator,
  TrendingUp,
  Banknote,
  ArrowRight,
  ChevronRight,
  Percent,
  Scale,
  BookOpen,
} from 'lucide-react';
import { instruments } from '@/data/instruments';
import { LogoInstrumento } from '@/components/LogoInstrumento';
import AdBanner from '@/components/AdBanner';

export const metadata: Metadata = {
  title: 'Calculadoras Financieras: Interés Compuesto y Préstamos | FinBootcamp',
  description:
    'Calculadoras financieras gratuitas para Argentina: simulador de interés compuesto vs plazo fijo e inflación, y calculadora de préstamos en pesos, UVA y dólares.',
};

export default function CalculadorasPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-stone-500">
        <Link href="/" className="transition hover:text-[#12372c]">
          Inicio
        </Link>
        <ChevronRight className="h-4 w-4 text-stone-400" />
        <span className="font-semibold text-[#12372c]">Calculadoras Financieras</span>
      </nav>

      <header className="relative mb-10 overflow-hidden rounded-[2rem] bg-[#12372c] px-6 py-10 text-[#f4f1ea] shadow-[0_40px_80px_-45px_rgba(18,55,44,0.8)] sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_-20%,rgba(212,175,106,0.28),transparent_45%),radial-gradient(ellipse_at_95%_10%,rgba(110,231,183,0.18),transparent_42%)]" />
        <div className="grain-overlay" />
        <div className="relative max-w-3xl">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#d4af6a]">
            <Calculator className="h-4 w-4" />
            Herramientas interactivas
          </p>
          <h1 className="text-3xl font-medium sm:text-5xl">Calculadoras Financieras</h1>
          <p className="mt-4 text-lg leading-relaxed text-emerald-50/85">
            Hacé los números antes de invertir o sacar un crédito. Proyectá rendimientos con interés compuesto
            y desglosá la cuota real de un préstamo en pesos, UVAs o dólares.
          </p>
        </div>
      </header>

      <AdBanner slot="calculadoras-horizontal" format="horizontal" className="mb-10" />

      {/* Dos calculadoras principales */}
      <div className="grid gap-6 lg:grid-cols-2">
        <article className="flex flex-col justify-between rounded-[1.8rem] border border-stone-200/80 bg-white/90 p-7 shadow-[0_24px_60px_-38px_rgba(18,55,44,0.5)] sm:p-9">
          <div>
            <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
              <TrendingUp className="h-7 w-7" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">
              Ahorro e Inversión
            </p>
            <h2 className="mt-1 text-3xl font-medium text-[#12372c]">
              Calculadora de Interés Compuesto e Instrumentos
            </h2>
            <p className="mt-3 leading-relaxed text-stone-600">
              Simulá cómo evoluciona tu capital mes a mes eligiendo el monto inicial, la Tasa Nominal Anual
              (TNA), el plazo y la frecuencia de capitalización (mensual, trimestral, anual o al vencimiento).
            </p>
            <ul className="mt-5 space-y-2 text-sm text-stone-700">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                Cálculo automático de Tasa Efectiva Anual (TEA) y ganancia mensual promedio.
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                Comparación gráfica directa contra el plazo fijo tradicional y la inflación proyectada.
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                Resumen del impacto en Impuesto a las Ganancias y Bienes Personales.
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4">
            <Link
              href="/simulador"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#12372c] px-7 py-3.5 font-semibold text-[#f4f1ea] shadow-[0_12px_30px_-14px_rgba(18,55,44,0.85)] transition hover:bg-[#17493b] sm:w-auto"
            >
              Abrir simulador de inversión
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </article>

        <article className="flex flex-col justify-between rounded-[1.8rem] border border-stone-200/80 bg-white/90 p-7 shadow-[0_24px_60px_-38px_rgba(18,55,44,0.5)] sm:p-9">
          <div>
            <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
              <Banknote className="h-7 w-7" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">
              Endeudamiento y Crédito
            </p>
            <h2 className="mt-1 text-3xl font-medium text-[#12372c]">
              Calculadora de Préstamos (Pesos, UVA y Dólares)
            </h2>
            <p className="mt-3 leading-relaxed text-stone-600">
              Desglosá cualquier oferta bancaria o prendaria bajo sistema de amortización francés. Conocé
              cuánto pagás realmente de cuota inicial, cómo evoluciona con la inflación o el tipo de cambio y
              cuál es el costo financiero total.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-stone-700">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                Soporte para préstamos a tasa fija en pesos, créditos ajustados por UVA y en dólares.
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                Cálculo de TNA, TEA y CFTEA (incluyendo IVA sobre intereses y cargos mensuales).
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                Cuadro de marcha completo cuota por cuota con capital, interés y saldo restante.
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4">
            <Link
              href="/simulador?vista=prestamo"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#12372c] px-7 py-3.5 font-semibold text-[#f4f1ea] shadow-[0_12px_30px_-14px_rgba(18,55,44,0.85)] transition hover:bg-[#17493b] sm:w-auto"
            >
              Abrir calculadora de préstamos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </article>
      </div>

      {/* Accesos rápidos por instrumento */}
      <section className="mt-12 rounded-[1.8rem] border border-stone-200/80 bg-white/90 p-6 shadow-[0_20px_50px_-38px_rgba(18,55,44,0.45)] sm:p-8">
        <h2 className="text-2xl font-medium text-[#12372c]">
          Simular directamente un instrumento del mercado argentino
        </h2>
        <p className="mt-2 text-sm text-stone-600">
          Elegí un activo para abrir la calculadora con su tasa de referencia y frecuencia de capitalización
          precargadas:
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {instruments.map((inst) => (
            <Link
              key={inst.slug}
              href={`/simulador?instrument=${inst.slug}`}
              className="group flex items-center gap-3.5 rounded-2xl border border-stone-200 bg-[#faf7f1] p-3.5 transition hover:border-[#12372c] hover:bg-white"
            >
              <LogoInstrumento slug={inst.slug} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-[#12372c] group-hover:text-emerald-800">
                  {inst.name.replace(/\s*\(.*\)/, '')}
                </p>
                <p className="text-xs text-stone-500">
                  Ref: ~{Math.round(inst.defaultRate * 100)}% TNA · {inst.capitalization.replace('_', ' ')}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-stone-400 transition group-hover:translate-x-0.5 group-hover:text-[#12372c]" />
            </Link>
          ))}
        </div>
      </section>

      {/* Explicación pedagógica de las fórmulas */}
      <section className="mt-12 grid gap-6 md:grid-cols-3">
        <div className="rounded-[1.6rem] border border-stone-200/80 bg-white/85 p-6">
          <Percent className="mb-3 h-6 w-6 text-emerald-700" />
          <h3 className="text-lg font-medium text-[#12372c]">¿Cómo se calcula el interés compuesto?</h3>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">
            El capital final responde a la fórmula{' '}
            <code className="rounded bg-stone-100 px-1.5 py-0.5 font-mono text-xs text-[#12372c]">
              CF = CI × (1 + i)^n
            </code>
            , donde <code className="font-mono text-xs">i</code> es la tasa periódica y{' '}
            <code className="font-mono text-xs">n</code> la cantidad de capitalizaciones en el plazo.
          </p>
        </div>

        <div className="rounded-[1.6rem] border border-stone-200/80 bg-white/85 p-6">
          <Scale className="mb-3 h-6 w-6 text-emerald-700" />
          <h3 className="text-lg font-medium text-[#12372c]">Rendimiento nominal vs. real</h3>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">
            En economías con inflación, ganar nominalmente más pesos no siempre significa ganar poder de
            compra. Por eso nuestra calculadora compara tu curva contra la inflación acumulada del período.
          </p>
        </div>

        <div className="rounded-[1.6rem] border border-stone-200/80 bg-white/85 p-6">
          <BookOpen className="mb-3 h-6 w-6 text-emerald-700" />
          <h3 className="text-lg font-medium text-[#12372c]">¿Querés repasar algún concepto?</h3>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">
            Si tenés dudas sobre la diferencia entre TNA, TEA, TEM, CFTEA o sistema francés, consultá nuestro{' '}
            <Link href="/glosario" className="font-semibold text-emerald-800 underline">
              Glosario Financiero
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
