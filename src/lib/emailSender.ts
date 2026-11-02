import nodemailer from 'nodemailer'

export const MOTIVOS_CONTACTO = {
  'consulta-educativa': 'Sugerencia sobre guías o contenido educativo',
  simuladores: 'Reporte o mejora en los simuladores',
  'cuenta-privacidad': 'Mi cuenta / Privacidad y datos personales',
  'publicidad-institucional': 'Consultas institucionales o publicitarias',
} as const

export type MotivoContacto = keyof typeof MOTIVOS_CONTACTO

export type ConsultaContacto = {
  nombre: string
  email: string
  motivo: MotivoContacto
  mensaje: string
}

function destinoDe(motivo: MotivoContacto) {
  if (motivo === 'cuenta-privacidad') {
    return process.env.PRIVACIDAD_DESTINO?.trim() || 'privacidad@finbootcamp.com.ar'
  }
  return process.env.CONTACTO_DESTINO?.trim() || 'contacto@finbootcamp.com.ar'
}

function unaLinea(valor: string) {
  return valor.replace(/[\r\n]+/g, ' ').trim()
}

export async function enviarConsulta(consulta: ConsultaContacto) {
  const host = process.env.SMTP_HOST?.trim()
  const user = process.env.SMTP_USER?.trim()
  const pass = process.env.SMTP_PASS
  const port = Number(process.env.SMTP_PORT || 587)
  const secure = process.env.SMTP_SECURE === 'true' || port === 465

  if (!host || !user || !pass) {
    throw new Error('Falta la configuración SMTP de la casilla bot')
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  })

  const nombre = unaLinea(consulta.nombre)
  const email = unaLinea(consulta.email)
  const motivo = MOTIVOS_CONTACTO[consulta.motivo]
  const from = process.env.SMTP_FROM?.trim() || `FinBootcamp <${user}>`

  await transporter.sendMail({
    from,
    to: destinoDe(consulta.motivo),
    replyTo: `"${nombre.replace(/"/g, '')}" <${email}>`,
    subject: `[${motivo}] Consulta de ${nombre}`,
    text: [`Nombre: ${nombre}`, `Email: ${email}`, `Motivo: ${motivo}`, '', consulta.mensaje.trim()].join('\n'),
  })
}
