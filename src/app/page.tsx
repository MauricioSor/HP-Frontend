'use client';

import Link from 'next/link';
import { TrendingUp, Bitcoin, Calculator, CheckCircle2, ArrowRight, LogIn, UserPlus, BookOpen } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import CarruselInstrumentos from '@/components/CarruselInstrumentos';
import CintaTickers from '@/components/CintaTickers';
import AdBanner from '@/components/AdBanner';

const bloques = [
  {
    href: '/mercado-bursatil',
    titulo: 'Mercado Bursátil',
    texto: 'Bonos, acciones, CEDEARs, ETFs, cauciones y más. Cada ficha con riesgo, horizonte e impuestos.',
    cta: 'Ver instrumentos',
    icon: TrendingUp,
    tono: 'text-emerald-800 bg-emerald-100',
    link: 'text-emerald-800',
  },
  {
    href: '/cripto',
    titulo: 'Mercado Cripto',
    texto: 'Desde Bitcoin y Ethereum hasta DeFi, staking y los riesgos de las memecoins.',
    cta: 'Explorar cripto',
    icon: Bitcoin,
    tono: 'text-sky-800 bg-sky-100',
    link: 'text-sky-800',
  },
  {
    href: '/simulador',
    titulo: 'Simulador',
    texto: 'Interés compuesto y la cuota de un préstamo en pesos, UVA o dólares.',
    cta: 'Probar simulador',
    icon: Calculator,
    tono: 'text-amber-800 bg-amber-100',
    link: 'text-amber-800',
  },
  {
    href: '/guias',
    titulo: 'Guías de ayuda',
    texto: 'AL30, GD30, AL35, GD35 y AE38: cupones, amortizaciones e impuestos.',
    cta: 'Leer las guías',
    icon: BookOpen,
    tono: 'text-[#12372c] bg-[#e8e0d0]',
    link: 'text-[#12372c]',
  },
]

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-[#12372c] text-[#f4f1ea]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_-10%,rgba(212,175,106,0.22),transparent_42%),radial-gradient(ellipse_at_90%_0%,rgba(110,231,183,0.16),transparent_40%)]" />
        <div className="grain-overlay" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-[#d4af6a]">
            Educación financiera argentina
          </p>
          <h1 className="max-w-4xl text-4xl font-medium tracking-tight sm:text-6xl lg:text-7xl">
            Aprendé a invertir con criterio, no con ruido.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-emerald-50/80 sm:text-2xl">
            Bonos, LECAPs, acciones, ETFs y cripto explicados para el mercado local. Impuestos claros.
            Simuladores que se entienden.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/mercado-bursatil"
              className="inline-flex items-center justify-center rounded-full bg-[#f4f1ea] px-7 py-3.5 font-semibold text-[#12372c] shadow-[0_12px_30px_-18px_rgba(0,0,0,0.6)] transition hover:bg-white"
            >
              Explorar instrumentos
            </Link>
            <Link
              href="/simulador"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3.5 font-semibold text-[#f4f1ea] transition hover:bg-white/10"
            >
              Simular inversión
            </Link>
            {!isLoading && !isAuthenticated && (
              <>
                <Link
                  href="/auth/registro"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d4af6a] px-7 py-3.5 font-semibold text-[#12372c] transition hover:bg-[#e2c588]"
                >
                  <UserPlus className="h-5 w-5" />
                  Registrarse
                </Link>
                <Link
                  href="/auth/login"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
                >
                  <LogIn className="h-5 w-5" />
                  Iniciar sesión
                </Link>
              </>
            )}
          </div>
        </div>
        <CintaTickers tono="oscuro" />
      </section>

      <CarruselInstrumentos />

      <section className="border-y border-stone-200/70 bg-white/70 backdrop-blur-sm">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-stone-200/60 md:grid-cols-4">
          {[
            ['8', 'Instrumentos'],
            ['6', 'Temas cripto'],
            ['100%', 'Acceso libre'],
            ['Guías', 'Impuestos claros'],
          ].map(([valor, label]) => (
            <div key={label} className="bg-white/80 px-6 py-8 text-center">
              <div className="font-heading text-3xl text-[#12372c] sm:text-4xl">{valor}</div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <AdBanner slot="inicio-horizontal" format="horizontal" />
      </div>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-800">La plataforma</p>
            <h2 className="text-3xl font-medium text-[#12372c] sm:text-5xl">Todo lo que necesitás saber</h2>
            <p className="mt-4 text-lg text-stone-600">
              Del primer bono al simulador de un préstamo. Sin jerga innecesaria.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {bloques.map((bloque) => {
              const Icon = bloque.icon
              return (
                <div
                  key={bloque.href}
                  className="group rounded-[1.6rem] border border-stone-200/80 bg-white/80 p-7 shadow-[0_20px_50px_-36px_rgba(18,55,44,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-32px_rgba(18,55,44,0.5)]"
                >
                  <div className={`mb-6 grid h-12 w-12 place-items-center rounded-2xl ${bloque.tono}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-medium text-[#12372c]">{bloque.titulo}</h3>
                  <p className="mt-3 mb-6 text-sm leading-relaxed text-stone-600">{bloque.texto}</p>
                  <Link href={bloque.href} className={`inline-flex items-center text-sm font-semibold ${bloque.link}`}>
                    {bloque.cta} <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5" />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-800">Impuestos</p>
              <h2 className="text-3xl font-medium text-[#12372c] sm:text-5xl">
                Qué se paga. Qué no. Sin letra chica escondida.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-stone-600">
                Ganancias, Bienes Personales y las exenciones de los títulos públicos, explicadas para persona humana.
              </p>
              <ul className="mt-8 space-y-3">
                {['Tratamiento de Bienes Personales', 'Impuesto a las Ganancias / Cedular', 'Exenciones actuales'].map((item) => (
                  <li key={item} className="flex items-center text-stone-700">
                    <CheckCircle2 className="mr-3 h-5 w-5 shrink-0 text-emerald-700" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="overflow-hidden rounded-[1.8rem] border border-stone-200 bg-white shadow-[0_30px_70px_-40px_rgba(18,55,44,0.45)]">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#12372c] text-[#f4f1ea]">
                  <tr>
                    <th className="px-6 py-4 font-medium">Instrumento</th>
                    <th className="px-6 py-4 font-medium">Bienes Personales</th>
                    <th className="px-6 py-4 font-medium">Ganancias</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  <tr>
                    <td className="px-6 py-4 font-medium text-[#12372c]">Bonos soberanos</td>
                    <td className="px-6 py-4 font-semibold text-emerald-700">Exento</td>
                    <td className="px-6 py-4 font-semibold text-emerald-700">Exento</td>
                  </tr>
                  <tr className="bg-[#faf7f1]">
                    <td className="px-6 py-4 font-medium text-[#12372c]">CEDEARs</td>
                    <td className="px-6 py-4 font-semibold text-rose-700">Gravado</td>
                    <td className="px-6 py-4 font-semibold text-amber-700">Diferenciado*</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-[#12372c]">Plazo fijo</td>
                    <td className="px-6 py-4 font-semibold text-emerald-700">Exento</td>
                    <td className="px-6 py-4 font-semibold text-emerald-700">Exento</td>
                  </tr>
                </tbody>
              </table>
              <div className="border-t border-stone-100 bg-[#f1f6f2] px-6 py-3 text-xs text-stone-500">
                * Ilustrativo. Consultá un contador.{' '}
                <Link href="/guias/bonos-soberanos#impuestos" className="font-semibold text-emerald-800">
                  Ver la guía de bonos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
        <AdBanner slot="inicio-cierre" format="horizontal" />
      </div>

      <section className="relative overflow-hidden bg-[#0f2a22] py-20 text-center text-[#f4f1ea]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,106,0.16),transparent_50%)]" />
        <div className="grain-overlay" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-medium sm:text-5xl">Empezá por un instrumento, no por un curso eterno</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-emerald-50/75">
            Elegí un bono, una LECAP o un ETF y entendé cómo paga antes de poner un peso.
          </p>
          <Link
            href="/mercado-bursatil"
            className="mt-10 inline-flex items-center rounded-full bg-[#f4f1ea] px-8 py-4 text-lg font-semibold text-[#12372c] transition hover:bg-white"
          >
            Entrar al mercado
          </Link>
        </div>
      </section>
    </div>
  );
}
