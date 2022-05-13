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
            // 需要钱包授权的链
            connectChainInfo: {
                cosmos: {
                    chainId: 'cosmoshub-4',
                    prefix: 'cosmos',
                    name: '',
                    address: '',
                    needConnect: true,
                },
                evmos: {
                    chainId: 'evmos_9001-2',
                    prefix: 'evmos',
                    name: '',
                    address: '',
                    needConnect: true,
                },
            },
            // 可以通过 cosmos 钱包 bech32 转换的
            chainInfo: {
                osmosis: {
                    chainId: 'osmosis-1',
                    prefix: 'osmo',
                    name: '',
                    address: '',
                },
                juno: {
                    chainId: 'juno-1',
                    prefix: 'juno',
                    name: '',
                    address: '',
                },
                crescent: {
                    chainId: 'crescent-1',
                    prefix: 'cre',
                    name: '',
                    address: '',
                },
                assetMantle: {
                    chainId: 'mantle-1',
                    prefix: 'mantle',
                    name: '',
                    address: '',
                },
            },
        }
    },
    getters: {
        chainWallet: state => {
            let result = []
            for (const [key, value] of Object.entries(state.connectChainInfo)) {
                result.push({
                    chainName: key,
                    ...value,
                })
            }
            for (const [key, value] of Object.entries(state.chainInfo)) {
                result.push({
                    chainName: key,
                    ...value,
                })
            }
            return result
        },
        chainInfoArray: state => {
            let result = []
            for (const [key, value] of Object.entries(state.chainInfo)) {
                result.push({
                    chainName: key,
                    ...value,
                })
            }

            return result
        },
        connectChainInfoArray: state => {
            let result = []
            for (const [key, value] of Object.entries(state.connectChainInfo)) {
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
            if (chain && this.chainInfo[chain]) {
                this.chainInfo[chain].name = chainInfo?.name ?? ''
                this.chainInfo[chain].address = chainInfo?.address ?? ''
            } else {
                this.connectChainInfo[chain].name = chainInfo?.name ?? ''
                this.connectChainInfo[chain].address = chainInfo?.address ?? ''
            }
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
                key: 'ibcCoin_wallet_chainInfo',
                storage: localStorage,
                paths: ['chainInfo'],
            },
            {
                key: 'ibcCoin_wallet_connectChainInfo',
                storage: localStorage,
                paths: ['connectChainInfo'],
            },
        ],
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useWalletStore, import.meta.hot))
}
