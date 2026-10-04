export const ADSENSE_CLIENT = 'ca-pub-2238911854633908'

export function esSlotAdsense(slot: string) {
  return /^\d+$/.test(slot)
}
