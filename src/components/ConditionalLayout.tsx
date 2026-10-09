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
      <header className="sticky top-0 z-50 w-full border-b border-stone-200/70 bg-[#f7f4ee]/85 shadow-[0_10px_30px_-24px_rgba(18,55,44,0.45)] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-[4.25rem] items-center">
            <Logo />
            <div className="flex items-center gap-3">
              <Link
                href="/test-inversor"
                className="hidden sm:inline-flex items-center px-3 py-2 text-sm font-semibold text-[#12372c] hover:text-emerald-700 transition-colors"
              >
                Test
              </Link>
              <Link
                href="/guias"
                className="hidden sm:inline-flex items-center px-3 py-2 text-sm font-semibold text-[#12372c] hover:text-emerald-700 transition-colors"
              >
                Guías
              </Link>
              <Link
                href="/suscripcion"
                className="hidden sm:inline-flex items-center px-3 py-2 text-sm font-semibold text-[#12372c] hover:text-emerald-700 transition-colors"
              >
                Premium
              </Link>
              <Link
                href="/auth/registro"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-[#12372c] transition-colors hover:bg-white"
              >
                Registrarse
              </Link>
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 rounded-full bg-[#12372c] px-5 py-2.5 text-sm font-semibold text-[#f4f1ea] shadow-sm transition-colors hover:bg-[#164536]"
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
