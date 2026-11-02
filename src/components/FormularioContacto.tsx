'use client';

import { useState } from 'react';
import { Send, CheckCircle2, Mail } from 'lucide-react';

export default function FormularioContacto() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [motivo, setMotivo] = useState('consulta-educativa');
  const [mensaje, setMensaje] = useState('');
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre.trim() || !email.trim() || !mensaje.trim()) return;
    setEnviado(true);
  }

  if (enviado) {
    return (
      <div className="rounded-[1.6rem] border border-emerald-200 bg-emerald-50/90 p-8 text-center">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-emerald-600 text-white">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="text-2xl font-medium text-[#12372c]">¡Mensaje recibido!</h3>
        <p className="mx-auto mt-2 max-w-md text-stone-600">
          Gracias por escribirnos, <strong>{nombre}</strong>. Registramos tu consulta y también podés enviarla
          directamente desde tu correo haciendo clic abajo.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:contacto@finbootcamp.com.ar?subject=${encodeURIComponent(
              `[${motivo}] Consulta de ${nombre}`
            )}&body=${encodeURIComponent(`${mensaje}\n\n---\nNombre: ${nombre}\nEmail: ${email}`)}`}
            className="inline-flex items-center gap-2 rounded-full bg-[#12372c] px-6 py-2.5 text-sm font-semibold text-[#f4f1ea] transition hover:bg-[#17493b]"
          >
            <Mail className="h-4 w-4" />
            Abrir en mi cliente de correo
          </a>
          <button
            type="button"
            onClick={() => {
              setEnviado(false);
              setMensaje('');
            }}
            className="inline-flex items-center rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-[#12372c] transition hover:bg-stone-50"
          >
            Enviar otra consulta
          </button>
        </div>
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

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#12372c] px-7 py-3.5 text-sm font-semibold text-[#f4f1ea] shadow-[0_12px_30px_-14px_rgba(18,55,44,0.85)] transition hover:bg-[#17493b] sm:w-auto"
      >
        <Send className="h-4 w-4" />
        Enviar mensaje
      </button>
    </form>
  );
}
