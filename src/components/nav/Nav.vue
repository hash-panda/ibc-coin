<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { useMenuStore } from '@/store/menu'
import { useAppStore } from '@/store/app'
import { LOCALE_OPTIONS } from '@/locales'
import useLocale from '@/hooks/locale'
import { useRouter, useRoute } from 'vue-router'
import { themeChange } from 'theme-change'

const router = useRouter()
const route = useRoute()
const menuStore = useMenuStore()
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
    router.push({
        name: menuId,
    })
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
    <div
        id="nav"
        class="navbar flex justify-end items-center py-3 pr-5 border-base-200 bg-base-100 text-base-content sticky inset-x-0 top-0 z-50 w-full transition duration-200 ease-in-out border-b"
    >
        <div class="navbar-start">
            <div class="dropdown dropdown-hover">
                <label class="btn btn-ghost md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </label>
                <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li @click="changeMenu('tokens')">
                        <a :class="selectedKey.includes('tokens') ? 'active  bg-primary' : ''">{{ $t('navbar.menu.tokens') }}</a>
                    </li>
                    <li @click="changeMenu('chart')">
                        <a :class="selectedKey.includes('chart') ? 'active  bg-primary' : ''">{{ $t('navbar.menu.chart') }}</a>
                    </li>
                    <!-- <li @click="changeMenu('subscribe')">
                        <a :class="selectedKey.includes('subscribe') ? 'active  bg-primary' : ''">{{ $t('navbar.menu.subscribe') }}</a>
                    </li> -->
                    <li @click="changeMenu('about')">
                        <a :class="selectedKey.includes('about') ? 'active  bg-primary' : ''">{{ $t('navbar.menu.about') }}</a>
                    </li>
                </ul>
            </div>
            <button class="flex items-center normal-case ml-5" @click="openTokensList">
                <div class="avatar mr-2">
                    <div class="w-8 rounded-full md:w-12">
                        <img src="@/assets/logo.png" />
                    </div>
                </div>
                <div class="text-base text-xl font-bold text-primary lg:text-2xl">
                    <span>IBC</span>
                    <span class="text-primary-focus">coin.org</span>
                </div>
            </button>
        </div>
        <div class="navbar-center hidden md:flex">
            <ul class="menu menu-horizontal p-0">
                <li @click="changeMenu('tokens')" class="mr-2">
                    <a :class="selectedKey.includes('tokens') ? 'active  bg-primary' : ''">{{ $t('navbar.menu.tokens') }}</a>
                </li>
                <li @click="changeMenu('chart')" class="mr-2">
                    <a :class="selectedKey.includes('chart') ? 'active  bg-primary' : ''">{{ $t('navbar.menu.chart') }}</a>
                </li>
                <!-- <li @click="changeMenu('subscribe')" class="mr-2">
                    <a :class="selectedKey.includes('subscribe') ? 'active  bg-primary' : ''">{{ $t('navbar.menu.subscribe') }}</a>
                </li> -->
                <li @click="changeMenu('about')" class="mr-2">
                    <a :class="selectedKey.includes('about') ? 'active  bg-primary' : ''">{{ $t('navbar.menu.about') }}</a>
                </li>
            </ul>
        </div>
        <div class="navbar-end">
            <button class="mr-5 normal-case" @click="setLocale">{{ locale.label }}</button>
            <label class="swap-rotate swap mr-5">
                <input
                    type="checkbox"
                    :data-set-theme="appStore.currentTheme"
                    data-act-class="active"
                    @input="changeTheme"
                    :checked="appStore.isDark"
                />

                <svg class="swap-on h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
                    />
                </svg>

                <svg class="swap-off h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
                    />
                </svg>
            </label>
            <!-- <a class="btn btn-primary normal-case btn-xs md:btn-md">Connect Wallet</a> -->
        </div>
    </div>
</template>
