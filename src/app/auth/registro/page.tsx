'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { UserPlus, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function RegistroPage() {
  // Datos de usuario
  const [usuario, setUsuario] = useState('')
  const [contraseña, setContraseña] = useState('')
  const [confirmarContraseña, setConfirmarContraseña] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Datos de persona
  const [dni, setDni] = useState('')
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [direccion, setDireccion] = useState('')
  const [situacionLaboral, setSituacionLaboral] = useState('')
  const [perfil, setPerfil] = useState('')
  const [cuit, setCuit] = useState('')
  const [nacimiento, setNacimiento] = useState('')

  // Estado
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { login } = useAuth()
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    // Validaciones
    if (contraseña !== confirmarContraseña) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (contraseña.length < 4) {
      setError('La contraseña debe tener al menos 4 caracteres')
      return
    }

    if (!dni) {
      setError('El DNI es obligatorio')
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario,
          contraseña,
          rol: 0, // Siempre rol usuario (no admin)
          estado: 1, // Activo por defecto
          persona: {
            dni: parseInt(dni),
            nombre: nombre || null,
            correo: correo || null,
            direccion: direccion || null,
            SituacionLaboral: situacionLaboral || null,
            Perfil: perfil || null,
            cuit: cuit || null,
            nacimiento: nacimiento || null,
          },
        }),
      })

      const data = await res.json()

      if (res.ok && (data.success || data.warning)) {
        // Registro exitoso → login automático
        const loginResult = await login(usuario, contraseña)
        if (loginResult.success) {
          router.push('/')
          router.refresh()
        } else {
          // Se creó pero no pudo loguearse, mandarlo al login
          router.push('/auth/login')
        }
      } else {
        setError(data.error || 'Error al crear la cuenta')
      }
    } catch {
      setError('Error de conexión')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 to-emerald-50 px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-3xl font-bold text-emerald-600">📊 FinBootcamp</span>
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Crear Cuenta</h1>
          <p className="mt-2 text-slate-500">Registrate para acceder a toda la plataforma</p>
        </div>

        {/* Card del formulario */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error */}
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Sección: Credenciales */}
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-emerald-600" />
                Credenciales
              </h2>

              <div>
                <label htmlFor="usuario" className="block text-sm font-medium text-slate-700 mb-1">
                  Nombre de usuario *
                </label>
                <input
                  id="usuario"
                  type="text"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  placeholder="ej: juan.perez"
                  required
                  autoComplete="username"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="contraseña" className="block text-sm font-medium text-slate-700 mb-1">
                    Contraseña *
                  </label>
                  <div className="relative">
                    <input
                      id="contraseña"
                      type={showPassword ? 'text' : 'password'}
                      value={contraseña}
                      onChange={(e) => setContraseña(e.target.value)}
                      placeholder="Mínimo 4 caracteres"
                      required
                      autoComplete="new-password"
                      className="w-full px-4 py-3 pr-10 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="confirmar" className="block text-sm font-medium text-slate-700 mb-1">
                    Confirmar *
                  </label>
                  <input
                    id="confirmar"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmarContraseña}
                    onChange={(e) => setConfirmarContraseña(e.target.value)}
                    placeholder="Repetir contraseña"
                    required
                    autoComplete="new-password"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Separador */}
            <div className="border-t border-slate-200" />

            {/* Sección: Datos personales */}
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Datos Personales
              </h2>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">DNI *</label>
                  <input
                    type="number"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    placeholder="12345678"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nombre completo</label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Juan Pérez"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Correo electrónico</label>
                <input
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="juan@email.com"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Dirección</label>
                <input
                  type="text"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  placeholder="Av. Siempre Viva 742"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">CUIT</label>
                  <input
                    type="text"
                    value={cuit}
                    onChange={(e) => setCuit(e.target.value)}
                    placeholder="20-12345678-9"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nacimiento</label>
                  <input
                    type="date"
                    value={nacimiento}
                    onChange={(e) => setNacimiento(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Situación Laboral</label>
                  <input
                    type="text"
                    value={situacionLaboral}
                    onChange={(e) => setSituacionLaboral(e.target.value)}
                    placeholder="Empleado"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Perfil inversor</label>
                  <input
                    type="text"
                    value={perfil}
                    onChange={(e) => setPerfil(e.target.value)}
                    placeholder="Conservador"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creando cuenta...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Crear Cuenta
                </>
              )}
            </button>
          </form>
        </div>

        {/* Link a login */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-sm text-slate-500">
            ¿Ya tenés cuenta?{' '}
            <Link href="/auth/login" className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
              Iniciar Sesión
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
