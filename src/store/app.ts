import { acceptHMRUpdate, defineStore } from 'pinia'

export const useAppStore = defineStore({
    id: 'app',
    state: () => {
        return {
            locale: 'zh-CN', // zh-CN  en-US
        }
    },
    getters: {},
    actions: {
        setLocale() {
            this.locale = this.locale === 'zh-CN' ? 'en-US' : 'zh-CN'
        },
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'ibcCoin_app',
                storage: localStorage,
                paths: ['locale'],
            },
        ],
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}
