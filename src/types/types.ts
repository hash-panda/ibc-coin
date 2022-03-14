export interface CoinPair {
    name: string;
    coinPair: string;
    icon: string;
    price: number | string;
    priceUnit: string;
    marketCap: number | string;
    marketCapUnit: string;
    h24: string;
}
export interface CoinItem {
    denom: string;
    name: string;
    icon: string;
}

export interface SelectItem {
    label: string;
    value: string | number;
}

export type ExtractValue<T, K> = T extends { value: K; label: infer R } ? R : never;
