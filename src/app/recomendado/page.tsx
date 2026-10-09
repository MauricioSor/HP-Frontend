'use client'

import Link from 'next/link'
import { Compass, ClipboardList } from 'lucide-react'
import { useAuth } from '@/components/AuthProvider'
import { descripcionPerfil, etiquetaPerfil, recomendadosPorPerfil } from '@/lib/perfil'
import { itemCatalogo } from '@/lib/catalogo'
import BotonFavorito from '@/components/BotonFavorito'

export default function RecomendadoPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const perfil = user?.perfilInversor

  if (isLoading) {
    return <div className="flex-1 py-24 text-center text-stone-500">Cargando recomendaciones...</div>
  }

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="text-4xl font-medium text-[#12372c]">Recomendado</h1>
        <p className="mt-4 text-stone-600">El listado se arma con tu perfil. Primero iniciá sesión.</p>
        <Link href="/auth/login?redirect=/recomendado" className="mt-6 inline-flex rounded-full bg-[#12372c] px-5 py-2.5 font-semibold text-[#f4f1ea]">
          Iniciar sesión
        </Link>
      </div>
    )
  }

  if (!perfil) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <Compass className="mx-auto h-10 w-10 text-[#12372c]" />
        <h1 className="mt-4 text-4xl font-medium text-[#12372c]">Todavía no hay perfil</h1>
        <p className="mt-4 text-stone-600">Hacé el test del inversor. Con eso armamos esta pestaña.</p>
        <Link
          href="/test-inversor"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#12372c] px-5 py-2.5 font-semibold text-[#f4f1ea]"
        >
          <ClipboardList className="h-4 w-4" />
          Hacer el test
        </Link>
      </div>
    )
  }

  const recs = recomendadosPorPerfil[perfil]
  const bursatil = recs.bursatil.map((slug) => itemCatalogo(slug, 'bursatil')).filter(Boolean)
  const cripto = recs.cripto.map((slug) => itemCatalogo(slug, 'cripto')).filter(Boolean)

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:py-16">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-800">Para tu perfil</p>
      <h1 className="text-4xl font-medium text-[#12372c] sm:text-5xl">Recomendado</h1>
      <div className="mt-6 max-w-2xl rounded-[1.4rem] border border-[#12372c]/10 bg-[#12372c] p-6 text-[#f4f1ea]">
        <p className="text-xs uppercase tracking-[0.2em] text-[#d4af6a]">Perfil {etiquetaPerfil(perfil)}</p>
        <p className="mt-2 text-lg text-emerald-50/85">{descripcionPerfil(perfil)}</p>
        <Link href="/test-inversor" className="mt-4 inline-flex text-sm font-semibold text-[#d4af6a]">
          Volver a tomar el test
        </Link>
      </div>
      <p className="mt-4 text-sm text-stone-500">Educativo. No es una orden de compra ni asesoramiento.</p>

      <section className="mt-12">
        <h2 className="text-2xl font-medium text-[#12372c]">Mercado bursátil</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {bursatil.map((item) =>
            item ? (
              <article key={item.slug} className="rounded-[1.6rem] border border-stone-200 bg-white p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-medium text-[#12372c]">{item.name}</h3>
                  <BotonFavorito slug={item.slug} tipo="bursatil" riesgo={item.risk} compacto />
                </div>
                <p className="mt-2 text-sm text-stone-600">{item.shortDescription}</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-stone-500">Riesgo {item.risk}</span>
                  <Link href={item.href} className="font-semibold text-emerald-800">
                    Ver ficha
                  </Link>
                </div>
              </article>
            ) : null
          )}
        </div>
      </section>

      {cripto.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-medium text-[#12372c]">Cripto</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {cripto.map((item) =>
              item ? (
                <article key={item.slug} className="rounded-[1.6rem] border border-stone-200 bg-white p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-medium text-[#12372c]">{item.name}</h3>
                    <BotonFavorito slug={item.slug} tipo="cripto" riesgo={item.risk} compacto />
                  </div>
                  <p className="mt-2 text-sm text-stone-600">{item.shortDescription}</p>
                  <Link href={item.href} className="mt-4 inline-flex text-sm font-semibold text-emerald-800">
                    Ver tema
                  </Link>
                </article>
              ) : null
            )}
          </div>
        </section>
      )}
    </div>
  )
}
