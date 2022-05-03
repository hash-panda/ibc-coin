import { acceptHMRUpdate, defineStore } from 'pinia'
import { CoinPair } from '@/types/types'

export const useTokenStore = defineStore({
    id: 'token',
    state: () => {
        return {
            currentTokenInfo: {
                // tokenId: 'e6aadc3a-f6f5-42fc-b3aa-6ae2a65206e7',
                tokenId: '',
                chain: '',
                name: '-',
                currentPrice: '-',
                marketCap: '-',
                totalVolume: '-',
                dailyPriceChangeInPercentage: '-',
            } as CoinPair,
        }
    },
    getters: {},
    actions: {
        setCurrentTokenInfo(partial: Partial<CoinPair>) {
            this.$patch(state => (state.currentTokenInfo = partial))
        },
        reset() {
            this.$reset()
        },
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'ibcCoin_currentTokenInfo',
                storage: localStorage,
                paths: ['currentTokenInfo'],
            },
        ],
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTokenStore, import.meta.hot))
}
