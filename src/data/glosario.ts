export type CategoriaGlosario =
  | 'tasas'
  | 'renta-fija'
  | 'renta-variable'
  | 'cambio-inflacion'
  | 'infraestructura'
  | 'cripto';

export interface TerminoGlosario {
  slug: string;
  termino: string;
  sigla?: string;
  categoria: CategoriaGlosario;
  definicionCorta: string;
  explicacion: string;
  ejemplo?: string;
  linkRelacionado?: {
    href: string;
    etiqueta: string;
  };
}

export const categoriasGlosario: { id: CategoriaGlosario; nombre: string }[] = [
  { id: 'tasas', nombre: 'Tasas y Créditos' },
  { id: 'renta-fija', nombre: 'Bonos y Renta Fija' },
  { id: 'renta-variable', nombre: 'Acciones, CEDEARs y Fondos' },
  { id: 'cambio-inflacion', nombre: 'Dólar e Inflación' },
  { id: 'infraestructura', nombre: 'Mercado e Impuestos' },
  { id: 'cripto', nombre: 'Criptoactivos' },
];

export const terminosGlosario: TerminoGlosario[] = [
  {
    slug: 'tna',
    termino: 'Tasa Nominal Anual',
    sigla: 'TNA',
    categoria: 'tasas',
    definicionCorta:
      'Tasa de referencia anual que no incluye el efecto de la capitalización (interés compuesto) de los períodos intermedios.',
    explicacion:
      'La TNA indica el porcentaje de interés que paga una inversión o cobra un préstamo en un año lineal sin reinvertir los intereses ganados en cada subperíodo. Para conocer cuánto rinde en un mes, se divide la TNA por 12 (o por 365 multiplicado por la cantidad de días). Es el indicador que suelen publicitar los bancos para los plazos fijos y las líneas de crédito.',
    ejemplo:
      'Una TNA del 36% equivale a un interés mensual directo del 3% (36% / 12). Si invertís $100.000 a 30 días, cobrás $103.000.',
    linkRelacionado: { href: '/simulador', etiqueta: 'Calcular TNA vs TEA en el simulador' },
  },
  {
    slug: 'tea',
    termino: 'Tasa Efectiva Anual',
    sigla: 'TEA',
    categoria: 'tasas',
    definicionCorta:
      'Rendimiento anual real que se obtiene al reinvertir el capital más los intereses en cada período de capitalización.',
    explicacion:
      'A diferencia de la TNA, la TEA incorpora el efecto del interés compuesto. Cuando renovás un plazo fijo o mantenés una LECAP que capitaliza todos los meses durante un año entero, cada mes cobrás intereses sobre una base mayor. Por eso, para cualquier capitalización menor al año, la TEA siempre es mayor que la TNA.',
    ejemplo:
      'Con una TNA del 36% y capitalización mensual (3% por mes), al cabo de 12 meses tu TEA es del 42,58% ((1 + 0,03)^12 - 1).',
    linkRelacionado: { href: '/simulador', etiqueta: 'Simular interés compuesto' },
  },
  {
    slug: 'tem',
    termino: 'Tasa Efectiva Mensual',
    sigla: 'TEM',
    categoria: 'tasas',
    definicionCorta: 'Rendimiento efectivo que devenga un instrumento financiero cada 30 días.',
    explicacion:
      'En el mercado argentino de pesos —especialmente en las LECAPs y bonos a tasa fija—, el mercado negocia y compara los rendimientos directamente en TEM para contrastarlos mes a mes contra el dato de inflación mensual (IPC) publicado por el INDEC.',
    ejemplo:
      'Si una LECAP cotiza a una TEM del 3,5% y la inflación mensual es del 2,8%, el inversor obtiene una tasa real positiva en pesos.',
    linkRelacionado: { href: '/mercado-bursatil/lecaps', etiqueta: 'Ver ficha de LECAPs' },
  },
  {
    slug: 'cftea',
    termino: 'Costo Financiero Total Efectivo Anual',
    sigla: 'CFTEA',
    categoria: 'tasas',
    definicionCorta:
      'El verdadero costo anual de un préstamo, incluyendo tasa de interés, IVA sobre intereses, seguros y gastos administrativos.',
    explicacion:
      'Cuando solicitás un préstamo personal, prendario o hipotecario, la cuota no se compone únicamente de capital e interés puro (TNA). Los bancos suman el IVA sobre los intereses (21% para consumo), gastos de otorgamiento, mantenimiento de cuenta y seguros. El CFTEA integra todos esos recargos y la capitalización mensual, por lo que es la única variable que debés usar para comparar ofertas entre distintos bancos.',
    ejemplo:
      'Un préstamo personal con TNA del 55% puede tener un CFTEA superior al 95% anual una vez sumados el IVA y los gastos.',
    linkRelacionado: { href: '/simulador?vista=prestamo', etiqueta: 'Probar simulador de préstamos' },
  },
  {
    slug: 'sistema-frances',
    termino: 'Sistema de Amortización Francés',
    categoria: 'tasas',
    definicionCorta:
      'Modalidad de préstamo donde la cuota pura se mantiene constante, pagando más intereses al principio y más capital al final.',
    explicacion:
      'Es el sistema más utilizado en Argentina para préstamos personales, prendarios e hipotecarios. En las primeras cuotas, la mayor parte de tu pago se destina a cubrir intereses sobre el saldo total adeudado y solo una pequeña porción reduce la deuda (amortización). A medida que avanzan los meses y baja el capital pendiente, el peso de los intereses disminuye y la amortización crece.',
    linkRelacionado: { href: '/simulador?vista=prestamo', etiqueta: 'Ver desglose en el simulador' },
  },
  {
    slug: 'dolar-mep',
    termino: 'Dólar MEP (Mercado Electrónico de Pagos)',
    sigla: 'MEP',
    categoria: 'cambio-inflacion',
    definicionCorta:
      'Tipo de cambio legal y bursátil que surge de comprar un bono en pesos y venderlo en dólares dentro del mercado argentino.',
    explicacion:
      'El Dólar MEP (o Dólar Bolsa) permite adquirir dólares billete de forma 100% blanca y regulada a través de una cuenta comitente en una ALyC o desde el home banking. La operación consiste en comprar un título con cotización dual en pesos (por ejemplo, AL30) y luego vender su especie en dólares locales (AL30D), acreditando los dólares en tu cuenta bancaria.',
    ejemplo:
      'Si comprás 100 nominales de AL30 a $72.000 y los vendés como AL30D a USD 60, tu tipo de cambio MEP implícito es de $1.200 por dólar (más comisiones).',
    linkRelacionado: { href: '/guias/bonos-soberanos', etiqueta: 'Leer guía de bonos soberanos' },
  },
  {
    slug: 'dolar-ccl',
    termino: 'Dólar Contado con Liquidación',
    sigla: 'CCL / Cable',
    categoria: 'cambio-inflacion',
    definicionCorta:
      'Tipo de cambio bursátil utilizado para girar divisas entre una cuenta local y una cuenta bancaria en el exterior.',
    explicacion:
      'Funciona de manera análoga al Dólar MEP, pero la venta del activo se liquida en la especie "C" (Cable, por ejemplo AL30C o GD30C) o a través de CEDEARs y acciones con ADR. Es el tipo de cambio de referencia por el cual se ajustan automáticamente las cotizaciones en pesos de todos los CEDEARs y ETFs en la Bolsa de Buenos Aires.',
    linkRelacionado: { href: '/mercado-bursatil/cedears', etiqueta: 'Ver cómo impacta en CEDEARs' },
  },
  {
    slug: 'cer',
    termino: 'Coeficiente de Estabilización de Referencia',
    sigla: 'CER',
    categoria: 'cambio-inflacion',
    definicionCorta:
      'Índice diario publicado por el BCRA que sigue la evolución de la inflación minorista (IPC del INDEC).',
    explicacion:
      'Los bonos ajustados por CER (como los BONCER TX26, T2X5 o DICP) actualizan su capital nominal todos los días según la inflación oficial pasada, además de pagar una tasa adicional (spread) sobre el capital ajustado. Son el instrumento clásico del mercado local para proteger el poder adquisitivo frente a subas de precios.',
  },
  {
    slug: 'uva',
    termino: 'Unidad de Valor Adquisitivo',
    sigla: 'UVA',
    categoria: 'cambio-inflacion',
    definicionCorta:
      'Unidad de cuenta que se actualiza diariamente por inflación (CER), utilizada en créditos hipotecarios y plazos fijos precancelables.',
    explicacion:
      'Creada por el Banco Central para expresar contratos de largo plazo en moneda constante. En un préstamo en UVAs, el capital adeudado y la cuota se fijan en una cantidad determinada de UVAs más una tasa de interés baja (por ejemplo, UVA + 5% anual); el monto en pesos que pagás cada mes sube al ritmo de la inflación.',
    linkRelacionado: { href: '/simulador?vista=prestamo', etiqueta: 'Simular préstamo en UVAs' },
  },
  {
    slug: 'tir',
    termino: 'Tasa Interna de Retorno',
    sigla: 'TIR',
    categoria: 'renta-fija',
    definicionCorta:
      'Rendimiento anualizado estimado de un bono si se mantiene hasta su vencimiento y se reinvierten todos los cupones a esa misma tasa.',
    explicacion:
      'La TIR es la métrica fundamental para comparar bonos entre sí. Tiene en cuenta el precio de mercado actual, el cronograma completo de cupones de interés y las fechas de devolución de capital (amortización). Cuando el precio de un bono baja en el mercado secundario, su TIR sube; cuando el precio del bono sube, su TIR comprime (baja).',
    linkRelacionado: { href: '/guias/bonos-soberanos', etiqueta: 'Ver cómo leer la TIR en bonos' },
  },
  {
    slug: 'paridad',
    termino: 'Paridad de un Bono',
    categoria: 'renta-fija',
    definicionCorta:
      'Relación porcentual entre el precio de mercado de un bono y su Valor Técnico (capital residual más intereses corridos).',
    explicacion:
      'Indica cuántos centavos estás pagando por cada dólar o peso de deuda reconocida en el título. Una paridad del 65% significa que el bono cotiza "bajo la par" (con un descuento del 35% sobre su valor técnico). Una paridad del 100% indica que cotiza "a la par", y superior al 100%, "sobre la par".',
    linkRelacionado: { href: '/guias/bonos-soberanos', etiqueta: 'Ver paridad y residual en la guía' },
  },
  {
    slug: 'valor-residual',
    termino: 'Valor Residual y Amortización',
    categoria: 'renta-fija',
    definicionCorta:
      'Porcentaje del capital original de un bono que todavía no fue devuelto por el emisor.',
    explicacion:
      'Muchos bonos soberanos argentinos (como el AL30 o GD30) devuelven el capital en cuotas semestrales en lugar de pagarlo todo junto el último día. Cada vez que el Estado paga una cuota de amortización, el Valor Residual baja y los próximos cupones de interés se calculan sobre ese saldo restante.',
  },
  {
    slug: 'lecap',
    termino: 'Letra de Capitalización del Tesoro',
    sigla: 'LECAP',
    categoria: 'renta-fija',
    definicionCorta:
      'Título de deuda de corto plazo emitido en pesos por el Tesoro Nacional que capitaliza una tasa fija mensual.',
    explicacion:
      'A diferencia de un plazo fijo bancario que inmoviliza el dinero por 30 días, las LECAPs cotizan todos los días hábiles en BYMA. Eso permite capturar una tasa efectiva mensual compuesta y, en caso de necesitar liquidez antes del vencimiento, venderlas en el acto en el mercado secundario.',
    linkRelacionado: { href: '/mercado-bursatil/lecaps', etiqueta: 'Ver ficha completa de LECAPs' },
  },
  {
    slug: 'caucion-bursatil',
    termino: 'Caución Bursátil',
    categoria: 'renta-fija',
    definicionCorta:
      'Préstamo de muy corto plazo (de 1 a 120 días) en la bolsa, garantizado con títulos valores custodiados por el mercado.',
    explicacion:
      'Conocida como "el plazo fijo de la bolsa", permite colocar pesos o dólares ociosos desde 24 horas hábiles. Quien toma el dinero deja bonos o acciones en garantía con un aforo de seguridad, por lo que el riesgo de incobrabilidad está respaldado por BYMA.',
    linkRelacionado: {
      href: '/mercado-bursatil/cauciones-bursatiles',
      etiqueta: 'Ver ficha de Cauciones Bursátiles',
    },
  },
  {
    slug: 'obligacion-negociable',
    termino: 'Obligación Negociable',
    sigla: 'ON',
    categoria: 'renta-fija',
    definicionCorta:
      'Bono de deuda emitido por una empresa privada (como YPF, Pampa Energía o Pan American Energy) para financiar proyectos.',
    explicacion:
      'Funcionan igual que un bono soberano (pagan cupones periódicos de interés y devuelven el capital al vencimiento), pero el deudor es una compañía privada en lugar del Estado. Las ONs emitidas con oferta pública autorizada por la CNV cuentan con exención en el Impuesto a las Ganancias para personas humanas residentes.',
  },
  {
    slug: 'cedear',
    termino: 'Certificado de Depósito Argentino',
    sigla: 'CEDEAR',
    categoria: 'renta-variable',
    definicionCorta:
      'Certificado que cotiza en la bolsa local en pesos o dólares y representa acciones o ETFs de mercados internacionales.',
    explicacion:
      'Permite invertir desde Argentina y en pesos en compañías globales como Apple, Microsoft, Nvidia o en índices como el S&P 500 (SPY). Cada activo tiene un "ratio de conversión" (por ejemplo, 20 CEDEARs equivalen a 1 acción original en EE.UU.), lo que permite comprar fracciones con montos bajos.',
    linkRelacionado: { href: '/mercado-bursatil/cedears', etiqueta: 'Explorar CEDEARs' },
  },
  {
    slug: 'etf',
    termino: 'Fondo Cotizado en Bolsa',
    sigla: 'ETF',
    categoria: 'renta-variable',
    definicionCorta:
      'Fondo que replica un índice completo (como el S&P 500 o el Nasdaq 100) y se compra o vende igual que una acción.',
    explicacion:
      'En lugar de elegir una sola empresa y asumir su riesgo individual, al comprar un ETF adquirís una canasta diversificada de cientos de compañías líderes con comisiones de administración mínimas.',
    linkRelacionado: { href: '/mercado-bursatil/etfs', etiqueta: 'Ver ficha de ETFs' },
  },
  {
    slug: 'fci',
    termino: 'Fondo Común de Inversión',
    sigla: 'FCI',
    categoria: 'renta-variable',
    definicionCorta:
      'Patrimonio administrado por profesionales en el que los ahorristas suscriben y rescatan cuotapartes.',
    explicacion:
      'Según su plazo de rescate, se clasifican en T+0 (Money Market o liquidez inmediata en el día, como los que usan las billeteras virtuales), T+1 (renta fija en pesos o cobertura que acredita a las 24 horas hábiles) y T+2 (renta variable que acredita a las 48 horas).',
    linkRelacionado: { href: '/mercado-bursatil/fci', etiqueta: 'Ver ficha de FCI' },
  },
  {
    slug: 'merval',
    termino: 'Índice S&P Merval',
    categoria: 'renta-variable',
    definicionCorta:
      'Índice bursátil de referencia que mide la evolución de las acciones más líquidas de la Bolsa de Buenos Aires.',
    explicacion:
      'Agrupa a las principales empresas cotizantes del panel líder en BYMA (bancos, energéticas, petroleras, siderúrgicas y telecomunicaciones). Suele analizarse tanto en pesos como medido en dólares CCL para evaluar el valor histórico real de las compañías argentinas.',
    linkRelacionado: { href: '/cotizaciones', etiqueta: 'Ver gráfico del Merval en vivo' },
  },
  {
    slug: 'riesgo-pais',
    termino: 'Riesgo País (EMBI+ Argentina)',
    categoria: 'infraestructura',
    definicionCorta:
      'Indicador elaborado por JP Morgan que mide la sobretasa que pagan los bonos argentinos frente a los bonos del Tesoro de EE.UU.',
    explicacion:
      'Se expresa en puntos básicos (100 puntos básicos equivalen a 1% de tasa anual adicional). Si los bonos del Tesoro de Estados Unidos rinden 4,2% anual y el Riesgo País de Argentina es de 900 puntos, significa que el mercado le exige a la deuda soberana argentina un rendimiento cercano al 13,2% anual en dólares.',
  },
  {
    slug: 'alyc',
    termino: 'Agente de Liquidación y Compensación',
    sigla: 'ALyC / Broker',
    categoria: 'infraestructura',
    definicionCorta:
      'Sociedad de bolsa matriculada y regulada por la CNV que habilita cuentas comitentes para operar en el mercado de capitales.',
    explicacion:
      'Para comprar o vender bonos, LECAPs, acciones, CEDEARs o colocar cauciones, la operación se canaliza a través de una ALyC o banco registrado ante la Comisión Nacional de Valores.',
  },
  {
    slug: 'byma-cnv-caja',
    termino: 'BYMA, CNV y Caja de Valores',
    categoria: 'infraestructura',
    definicionCorta:
      'Las tres instituciones pilares del mercado de capitales argentino: el mercado donde se opera, el regulador estatal y el custodio oficial.',
    explicacion:
      'BYMA (Bolsas y Mercados Argentinos) es la plaza donde se conciertan y liquidan las operaciones. La CNV (Comisión Nacional de Valores) es el organismo público que regula y fiscaliza a los participantes. La Caja de Valores es la depositaria oficial donde quedan resguardados tus títulos a tu nombre, independientemente del broker que uses.',
  },
  {
    slug: 'halving-staking-dca',
    termino: 'Halving, Staking y DCA en Cripto',
    categoria: 'cripto',
    definicionCorta:
      'Conceptos esenciales del ecosistema cripto: recorte de emisión en Bitcoin, validación PoS con recompensas y compras periódicas.',
    explicacion:
      'El Halving reduce a la mitad la emisión de nuevos BTC cada 210.000 bloques (~4 años). El Staking consiste en delegar criptoactivos en redes Proof of Stake (como Ethereum o Solana) para asegurar la red y recibir rendimientos. El DCA (Dollar-Cost Averaging) es la estrategia de comprar montos fijos a intervalos regulares para promediar el precio de entrada.',
    linkRelacionado: { href: '/cripto', etiqueta: 'Ir al módulo de Mercado Cripto' },
  },
];
