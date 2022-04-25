import { acceptHMRUpdate, defineStore } from 'pinia'
import { CoinPair } from '@/types/types'

export const useTokenFavoritesStore = defineStore({
    id: 'tokenFavorites',
    state: () => {
        return {
            favorites: [] as CoinPair[],
        }
    },
    getters: {},
    actions: {
        addTokenFavorites(partial: Partial<CoinPair>) {
            this.$patch(state => state.favorites.push(partial))
        },
        reset() {
            this.$reset()
        },
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'ibcCoin_token_favorites',
                storage: localStorage,
                paths: ['favorites'],
            },
        ],
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTokenFavoritesStore, import.meta.hot))
}
