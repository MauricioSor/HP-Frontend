export interface BonoSoberano {
  ticker: string
  nombre: string
  ley: 'Argentina' | 'Nueva York'
  moneda: string
  vencimiento: string
  perfil: string
  cupon: string
  amortizacion: string
  paraQueSirve: string
  riesgo: string
}

export const bonosPrincipales: BonoSoberano[] = [
  {
    ticker: 'AL30',
    nombre: 'Bonar 2030',
    ley: 'Argentina',
    moneda: 'Dólares',
    vencimiento: '9 de julio de 2030',
    perfil: 'El más líquido del mercado local. Es la referencia para dolarizar con MEP.',
    cupon:
      'Paga renta dos veces al año (9 de enero y 9 de julio). El cupón es escalonado: arrancó bajo y sube en tramos según el prospecto de 2020, hasta 2,5% anual sobre el capital residual.',
    amortizacion:
      'No devuelve todo el capital al final. Desde julio de 2024 reparte el principal en 13 cuotas semestrales de aproximadamente 7,69% del valor nominal original. Cada pago baja el residual.',
    paraQueSirve:
      'Cobrar dólares en la cuenta comitente, armar el dólar MEP (AL30 vs AL30D) y tener un flujo previsible de renta más capital.',
    riesgo:
      'Riesgo soberano argentino. En un default o reestructuración, la negociación se hace bajo ley local: menos herramientas legales que un Global.',
  },
  {
    ticker: 'GD30',
    nombre: 'Global 2030',
    ley: 'Nueva York',
    moneda: 'Dólares',
    vencimiento: '9 de julio de 2030',
    perfil: 'El espejo del AL30 con legislación extranjera. Mismo cronograma económico, distinta protección legal.',
    cupon:
      'Mismo esquema que el AL30: cupón semestral escalonado sobre el residual, con las mismas fechas de pago.',
    amortizacion:
      'Idéntica a la del AL30: cuotas semestrales desde 2024 hasta 2030. Lo que cambia no es el flujo, sino la ley que lo ampara.',
    paraQueSirve:
      'Misma dolarización que el AL30, pero suele usarse para Cable (CCL) y para quien prioriza ley Nueva York. Suele cotizar un poco más caro que el AL30: esa diferencia es el spread AL-GD.',
    riesgo:
      'Sigue siendo crédito argentino. La ley NY no elimina el default; da más chances de litigio y de recuperación si el Estado no paga.',
  },
  {
    ticker: 'AL35',
    nombre: 'Bonar 2035',
    ley: 'Argentina',
    moneda: 'Dólares',
    vencimiento: '9 de julio de 2035',
    perfil: 'Hermano más largo del AL30. Más duration: se mueve más cuando cambia el riesgo país o las tasas.',
    cupon:
      'También es step-up y semestral. En los últimos años del bono el cupón es más alto que el del AL30, para compensar el plazo.',
    amortizacion:
      'Amortiza en la parte final de su vida. Hasta que no empiezan esas cuotas, casi todo lo que cobrás es renta; después se mezcla renta + capital.',
    paraQueSirve:
      'Quien busca más rendimiento potencial a cambio de aguantar más años y más volatilidad. Menos líquido que el AL30.',
    riesgo:
      'Mayor sensibilidad de precio. Si el mercado pide más tasa, el AL35 cae más que el AL30. Ley local.',
  },
  {
    ticker: 'GD35',
    nombre: 'Global 2035',
    ley: 'Nueva York',
    moneda: 'Dólares',
    vencimiento: '9 de julio de 2035',
    perfil: 'Versión ley Nueva York del AL35. Mismo vencimiento y lógica de flujos, distinta jurisdicción.',
    cupon:
      'Cupón semestral escalonado, alineado con el AL35. Se calcula sobre el capital que todavía no se amortizó.',
    amortizacion:
      'Igual que el AL35: el capital vuelve en cuotas hacia el final, no de un solo golpe el último día.',
    paraQueSirve:
      'Extender duration en dólares con el paraguas de ley extranjera. También entra en operaciones de Cable cuando hay liquidez.',
    riesgo:
      'Duration larga + riesgo soberano. La prima vs AL35 es el precio de la ley NY.',
  },
  {
    ticker: 'AE38',
    nombre: 'Bonar 2038',
    ley: 'Argentina',
    moneda: 'Dólares',
    vencimiento: '2038',
    perfil: 'El más largo de los cinco. Es el que más se estira si el país mejora, y el que más duele si empeora.',
    cupon:
      'Renta semestral escalonada. Durante muchos años el flujo es casi solo interés; las amortizaciones llegan tarde.',
    amortizacion:
      'El capital se devuelve en la etapa final. Hasta entonces el residual se mantiene alto y el precio oscila como un bono largo clásico.',
    paraQueSirve:
      'Apuestas de largo plazo a una baja del riesgo país. No es el bono para necesitar la plata en dos años.',
    riesgo:
      'Máxima duration de este grupo. Poca liquidez relativa frente al AL30. Ley argentina.',
  },
]
