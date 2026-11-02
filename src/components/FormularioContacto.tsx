'use client';

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function FormularioContacto() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [motivo, setMotivo] = useState('consulta-educativa');
  const [mensaje, setMensaje] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre.trim() || !email.trim() || !mensaje.trim() || enviando) return;

    setEnviando(true);
    setError('');

    try {
      const respuesta = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, motivo, mensaje }),
      });
      const datos = (await respuesta.json().catch(() => null)) as { error?: string } | null;
      if (!respuesta.ok) {
        setError(datos?.error || 'No pudimos enviar la consulta.');
        return;
      }
      setEnviado(true);
    } catch {
      setError('No pudimos enviar la consulta. Revisá tu conexión e intentá de nuevo.');
    } finally {
      setEnviando(false);
    }
  }

  if (enviado) {
    return (
      <div className="rounded-[1.6rem] border border-emerald-200 bg-emerald-50/90 p-8 text-center">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-emerald-600 text-white">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="text-2xl font-medium text-[#12372c]">¡Mensaje recibido!</h3>
        <p className="mx-auto mt-2 max-w-md text-stone-600">
          Gracias por escribirnos, <strong>{nombre}</strong>. La consulta llegó a la casilla del equipo y te
          vamos a responder a <strong>{email}</strong>.
        </p>
        <button
          type="button"
          onClick={() => {
            setEnviado(false);
            setMensaje('');
            setError('');
          }}
          className="mt-6 inline-flex items-center rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-[#12372c] transition hover:bg-stone-50"
        >
          Enviar otra consulta
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contacto-nombre" className="mb-1.5 block text-sm font-semibold text-[#12372c]">
            Tu nombre *
          </label>
          <input
            id="contacto-nombre"
            type="text"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Martín Gómez"
            className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 placeholder-stone-400 focus:border-[#12372c] focus:outline-none focus:ring-2 focus:ring-[#12372c]/20"
          />
        </div>
        <div>
          <label htmlFor="contacto-email" className="mb-1.5 block text-sm font-semibold text-[#12372c]">
            Correo electrónico *
          </label>
          <input
            id="contacto-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 placeholder-stone-400 focus:border-[#12372c] focus:outline-none focus:ring-2 focus:ring-[#12372c]/20"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contacto-motivo" className="mb-1.5 block text-sm font-semibold text-[#12372c]">
          Motivo de contacto
        </label>
        <select
          id="contacto-motivo"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 focus:border-[#12372c] focus:outline-none focus:ring-2 focus:ring-[#12372c]/20"
        >
          <option value="consulta-educativa">Sugerencia sobre guías o contenido educativo</option>
          <option value="simuladores">Reporte o mejora en los simuladores</option>
          <option value="cuenta-privacidad">Mi cuenta / Privacidad y datos personales</option>
          <option value="publicidad-institucional">Consultas institucionales o publicitarias</option>
        </select>
      </div>

      <div>
        <label htmlFor="contacto-mensaje" className="mb-1.5 block text-sm font-semibold text-[#12372c]">
          Mensaje *
        </label>
        <textarea
          id="contacto-mensaje"
          rows={5}
          required
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Contanos en qué podemos ayudarte o qué instrumento te gustaría que sumemos..."
          className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 placeholder-stone-400 focus:border-[#12372c] focus:outline-none focus:ring-2 focus:ring-[#12372c]/20"
        />
      </div>

      {error && (
        <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#12372c] px-7 py-3.5 text-sm font-semibold text-[#f4f1ea] shadow-[0_12px_30px_-14px_rgba(18,55,44,0.85)] transition hover:bg-[#17493b] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        <Send className="h-4 w-4" />
        {enviando ? 'Enviando…' : 'Enviar mensaje'}
      </button>
    </form>
  );
}
