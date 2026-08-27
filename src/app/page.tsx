import Link from 'next/link';
import { TrendingUp, Bitcoin, Calculator, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-900 text-white py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
            Aprendé a invertir con confianza
          </h1>
          <p className="mt-4 max-w-2xl text-xl sm:text-2xl mx-auto text-emerald-100 mb-10">
            La plataforma definitiva de educación financiera para el mercado argentino.
            Dominá la bolsa local, internacional y el ecosistema cripto.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-col sm:flex-row">
            <Link
              href="/mercado-bursatil"
              className="px-8 py-4 bg-white text-emerald-800 font-bold rounded-lg shadow-lg hover:bg-emerald-50 hover:scale-105 transition-all duration-200"
            >
              Explorar Instrumentos
            </Link>
            <Link
              href="/simulador"
              className="px-8 py-4 bg-emerald-800 bg-opacity-40 border border-emerald-400 text-white font-bold rounded-lg hover:bg-opacity-60 hover:scale-105 transition-all duration-200"
            >
              Simular Inversión
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold text-slate-800">8</div>
              <div className="text-sm text-slate-500 uppercase tracking-wide font-medium mt-1">Instrumentos</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-slate-800">6</div>
              <div className="text-sm text-slate-500 uppercase tracking-wide font-medium mt-1">Temas Cripto</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-slate-800">100%</div>
              <div className="text-sm text-slate-500 uppercase tracking-wide font-medium mt-1">Gratuito</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-slate-800">Info</div>
              <div className="text-sm text-slate-500 uppercase tracking-wide font-medium mt-1">Impositiva</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Todo lo que necesitás saber</h2>
            <p className="mt-4 text-lg text-slate-600">
              Desarrollá tus conocimientos desde los fundamentos hasta estrategias avanzadas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">📈 Mercado Bursátil</h3>
              <p className="text-slate-600 mb-6">
                Aprendé a operar con Bonos, Acciones, CEDEARs, Obligaciones Negociables, Cauciones y más en el mercado local e internacional.
              </p>
              <Link href="/mercado-bursatil" className="inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700">
                Ver instrumentos <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Bitcoin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">₿ Mercado Cripto</h3>
              <p className="text-slate-600 mb-6">
                Desde los fundamentos de Bitcoin y Ethereum hasta DeFi, minado, staking y los riesgos de las memecoins.
              </p>
              <Link href="/cripto" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700">
                Explorar cripto <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                <Calculator className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">🧮 Simulador</h3>
              <p className="text-slate-600 mb-6">
                Calculá rendimientos, entendé el poder del interés compuesto y proyectá tus inversiones a lo largo del tiempo.
              </p>
              <Link href="/simulador" className="inline-flex items-center text-amber-600 font-semibold hover:text-amber-700">
                Probar simulador <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tax Info Teaser */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between gap-12">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-6">
                Información impositiva clara
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Sabemos que los impuestos en Argentina pueden ser complejos. FinBootcamp te proporciona resúmenes claros sobre qué paga Bienes Personales y qué está gravado por el Impuesto Cedular.
              </p>
              <ul className="space-y-4">
                {['Tratamiento de Bienes Personales', 'Impuesto a las Ganancias / Cedular', 'Exenciones actuales'].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 mr-3 shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-lg">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-slate-700">Instrumento</th>
                      <th className="px-6 py-4 font-semibold text-slate-700">Bienes Personales</th>
                      <th className="px-6 py-4 font-semibold text-slate-700">Ganancias</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr className="bg-white">
                      <td className="px-6 py-4 font-medium text-slate-900">Bonos Soberanos</td>
                      <td className="px-6 py-4 text-emerald-600 font-medium bg-emerald-50/50">Exento</td>
                      <td className="px-6 py-4 text-emerald-600 font-medium bg-emerald-50/50">Exento</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-6 py-4 font-medium text-slate-900">CEDEARs</td>
                      <td className="px-6 py-4 text-rose-600 font-medium bg-rose-50/50">Gravado</td>
                      <td className="px-6 py-4 text-amber-600 font-medium bg-amber-50/50">Diferenciado*</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-6 py-4 font-medium text-slate-900">Plazo Fijo</td>
                      <td className="px-6 py-4 text-emerald-600 font-medium bg-emerald-50/50">Exento</td>
                      <td className="px-6 py-4 text-emerald-600 font-medium bg-emerald-50/50">Exento</td>
                    </tr>
                  </tbody>
                </table>
                <div className="px-6 py-3 bg-slate-50 text-xs text-slate-500 border-t border-slate-200">
                  * Fines ilustrativos. Siempre consultá con un contador.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-900 py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Empezá tu educación financiera hoy
          </h2>
          <p className="text-emerald-100 text-lg mb-10">
            No necesitás conocimientos previos, solo ganas de aprender y tomar el control de tu futuro financiero.
          </p>
          <Link
            href="/mercado-bursatil"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-bold rounded-lg text-emerald-900 bg-white hover:bg-emerald-50 hover:scale-105 transition-all duration-200 shadow-xl"
          >
            Comenzar Curso
          </Link>
        </div>
      </section>
    </div>
  );
}
