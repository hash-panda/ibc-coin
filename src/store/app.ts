import { acceptHMRUpdate, defineStore } from 'pinia'

export const useAppStore = defineStore({
    id: 'app',
    state: () => {
        return {
            locale: 'zh-CN', // zh-CN  en-US
            isDark: true,
        }
    },
    getters: {
        currentTheme(state) {
            return state.isDark ? 'forest' : 'emerald'
        },
    },
    actions: {
        setLocale() {
            this.locale = this.locale === 'zh-CN' ? 'en-US' : 'zh-CN'
        },
        changeTheme(isDark: boolean) {
            this.isDark = isDark
        },
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'ibcCoin_locale',
                storage: localStorage,
                paths: ['locale'],
            },
            {
                key: 'ibcCoin_theme',
                storage: localStorage,
                paths: ['isDark'],
            },
        ],
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}
