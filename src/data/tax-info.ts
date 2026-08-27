export interface TaxRow {
  instrument: string;
  category: 'bursatil' | 'cripto';
  ganancias: 'Exento' | 'Gravado' | 'Depende';
  ganananciasNote: string;
  bienesPersonales: 'Exento' | 'Gravado' | 'Depende' | 'N/A';
  bienesPersonalesNote: string;
  itf: boolean;
  additionalNotes: string;
}

export const taxData: TaxRow[] = [
  {
    instrument: 'Bonos Soberanos (Bonares, Globales y Bonos CER)',
    category: 'bursatil',
    ganancias: 'Exento',
    ganananciasNote: 'Totalmente exentos para personas humanas residentes. No tributan ni por los cupones de interés ni por la ganancia de capital obtenida en la compraventa en el mercado secundario (art. 26 Ley de Impuesto a las Ganancias y Ley 27.541).',
    bienesPersonales: 'Exento',
    bienesPersonalesNote: 'Exentos al 31 de diciembre de cada año fiscal por disposición expresa del art. 21 inc. g de la Ley de Bienes Personales.',
    itf: false,
    additionalNotes: 'Transferencias entre cuentas bancarias y comitentes registradas en la CNV se encuentran exentas del Impuesto al Cheque (ITF).'
  },
  {
    instrument: 'LECAPs (Letras de Capitalización del Tesoro)',
    category: 'bursatil',
    ganancias: 'Exento',
    ganananciasNote: 'Exentas en Ganancias para personas humanas. El rendimiento generado por la capitalización mensual de intereses y el resultado de venta no sufren retenciones ni tributan impuesto cedular.',
    bienesPersonales: 'Exento',
    bienesPersonalesNote: 'Exentas en Bienes Personales por constituir instrumentos de deuda pública del Estado Nacional argentino.',
    itf: false,
    additionalNotes: 'Máxima eficiencia tributaria para colocaciones de tasa en pesos a corto y mediano plazo.'
  },
  {
    instrument: 'CEDEARs (Certificados de Depósito Argentinos)',
    category: 'bursatil',
    ganancias: 'Depende',
    ganananciasNote: 'La ganancia de capital por compraventa está 100% exenta en Ganancias para personas humanas (art. 26 inc. u LIG). Los dividendos distribuidos por las empresas extranjeras están gravados a escala general con cómputo de pago a cuenta de retenciones en EE.UU.',
    bienesPersonales: 'Gravado',
    bienesPersonalesNote: 'Gravados en Bienes Personales. Se valúan a la cotización bursátil de cierre al 31 de diciembre en el mercado local y tributan a la alícuota de bienes situados en el país.',
    itf: false,
    additionalNotes: 'Vehículo idóneo para dolarizar carteras de forma legal sin pagar impuesto a las ganancias sobre la variación cambiaria implícita (CCL).'
  },
  {
    instrument: 'Acciones Argentinas (con Oferta Pública CNV)',
    category: 'bursatil',
    ganancias: 'Exento',
    ganananciasNote: 'El resultado por compraventa de acciones locales con oferta pública autorizada por la CNV está exento de Ganancias. Los dividendos distribuidos están sujetos a retención única y definitiva del 7% efectuada por la sociedad.',
    bienesPersonales: 'Exento',
    bienesPersonalesNote: 'Exentas en cabeza del inversor particular. El impuesto lo liquida e ingresa directamente la empresa emisora como Responsable Sustituto a la alícuota del 0,5% del valor patrimonial proporcional.',
    itf: false,
    additionalNotes: 'Régimen promocional diseñado para incentivar el ahorro y la inversión en el mercado productivo y corporativo nacional.'
  },
  {
    instrument: 'ETFs (vía CEDEARs: SPY, QQQ, DIA, etc.)',
    category: 'bursatil',
    ganancias: 'Depende',
    ganananciasNote: 'El resultado de compraventa en el mercado local está exento para personas humanas. Los dividendos cobrados se encuentran gravados por renta de fuente extranjera a escala progresiva con crédito de impuesto análogo pagado en el exterior.',
    bienesPersonales: 'Gravado',
    bienesPersonalesNote: 'Gravados en Bienes Personales al valor de cotización de cierre del mercado local al 31 de diciembre.',
    itf: false,
    additionalNotes: 'Permite acceder a los índices más importantes de Wall Street con tratamiento impositivo similar a los CEDEARs corporativos.'
  },
  {
    instrument: 'Fondos Comunes de Inversión (FCI Abiertos)',
    category: 'bursatil',
    ganancias: 'Depende',
    ganananciasNote: 'Exentos en el rescate para personas humanas siempre que el fondo mantenga al menos un 75% de su patrimonio invertido en activos exentos (títulos soberanos, plazos fijos). Si el fondo invierte en activos gravados, el rendimiento tributa proporcionalmente.',
    bienesPersonales: 'Depende',
    bienesPersonalesNote: 'Exentos en Bienes Personales si la cartera del fondo cumple con el requisito legal de mantener más del 75% en activos exentos al cierre del ejercicio fiscal.',
    itf: false,
    additionalNotes: 'Los FCI Money Market (T+0) y de bonos soberanos cumplen habitualmente con las pautas de exención impositiva total.'
  },
  {
    instrument: 'Cauciones Bursátiles (Colocador)',
    category: 'bursatil',
    ganancias: 'Gravado',
    ganananciasNote: 'Los intereses cobrados por el colocador están alcanzados por el Impuesto a las Ganancias como renta de capital (renta de segunda categoría), tributando a la escala progresiva o régimen correspondiente.',
    bienesPersonales: 'Gravado',
    bienesPersonalesNote: 'Los saldos y créditos por cauciones vigentes al 31 de diciembre integran la base imponible del Impuesto sobre los Bienes Personales.',
    itf: false,
    additionalNotes: 'A pesar del impacto impositivo, su nulo riesgo crediticio y plazos desde 24 horas la convierten en la herramienta predilecta para tesorería de corto plazo.'
  },
  {
    instrument: 'Licitaciones Públicas del Tesoro',
    category: 'bursatil',
    ganancias: 'Exento',
    ganananciasNote: 'La suscripción en el mercado primario de letras y bonos del Tesoro Nacional goza del mismo régimen de exención total en Ganancias que la tenencia de títulos públicos.',
    bienesPersonales: 'Exento',
    bienesPersonalesNote: 'Exentos en Bienes Personales al 31 de diciembre por tratarse de deuda soberana de la República Argentina.',
    itf: false,
    additionalNotes: 'Permite ingresar directamente a instrumentos de renta fija soberana a precio de corte primario sin costos de spread de mercado secundario.'
  },
  {
    instrument: 'Compraventa y Trading de Criptomonedas',
    category: 'cripto',
    ganancias: 'Gravado',
    ganananciasNote: 'La enajenación de monedas digitales y criptoactivos por personas humanas residentes está gravada por el Impuesto a las Ganancias bajo el régimen de renta cedular al 15% sobre la ganancia neta realizada (art. 98 LIG), diferenciando fuente argentina o extranjera según la ubicación del emisor/custodio.',
    bienesPersonales: 'Gravado',
    bienesPersonalesNote: 'Gravados en el Impuesto sobre los Bienes Personales. Según el criterio de la AFIP/ARCA, los criptoactivos califican como activos financieros gravados y se valúan a su cotización de mercado en pesos al 31 de diciembre.',
    itf: false,
    additionalNotes: 'Los exchanges locales inscriptos en el Registro de Proveedores de Servicios de Activos Virtuales (PSAV) de la CNV cumplen con los regímenes de información tributaria vigentes.'
  },
  {
    instrument: 'Staking, Airdrops y Rendimientos DeFi',
    category: 'cripto',
    ganancias: 'Gravado',
    ganananciasNote: 'Los rendimientos periódicos obtenidos mediante staking (PoS), provisión de liquidez en pools descentralizados o préstamos en protocolos DeFi constituyen rentas de capital gravadas a la escala general al momento de su acreditación a valor de mercado en pesos.',
    bienesPersonales: 'Gravado',
    bienesPersonalesNote: 'Las tenencias de criptoactivos bloqueados o depositados en protocolos al 31 de diciembre integran el activo gravado computable para el cálculo del impuesto.',
    itf: false,
    additionalNotes: 'Se recomienda llevar una bitácora detallada de transacciones on-chain con fecha, hora y cotización histórica para la determinación del costo computable.'
  },
  {
    instrument: 'Minería de Criptoactivos (Proof of Work)',
    category: 'cripto',
    ganancias: 'Gravado',
    ganananciasNote: 'La actividad minera de validación PoW califica como una actividad económica comercial/industrial (renta de tercera categoría). El ingreso gravado se calcula por el valor de mercado de los tokens recibidos al momento de minado, deduciendo costos computables como consumo eléctrico, amortización de hardware ASIC y mantenimiento.',
    bienesPersonales: 'Gravado',
    bienesPersonalesNote: 'Tanto el parque de equipamiento de minería (valuado a costo menos amortizaciones) como las criptomonedas minadas en tenencia al 31 de diciembre están alcanzados por Bienes Personales.',
    itf: false,
    additionalNotes: 'Requiere habitualmente inscripción tributaria como responsable inscripto o monotributista de servicios, según el volumen y escala de la operación.'
  }
];

export const taxDisclaimer = 'La información impositiva provista en esta plataforma se presenta exclusivamente a título educativo e informativo general, conforme a la legislación tributaria vigente en la República Argentina (AFIP/ARCA, Ley de Impuesto a las Ganancias, Ley de Bienes Personales y normativas complementarias). Las leyes y criterios fiscales pueden sufrir modificaciones, y la situación impositiva particular puede variar según la condición fiscal, residencia, deducciones personales y estructura patrimonial de cada individuo. FinBootcamp no presta asesoramiento tributario, contable ni legal personalizado. Se recomienda a todos los usuarios consultar formalmente con un Contador Público Matriculado especializado antes de tomar decisiones de inversión o estructuración fiscal.';
