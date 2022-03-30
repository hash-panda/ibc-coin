<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useMenuStore } from '@/store/menu';
import { useAppStore } from '@/store/app';
import { LOCALE_OPTIONS } from '@/locales';
import useLocale from '@/hooks/locale';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const menuStore = useMenuStore();
const appStore = useAppStore();
const { changeLocale } = useLocale();

const locale = computed(() => {
    const currentLocale = LOCALE_OPTIONS.find((item) => item.value === appStore.locale);
    changeLocale(currentLocale.value);
    return currentLocale;
});

const changeMenu = (menuId: string) => {
    menuStore.setCurrentMenuId(menuId);
};

const setLocale = () => {
    appStore.setLocale();
};
</script>
<template>
    <div
        id="nav"
        class="navbar flex justify-end items-center py-3 pr-5 border-base-200 bg-base-100 text-base-content sticky inset-x-0 top-0 z-50 w-full transition duration-200 ease-in-out border-b"
    >
        <div class="navbar-start">
            <div class="dropdown dropdown-hover">
                <label class="btn btn-ghost md:hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h8m-8 6h16"
                        />
                    </svg>
                </label>
                <ul
                    tabindex="0"
                    class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                    <li @click="changeMenu('pair')">
                        <a
                            :class="menuStore.currentMenuId === 'pair' ? 'active  bg-primary' : ''"
                            >{{ $t('navbar.menu.pairs') }}</a
                        >
                    </li>
                    <li @click="changeMenu('swap')">
                        <a
                            :class="menuStore.currentMenuId === 'swap' ? 'active  bg-primary' : ''"
                            >{{ $t('navbar.menu.swap') }}</a
                        >
                    </li>
                    <li @click="changeMenu('subscribe')">
                        <a
                            :class="
                                menuStore.currentMenuId === 'subscribe' ? 'active  bg-primary' : ''
                            "
                            >{{ $t('navbar.menu.subscribe') }}</a
                        >
                    </li>
                </ul>
            </div>
            <a class="btn btn-ghost normal-case text-xl">
                <div class="avatar mr-2">
                    <div class="w-8 md:w-12 rounded-full">
                        <img src="@/assets/logo.png" />
                    </div>
                </div>
                <span class="text-primary font-extrabold text-base lg:text-2xl">IBC</span>
                <span class="ml-1 text-base lg:text-2xl">Coin</span>
            </a>
        </div>
        <div class="navbar-center hidden md:flex">
            <ul class="menu menu-horizontal p-0">
                <li @click="changeMenu('pair')" class="mr-2">
                    <a :class="menuStore.currentMenuId === 'pair' ? 'active  bg-primary' : ''">{{
                        $t('navbar.menu.pairs')
                    }}</a>
                </li>
                <li @click="changeMenu('swap')" class="mr-2">
                    <a :class="menuStore.currentMenuId === 'swap' ? 'active  bg-primary' : ''">{{
                        $t('navbar.menu.swap')
                    }}</a>
                </li>
                <li @click="changeMenu('subscribe')">
                    <a
                        :class="menuStore.currentMenuId === 'subscribe' ? 'active  bg-primary' : ''"
                        >{{ $t('navbar.menu.subscribe') }}</a
                    >
                </li>
            </ul>
        </div>
        <div class="navbar-end">
            <button class="btn btn-ghost normal-case" @click="setLocale">{{ locale.label }}</button>
            <!-- <a class="btn btn-primary normal-case btn-xs md:btn-md">Connect Wallet</a> -->
        </div>
    </div>
</template>
