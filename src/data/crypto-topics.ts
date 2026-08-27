export interface CryptoTopic {
  id: string;
  title: string;
  slug: string;
  icon: string; // emoji
  shortDescription: string;
  content: string; // detailed educational content, 3-4 paragraphs in markdown format
  keyPoints: string[]; // 4-6 key takeaways
  risk: 'bajo' | 'medio' | 'alto' | 'muy_alto';
  relatedTopics: string[]; // ids of related topics
}

export const cryptoTopics: CryptoTopic[] = [
  {
    id: 'principales-criptos',
    title: 'Principales Criptomonedas: Bitcoin, Ethereum, Solana y Stablecoins',
    slug: 'principales-criptos',
    icon: '🪙',
    shortDescription: 'Conocé los activos digitales líderes que dominan la capitalización y la infraestructura del ecosistema cripto.',
    content: `El ecosistema de criptoactivos está encabezado por proyectos con propuestas de valor bien diferenciadas. **Bitcoin (BTC)** es la primera criptomoneda descentralizada y el estándar monetario del espacio digital, concebido como reserva de valor y "oro digital" gracias a su emisión programada e inmutable de 21 millones de unidades. Por su parte, **Ethereum (ETH)** revolucionó la tecnología blockchain al introducir los **contratos inteligentes (Smart Contracts)**, convirtiéndose en la computadora mundial descentralizada sobre la cual operan las finanzas descentralizadas (DeFi), tokens no fungibles (NFTs) y aplicaciones Web3.

En el segmento de plataformas de contratos inteligentes de alto rendimiento, **Solana (SOL)** se consolidó como una de las redes Layer 1 más populares, optimizada para procesar miles de transacciones por segundo a costos de red (gas fees) casi nulos. Además, para los inversores y ahorristas de economías con alta inflación como Argentina, las **Stablecoins o criptodólares** (como USDT de Tether, USDC de Circle y DAI de MakerDAO) juegan un rol central al mantener paridad 1:1 con el dólar estadounidense mediante reservas bancarias auditadas o colaterales descentralizados sobrecolateralizados.

Comprender la diferencia entre una moneda de reserva de valor (BTC), un token de utilidad e infraestructura de red (ETH, SOL) y una moneda estable (USDT) es el primer paso indispensable para construir un portafolio equilibrado. Cada activo responde a dinámicas de adopción, liquidez y ciclos de mercado distintos que determinan su nivel de volatilidad y horizonte temporal sugerido.`,
    keyPoints: [
      'Bitcoin (BTC) actúa como el activo de reserva digital supremo con emisión estrictamente limitada a 21 millones.',
      'Ethereum (ETH) es el ecosistema líder de smart contracts, DeFi y aplicaciones descentralizadas.',
      'Solana (SOL) destaca por su velocidad extrema de transacción y bajísimas comisiones de red.',
      'Las Stablecoins (USDT, USDC, DAI) permiten dolarizar saldos en billeteras digitales sin volatilidad de cotización.',
      'La diversificación entre reserva de valor, infraestructura y liquidez estable reduce drásticamente el riesgo de cartera.'
    ],
    risk: 'medio',
    relatedTopics: ['fundamentos-bitcoin', 'minado', 'fomo', 'quemado-monedas']
  },
  {
    id: 'fundamentos-bitcoin',
    title: 'Fundamentos de Bitcoin: Arquitectura, Halving y Escasez Absoluta',
    slug: 'fundamentos-bitcoin',
    icon: '⚡',
    shortDescription: 'Descubrí los principios matemáticos, el whitepaper de Satoshi Nakamoto y el ciclo de reducción de emisión.',
    content: `Publicado el 31 de octubre de 2008 por el seudónimo **Satoshi Nakamoto**, el whitepaper de Bitcoin sentó las bases del primer sistema de dinero electrónico peer-to-peer (entre pares) sin necesidad de intermediarios financieros ni bancos centrales. La red opera sobre un libro contable público y distribuido (**Blockchain**) protegido por criptografía asimétrica y el algoritmo de consenso **Proof of Work (PoW)**, garantizando que ninguna entidad estatal o privada pueda alterar transacciones pasadas ni censurar transferencias.

Una de las propiedades monetarias más disruptivas de Bitcoin es su **escasez programada matemáticamente**. A diferencia del dinero fiduciario tradicional que sufre devaluación constante por emisión monetaria discrecional, en Bitcoin solo existirán **21.000.000 de BTC**. Para regular esta emisión, cada 210.000 bloques minados (aproximadamente cada 4 años) se produce el evento conocido como **Halving**, el cual recorta a la mitad la recompensa que reciben los mineros por validar cada bloque (reduciéndose históricamente de 50 BTC en 2009, a 25, 12.5, 6.25 y a 3.125 BTC tras el halving de 2024).

El halving actúa como un shock de oferta inelástico: mientras la demanda global de resguardo de valor continúe creciendo o se mantenga constante, la reducción en el flujo de nuevos bitcoins genera una presión alcista estructural en el largo plazo. A esto se suma el principio de **autocustodia** (*"Not your keys, not your coins"*), que permite a cualquier individuo ser su propio custodio y poseedor absoluto de sus activos mediante hardware wallets o billeteras sin custodia.`,
    keyPoints: [
      'Satoshi Nakamoto resolvió el problema del doble gasto digital sin requerir intermediarios de confianza.',
      'El suministro total de Bitcoin tiene un tope estricto e inmutable de 21 millones de unidades.',
      'El Halving reduce a la mitad la emisión de nuevos bitcoins cada 4 años, intensificando la escasez del activo.',
      'La red es descentralizada, resistente a la censura e imposible de apagar o confiscar si se practica la autocustodia.',
      'La dificultad de minado se ajusta automáticamente cada 2016 bloques para mantener un ritmo de bloque constante de 10 minutos.'
    ],
    risk: 'medio',
    relatedTopics: ['principales-criptos', 'minado', 'fomo', 'quemado-monedas']
  },
  {
    id: 'minado',
    title: 'Minería y Validación: Proof of Work vs Proof of Stake',
    slug: 'minado',
    icon: '⛏️',
    shortDescription: 'Cómo se procesan y aseguran las transacciones en la red: hardware, gasto energético, staking y rentabilidad.',
    content: `El minado y la validación constituyen el corazón técnico que asegura la integridad y descentralización de las redes blockchain. En los sistemas **Proof of Work (PoW)** como Bitcoin, miles de computadoras especializadas con chips de circuito integrado (**ASIC**) compiten globalmente en una carrera matemática por resolver funciones criptográficas (SHA-256). El primer minero en encontrar la solución válida propone el siguiente bloque, lo difunde a los nodos y recibe la recompensa en criptomonedas más las comisiones de transacción pagadas por los usuarios.

Por otro lado, muchas redes modernas (incluido Ethereum tras la actualización The Merge) adoptaron el mecanismo **Proof of Stake (PoS)** o Prueba de Participación. En PoS no se requiere un consumo masivo de electricidad ni hardware dedicado de computación, sino que los validadores bloquean un colateral en tokens nativos (**Staking**, por ejemplo 32 ETH en la red Ethereum) para obtener el derecho de validar bloques y recibir una tasa de interés anual o recompensa por su servicio a la red.

La rentabilidad del minado PoW depende de tres variables críticas: la eficiencia del hardware (Hashrate / Watts), el costo del kilowatt/hora de energía eléctrica y el precio de mercado del criptoactivo. En países o regiones con excedentes energéticos hidroeléctricos o gasoductos (como el gas venteado de Vaca Muerta en Argentina), la minería se convirtió en una industria de alto valor agregado para monetizar energía que de otro modo se perdería.`,
    keyPoints: [
      'Proof of Work (PoW) respalda la seguridad de Bitcoin mediante consumo de energía computacional comprobable.',
      'Proof of Stake (PoS) asegura redes mediante el depósito en garantía (Staking) de tokens nativos con bajo consumo eléctrico.',
      'La dificultad de minería en PoW se calibra automáticamente para garantizar la emisión previsible sin importar la potencia conectada.',
      'Los costos de electricidad y el recambio de hardware (ASIC/GPU) son los factores determinantes de la rentabilidad minera.',
      'El Staking permite a inversores minoristas delegar fondos y percibir rendimientos pasivos directos de la red.'
    ],
    risk: 'medio',
    relatedTopics: ['fundamentos-bitcoin', 'principales-criptos', 'quemado-monedas']
  },
  {
    id: 'fomo',
    title: 'Psicología de Mercado, FOMO y Estrategias DCA',
    slug: 'fomo',
    icon: '🧠',
    shortDescription: 'Dominá las trampas emocionales del inversor, el índice Fear & Greed y la técnica de compras periódicas automáticas.',
    content: `El mercado de criptomonedas opera 24 horas al día, los 7 días de la semana, sin feriados ni circuitos de corte automáticos. Esta dinámica continua, sumada a la volatilidad extrema, convierte a la psicología del inversor en el factor más crítico para determinar el éxito financiero. El fenómeno del **FOMO (Fear of Missing Out)** describe el impulso emocional de comprar un activo cuando su precio ya subió verticalmente, impulsado por el miedo a "quedarse afuera" de las ganancias ajenas. En el extremo opuesto, el **FUD (Fear, Uncertainty, Doubt)** induce a vender en pánico en los pisos de mercado.

Para medir el sentimiento predominante de los participantes se utiliza el **Crypto Fear & Greed Index** (Índice de Miedo y Avaricia), un indicador multifactorial que analiza volumen, volatilidad, interacciones en redes sociales y tendencias de búsqueda. Históricamente, los períodos de "Miedo Extremo" suelen señalar excelentes puntos de entrada con precios deprimidos, mientras que la "Avaricia Extrema" o euforia generalizada precede correcciones profundas del mercado.

La estrategia más efectiva y respaldada por la evidencia cuantitativa para neutralizar las emociones destructivas es el **DCA (Dollar-Cost Averaging o Promediado de Costo)**. Consiste en invertir una cantidad fija de dinero a intervalos regulares de tiempo (semanal o mensualmente), sin importar si el precio subió o bajó. Al ejecutar DCA, comprás más unidades cuando el mercado cae y menos cuando está caro, promediando el precio de adquisición a la baja y eliminando por completo la necesidad de adivinar el momento perfecto de entrada (timing de mercado).`,
    keyPoints: [
      'El FOMO empuja a inversores novatos a comprar en máximos históricos impulsados por la euforia.',
      'El FUD y las caídas abruptas generan ventas por pánico cerca de los mínimos locales de mercado.',
      'El índice Fear & Greed sirve como brújula contracíclica para identificar extremos emocionales de mercado.',
      'El Dollar-Cost Averaging (DCA) automatiza compras periódicas constantes, mitigando la volatilidad psicológica.',
      'La disciplina de inversión y un horizonte temporal a largo plazo superan consistentemente al trading impulsivo.'
    ],
    risk: 'alto',
    relatedTopics: ['principales-criptos', 'fundamentos-bitcoin', 'memecoins']
  },
  {
    id: 'quemado-monedas',
    title: 'Quemado de Monedas (Token Burning) y Modelos Deflacionarios',
    slug: 'quemado-monedas',
    icon: '🔥',
    shortDescription: 'Qué significa destruir tokens, cómo reduce el suministro circulante y su impacto directo en el precio del activo.',
    content: `El **quemado de monedas (Token Burning)** es un mecanismo programado mediante el cual un protocolo o equipo desarrollador retira de forma permanente e irreversible una cantidad determinada de criptomonedas de la circulación activa. Técnicamente, esto se logra enviando los tokens a una **dirección de quemado o "eater address"** (como la dirección pública 0x000...dead), una billetera criptográfica verificable en la blockchain de la cual nadie posee las claves privadas, tornando esos fondos irrecuperables para siempre.

El objetivo económico principal de este mecanismo responde a la ley de oferta y demanda: al reducir el suministro total circulante de un activo mientras la demanda se mantiene o se incrementa, se genera una presión alcista sobre el valor unitario de los tokens remanentes. Funciona de manera análoga a la **recompra de acciones propias (share buybacks)** que ejecutan corporaciones como Apple o Berkshire Hathaway en Wall Street para beneficiar a sus accionistas.

Uno de los ejemplos más célebres es la propuesta de mejora **EIP-1559 de Ethereum**, implementada en 2021, que quema automáticamente una porción de la tarifa base (base fee) de cada transacción en ETH. En épocas de alta congestión de red, la tasa de ETH quemado supera a la emisión de nuevos bloques, convirtiendo a Ethereum en un activo **ultrasound money o deflacionario**. Otros ejemplos notables incluyen los quemados trimestrales sistemáticos de Binance Coin (BNB) basados en las ganancias de la plataforma.`,
    keyPoints: [
      'El quemado consiste en enviar tokens a una dirección nula inaccesible (burn address) para destruirlos de forma verificable.',
      'Reduce la oferta circulante de la criptomoneda, creando una dinámica deflacionaria o de escasez creciente.',
      'Equivale económicamente a una recompra de acciones corporativas en los mercados financieros tradicionales.',
      'El EIP-1559 de Ethereum quema comisiones de gas por transacción, permitiendo que la red se vuelva deflacionaria.',
      'Verificar en el explorador de bloques (on-chain) los eventos de quema asegura transparencia total sin manipulación.'
    ],
    risk: 'medio',
    relatedTopics: ['fundamentos-bitcoin', 'principales-criptos', 'memecoins']
  },
  {
    id: 'memecoins',
    title: 'Memecoins: Especulación, Cultura de Internet y Gestión de Riesgo',
    slug: 'memecoins',
    icon: '🐕',
    shortDescription: 'Análisis de tokens hiper-volátiles impulsados por virilidad social: oportunidades, trampas de liquidez y riesgos de pérdida total.',
    content: `Las **memecoins** son criptomonedas creadas a partir de memes de internet, chistes de la cultura popular o personajes virales, sin una utilidad técnica o flujo de caja intrínseco detrás de su emisión. El movimiento comenzó históricamente en 2013 con **Dogecoin (DOGE)** como una sátira cómica a Bitcoin, y evolucionó con proyectos multimillonarios como **Shiba Inu (SHIB)**, **Pepe (PEPE)**, **Bonk (BONK)** y miles de tokens efímeros lanzados diariamente en redes rápidas como Solana a través de plataformas de emisión instantánea.

A diferencia de proyectos de infraestructura con desarrollo tecnológico sostenido, el precio de una memecoin responde casi con exclusividad a la atención mediática, tendencias en redes sociales (X/Twitter, TikTok, Telegram) y la psicología de masas. Aunque en etapas tempranas pueden generar rendimientos astronómicos en cuestión de horas debido a la liquidez especulativa, conllevan riesgos extremos de pérdida total del capital invertido debido a su nulo valor fundamental y su vulnerabilidad ante manipulaciones de mercado.

Entre los mayores peligros asociados a este sector se destacan los **Rug Pulls** (cuando los creadores retiran repentinamente toda la liquidez del fondo descentralizado llevándose los fondos de los inversores), los esquemas de **Pump & Dump** coordinados por grupos de traders y las trampas de contrato inteligente conocidas como **Honeypots** (donde el código permite comprar el token pero bloquea la función de venta). Si un inversor decide participar en este segmento, debe considerarlo estrictamente como capital de riesgo extremo o apuesta recreativa, destinando únicamente montos que esté dispuesto a perder en su totalidad.`,
    keyPoints: [
      'Las memecoins derivan su valor puramente de la viralidad en redes, la cultura de memes y la especulación minorista.',
      'Carecen de fundamentales económicos, utilidades técnicas tangibles o respaldo financiero tradicional.',
      'Son vulnerables a esquemas de manipulación como Rug Pulls, Honeypots y grupos organizados de Pump & Dump.',
      'Pueden experimentar pérdidas superiores al 95% de su valor en cuestión de días tras el agotamiento de la euforia.',
      'Cualquier asignación de capital debe ser mínima (1-2% máximo del portafolio) y considerarse de riesgo absoluto.'
    ],
    risk: 'muy_alto',
    relatedTopics: ['fomo', 'principales-criptos', 'quemado-monedas']
  }
];
