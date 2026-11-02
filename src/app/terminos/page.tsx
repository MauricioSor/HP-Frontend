import type { Metadata } from 'next';
import Link from 'next/link';
import { Scale, AlertTriangle, Calculator, BookOpen, ShieldAlert, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Términos y Condiciones de Uso | FinBootcamp',
  description:
    'Términos y condiciones de uso de FinBootcamp. Descargo de responsabilidad financiera, carácter educativo de las herramientas y normas de uso.',
};

export default function TerminosPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-stone-500">
        <Link href="/" className="transition hover:text-[#12372c]">
          Inicio
        </Link>
        <ChevronRight className="h-4 w-4 text-stone-400" />
        <span className="font-semibold text-[#12372c]">Términos y Condiciones</span>
      </nav>

      <header className="relative mb-10 overflow-hidden rounded-[2rem] bg-[#12372c] px-6 py-10 text-[#f4f1ea] shadow-[0_40px_80px_-45px_rgba(18,55,44,0.8)] sm:px-10 sm:py-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_-20%,rgba(212,175,106,0.28),transparent_45%),radial-gradient(ellipse_at_95%_10%,rgba(110,231,183,0.18),transparent_42%)]" />
        <div className="grain-overlay" />
        <div className="relative max-w-3xl">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#d4af6a]">
            <Scale className="h-4 w-4" />
            Marco legal y condiciones de uso
          </p>
          <h1 className="text-3xl font-medium sm:text-5xl">Términos y Condiciones</h1>
          <p className="mt-4 text-lg leading-relaxed text-emerald-50/85">
            Conocé las reglas de uso de FinBootcamp, el alcance estrictamente educativo de nuestras guías y
            simuladores, y las responsabilidades aplicables al utilizar la plataforma.
          </p>
          <p className="mt-4 text-xs text-emerald-100/60">
            Última actualización: noviembre de 2026
          </p>
        </div>
      </header>

      <div className="space-y-8 rounded-[1.8rem] border border-stone-200/80 bg-white/90 p-6 text-stone-700 shadow-[0_22px_50px_-38px_rgba(18,55,44,0.45)] sm:p-10">
        <section className="rounded-2xl border border-amber-200 bg-amber-50/90 p-5 sm:p-6">
          <h2 className="flex items-center gap-2.5 text-xl font-semibold text-amber-950">
            <AlertTriangle className="h-6 w-6 shrink-0 text-amber-700" />
            Aviso importante: Carácter estrictamente educativo (No es asesoramiento financiero)
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-amber-950/90">
            Todo el contenido publicado en <strong>FinBootcamp</strong> —incluyendo fichas de instrumentos
            bursátiles, artículos sobre criptoactivos, guías impositivas, glosario, resultados del Test del
            Inversor, cotizaciones y simuladores de inversión o préstamos— tiene fines{' '}
            <strong>exclusivamente educativos, académicos e informativos</strong>. Bajo ninguna circunstancia
            constituye asesoramiento financiero, bursátil, legal, contable ni impositivo, ni una oferta,
            invitación o recomendación de compra o venta de valores negociables en los términos de la Ley N°
            26.831 de Mercado de Capitales y las normas de la Comisión Nacional de Valores (CNV).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="flex items-center gap-2.5 text-2xl font-medium text-[#12372c]">
            <BookOpen className="h-6 w-6 text-emerald-700" />
            1. Aceptación de los Términos
          </h2>
          <p className="leading-relaxed">
            El acceso y la navegación por el sitio web FinBootcamp implican la aceptación plena y sin reservas
            de los presentes Términos y Condiciones de Uso y de nuestra{' '}
            <Link href="/privacidad" className="font-semibold text-emerald-800 underline">
              Política de Privacidad
            </Link>
            . Si no estás de acuerdo con alguna de estas disposiciones, te solicitamos abstenerte de utilizar la
            Plataforma.
          </p>
        </section>

        <hr className="border-stone-200" />

        <section className="space-y-3">
          <h2 className="flex items-center gap-2.5 text-2xl font-medium text-[#12372c]">
            <Calculator className="h-6 w-6 text-emerald-700" />
            2. Uso de Simuladores, Calculadoras y Cotizaciones
          </h2>
          <p className="leading-relaxed">
            FinBootcamp pone a disposición de sus visitantes herramientas interactivas de simulación de
            interés compuesto, cálculo de préstamos (sistema francés en pesos, UVA y dólares) y paneles de
            cotizaciones:
          </p>
          <ul className="list-disc space-y-2 pl-6 leading-relaxed">
            <li>
              <strong>Tasas y proyecciones estimativas:</strong> Las tasas nominales anuales (TNA), tasas
              efectivas (TEA), costos financieros (CFTEA) e índices de inflación preconfigurados en el
              simulador son valores de referencia pedagógica. Los rendimientos pasados o simulados no
              garantizan resultados futuros.
            </li>
            <li>
              <strong>Cotizaciones de mercado:</strong> Los precios de bonos, acciones, CEDEARs y
              criptomonedas provistos mediante widgets de terceros (TradingView) tienen fines orientativos y
              pueden presentar demoras respecto de las ruedas oficiales de BYMA o mercados internacionales.
            </li>
            <li>
              <strong>Información impositiva:</strong> Los cuadros comparativos sobre Impuesto a las Ganancias,
              Bienes Personales e Impuesto a los Débitos y Créditos Bancarios resumen la normativa vigente para
              personas humanas residentes en Argentina a modo orientativo. La situación fiscal particular de
              cada contribuyente debe ser validada siempre con un Contador Público matriculado.
            </li>
          </ul>
        </section>

        <hr className="border-stone-200" />

        <section className="space-y-3">
          <h2 className="flex items-center gap-2.5 text-2xl font-medium text-[#12372c]">
            <ShieldAlert className="h-6 w-6 text-emerald-700" />
            3. Riesgos de la inversión en el mercado de capitales y criptoactivos
          </h2>
          <p className="leading-relaxed">
            Invertir en instrumentos de renta fija, renta variable o activos digitales conlleva riesgos que
            incluyen la volatilidad de precios, el riesgo de crédito del emisor, el riesgo cambiario, el riesgo
            de liquidez y la posible pérdida parcial o total del capital invertido. Antes de operar en el
            mercado real a través de un Agente de Liquidación y Compensación (ALyC) registrado ante la CNV, el
            usuario debe leer los prospectos oficiales de emisión y evaluar su propia tolerancia al riesgo.
          </p>
        </section>

        <hr className="border-stone-200" />

        <section className="space-y-3">
          <h2 className="text-2xl font-medium text-[#12372c]">4. Cuentas de Usuario y Plan Premium</h2>
          <p className="leading-relaxed">
            Para acceder a funcionalidades personalizadas como el guardado de favoritos en la Cartera
            educativa, las sugerencias según perfil de riesgo o el Plan Premium sin anuncios, el usuario puede
            crear una cuenta gratuita:
          </p>
          <ul className="list-disc space-y-2 pl-6 leading-relaxed">
            <li>
              El usuario se compromete a suministrar información veraz y a mantener la confidencialidad de sus
              credenciales de acceso.
            </li>
            <li>
              Está prohibido el uso de la Plataforma con fines ilícitos, fraudulentos, para realizar scraping
              automatizado no autorizado o intentar vulnerar la seguridad del sitio.
            </li>
            <li>
              FinBootcamp se reserva el derecho de suspender o dar de baja cuentas que incumplan estos
              Términos.
            </li>
          </ul>
        </section>

        <hr className="border-stone-200" />

        <section className="space-y-3">
          <h2 className="text-2xl font-medium text-[#12372c]">5. Propiedad Intelectual</h2>
          <p className="leading-relaxed">
            Los textos originales, guías explicativas, diseño gráfico, logotipos, código fuente y estructura
            de navegación de FinBootcamp se encuentran protegidos por la Ley N° 11.723 de Régimen Legal de la
            Propiedad Intelectual de la República Argentina. Se permite la cita con fines educativos o
            periodísticos mencionando expresamente la fuente y enlazando a FinBootcamp.
          </p>
        </section>

        <hr className="border-stone-200" />

        <section className="space-y-3">
          <h2 className="text-2xl font-medium text-[#12372c]">6. Publicidad y Enlaces a Terceros</h2>
          <p className="leading-relaxed">
            FinBootcamp exhibe anuncios publicitarios provistos por la red <strong>Google AdSense</strong>. Los
            anuncios están claramente diferenciados del contenido editorial y educativo. FinBootcamp no
            respalda ni garantiza los productos o servicios ofrecidos por anunciantes externos, y el acceso a
            sitios de terceros se realiza bajo exclusiva cuenta y riesgo del visitante.
          </p>
        </section>

        <hr className="border-stone-200" />

        <section className="space-y-3">
          <h2 className="text-2xl font-medium text-[#12372c]">7. Ley Aplicable y Jurisdicción</h2>
          <p className="leading-relaxed">
            Estos Términos y Condiciones se rigen e interpretan conforme a las leyes de la República Argentina.
            Cualquier controversia derivada de su interpretación o aplicación será sometida a la jurisdicción de
            los Tribunales Ordinarios competentes de la República Argentina.
          </p>
        </section>
      </div>
    </div>
  );
}
