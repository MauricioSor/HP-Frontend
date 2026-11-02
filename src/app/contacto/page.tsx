import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MessageSquare, GraduationCap, ShieldCheck, MapPin, ChevronRight, BookOpen } from 'lucide-react';
import FormularioContacto from '@/components/FormularioContacto';

export const metadata: Metadata = {
  title: 'Contacto y Acerca de FinBootcamp | Educación Financiera Argentina',
  description:
    'Conocé la misión educativa de FinBootcamp y ponete en contacto con nuestro equipo por consultas sobre el mercado argentino, simuladores o privacidad.',
};

export default function ContactoPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-stone-500">
        <Link href="/" className="transition hover:text-[#12372c]">
          Inicio
        </Link>
        <ChevronRight className="h-4 w-4 text-stone-400" />
        <span className="font-semibold text-[#12372c]">Contacto y Acerca de</span>
      </nav>

      <header className="relative mb-12 overflow-hidden rounded-[2rem] bg-[#12372c] px-6 py-10 text-[#f4f1ea] shadow-[0_40px_80px_-45px_rgba(18,55,44,0.8)] sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_-20%,rgba(212,175,106,0.28),transparent_45%),radial-gradient(ellipse_at_95%_10%,rgba(110,231,183,0.18),transparent_42%)]" />
        <div className="grain-overlay" />
        <div className="relative max-w-3xl">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#d4af6a]">
            <GraduationCap className="h-4 w-4" />
            Institucional y soporte
          </p>
          <h1 className="text-3xl font-medium sm:text-5xl">Acerca de FinBootcamp y Contacto</h1>
          <p className="mt-4 text-lg leading-relaxed text-emerald-50/85">
            FinBootcamp nació con un objetivo claro: acercar educación financiera rigurosa, gratuita y en
            lenguaje llano para entender los instrumentos reales del mercado argentino sin promesas mágicas.
          </p>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
        <div className="space-y-8">
          <section className="rounded-[1.8rem] border border-stone-200/80 bg-white/90 p-6 shadow-[0_22px_50px_-38px_rgba(18,55,44,0.45)] sm:p-8">
            <h2 className="text-2xl font-medium text-[#12372c]">Nuestra misión educativa</h2>
            <p className="mt-3 leading-relaxed text-stone-700">
              En Argentina, ahorrar e invertir requiere comprender conceptos particulares que no suelen
              explicarse en los manuales financieros extranjeros: desde qué es una LECAP, cómo cotizan los
              bonos soberanos en pesos y en dólares (AL30, GD30), cómo funcionan las cauciones bursátiles y
              los CEDEARs, hasta cómo impactan el coeficiente CER, las UVAs y el tratamiento en el Impuesto a
              las Ganancias y Bienes Personales para personas humanas.
            </p>
            <p className="mt-3 leading-relaxed text-stone-700">
              Por eso desarrollamos <strong>FinBootcamp</strong> como un proyecto académico y abierto que
              reúne guías prácticas, fichas técnicas verificadas, un glosario local y calculadoras de
              inversión y préstamos para que cualquier persona pueda analizar números con criterio propio antes
              de tomar una decisión.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-stone-200 bg-[#faf7f1] p-4">
                <BookOpen className="mb-2 h-5 w-5 text-emerald-800" />
                <h3 className="font-semibold text-[#12372c]">Contenido 100% original</h3>
                <p className="mt-1 text-xs leading-relaxed text-stone-600">
                  Guías redactadas específicamente para la normativa de CNV, BYMA y el régimen tributario
                  argentino.
                </p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-[#faf7f1] p-4">
                <ShieldCheck className="mb-2 h-5 w-5 text-emerald-800" />
                <h3 className="font-semibold text-[#12372c]">Independencia editorial</h3>
                <p className="mt-1 text-xs leading-relaxed text-stone-600">
                  No somos un broker ni cobramos comisiones por operaciones. Nuestro enfoque es puramente
                  formativo.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[1.8rem] border border-stone-200/80 bg-white/90 p-6 shadow-[0_22px_50px_-38px_rgba(18,55,44,0.45)] sm:p-8">
            <h2 className="mb-4 flex items-center gap-2.5 text-2xl font-medium text-[#12372c]">
              <MessageSquare className="h-6 w-6 text-emerald-700" />
              Envianos tu consulta
            </h2>
            <p className="mb-6 text-sm text-stone-600">
              ¿Encontraste algún dato desactualizado, tenés una sugerencia para el simulador o querés hacer una
              consulta sobre privacidad? Completá el formulario:
            </p>
            <FormularioContacto />
          </section>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[1.8rem] border border-stone-200/80 bg-white/90 p-6 shadow-[0_22px_50px_-38px_rgba(18,55,44,0.45)] sm:p-8">
            <h2 className="text-xl font-medium text-[#12372c]">Canales directos</h2>
            <p className="mt-2 text-sm text-stone-600">
              También podés comunicarte directamente por correo electrónico según el área correspondiente:
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3.5 rounded-2xl border border-stone-200 p-4">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    Consultas generales y académicas
                  </p>
                  <a
                    href="mailto:contacto@finbootcamp.com.ar"
                    className="mt-0.5 block font-semibold text-[#12372c] hover:text-emerald-800"
                  >
                    contacto@finbootcamp.com.ar
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-2xl border border-stone-200 p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    Privacidad y datos personales (Ley 25.326)
                  </p>
                  <a
                    href="mailto:privacidad@finbootcamp.com.ar"
                    className="mt-0.5 block font-semibold text-[#12372c] hover:text-emerald-800"
                  >
                    privacidad@finbootcamp.com.ar
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-2xl border border-stone-200 p-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    Ubicación y enfoque
                  </p>
                  <p className="mt-0.5 font-medium text-[#12372c]">República Argentina</p>
                  <p className="text-xs text-stone-500">
                    Plataforma digital de educación financiera enfocada en el mercado local (BYMA / CNV).
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-stone-200/80 bg-white/90 p-6 shadow-[0_22px_50px_-38px_rgba(18,55,44,0.45)] sm:p-8">
            <h2 className="text-xl font-medium text-[#12372c]">Preguntas frecuentes</h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="font-semibold text-[#12372c]">
                  ¿Se puede invertir dinero real dentro de FinBootcamp?
                </dt>
                <dd className="mt-1 leading-relaxed text-stone-600">
                  No. FinBootcamp es una plataforma 100% educativa. Nunca recibimos depósitos ni intermediamos
                  en la compraventa de títulos valores.
                </dd>
              </div>
              <hr className="border-stone-100" />
              <div>
                <dt className="font-semibold text-[#12372c]">
                  ¿Necesito registrarme para usar los simuladores o leer las guías?
                </dt>
                <dd className="mt-1 leading-relaxed text-stone-600">
                  No. Todas las fichas de instrumentos, las guías paso a paso, el glosario y los simuladores
                  son de acceso público y gratuito. La cuenta solo es necesaria si querés guardar tu cartera de
                  favoritos o tu perfil del inversor.
                </dd>
              </div>
              <hr className="border-stone-100" />
              <div>
                <dt className="font-semibold text-[#12372c]">
                  ¿Cómo elimino o modifico mis datos personales?
                </dt>
                <dd className="mt-1 leading-relaxed text-stone-600">
                  Podés editarlos en cualquier momento desde{' '}
                  <Link href="/mis-datos" className="font-semibold text-emerald-800 underline">
                    Mis datos
                  </Link>{' '}
                  o solicitarnos la baja definitiva escribiendo por este medio.
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}
