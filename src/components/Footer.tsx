import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-emerald-400 mb-4">Plataforma</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/mercado-bursatil" className="text-slate-300 hover:text-white transition-colors">
                  Mercado Bursátil
                </Link>
              </li>
              <li>
                <Link href="/cripto" className="text-slate-300 hover:text-white transition-colors">
                  Cripto
                </Link>
              </li>
              <li>
                <Link href="/simulador" className="text-slate-300 hover:text-white transition-colors">
                  Simulador de Inversiones
                </Link>
              </li>
              <li>
                <Link href="/cotizaciones" className="text-slate-300 hover:text-white transition-colors">
                  Cotizaciones
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-emerald-400 mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/glosario" className="text-slate-300 hover:text-white transition-colors">
                  Glosario Financiero
                </Link>
              </li>
              <li>
                <Link href="/guias" className="text-slate-300 hover:text-white transition-colors">
                  Guías Paso a Paso
                </Link>
              </li>
              <li>
                <Link href="/impuestos" className="text-slate-300 hover:text-white transition-colors">
                  Información Impositiva
                </Link>
              </li>
              <li>
                <Link href="/calculadoras" className="text-slate-300 hover:text-white transition-colors">
                  Calculadoras
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-emerald-400 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacidad" className="text-slate-300 hover:text-white transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-slate-300 hover:text-white transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-slate-300 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} FinBootcamp. Proyecto educativo - No constituye asesoramiento financiero.</p>
        </div>
      </div>
    </footer>
  );
}
