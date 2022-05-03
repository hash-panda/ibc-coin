<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { useMenuStore } from '@/store/menu'
import { useTokenStore } from '@/store/token'
import { useAppStore } from '@/store/app'
import { LOCALE_OPTIONS } from '@/locales'
import useLocale from '@/hooks/locale'
import { useRouter, useRoute } from 'vue-router'
import { themeChange } from 'theme-change'
import { Moon, SunnySharp } from '@vicons/ionicons5'
import { Language } from '@vicons/fa'

const router = useRouter()
const route = useRoute()
const menuStore = useMenuStore()
const tokenStore = useTokenStore()
const appStore = useAppStore()
const { changeLocale } = useLocale()
const selectedKey = ref<string[]>([])

onMounted(() => {
    themeChange(false)
})

const locale = computed(() => {
    const currentLocale = LOCALE_OPTIONS.find(item => item.value === appStore.locale)
    changeLocale(currentLocale.value)
    return currentLocale
})

watch(
    route,
    newVal => {
        let key = newVal.matched[1]?.name as string
        if (newVal?.matched.length > 2) {
            key = newVal.matched[2]?.name as string
        }

        selectedKey.value = [key]
    },
    {
        immediate: true,
    },
)

const changeMenu = (menuId: string) => {
    if (menuId === 'chart') {
        router.push({
            name: menuId,
            params: {
                chain: tokenStore.currentTokenInfo.chain || 'osmosis',
                token: tokenStore.currentTokenInfo.name || 'atom',
            },
        })
    } else {
        router.push({
            name: menuId,
        })
    }
}

const setLocale = () => {
    appStore.setLocale()
}

const changeTheme = () => {
    appStore.changeTheme(!appStore.isDark)
}

const openTokensList = () => {
    router.push({
        name: 'tokens',
    })
}
</script>
<template>
    <div id="nav" class="flex justify-between py-3 pr-5 border-base-200 bg-base-100 text-base-content sticky inset-x-0 top-0 z-50 border-b">
        <div class="flex">
            <div class="dropdown dropdown-hover md:hidden">
                <label class="btn btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </label>
                <ul tabindex="0" class="dropdown-content menu p-2 shadow-2xl bg-base-100 rounded-box w-52">
                    <li class="mt-1" @click="changeMenu('tokens')">
                        <a :class="selectedKey.includes('tokens') ? 'active  bg-primary px-16 py-3' : 'px-16 py-3'">
                            {{ $t('navbar.menu.tokens') }}
                        </a>
                    </li>
                    <li class="mt-5" @click="changeMenu('chart')">
                        <a :class="selectedKey.includes('chart') ? 'active  bg-primary px-16 py-3' : 'px-16 py-3'">{{ $t('navbar.menu.chart') }}</a>
                    </li>
                    <!-- <li @click="changeMenu('subscribe')">
                        <a :class="selectedKey.includes('subscribe') ? 'active  bg-primary px-16 py-3' : 'px-16 py-3'">{{ $t('navbar.menu.subscribe') }}</a>
                    </li> -->
                    <li class="mt-5" @click="changeMenu('about')">
                        <a :class="selectedKey.includes('about') ? 'active  bg-primary px-16 py-3' : 'px-16 py-3'">{{ $t('navbar.menu.about') }}</a>
                    </li>
                </ul>
            </div>
            <div class="flex items-center hover:cursor-pointer normal-case ml-0 md:ml-5" @click="openTokensList">
                <div class="avatar mr-1 md:mr-2">
                    <div class="w-8 rounded-full md:w-12">
                        <img src="@/assets/logo.png" />
                    </div>
                </div>
                <div class="text-base text-l font-bold text-primary lg:text-2xl">
                    <span>IBC</span>
                    <span class="text-primary-focus">coin.org</span>
                    <div class="ml-1 badge badge-primary">Beta</div>
                </div>
            </div>
        </div>
        <div class="navbar-center hidden md:flex">
            <ul class="menu menu-horizontal p-0">
                <li @click="changeMenu('tokens')" class="mr-2">
                    <a :class="selectedKey.includes('tokens') ? 'active  bg-primary' : ''">{{ $t('navbar.menu.tokens') }}</a>
                </li>
                <li @click="changeMenu('chart')" class="mr-2">
                    <a :class="selectedKey.includes('chart') ? 'active  bg-primary' : ''">{{ $t('navbar.menu.chart') }}</a>
                </li>
                <li @click="changeMenu('about')" class="mr-2">
                    <a :class="selectedKey.includes('about') ? 'active  bg-primary' : ''">{{ $t('navbar.menu.about') }}</a>
                </li>
            </ul>
        </div>
        <div class="flex">
            <button class="flex items-center mr-2 md:mr-5 normal-case" @click="setLocale">
                <n-icon size="28" color="">
                    <Language />
                </n-icon>
                <span class="ml-1">{{ locale.label }}</span>
            </button>
            <div class="flex items-center">
                <n-switch v-model:value="appStore.isDark" :data-set-theme="appStore.currentTheme">
                    <template #checked>
                        <n-icon size="14" color="#ffd93b">
                            <SunnySharp />
                        </n-icon>
                    </template>
                    <template #unchecked>
                        <n-icon size="14" color="#ffd93b">
                            <Moon />
                        </n-icon>
                    </template>
                </n-switch>
            </div>

            <!-- <a class="btn btn-primary btn-outline normal-case btn-xs md:btn-md ml-4">Connect Wallet</a> -->
        </div>
    </div>
</template>
