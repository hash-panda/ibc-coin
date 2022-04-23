import { useTokenStore } from '@/store/token'

const tokenStore = useTokenStore()

export const openAccount = (account: string) => {
    // TODO 各个不同的账户查询的链接是不同的，现在暂时使用 osmosis
    window.open(`https://www.mintscan.io/${tokenStore.currentTokenInfo.chain}/account/${account}`, '_blank')
}
export const openTx = (tx: string) => {
    // TODO 各个不同的地址对应不同 mintscan 信息
    window.open(`https://www.mintscan.io/${tokenStore.currentTokenInfo.chain}/txs/${tx}`, '_blank')
}
