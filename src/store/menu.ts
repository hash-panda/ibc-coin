import { acceptHMRUpdate, defineStore } from 'pinia'

export const useMenuStore = defineStore({
    id: 'menu',
    state: () => {
        return {
            currentMenuId: 'pair',
        }
    },
    getters: {},
    actions: {
        setCurrentMenuId(id: string) {
            this.currentMenuId = id
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMenuStore, import.meta.hot))
}
