'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { LogIn, Eye, EyeOff, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [usuario, setUsuario] = useState('')
  const [contraseña, setContraseña] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { login } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    const result = await login(usuario, contraseña)

    if (result.success) {
      router.push(redirect)
      router.refresh()
    } else {
      setError(result.error || 'Error al iniciar sesión')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 to-emerald-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-3xl font-bold text-emerald-600">📊 FinBootcamp</span>
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Iniciar Sesión</h1>
          <p className="mt-2 text-slate-500">Ingresá tus credenciales para acceder a la plataforma</p>
        </div>

        {/* Card del formulario */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error message */}
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Campo usuario */}
            <div>
              <label htmlFor="usuario" className="block text-sm font-medium text-slate-700 mb-2">
                Usuario
              </label>
              <input
                id="usuario"
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Tu nombre de usuario"
                required
                autoComplete="username"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Campo contraseña */}
            <div>
              <label htmlFor="contraseña" className="block text-sm font-medium text-slate-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="contraseña"
                  type={showPassword ? 'text' : 'password'}
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                  placeholder="Tu contraseña"
                  required
                  autoComplete="current-password"
                  className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Botón submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Iniciar Sesión
                </>
              )}
            </button>
          </form>
        </div>

        {/* Links */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-sm text-slate-500">
            ¿No tenés cuenta?{' '}
            <Link href="/auth/registro" className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
              Registrate
            </Link>
          </p>
          <Link href="/" className="block text-sm text-slate-400 hover:text-emerald-600 transition-colors">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
