import { acceptHMRUpdate, defineStore } from 'pinia'
import { CoinPair } from '@/types/types'

export const useTopHotStore = defineStore({
    id: 'topHot',
    state: () => {
        return {
            topTokens: [
                {
                    chain: 'evmos',
                    name: 'evmos',
                    currentPrice: '-',
                    dailyPriceChangeInPercentage: '-',
                },
                {
                    chain: 'crescent',
                    name: 'cre',
                    currentPrice: '-',
                    dailyPriceChangeInPercentage: '-',
                },
                {
                    chain: 'osmosis',
                    name: 'mntl',
                    currentPrice: '-',
                    dailyPriceChangeInPercentage: '-',
                },
                {
                    chain: 'osmosis',
                    name: 'juno',
                    currentPrice: '-',
                    dailyPriceChangeInPercentage: '-',
                },
                // {
                //     chain: 'osmosis',
                //     name: 'scrt',
                //     currentPrice: '-',
                //     dailyPriceChangeInPercentage: '-',
                // },
            ] as CoinPair[],
        }
    },
    getters: {},
    actions: {
        updateTopHot(tokens: CoinPair[]) {
            this.topTokens.forEach((v, index) => {
                const tokensIndex = tokens.findIndex(e => e.name === v.name && e.chain === v.chain)
                if (tokensIndex > -1) {
                    this.topTokens[index] = tokens[tokensIndex]
                }
            })
        },
        reset() {
            this.$reset()
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTopHotStore, import.meta.hot))
}
