import { acceptHMRUpdate, defineStore } from 'pinia'

export const useWalletStore = defineStore({
    id: 'wallet',
    state: () => {
        return {
            currentSelectedWallet: {
                chainName: 'cosmos',
                chainId: 'cosmoshub-4',
                name: '',
                address: '',
            },
            chainInfo: {
                cosmos: {
                    chainId: 'cosmoshub-4',
                    name: '',
                    address: '',
                },
                osmosis: {
                    chainId: 'osmosis-1',
                    name: '',
                    address: '',
                },
                juno: {
                    chainId: 'juno-1',
                    name: '',
                    address: '',
                },
                crescent: {
                    chainId: 'crescent-1',
                    name: '',
                    address: '',
                },
                assetMantle: {
                    chainId: 'mantle-1',
                    name: '',
                    address: '',
                },
                evmos: {
                    chainId: 'evmos_9001-2',
                    name: '',
                    address: '',
                },
            },
        }
    },
    getters: {
        chainWallet: state => {
            let result = []
            for (const [key, value] of Object.entries(state.chainInfo)) {
                result.push({
                    chainName: key,
                    ...value,
                })
            }
            return result
        },
    },
    actions: {
        setChainInfo(chainInfo: any, chain: string) {
            this.chainInfo[chain].name = chainInfo?.name ?? ''
            this.chainInfo[chain].address = chainInfo?.address ?? ''
        },
        setCurrentSelectedWallet(wallet: any) {
            this.currentSelectedWallet.name = wallet?.name ?? ''
            this.currentSelectedWallet.address = wallet?.address ?? ''
            this.currentSelectedWallet.chainName = wallet?.chainName ?? ''
            this.currentSelectedWallet.chainId = wallet?.chainId ?? ''
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
                paths: ['chainInfo'],
            },
        ],
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useWalletStore, import.meta.hot))
}
