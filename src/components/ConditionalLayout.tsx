'use client'

import { useAuth } from './AuthProvider'
import Navbar from './Navbar'
import Footer from './Footer'
import Link from 'next/link'
import { LogIn } from 'lucide-react'
import { Logo } from '@/components/Logo'

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    // Usuario autenticado → mostrar Navbar + Footer + contenido completo
    return (
      <>
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </>
    )
  }

  // Usuario NO autenticado → mostrar solo un header mínimo con botón login + contenido
  return (
    <>
      {/* Header mínimo para usuarios no autenticados */}
      <header className="sticky top-0 z-50 w-full border-b border-white/70 bg-white/70 shadow-[0_12px_40px_-28px_rgba(18,55,44,0.6)] backdrop-blur-xl">
        <div className="h-[3px] bg-gradient-to-r from-[#12372c] via-[#d4af6a] to-[#12372c]" />
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <div className="flex h-[4.25rem] items-center justify-between gap-4">
            <Logo className="shrink-0" />
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden items-center gap-0.5 rounded-full bg-[#12372c]/[0.06] p-1 ring-1 ring-[#12372c]/10 sm:flex">
                <Link
                  href="/test-inversor"
                  className="rounded-full px-3.5 py-1.5 text-[13px] font-semibold text-stone-600 transition hover:bg-white hover:text-[#12372c] hover:shadow-sm"
                >
                  Test
                </Link>
                <Link
                  href="/guias"
                  className="rounded-full px-3.5 py-1.5 text-[13px] font-semibold text-stone-600 transition hover:bg-white hover:text-[#12372c] hover:shadow-sm"
                >
                  Guías
                </Link>
                <Link
                  href="/suscripcion"
                  className="rounded-full px-3.5 py-1.5 text-[13px] font-semibold text-[#8a6420] transition hover:bg-[#d4af6a]/25"
                >
                  Premium
                </Link>
              </div>
              <Link
                href="/auth/registro"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[#12372c] transition-colors hover:bg-white sm:px-5"
              >
                Registrarse
              </Link>
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 rounded-full bg-[#12372c] px-4 py-2 text-sm font-semibold text-[#f4f1ea] shadow-[0_8px_20px_-10px_rgba(18,55,44,0.9)] transition-colors hover:bg-[#164536] sm:px-5"
              >
                <LogIn className="w-4 h-4" />
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      {/* Footer mínimo */}
      <footer className="bg-[#0f2a22] py-6 text-center text-sm text-emerald-100/50">
        <p>© {new Date().getFullYear()} FinBootcamp. Proyecto educativo · No constituye asesoramiento financiero.</p>
      </footer>
    </>
  )
}
