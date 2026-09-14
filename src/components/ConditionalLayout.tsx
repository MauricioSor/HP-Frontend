'use client'

import { useAuth } from './AuthProvider'
import Navbar from './Navbar'
import Footer from './Footer'
import Link from 'next/link'
import { LogIn } from 'lucide-react'

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()

  // Mientras carga, mostrar solo el contenido sin Navbar/Footer
  // para evitar un flash de contenido
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 text-sm">Cargando...</p>
        </div>
      </div>
    )
  }

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
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-emerald-600">📊 FinBootcamp</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="/auth/registro"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors"
              >
                Registrarse
              </Link>
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
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
      <footer className="bg-slate-900 text-center text-slate-400 text-sm py-6">
        <p>© {new Date().getFullYear()} FinBootcamp. Proyecto educativo - No constituye asesoramiento financiero.</p>
      </footer>
    </>
  )
}
