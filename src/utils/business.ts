import { useTokenStore } from '@/store/token'
import { useRouter } from 'vue-router'
import { getChainTypeByAddress } from './index'

export default function businessCommon() {
    const tokenStore = useTokenStore()
    const router = useRouter()

    const openAccount = (account: string) => {
        // TODO 各个不同的账户查询的链接是不同的，现在暂时使用 osmosis
        // window.open(`https://www.mintscan.io/${tokenStore.currentTokenInfo.chain}/account/${account}`, '_blank')
        router.push({
            name: 'account',
            params: {
                address: account,
            },
        })
    }
    const openMintscan = (account: string) => {
        // TODO 各个不同的账户查询的链接是不同的，现在暂时使用 osmosis
        window.open(`https://www.mintscan.io/${tokenStore.currentTokenInfo.chain}/account/${account}`, '_blank')
    }
    const openTx = (tx: string) => {
        // TODO 各个不同的地址对应不同 mintscan 信息
        window.open(`https://www.mintscan.io/${tokenStore.currentTokenInfo.chain}/txs/${tx}`, '_blank')
    }
    const openProposal = (id: string, address: string) => {
        // TODO 各个不同的地址对应不同 mintscan 信息
        window.open(`https://www.mintscan.io/${getChainTypeByAddress(address)}/proposals/${id}`, '_blank')
    }
    return {
        openAccount,
        openMintscan,
        openTx,
        openProposal,
    }
}
