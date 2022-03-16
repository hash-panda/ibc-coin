<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useMenuStore } from '@/store/menu';

const menuStore = useMenuStore();
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
                    <li
                        v-for="menu in menuStore.menuList"
                        :key="menu.id"
                        @click="menuStore.changeMenu(menu.id)"
                        ><a :class="menu.actived ? 'active bg-accent' : ''">{{ menu.name }}</a></li
                    >
                </ul>
            </div>
            <a class="btn btn-ghost normal-case text-xl">
                <div class="avatar mr-2">
                    <div class="w-8 md:w-12 rounded-full">
                        <img src="@/assets/logo.png" />
                    </div>
                </div>
                <span class="text-accent text-base lg:text-2xl">COSMOS</span>
                <span class="ml-2 font-extrabold text-base lg:text-xl">KLine</span>
            </a>
        </div>
        <div class="navbar-center hidden md:flex">
            <ul class="menu menu-horizontal p-0">
                <li
                    v-for="menu in menuStore.menuList"
                    :key="menu.id"
                    @click="menuStore.changeMenu(menu.id)"
                    ><a :class="menu.actived ? 'active  bg-accent' : ''">{{ menu.name }}</a></li
                >
            </ul>
        </div>
        <div class="navbar-end">
            <a class="btn btn-primary normal-case btn-xs md:btn-md">Connect Wallet</a>
        </div>
    </div>
</template>
