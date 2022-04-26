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
        isFavoriteToken(tokenId: string) {
            return this.favorites.findIndex(e => e.tokenId === tokenId) > -1
        },
        addTokenToFavorites(partial: Partial<CoinPair>) {
            if (this.isFavoriteToken(partial.tokenId)) {
            } else {
                this.favorites.push(partial)
            }
        },
        removeTokenFromFavorites(tokenId: string) {
            this.favorites.splice(
                this.favorites.findIndex(e => e.tokenId === tokenId),
                1,
            )
        },
        editFavoriteToken(tokens: CoinPair[]) {
            this.favorites.forEach((v, index) => {
                const tokensIndex = tokens.findIndex(e => e.tokenId === v.tokenId)
                if (tokensIndex > -1) {
                    this.favorites[index] = tokens[tokensIndex]
                }
            })
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
