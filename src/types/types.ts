export interface CoinPair {
    tokenId: string
    name?: string
    denom?: string
    coinPair?: string
    icon?: string
    currentPrice?: number | string
    currentPriceUnit?: string
    marketCap?: number | string
    totalVolume?: number | string
    marketCapUnit?: string
    dailyPriceChangeInPercentage?: string | number
    lastUpdated?: string | number
    chain?: string
}

export interface CoinItem {
    denom: string
    name: string
    icon: string
}

export interface SelectItem {
    label: string
    value: string | number
}

export type ExtractValue<T, K> = T extends { value: K; label: infer R } ? R : never
