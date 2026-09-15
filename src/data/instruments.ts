export interface Instrument {
  id: string;
  name: string;
  slug: string;
  category: 'bursatil';
  icon: string; // emoji
  shortDescription: string;
  description: string; // 2-3 paragraphs explaining what it is, how it works
  risk: 'bajo' | 'medio' | 'alto';
  horizon: string; // e.g. 'Corto plazo (1-6 meses)'
  minInvestment: string;
  example: string; // practical example
  defaultRate: number; // annual rate for simulator, decimal
  capitalization: 'mensual' | 'trimestral' | 'anual' | 'al_vencimiento';
  taxInfo: {
    ganancias: 'exento' | 'gravado';
    gannanciasDetail: string;
    bienesPersonales: 'exento' | 'gravado';
    bienesPersonalesDetail: string;
    itf: boolean;
    iva: boolean;
    notes: string;
  };
}

export const instruments: Instrument[] = [
  {
    id: 'bonos-soberanos',
    name: 'Bonos Soberanos',
    slug: 'bonos-soberanos',
    category: 'bursatil',
    icon: '🏛️',
    shortDescription: 'Títulos de deuda pública emitidos por el Estado Nacional en pesos o dólares.',
    description: `Los bonos soberanos son títulos de deuda pública emitidos por el Estado Nacional (a través del Ministerio de Economía) para financiar obras públicas, proyectos estratégicos o refinanciar obligaciones fiscales. Al comprar un bono, te convertís en acreedor del Estado, el cual se compromete a pagarte cupones periódicos de interés (renta) y a devolver el capital prestado (amortización) en fechas preestablecidas según el prospecto de emisión.

En el mercado argentino existen diversas modalidades: bonos en dólares con legislación local o extranjera (los famosos Bonares y Globales, como AL30 o GD30), bonos en pesos ajustados por inflación mediante el coeficiente CER (como TX26 o T2X5), y bonos vinculados a la evolución del tipo de cambio oficial (Dollar-Linked). Su cotización fluctúa en el mercado secundario según el riesgo país, las tasas de interés internacionales y las expectativas macroeconómicas, lo que permite comprarlos a descuento para obtener una Tasa Interna de Retorno (TIR) atractiva o venderlos anticipadamente antes de su vencimiento.

Este instrumento es ideal para inversores de perfil_inversor moderado a agresivo que buscan dolarizar su cartera de forma implícita (vía MEP o Cable), cobrar flujos periódicos de cupones o apostar a la compresión de tasas soberanas. Ofrece excelente liquidez bursátil y permite operar directamente desde cualquier cuenta comitente (ALyC) con acreditación automática en Caja de Valores.`,
    risk: 'medio',
    horizon: 'Mediano a largo plazo (1 a 5 años)',
    minInvestment: 'Desde $1.000 o USD 10',
    example: 'Comprás 1.000 nominales de AL30 en el mercado secundario a USD 58 por cada 100 de valor nominal. Invertís USD 580. El bono paga semestralmente un cupón de renta en dólares y amortiza el capital según el cronograma. Si mantenés el título hasta el vencimiento, cobrás el 100% del valor nominal (USD 1.000) más todos los intereses devengados, logrando una TIR superior al 12% anual en moneda dura.',
    defaultRate: 0.45,
    capitalization: 'trimestral',
    taxInfo: {
      ganancias: 'exento',
      gannanciasDetail: 'Tanto la renta (cupones) como el resultado por compraventa de títulos públicos emitidos por el Estado Nacional, Provincial o Municipal se encuentran totalmente exentos para personas humanas residentes en el país (art. 26 Ley de Impuesto a las Ganancias y Ley 27.541).',
      bienesPersonales: 'exento',
      bienesPersonalesDetail: 'Los títulos públicos nacionales, provinciales y municipales están expresamente exentos del Impuesto sobre los Bienes Personales al 31 de diciembre de cada año fiscal.',
      itf: false,
      iva: false,
      notes: 'No tributa Impuesto al Cheque (ITF) en transferencias entre cuenta bancaria propia y cuenta comitente de la ALyC. Tratamiento impositivo sumamente favorable.'
    }
  },
  {
    id: 'lecaps',
    name: 'LECAPs (Letras de Capitalización)',
    slug: 'lecaps',
    category: 'bursatil',
    icon: '📜',
    shortDescription: 'Letras del Tesoro en pesos a tasa fija con capitalización mensual de intereses.',
    description: `Las LECAPs (Letras de Capitalización del Tesoro) son instrumentos de deuda pública de corto a mediano plazo emitidos por el Tesoro Nacional en pesos argentinos. Su principal atractivo radica en que ofrecen una tasa nominal fija que capitaliza mensualmente (interés compuesto), lo que genera un valor técnico creciente día a día y un rendimiento final predecible al momento del vencimiento.

A diferencia de un plazo fijo tradicional, las LECAPs cotizan diariamente en el mercado secundario (BYMA), lo que otorga una liquidez inmediata: podés vender tus títulos en cualquier rueda (en plazo contado inmediato o T+1) sin tener que esperar obligatoriamente al vencimiento para disponer de tu dinero. Son una de las herramientas predilectas de la curva de pesos para realizar estrategias de tasa y ganarle a la inflación esperada.

Están dirigidas a personas e instituciones que buscan maximizar el rendimiento de sus excedentes de liquidez en pesos a plazos de 30 a 360 días con un riesgo crediticio soberano bajo/medio. Constituyen el instrumento de referencia de la política de financiamiento del gobierno nacional y una alternativa muy superior al plazo fijo bancario común.`,
    risk: 'bajo',
    horizon: 'Corto plazo (1 a 12 meses)',
    minInvestment: 'Desde $1.000',
    example: 'Invertís $500.000 en una LECAP con vencimiento a 90 días que licita a una Tasa Efectiva Mensual (TEM) del 3,8%. Cada mes los intereses se suman automáticamente al capital, generando intereses sobre los intereses ya capitalizados. Al cabo de los 3 meses, recibís $559.180 netos, superando la tasa ofrecida por plazos fijos tradicionales y con la opción de salir antes si necesitás los fondos.',
    defaultRate: 0.48,
    capitalization: 'mensual',
    taxInfo: {
      ganancias: 'exento',
      gannanciasDetail: 'Exentas en Ganancias para personas humanas tanto por el rendimiento financiero derivado de la capitalización como por la ganancia de capital en su venta secundaria.',
      bienesPersonales: 'exento',
      bienesPersonalesDetail: 'Exentas de Bienes Personales por tratarse de títulos de deuda soberana de la República Argentina.',
      itf: false,
      iva: false,
      notes: 'Instrumento muy eficiente tributariamente para el manejo de tesorería y ahorro personal en pesos.'
    }
  },
  {
    id: 'cedears',
    name: 'CEDEARs (Certificados de Depósito)',
    slug: 'cedears',
    category: 'bursatil',
    icon: '🌎',
    shortDescription: 'Certificados que representan acciones de empresas líderes del exterior que cotizan en pesos.',
    description: `Los CEDEARs (Certificados de Depósito Argentinos) son instrumentos de renta variable que representan acciones o fracciones de acciones de las empresas más importantes del mundo (como Apple, Microsoft, Coca-Cola, Tesla, Google o Mercado Libre) que cotizan en bolsas internacionales como el NYSE o NASDAQ. Al comprar un CEDEAR, estás adquiriendo un certificado respaldado 1:1 por la acción subyacente custodiada en el exterior por el banco emisor (como Comafi o Citibank).

Una de las grandes ventajas de los CEDEARs es su doble componente de rentabilidad: por un lado, replican el movimiento de la acción en su mercado de origen en dólares; por el otro, se ajustan automáticamente por las variaciones del tipo de cambio financiero implícito (Dólar Contado con Liquidación o CCL). De esta manera, permiten invertir en moneda local (pesos) estando 100% dolarizado frente al riesgo cambiario y desvinculado del riesgo político-económico de las empresas locales.

Este instrumento es ideal para inversores que buscan diversificación global, protección patrimonial en moneda dura y crecimiento de capital a mediano y largo plazo. Además, muchas de estas empresas pagan dividendos trimestrales en dólares billete que se depositan automáticamente en la cuenta comitente del inversor argentino.`,
    risk: 'medio',
    horizon: 'Mediano a largo plazo (2 a 5+ años)',
    minInvestment: 'Desde el valor de 1 ratio CEDEAR (típicamente entre $3.000 y $25.000)',
    example: 'Comprás CEDEARs de Apple (AAPL) por un total de $300.000. Si durante el año la acción de Apple en Wall Street sube un 15% en dólares y el tipo de cambio CCL avanza un 20%, el valor de tu posición en pesos aumentará aproximadamente un 38% ($414.000), además de cobrar los dividendos correspondientes en dólares billete.',
    defaultRate: 0.28,
    capitalization: 'al_vencimiento',
    taxInfo: {
      ganancias: 'exento',
      gannanciasDetail: 'El resultado por compraventa (ganancia de capital) de CEDEARs está 100% exento del Impuesto a las Ganancias para personas humanas residentes en el país (art. 26 inc. u de la LIG). Los dividendos percibidos en el exterior tributan Ganancias a la escala progresiva general con cómputo de crédito fiscal por retenciones en origen.',
      bienesPersonales: 'gravado',
      bienesPersonalesDetail: 'Gravados en Bienes Personales. Se computan al valor de cotización en el mercado local al 31 de diciembre de cada año, considerándose activos del país a la alícuota general.',
      itf: false,
      iva: false,
      notes: 'Es uno de los vehículos más populares y eficientes para dolarizar carteras sin pagar impuesto a las ganancias por la diferencia de cotización cambiaria.'
    }
  },
  {
    id: 'acciones-argentinas',
    name: 'Acciones Argentinas (Merval)',
    slug: 'acciones-argentinas',
    category: 'bursatil',
    icon: '📈',
    shortDescription: 'Participación en el capital social de las principales empresas que cotizan en la Bolsa de Buenos Aires.',
    description: `Las acciones locales representan una parte alícuota del capital social de las compañías que operan y cotizan en el mercado argentino (BYMA), conformando el índice representativo S&P Merval. Al adquirir acciones de compañías como YPF, Pampa Energía, Grupo Financiero Galicia, Ternium o Aluar, te convertís en socio co-propietario de la empresa, participando de sus beneficios, dividendos y crecimiento patrimonial.

La rentabilidad de las acciones proviene de dos vías: la apreciación del precio del papel en el mercado bursátil impulsada por los balances corporativos y las perspectivas económicas del país, y la distribución de dividendos en efectivo o en acciones liberadas que apruebe la asamblea de accionistas. Son activos de renta variable puros, lo que significa que sus cotizaciones pueden registrar variaciones significativas de precio en el corto plazo.

Son ideales para perfiles con horizonte temporal de largo plazo y tolerancia al riesgo, que busquen maximizar el potencial de rentabilidad de sus carteras aprovechando ciclos de reactivación económica, inversiones en el sector energético (como Vaca Muerta) o sectores bancarios y de infraestructura nacional.`,
    risk: 'alto',
    horizon: 'Largo plazo (3 a 5+ años)',
    minInvestment: 'Desde $1.000',
    example: 'Invertís $200.000 en acciones de Pampa Energía (PAMP) a $2.500 por acción. Tras el incremento en la producción de gas y la inauguración de un nuevo parque eólico, el balance de la compañía supera las expectativas del mercado y el precio sube a $3.400 por acción. Tu inversión pasa a valer $272.000 (+36%), más el cobro de dividendos votados por el directorio.',
    defaultRate: 0.35,
    capitalization: 'anual',
    taxInfo: {
      ganancias: 'exento',
      gannanciasDetail: 'La compraventa de acciones argentinas con oferta pública autorizada por la CNV está exenta de Ganancias para personas humanas. Los dividendos locales tributan una retención única y definitiva del 7% que efectúa la propia empresa.',
      bienesPersonales: 'exento',
      bienesPersonalesDetail: 'Exentas en cabeza de la persona humana. El impuesto de Bienes Personales por las acciones es liquidado directamente por la empresa emisora bajo el régimen de Responsable Sustituto (alícuota del 0,5%).',
      itf: false,
      iva: false,
      notes: 'Tratamiento impositivo altamente ventajoso que promueve la inversión en el mercado productivo nacional.'
    }
  },
  {
    id: 'etfs',
    name: 'ETFs (Fondos Cotizados en Bolsa)',
    slug: 'etfs',
    category: 'bursatil',
    icon: '📊',
    shortDescription: 'Fondos de inversión diversificados que replican índices globales y cotizan como una acción.',
    description: `Los ETFs (Exchange Traded Funds o Fondos Cotizados) son vehículos de inversión colectiva que replican el rendimiento de un índice de mercado, un sector industrial, una materia prima o una canasta de activos globales. En Argentina, se puede acceder a los principales ETFs globales directamente en pesos o dólares a través de su formato CEDEAR en la Bolsa de Buenos Aires.

Entre los ETFs más populares disponibles en el mercado local se encuentran el SPY (que replica las 500 empresas más grandes de EE.UU., S&P 500), el QQQ (enfocado en las 100 tecnológicas del Nasdaq 100), el DIA (Dow Jones Industrial), el IWM (empresas de pequeña capitalización Russell 2000), el EEM (Mercados Emergentes) y el GLD (oro físico). Esto permite que con una sola orden de compra adquieras una cartera instantáneamente diversificada en cientos de compañías globales con costos de administración mínimos.

Es la opción preferida por la comunidad inversora pasiva moderna y por quienes buscan invertir con visión de largo plazo sin tener que seleccionar acciones individuales (stock picking), reduciendo drásticamente el riesgo específico de una sola compañía.`,
    risk: 'medio',
    horizon: 'Largo plazo (3 a 10+ años)',
    minInvestment: 'Desde $5.000 (1 certificado de ETF)',
    example: 'Destinás $150.000 mensuales al ETF SPY (S&P 500) de forma recurrente durante 5 años. Al adquirir el índice completo, tu capital crece a la tasa promedio histórica del mercado norteamericano (~10% anual en dólares) sumado a la devaluación del tipo de cambio CCL, capturando el crecimiento de gigantes como Microsoft, Nvidia, Amazon y Apple al mismo tiempo.',
    defaultRate: 0.25,
    capitalization: 'anual',
    taxInfo: {
      ganancias: 'exento',
      gannanciasDetail: 'La ganancia de capital originada por la compraventa de CEDEARs de ETFs está exenta de Ganancias para personas humanas en Argentina. Los dividendos distribuidos por el fondo tributan a escala general con reconocimiento de retenciones del exterior.',
      bienesPersonales: 'gravado',
      bienesPersonalesDetail: 'Gravados en Bienes Personales según la cotización del certificado al 31 de diciembre de cada año fiscal.',
      itf: false,
      iva: false,
      notes: 'Permite dolarizar y diversificar portafolios a nivel internacional con gran eficiencia operativa y tributaria local.'
    }
  },
  {
    id: 'fci',
    name: 'Fondos Comunes de Inversión (FCI)',
    slug: 'fci',
    category: 'bursatil',
    icon: '💼',
    shortDescription: 'Patrimonios administrados por profesionales con liquidez inmediata o a 24/48 horas.',
    description: `Un Fondo Común de Inversión (FCI) es un patrimonio indiviso integrado por el aporte de múltiples inversores (cuotapartistas) que comparten los mismos objetivos de rentabilidad y tolerancia al riesgo. Este patrimonio es gestionado profesionalmente por una Sociedad Gerente y custodiado por una Sociedad Depositaria, invirtiendo en una canasta diversificada de activos bajo estrictas regulaciones de la Comisión Nacional de Valores (CNV).

En el mercado argentino existen diversas categorías de FCI: los Fondos Money Market (T+0, liquidez inmediata en el acto, que invierten en cauciones y cuentas remuneradas), los Fondos de Renta Fija en pesos (T+1, que invierten en LECAPs, bonos CER y pagarés), los Fondos de Cobertura Dólar/Dollar-Linked y los Fondos de Renta Variable (T+2, que invierten en acciones del Merval). 

Los FCI son la herramienta predilecta para dar los primeros pasos en el mercado bursátil o para automatizar la gestión de liquidez diaria de personas y empresas, ya que no requieren analizar título por título y permiten ingresar o salir con rescates automáticos desde el home banking o la app del broker.`,
    risk: 'bajo',
    horizon: 'Corto a mediano plazo (Inmediato a 12 meses)',
    minInvestment: 'Desde $1.000',
    example: 'Colocás $200.000 en un FCI Money Market T+0 para el dinero que necesitás dentro de 10 días para pagar la tarjeta. El fondo devenga intereses todos los días (incluidos fines de semana y feriados) a una TNA del 38%. Al décimo día rescatás $202.080 al instante sin penalidades ni plazos fijos bloqueados.',
    defaultRate: 0.38,
    capitalization: 'mensual',
    taxInfo: {
      ganancias: 'exento',
      gannanciasDetail: 'Las cuotapartes de FCI abiertos constituidos con al menos un 75% de activos exentos (como títulos públicos soberanos o activos exentos) no tributan Ganancias en rescate para personas humanas.',
      bienesPersonales: 'exento',
      bienesPersonalesDetail: 'Exentos en Bienes Personales siempre que el fondo mantenga al menos un 75% de su cartera invertida en activos legalmente exentos (bonos públicos, depósitos en moneda nacional, etc.).',
      itf: false,
      iva: false,
      notes: 'Los FCI Money Market y de renta fija soberana son sumamente eficientes impositivamente para el manejo de caja cotidiana.'
    }
  },
  {
    id: 'cauciones-bursatiles',
    name: 'Cauciones Bursátiles',
    slug: 'cauciones-bursatiles',
    category: 'bursatil',
    icon: '🤝',
    shortDescription: 'Préstamos garantizados a muy corto plazo en el mercado bursátil (el plazo fijo de la bolsa).',
    description: `La caución bursátil es un contrato de préstamo a muy corto plazo (desde 1 hasta 120 días, siendo las más habituales a 1, 7 y 14 días) garantizado en su totalidad por el Mercado de Valores (BYMA). Funciona de manera similar a un plazo fijo bancario, pero con respaldo de títulos valores y con plazos de colocación ultra flexibles que permiten rentabilizar fondos de un día para el otro.

En la operación intervienen dos partes: el colocador (quien presta el dinero a cambio de una Tasa Nominal Anual pactada) y el tomador (quien recibe el dinero prestado y entrega en garantía títulos bursátiles como bonos o acciones con un aforo prudencial). Si el tomador no devuelve los fondos al vencimiento, BYMA liquida de inmediato los títulos en garantía para pagarle al colocador el capital más los intereses acordados, garantizando un riesgo de incobrabilidad prácticamente nulo.

Es el instrumento preferido por tesorerías corporativas, inversores y traders para hacer trabajar los saldos líquidos en pesos o dólares durante fines de semana, feriados o entre operaciones de compraventa bursátil, sin asumir volatilidad de precios ni riesgo crediticio bancario.`,
    risk: 'bajo',
    horizon: 'Ultra corto plazo (1 a 30 días)',
    minInvestment: 'Desde $10.000',
    example: 'El viernes cobrás un cobro comercial de $1.000.000 y colocás una caución a 3 días hasta el lunes a una TNA del 35%. El lunes a las 11:00 hs se te acreditan automáticamente en tu comitente $1.002.876 disponibles para usar, habiendo rentabilizado el capital durante el fin de semana sin ningún riesgo de mercado.',
    defaultRate: 0.35,
    capitalization: 'al_vencimiento',
    taxInfo: {
      ganancias: 'gravado',
      gannanciasDetail: 'Los intereses devengados por cauciones bursátiles colocadas por personas humanas están alcanzados por el Impuesto a las Ganancias como renta de capital (alícuota progresiva general o cedular según corresponda por ley).',
      bienesPersonales: 'gravado',
      bienesPersonalesDetail: 'Los créditos y saldos por cauciones vigentes al 31 de diciembre están alcanzados por el Impuesto sobre los Bienes Personales.',
      itf: false,
      iva: false,
      notes: 'A pesar del gravamen impositivo, su nulo riesgo crediticio y plazos de 24 hs la convierten en la mejor herramienta de liquidez transitoria.'
    }
  },
  {
    id: 'licitaciones-publicas',
    name: 'Licitaciones Públicas del Tesoro',
    slug: 'licitaciones-publicas',
    category: 'bursatil',
    icon: '🎯',
    shortDescription: 'Suscripción primaria de instrumentos de deuda directamente con el Ministerio de Economía.',
    description: `Las licitaciones públicas constituyen el mercado primario donde el Tesoro Nacional o las provincias emiten nuevos títulos de deuda (como LECAPs, BONCER, Letras a descuento o Bonos soberanos) para financiarse. En este proceso, los inversores ingresan órdenes de suscripción directa a través de sus brokers antes de que los instrumentos comiencen a cotizar libremente en el mercado secundario.

El inversor puede ofertar bajo dos modalidades según el llamado oficial: tramo no competitivo (donde el inversor minorista acepta el precio o tasa de corte que determine el mercado) o tramo competitivo (donde se especifica la tasa mínima o precio máximo al que se está dispuesto a suscribir). Las licitaciones se llevan a cabo quincenalmente o mensualmente según el calendario publicado por la Secretaría de Finanzas.

Participar en licitaciones primarias permite acceder a nuevos títulos sin pagar el diferencial de puntas (spread bid/ask) del mercado secundario y, en muchos casos, capturar tasas de emisión más atractivas con montos mínimos muy accesibles para pequeños y medianos ahorristas.`,
    risk: 'bajo',
    horizon: 'Corto a mediano plazo (1 a 18 meses)',
    minInvestment: 'Desde $1.000 o USD 100 según el pliego',
    example: 'El Ministerio de Economía convoca a licitación para una nueva LECAP a 6 meses. Ingresás una orden en el tramo no competitivo por $100.000 desde tu broker. Tras el cierre de la licitación, se adjudica el 100% de la orden a la tasa de corte oficial del 3,9% mensual efectiva, acreditándose los títulos en tu cuenta sin comisiones de suscripción primaria.',
    defaultRate: 0.46,
    capitalization: 'mensual',
    taxInfo: {
      ganancias: 'exento',
      gannanciasDetail: 'La suscripción primaria y posterior rendimiento de instrumentos de deuda del Tesoro Nacional se rige por las mismas exenciones que los títulos públicos (art. 26 LIG).',
      bienesPersonales: 'exento',
      bienesPersonalesDetail: 'Totalmente exentos en Bienes Personales por tratarse de deuda pública de la República Argentina.',
      itf: false,
      iva: false,
      notes: 'Excelente alternativa para ingresar a instrumentos de renta fija soberana a precio de emisión oficial.'
    }
  }
];
