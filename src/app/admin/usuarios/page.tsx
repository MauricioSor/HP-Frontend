'use client'

import { useState, useEffect, useCallback } from 'react'
import { UserPlus, Users, AlertCircle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react'

interface Usuario {
  usuario: string
  rol: number
  alta: string
  estado: number
}

interface Persona {
  dni: number
  nombre: string | null
  correo: string | null
  direccion: string | null
  situacion_laboral: string | null
  perfil_inversor: string | null
  cuit: string | null
  nacimiento: string | null
  usuario: string
}

const rolLabels: Record<number, string> = {
  0: 'Usuario',
  1: 'Administrador',
  2: 'Moderador',
}

export default function AdminUsuariosPage() {
  // Estado del formulario de usuario
  const [formUsuario, setFormUsuario] = useState('')
  const [formContraseña, setFormContraseña] = useState('')
  const [formRol, setFormRol] = useState(0)
  const [formEstado, setFormEstado] = useState(1)

  // Estado del formulario de persona
  const [showPersona, setShowPersona] = useState(false)
  const [formDni, setFormDni] = useState('')
  const [formNombre, setFormNombre] = useState('')
  const [formCorreo, setFormCorreo] = useState('')
  const [formDireccion, setFormDireccion] = useState('')
  const [formSituacionLaboral, setFormSituacionLaboral] = useState('')
  const [formPerfil, setFormPerfil] = useState('')
  const [formCuit, setFormCuit] = useState('')
  const [formNacimiento, setFormNacimiento] = useState('')

  // Estado general
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [personas, setPersonas] = useState<Persona[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const fetchUsuarios = useCallback(async () => {
    try {
      const res = await fetch('/api/usuarios')
      if (res.ok) {
        const data = await res.json()
        setUsuarios(data.usuarios || [])
        setPersonas(data.personas || [])
      }
    } catch {
      // silenciar errores de fetch
    }
  }, [])

  useEffect(() => {
    fetchUsuarios()
  }, [fetchUsuarios])

  function resetForm() {
    setFormUsuario('')
    setFormContraseña('')
    setFormRol(0)
    setFormEstado(1)
    setShowPersona(false)
    setFormDni('')
    setFormNombre('')
    setFormCorreo('')
    setFormDireccion('')
    setFormSituacionLaboral('')
    setFormPerfil('')
    setFormCuit('')
    setFormNacimiento('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsSubmitting(true)

    const payload: Record<string, unknown> = {
      usuario: formUsuario,
      contraseña: formContraseña,
      rol: formRol,
      estado: formEstado,
    }

    if (showPersona && formDni) {
      payload.persona = {
        dni: parseInt(formDni),
        nombre: formNombre || null,
        correo: formCorreo || null,
        direccion: formDireccion || null,
        situacion_laboral: formSituacionLaboral || null,
        perfil_inversor: formPerfil || null,
        cuit: formCuit || null,
        nacimiento: formNacimiento || null,
      }
    }

    try {
      const res = await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (res.ok && (data.success || data.warning)) {
        setSuccess(data.warning || data.message || 'Usuario creado exitosamente')
        resetForm()
        fetchUsuarios()
      } else {
        setError(data.error || 'Error al crear el usuario')
      }
    } catch {
      setError('Error de conexión')
    } finally {
      setIsSubmitting(false)
    }
  }

  function getPersonaForUsuario(usuarioName: string) {
    return personas.find((p) => p.usuario === usuarioName)
  }

  return (
    <div className="flex-1 bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Users className="w-8 h-8 text-emerald-600" />
            Gestión de Usuarios
          </h1>
          <p className="mt-2 text-slate-500">Crear y administrar usuarios del sistema</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Formulario de creación */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
                <UserPlus className="w-5 h-5 text-emerald-600" />
                Crear Usuario
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Mensajes */}
                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
                {success && (
                  <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{success}</span>
                  </div>
                )}

                {/* Datos del usuario */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Nombre de usuario *
                  </label>
                  <input
                    type="text"
                    value={formUsuario}
                    onChange={(e) => setFormUsuario(e.target.value)}
                    required
                    placeholder="ej: juan.perez"
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Contraseña *
                  </label>
                  <input
                    type="password"
                    value={formContraseña}
                    onChange={(e) => setFormContraseña(e.target.value)}
                    required
                    placeholder="Contraseña segura"
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Rol</label>
                    <select
                      value={formRol}
                      onChange={(e) => setFormRol(Number(e.target.value))}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value={0}>Usuario</option>
                      <option value={1}>Administrador</option>
                      <option value={2}>Moderador</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Estado</label>
                    <select
                      value={formEstado}
                      onChange={(e) => setFormEstado(Number(e.target.value))}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value={1}>Activo</option>
                      <option value={0}>Inactivo</option>
                    </select>
                  </div>
                </div>

                {/* Toggle persona */}
                <button
                  type="button"
                  onClick={() => setShowPersona(!showPersona)}
                  className="w-full flex items-center justify-between px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <span>Datos personales (opcional)</span>
                  {showPersona ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {showPersona && (
                  <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">DNI *</label>
                      <input
                        type="number"
                        value={formDni}
                        onChange={(e) => setFormDni(e.target.value)}
                        placeholder="12345678"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Nombre completo</label>
                      <input
                        type="text"
                        value={formNombre}
                        onChange={(e) => setFormNombre(e.target.value)}
                        placeholder="Juan Pérez"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Correo electrónico</label>
                      <input
                        type="email"
                        value={formCorreo}
                        onChange={(e) => setFormCorreo(e.target.value)}
                        placeholder="juan@email.com"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Dirección</label>
                      <input
                        type="text"
                        value={formDireccion}
                        onChange={(e) => setFormDireccion(e.target.value)}
                        placeholder="Av. Siempre Viva 742"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Situación Laboral</label>
                        <input
                          type="text"
                          value={formSituacionLaboral}
                          onChange={(e) => setFormSituacionLaboral(e.target.value)}
                          placeholder="Empleado"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">perfil_inversor</label>
                        <input
                          type="text"
                          value={formPerfil}
                          onChange={(e) => setFormPerfil(e.target.value)}
                          placeholder="Conservador"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">CUIT</label>
                        <input
                          type="text"
                          value={formCuit}
                          onChange={(e) => setFormCuit(e.target.value)}
                          placeholder="20-12345678-9"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Nacimiento</label>
                        <input
                          type="date"
                          value={formNacimiento}
                          onChange={(e) => setFormNacimiento(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creando...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      Crear Usuario
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Tabla de usuarios */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200">
                <h2 className="text-lg font-bold text-slate-900">
                  Usuarios registrados ({usuarios.length})
                </h2>
              </div>

              {usuarios.length === 0 ? (
                <div className="p-12 text-center text-slate-400">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">No hay usuarios registrados</p>
                  <p className="text-sm mt-1">Creá el primer usuario usando el formulario</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-3 font-semibold text-slate-600">Usuario</th>
                        <th className="px-6 py-3 font-semibold text-slate-600">Persona</th>
                        <th className="px-6 py-3 font-semibold text-slate-600">Rol</th>
                        <th className="px-6 py-3 font-semibold text-slate-600">Estado</th>
                        <th className="px-6 py-3 font-semibold text-slate-600">Alta</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {usuarios.map((u) => {
                        const persona = getPersonaForUsuario(u.usuario)
                        return (
                          <tr key={u.usuario} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-slate-900">{u.usuario}</td>
                            <td className="px-6 py-4 text-slate-600">
                              {persona ? (
                                <div>
                                  <div className="font-medium">{persona.nombre || '—'}</div>
                                  <div className="text-xs text-slate-400">DNI: {persona.dni}</div>
                                </div>
                              ) : (
                                <span className="text-slate-400">Sin datos</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                {rolLabels[u.rol] || `Rol ${u.rol}`}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                  u.estado === 1
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : 'bg-red-50 text-red-700'
                                }`}
                              >
                                {u.estado === 1 ? 'Activo' : 'Inactivo'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-slate-500 text-xs">
                              {u.alta
                                ? new Date(u.alta).toLocaleDateString('es-AR', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                  })
                                : '—'}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
