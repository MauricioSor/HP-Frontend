import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Cookie, Lock, UserCheck, ExternalLink, FileText, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Privacidad y Uso de Cookies | FinBootcamp',
  description:
    'Política de privacidad, protección de datos personales (Ley 25.326) y uso de cookies propias y de terceros (Google AdSense) en FinBootcamp.',
};

export default function PrivacidadPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-stone-500">
        <Link href="/" className="transition hover:text-[#12372c]">
          Inicio
        </Link>
        <ChevronRight className="h-4 w-4 text-stone-400" />
        <span className="font-semibold text-[#12372c]">Política de Privacidad</span>
      </nav>

      <header className="relative mb-10 overflow-hidden rounded-[2rem] bg-[#12372c] px-6 py-10 text-[#f4f1ea] shadow-[0_40px_80px_-45px_rgba(18,55,44,0.8)] sm:px-10 sm:py-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_-20%,rgba(212,175,106,0.28),transparent_45%),radial-gradient(ellipse_at_95%_10%,rgba(110,231,183,0.18),transparent_42%)]" />
        <div className="grain-overlay" />
        <div className="relative max-w-3xl">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#d4af6a]">
            <ShieldCheck className="h-4 w-4" />
            Transparencia y protección de datos
          </p>
          <h1 className="text-3xl font-medium sm:text-5xl">Política de Privacidad y Cookies</h1>
          <p className="mt-4 text-lg leading-relaxed text-emerald-50/85">
            En FinBootcamp valoramos y protegemos tu privacidad. Este documento detalla qué información
            recopilamos, cómo utilizamos las cookies propias y publicitarias (incluyendo Google AdSense) y
            cuáles son tus derechos bajo la legislación vigente en la República Argentina.
          </p>
          <p className="mt-4 text-xs text-emerald-100/60">
            Última actualización: noviembre de 2026
          </p>
        </div>
      </header>

      <div className="space-y-8 rounded-[1.8rem] border border-stone-200/80 bg-white/90 p-6 text-stone-700 shadow-[0_22px_50px_-38px_rgba(18,55,44,0.45)] sm:p-10">
        <section className="space-y-3">
          <h2 className="flex items-center gap-2.5 text-2xl font-medium text-[#12372c]">
            <FileText className="h-6 w-6 text-emerald-700" />
            1. Alcance y responsable del tratamiento
          </h2>
          <p className="leading-relaxed">
            La presente Política de Privacidad regula el tratamiento de los datos personales y de navegación de
            los usuarios que acceden y utilizan la plataforma web <strong>FinBootcamp</strong> (en adelante, el
            &ldquo;Sitio&rdquo; o la &ldquo;Plataforma&rdquo;), un portal de carácter estrictamente educativo e
            informativo sobre instrumentos financieros, mercado de capitales argentino, simuladores de
            inversión y educación tributaria.
          </p>
          <p className="leading-relaxed">
            El tratamiento de datos personales se realiza en estricto cumplimiento de la{' '}
            <strong>Ley N° 25.326 de Protección de los Datos Personales</strong> de la República Argentina, su
            Decreto Reglamentario N° 1558/2001 y las disposiciones complementarias dictadas por la Agencia de
            Acceso a la Información Pública (AAIP).
          </p>
        </section>

        <hr className="border-stone-200" />

        <section className="space-y-3">
          <h2 className="flex items-center gap-2.5 text-2xl font-medium text-[#12372c]">
            <Lock className="h-6 w-6 text-emerald-700" />
            2. Información que recopilamos
          </h2>
          <p className="leading-relaxed">
            El acceso a todo el contenido educativo de FinBootcamp (artículos del mercado bursátil, guías de
            bonos soberanos, mercado cripto, glosario financiero, cotizaciones y simuladores) es libre y
            público, sin requerir el registro de una cuenta. Solo recopilamos datos personales cuando el usuario
            decide registrarse voluntariamente o comunicarse con nosotros:
          </p>
          <ul className="list-disc space-y-2 pl-6 leading-relaxed">
            <li>
              <strong>Datos de cuenta y autenticación:</strong> dirección de correo electrónico, identificador
              de nombre de usuario y credenciales gestionadas de forma cifrada a través de Supabase Auth, o
              datos básicos de perfil público provistos al iniciar sesión con Google OAuth.
            </li>
            <li>
              <strong>Datos de perfil en la plataforma:</strong> nombre, apellido, número de documento (DNI),
              fecha de nacimiento, resultado del test de perfil del inversor (conservador, moderado o agresivo)
              y selección de instrumentos favoritos en la cartera educativa.
            </li>
            <li>
              <strong>Datos técnicos y de uso:</strong> dirección IP anonimizada, tipo de navegador, sistema
              operativo, páginas visitadas, tiempo de permanencia y preferencias técnicas necesarias para el
              funcionamiento seguro del Sitio.
            </li>
          </ul>
          <p className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-sm text-emerald-950">
            <strong>Importante:</strong> FinBootcamp no es un banco, sociedad de bolsa (ALyC) ni billetera
            virtual. Nunca solicitamos claves bancarias, semillas de billeteras criptográficas (seed phrases),
            claves fiscales ni transferencias de dinero para operar en el mercado.
          </p>
        </section>

        <hr className="border-stone-200" />

        <section id="cookies-adsense" className="space-y-4">
          <h2 className="flex items-center gap-2.5 text-2xl font-medium text-[#12372c]">
            <Cookie className="h-6 w-6 text-[#c99a45]" />
            3. Uso de Cookies, Google AdSense y Publicidad de Terceros
          </h2>
          <p className="leading-relaxed">
            FinBootcamp utiliza cookies propias y de terceros para garantizar el funcionamiento técnico de la
            sesión de usuario, recordar tus preferencias y financiar el mantenimiento gratuito del contenido
            educativo mediante espacios publicitarios gestionados por <strong>Google AdSense</strong>.
          </p>

          <div className="space-y-3 rounded-2xl border border-stone-200 bg-[#faf7f1] p-5 sm:p-6">
            <h3 className="text-lg font-semibold text-[#12372c]">
              Información obligatoria sobre Google AdSense y cookies publicitarias
            </h3>
            <ul className="list-disc space-y-2.5 pl-5 text-sm leading-relaxed text-stone-700">
              <li>
                <strong>Proveedores terceros:</strong> Los proveedores terceros, incluido Google, utilizan
                cookies para mostrar anuncios relevantes en función de las visitas anteriores del usuario a
                este sitio web o a otros sitios web en Internet.
              </li>
              <li>
                <strong>Uso de cookies publicitarias por parte de Google:</strong> El uso de cookies de
                publicidad (como la cookie de DoubleClick / DART) permite a Google y a sus socios mostrar
                anuncios a nuestros usuarios basados en su visita a FinBootcamp y/o a otros sitios de Internet.
              </li>
              <li>
                <strong>Cómo inhabilitar la publicidad personalizada:</strong> Los usuarios pueden inhabilitar
                el uso de la publicidad personalizada en cualquier momento accediendo a la{' '}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-emerald-800 underline hover:text-emerald-950"
                >
                  Configuración de anuncios de Google
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                . Asimismo, podés inhabilitar el uso de cookies de terceros para la publicidad personalizada
                visitando{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-emerald-800 underline hover:text-emerald-950"
                >
                  www.aboutads.info/choices
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                .
              </li>
              <li>
                <strong>Cómo utiliza Google los datos:</strong> Para conocer en detalle cómo Google recopila y
                procesa la información en los sitios que utilizan sus servicios, podés consultar la página
                oficial de Google:{' '}
                <a
                  href="https://policies.google.com/technologies/partner-sites?hl=es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-emerald-800 underline hover:text-emerald-950"
                >
                  Cómo utiliza Google la información de sitios o aplicaciones que utilizan nuestros servicios
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                .
              </li>
            </ul>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-stone-200 p-4">
              <h4 className="font-semibold text-[#12372c]">Cookies técnicas y de autenticación</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-stone-600">
                Son estrictamente necesarias para mantener activa la sesión autenticada mediante Supabase Auth
                y proteger las rutas privadas de la cuenta personal.
              </p>
            </div>
            <div className="rounded-2xl border border-stone-200 p-4">
              <h4 className="font-semibold text-[#12372c]">Widgets de terceros (TradingView)</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-stone-600">
                En la sección de cotizaciones integramos gráficos embebidos de TradingView, los cuales pueden
                emplear almacenamiento local para mostrar precios del mercado en tiempo real.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-stone-200" />

        <section className="space-y-3">
          <h2 className="text-2xl font-medium text-[#12372c]">4. Finalidad del tratamiento de datos</h2>
          <p className="leading-relaxed">
            Los datos proporcionados por los usuarios registrados se utilizan exclusivamente para:
          </p>
          <ul className="list-disc space-y-2 pl-6 leading-relaxed">
            <li>
              Permitir la personalización de la experiencia educativa (guardar el resultado del Test del
              Inversor y sugerir lecturas acordes al perfil conservador, moderado o agresivo).
            </li>
            <li>
              Sincronizar la lista de instrumentos de seguimiento en la sección &ldquo;Cartera&rdquo; entre
              distintos dispositivos del mismo usuario.
            </li>
            <li>
              Gestionar las preferencias del Plan Premium (visualización sin anuncios publicitarios).
            </li>
            <li>
              Responder consultas, sugerencias o reclamos enviados a través de nuestros canales de contacto.
            </li>
          </ul>
          <p className="leading-relaxed">
            <strong>No vendemos, alquilamos ni cedemos tus datos personales a terceros</strong> bajo ninguna
            circunstancia.
          </p>
        </section>

        <hr className="border-stone-200" />

        <section className="space-y-3">
          <h2 className="text-2xl font-medium text-[#12372c]">5. Seguridad y almacenamiento</h2>
          <p className="leading-relaxed">
            Toda la información se transmite mediante conexiones cifradas (HTTPS/TLS) y se aloja en servidores
            seguros provistos por Supabase con políticas de seguridad a nivel de fila (Row Level Security -
            RLS). Las contraseñas nunca se almacenan en texto plano; son procesadas mediante algoritmos de
            hashing criptográfico estándar de la industria.
          </p>
        </section>

        <hr className="border-stone-200" />

        <section className="space-y-3">
          <h2 className="flex items-center gap-2.5 text-2xl font-medium text-[#12372c]">
            <UserCheck className="h-6 w-6 text-emerald-700" />
            6. Derechos de acceso, rectificación y supresión (Ley N° 25.326)
          </h2>
          <p className="leading-relaxed">
            Como titular de tus datos personales, tenés derecho a acceder a ellos de forma gratuita a
            intervalos no inferiores a seis (6) meses, así como a solicitar su actualización, rectificación o
            supresión total. Podés editar directamente tus datos desde la sección{' '}
            <Link href="/mis-datos" className="font-semibold text-emerald-800 underline">
              Mis datos
            </Link>{' '}
            o solicitar la baja completa escribiéndonos a través de nuestra página de{' '}
            <Link href="/contacto" className="font-semibold text-emerald-800 underline">
              Contacto
            </Link>
            .
          </p>
          <p className="rounded-2xl border border-stone-200 bg-stone-50 p-4 text-xs leading-relaxed text-stone-600">
            <strong>Aviso legal (Resolución AAIP N° 14/2018):</strong> &ldquo;LA AGENCIA DE ACCESO A LA
            INFORMACIÓN PÚBLICA, en su carácter de Órgano de Control de la Ley N° 25.326, tiene la atribución
            de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por
            incumplimiento de las normas vigentes en materia de protección de datos personales.&rdquo;
          </p>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#12372c] p-6 text-[#f4f1ea]">
          <div>
            <h3 className="text-lg font-medium">¿Tenés dudas sobre el tratamiento de tus datos?</h3>
            <p className="mt-1 text-sm text-emerald-100/80">
              Escribinos y nuestro equipo responderá tu consulta a la brevedad.
            </p>
          </div>
          <Link
            href="/contacto"
            className="inline-flex items-center rounded-full bg-[#f4f1ea] px-6 py-2.5 text-sm font-semibold text-[#12372c] transition hover:bg-white"
          >
            Ir a Contacto
          </Link>
        </div>
      </div>
    </div>
  );
}
