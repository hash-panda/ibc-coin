import { acceptHMRUpdate, defineStore } from 'pinia';
export const useMenuStore = defineStore({
    id: 'profile',
    state: () => {
        return {
            currentMenuId: 'pair',
            menuList: [
                { id: 'pair', name: 'Pairs', actived: true },
                { id: 'subscribe', name: 'Subscribe', actived: false }
            ]
        };
    },
    getters: {},
    actions: {
        setCurrentMenuId(id: string) {
            this.currentMenuId = id;
        },
        changeMenu(menuId: string) {
            this.menuList.forEach((v) => {
                if (v.id === menuId) {
                    v.actived = true;
                    this.currentMenuId = v.id;
                } else {
                    v.actived = false;
                }
            });
        }
    }
    // persist: {
    //     enabled: true,
    //     strategies: [
    //         {
    //             key: 'kline_currentMenuIndex',
    //             storage: localStorage,
    //             paths: ['currentMenuIndex']
    //         }
    //     ]
    // }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMenuStore, import.meta.hot));
}
