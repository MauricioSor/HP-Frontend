import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cryptoTopics } from '@/data/crypto-topics';
import { ChevronRight, ShieldAlert, ArrowRight, ArrowLeft, Clock, ClipboardList, Lightbulb, ListChecks } from 'lucide-react';
import BotonFavorito from '@/components/BotonFavorito';
import { LogoTema, metaTema } from '@/components/LogoCripto';
import { cn } from '@/lib/utils';
import AdBanner from '@/components/AdBanner';

export function generateStaticParams() {
  return cryptoTopics.map((topic) => ({
    slug: topic.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = cryptoTopics.find((t) => t.slug === slug);

  if (!topic) {
    return { title: 'Tema no encontrado' };
  }

  return {
    title: `${topic.title} | Criptomonedas | FinBootcamp`,
    description: topic.shortDescription,
  };
}

const RIESGO = {
  bajo: { nivel: 1, chip: 'bg-emerald-100 text-emerald-800 border-emerald-200', barra: 'bg-emerald-500' },
  medio: { nivel: 2, chip: 'bg-amber-100 text-amber-900 border-amber-200', barra: 'bg-amber-500' },
  alto: { nivel: 3, chip: 'bg-rose-100 text-rose-800 border-rose-200', barra: 'bg-rose-500' },
  muy_alto: { nivel: 4, chip: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200', barra: 'bg-fuchsia-500' },
} as const;

function MedidorRiesgo({ riesgo }: { riesgo: keyof typeof RIESGO }) {
  const r = RIESGO[riesgo] ?? RIESGO.medio;
  return (
    <span className="flex items-end gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4].map((n) => (
        <span
          key={n}
          className={cn('w-1 rounded-full', n <= r.nivel ? r.barra : 'bg-stone-300/70')}
          style={{ height: `${0.4 + n * 0.16}rem` }}
        />
      ))}
    </span>
  );
}

/** Convierte **negritas** y *cursivas* en elementos React, sin usar HTML crudo. */
function TextoEnriquecido({ texto }: { texto: string }) {
  const partes = texto.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return (
    <>
      {partes.map((parte, i) => {
        if (parte.length > 4 && parte.startsWith('**') && parte.endsWith('**')) {
          return (
            <strong key={i} className="font-semibold text-[#12372c]">
              {parte.slice(2, -2)}
            </strong>
          );
        }
        if (parte.length > 2 && parte.startsWith('*') && parte.endsWith('*')) {
          return (
            <em key={i} className="italic text-stone-800">
              {parte.slice(1, -1)}
            </em>
          );
        }
        return <span key={i}>{parte}</span>;
      })}
    </>
  );
}

export default async function CryptoDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = cryptoTopics.find((t) => t.slug === slug);

  if (!topic) {
    notFound();
  }

  const meta = metaTema(topic.slug);
  const riesgo = RIESGO[topic.risk] ?? RIESGO.medio;
  const etiquetaRiesgo = topic.risk.replace('_', ' ');

  const parrafos = (topic.content ?? '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const textoParaTiempo = [topic.content, ...(topic.keyPoints ?? [])].join(' ');
  const minutos = Math.max(1, Math.round(textoParaTiempo.split(/\s+/).length / 200));

  const relacionados = (topic.relatedTopics ?? [])
    .map((id) => cryptoTopics.find((t) => t.id === id))
    .filter((t): t is NonNullable<typeof t> => !!t && t.slug !== topic.slug);
  const relatedTopics = (relacionados.length > 0
    ? relacionados
    : cryptoTopics.filter((t) => t.slug !== topic.slug)
  ).slice(0, 4);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-stone-500">
        <Link href="/" className="transition-colors hover:text-[#12372c]">Inicio</Link>
        <ChevronRight className="h-4 w-4 text-stone-400" />
        <Link href="/cripto" className="transition-colors hover:text-[#12372c]">Cripto</Link>
        <ChevronRight className="h-4 w-4 text-stone-400" />
        <span className="max-w-[16rem] truncate font-semibold text-[#12372c] md:max-w-none">{topic.title}</span>
      </nav>

      {/* Header */}
      <header className="relative mb-10 overflow-hidden rounded-[2rem] bg-[#12372c] text-[#f4f1ea] shadow-[0_40px_80px_-45px_rgba(18,55,44,0.8)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_-30%,rgba(212,175,106,0.28),transparent_45%),radial-gradient(ellipse_at_100%_0%,rgba(110,231,183,0.2),transparent_42%)]" />
        <div className={cn('pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full blur-3xl', meta.halo)} />
        <div className="grain-overlay" />
        <div className="relative px-6 py-8 sm:px-10 sm:py-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <LogoTema slug={topic.slug} size="lg" />
            <div className="min-w-0 flex-1">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#d4af6a]">
                Blog cripto
              </p>
              <h1 className="text-3xl font-medium leading-tight sm:text-5xl">{topic.title}</h1>
              <p className="mt-4 max-w-3xl text-lg text-emerald-50/80">{topic.shortDescription}</p>

              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                <span
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-semibold capitalize',
                    riesgo.chip
                  )}
                >
                  <MedidorRiesgo riesgo={topic.risk} />
                  Riesgo {etiquetaRiesgo}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-medium text-emerald-50">
                  <Clock className="h-4 w-4" />
                  {minutos} min de lectura
                </span>
                <BotonFavorito slug={topic.slug} tipo="cripto" riesgo={topic.risk} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <AdBanner slot="cripto-tema-horizontal" format="horizontal" className="mb-8" />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="min-w-0 space-y-8">
          {/* Artículo */}
          <article className="rounded-[1.8rem] bg-white/85 p-6 shadow-[0_22px_50px_-38px_rgba(18,55,44,0.55)] ring-1 ring-stone-200/70 backdrop-blur-sm sm:p-10">
            {parrafos.length > 0 ? (
              parrafos.map((parrafo, i) => (
                <p
                  key={i}
                  className={cn(
                    'whitespace-pre-line text-stone-700',
                    i === 0
                      ? 'border-l-4 border-[#d4af6a] pl-5 text-xl leading-relaxed text-stone-800'
                      : 'mt-6 text-[1.075rem] leading-[1.85]'
                  )}
                >
                  <TextoEnriquecido texto={parrafo} />
                </p>
              ))
            ) : (
              <p className="text-lg leading-relaxed text-stone-700">{topic.shortDescription}</p>
            )}
          </article>

          {/* Puntos clave */}
          {topic.keyPoints && topic.keyPoints.length > 0 && (
            <section className="relative overflow-hidden rounded-[1.8rem] bg-[#12372c] p-6 text-[#f4f1ea] shadow-[0_30px_60px_-36px_rgba(18,55,44,0.8)] sm:p-10">
              <div className="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full bg-[#d4af6a]/20 blur-3xl" />
              <div className="grain-overlay" />
              <h2 className="relative mb-6 flex items-center gap-3 text-2xl font-medium">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#d4af6a] text-[#12372c]">
                  <ListChecks className="h-5 w-5" />
                </span>
                Puntos clave
              </h2>
              <ol className="relative space-y-4">
                {topic.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#d4af6a]/60 bg-white/5 font-heading text-sm text-[#d4af6a]">
                      {index + 1}
                    </span>
                    <span className="leading-relaxed text-emerald-50/90">{point}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Advertencia de riesgo */}
          {(topic.risk === 'alto' || topic.risk === 'muy_alto') && (
            <section className="flex items-start gap-4 rounded-[1.6rem] border border-rose-200 bg-rose-50/90 p-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-rose-600 ring-1 ring-rose-200">
                <ShieldAlert className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-lg font-medium text-rose-950">Advertencia de riesgo</h3>
                <p className="mt-1 text-sm leading-relaxed text-rose-900/85">
                  Este tema involucra activos de riesgo {topic.risk === 'muy_alto' ? 'muy alto' : 'alto'}. Invertí solo lo
                  que estés dispuesto a perder y nunca inviertas dinero que necesites a corto plazo.
                </p>
              </div>
            </section>
          )}

          {/* Temas relacionados */}
          {relatedTopics.length > 0 && (
            <section>
              <h2 className="mb-5 text-2xl font-medium text-[#12372c]">Seguí leyendo</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {relatedTopics.map((related) => (
                  <Link href={`/cripto/${related.slug}`} key={related.id} className="group">
                    <div className="flex h-full items-center gap-4 rounded-[1.5rem] bg-white/85 p-4 ring-1 ring-stone-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-34px_rgba(18,55,44,0.6)]">
                      <LogoTema slug={related.slug} className="h-14 w-14" />
                      <span className="min-w-0 flex-1 font-medium leading-snug text-[#12372c]">{related.title}</span>
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#12372c] text-[#f4f1ea] transition group-hover:bg-[#d4af6a] group-hover:text-[#12372c]">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[1.8rem] bg-white/85 p-6 shadow-[0_22px_50px_-38px_rgba(18,55,44,0.55)] ring-1 ring-stone-200/70 backdrop-blur-sm">
            <h3 className="mb-5 text-lg font-medium text-[#12372c]">Resumen del tema</h3>
            <dl className="space-y-5">
              <div>
                <dt className="mb-1 text-sm text-stone-500">Riesgo asociado</dt>
                <dd>
                  <span
                    className={cn(
                      'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-semibold capitalize',
                      riesgo.chip
                    )}
                  >
                    <MedidorRiesgo riesgo={topic.risk} />
                    {etiquetaRiesgo}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="mb-1 text-sm text-stone-500">Lectura</dt>
                <dd className="flex items-center font-medium text-[#12372c]">
                  <Clock className="mr-2 h-4 w-4 text-stone-400" />
                  {minutos} min
                </dd>
              </div>
              <div>
                <dt className="mb-1 text-sm text-stone-500">Ideas para llevarte</dt>
                <dd className="flex items-center font-medium text-[#12372c]">
                  <Lightbulb className="mr-2 h-4 w-4 text-[#c99a45]" />
                  {topic.keyPoints?.length ?? 0} puntos clave
                </dd>
              </div>
            </dl>

            <hr className="my-6 border-stone-200" />

            <Link
              href="/cripto"
              className="flex items-center justify-center gap-2 text-sm font-semibold text-[#12372c] transition hover:text-emerald-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a Cripto
            </Link>
          </div>

          <div className="relative overflow-hidden rounded-[1.8rem] bg-gradient-to-br from-[#12372c] via-[#17503f] to-[#2e8a69] p-6 text-white shadow-[0_30px_60px_-36px_rgba(18,55,44,0.8)]">
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#d4af6a]/25 blur-2xl" />
            <p className="relative text-xs font-semibold uppercase tracking-[0.22em] text-[#d4af6a]">Tu perfil</p>
            <p className="relative mt-2 font-heading text-xl leading-snug">¿Esto va con tu forma de invertir?</p>
            <p className="relative mt-2 text-sm text-emerald-50/80">
              Hacé el test de seis preguntas y descubrí cuánto riesgo te calza.
            </p>
            <Link
              href="/test-inversor"
              className="relative mt-5 inline-flex items-center gap-2 rounded-full bg-[#f4f1ea] px-5 py-2.5 text-sm font-semibold text-[#12372c] transition hover:bg-white"
            >
              <ClipboardList className="h-4 w-4" />
              Hacer el test
            </Link>
          </div>

          <AdBanner slot="cripto-tema-lateral" format="rectangle" />

          <p className="px-2 text-xs leading-relaxed text-stone-500">
            Contenido educativo. No constituye asesoramiento financiero ni una recomendación de compra.
          </p>
        </aside>
      </div>
    </div>
  );
}
