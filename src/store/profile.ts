import { acceptHMRUpdate, defineStore } from 'pinia';
import { Profile } from '@/types/types';
export const useProfileStore = defineStore({
    id: 'profile',
    state: () => {
        const profiles = [] as Profile[];
        return {
            profiles,
            currentProfileKey: 0
        };
    },
    getters: {
        currentProfile(state) {
            return state.profiles.find((e) => e.key === state.currentProfileKey);
        },
        currentProfileName(state) {
            return state.profiles.find((e) => e.key === state.currentProfileKey)?.name ?? '';
        },
        currentProfileIndex(state) {
            return state.profiles.findIndex((e) => e.key === state.currentProfileKey);
        }
    },
    actions: {
        setCurrentProfileKey(index: number) {
            this.currentProfileKey = index;
        },
        addProfile(profile: Profile) {
            this.profiles.push(profile);
        },
        getProfile(profileKey: number) {
            return this.profiles.find((e) => e.key === profileKey);
        },
        editProfile(profile: Profile) {
            // key 不变，create 不变，其他改变
            const index = this.profiles.findIndex((e) => e.key === profile.key);
            this.profiles[index].address = profile.address;
            this.profiles[index].name = profile.name;
            this.profiles[index].update = Date.now();
        },
        removeProfile(key: number) {
            this.profiles.splice(
                this.profiles.findIndex((e) => e.key === key),
                1
            );
        },
        addAddress(profileKey: number, addresses: string[]) {
            const index = this.profiles.findIndex((e) => e.key === profileKey);
            if (index >= 0) {
                this.profiles[index].address = addresses;
            }
        }
        // removeAddress(addressIndex: number) {
        //     this.profiles[this.currentProfileIndex]?.address?.splice(addressIndex, 1);
        // }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'user_profiles',
                storage: localStorage,
                paths: ['profiles']
            },
            {
                key: 'currentProfileKey',
                storage: localStorage,
                paths: ['currentProfileKey']
            }
        ]
    }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useProfileStore, import.meta.hot));
}
