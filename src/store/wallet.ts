import { acceptHMRUpdate, defineStore } from 'pinia'

export const useWalletStore = defineStore({
    id: 'wallet',
    state: () => {
        return {
            address: '',
        }
    },
    getters: {},
    actions: {
        setCurrentAddress(address: string) {
            this.address = address
        },
        reset() {
            this.$reset()
        },
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'ibcCoin_wallet_address',
                storage: localStorage,
                paths: ['address'],
            },
        ],
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useWalletStore, import.meta.hot))
}
