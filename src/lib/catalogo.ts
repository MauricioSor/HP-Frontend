import { instruments } from '@/data/instruments'
import { cryptoTopics } from '@/data/crypto-topics'

export type TipoCatalogo = 'bursatil' | 'cripto'

export interface ItemCatalogo {
  slug: string
  name: string
  tipo: TipoCatalogo
  risk: string
  shortDescription: string
  href: string
  horizonte?: string
}

export function itemCatalogo(slug: string, tipo?: TipoCatalogo): ItemCatalogo | null {
  if (tipo !== 'cripto') {
    const bursatil = instruments.find((item) => item.slug === slug)
    if (bursatil) {
      return {
        slug: bursatil.slug,
        name: bursatil.name,
        tipo: 'bursatil',
        risk: bursatil.risk,
        shortDescription: bursatil.shortDescription,
        href: `/mercado-bursatil/${bursatil.slug}`,
        horizonte: bursatil.horizon,
      }
    }
  }
  if (tipo !== 'bursatil') {
    const cripto = cryptoTopics.find((item) => item.slug === slug)
    if (cripto) {
      return {
        slug: cripto.slug,
        name: cripto.title,
        tipo: 'cripto',
        risk: cripto.risk,
        shortDescription: cripto.shortDescription,
        href: `/cripto/${cripto.slug}`,
      }
    }
  }
  return null
}

export const tickersPorSlug: Record<string, { proName: string; title: string }[]> = {
  lecaps: [
    { proName: 'BCBA:S31L5', title: 'S31L' },
    { proName: 'BCBA:S28N5', title: 'S28N' },
    { proName: 'BCBA:T15E6', title: 'T15E' },
  ],
  'bonos-soberanos': [
    { proName: 'BCBA:AL30', title: 'AL30' },
    { proName: 'BCBA:GD30', title: 'GD30' },
    { proName: 'BCBA:AL35', title: 'AL35' },
  ],
  'acciones-argentinas': [
    { proName: 'BCBA:YPFD', title: 'YPF' },
    { proName: 'BCBA:PAMP', title: 'Pampa' },
    { proName: 'BCBA:GGAL', title: 'Galicia' },
  ],
  cedears: [
    { proName: 'BCBA:MELI', title: 'MELI' },
    { proName: 'BCBA:AAPL', title: 'AAPL' },
    { proName: 'BCBA:NVDA', title: 'NVDA' },
  ],
  etfs: [
    { proName: 'AMEX:SPY', title: 'SPY' },
    { proName: 'NASDAQ:QQQ', title: 'QQQ' },
  ],
  'principales-criptos': [
    { proName: 'BINANCE:BTCUSDT', title: 'Bitcoin' },
    { proName: 'BINANCE:ETHUSDT', title: 'Ethereum' },
  ],
}
