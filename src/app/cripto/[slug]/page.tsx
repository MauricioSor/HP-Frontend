import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cryptoTopics } from '@/data/crypto-topics';
import { ChevronRight, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';

export function generateStaticParams() {
  return cryptoTopics.map((topic) => ({
    slug: topic.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const topic = cryptoTopics.find((t) => t.slug === params.slug);
  
  if (!topic) {
    return { title: 'Tema no encontrado' };
  }
  
  return {
    title: `${topic.title} | Criptomonedas | FinBootcamp`,
    description: topic.shortDescription,
  };
}

const getRiskColor = (risk: string) => {
  switch (risk?.toLowerCase()) {
    case 'bajo': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
    case 'medio': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
    case 'alto': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
  }
};

export default function CryptoDetailPage({ params }: { params: { slug: string } }) {
  const topic = cryptoTopics.find((t) => t.slug === params.slug);
  
  if (!topic) {
    notFound();
  }

  // Find related topics (just taking the next 2 for simplicity, excluding current)
  const relatedTopics = cryptoTopics.filter(t => t.slug !== params.slug).slice(0, 2);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-slate-500 dark:text-slate-400 mb-8 items-center space-x-2">
        <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Inicio</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/cripto" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Cripto</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-900 dark:text-slate-200 font-medium truncate max-w-[200px] md:max-w-none">{topic.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-10 pb-8 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
          {topic.title}
        </h1>
        {topic.risk && (
          <div className="flex items-center space-x-3">
            <span className="text-slate-600 dark:text-slate-400 text-sm">Nivel de riesgo asociado:</span>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getRiskColor(topic.risk)} flex items-center`}>
              <ShieldAlert className="w-4 h-4 mr-1" />
              {topic.risk}
            </span>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="space-y-12">
        <section className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
          <div 
            dangerouslySetInnerHTML={{ __html: topic.content?.replace(/\n/g, '<br />') || `<p>${topic.shortDescription}</p>` }} 
          />
        </section>

        {/* Key Points */}
        {topic.keyPoints && topic.keyPoints.length > 0 && (
          <section className="bg-amber-50 dark:bg-amber-900/10 rounded-2xl p-6 md:p-8 border border-amber-100 dark:border-amber-900/30">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Puntos Clave</h2>
            <ul className="space-y-4">
              {topic.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">{point}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Risk Card */}
        {(topic.risk === 'alto' || topic.risk === 'muy_alto') && (
          <section className="bg-red-50 rounded-xl p-6 border border-red-200 flex items-start space-x-4">
            <ShieldAlert className="w-8 h-8 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-red-900 mb-2">Advertencia de Riesgo</h3>
              <p className="text-red-800 text-sm">Este tema involucra activos de riesgo {topic.risk === 'muy_alto' ? 'muy alto' : 'alto'}. Invertí solo lo que estés dispuesto a perder y nunca inviertas dinero que necesites a corto plazo.</p>
            </div>
          </section>
        )}

        {/* Related Topics */}
        {relatedTopics.length > 0 && (
          <section className="pt-10 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Temas Relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedTopics.map(related => (
                <Link href={`/cripto/${related.slug}`} key={related.id}>
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-500 hover:shadow-md transition-all flex items-center justify-between group bg-white dark:bg-slate-800">
                    <span className="font-medium text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {related.title}
                    </span>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-amber-500 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
