<script setup lang="ts">
import { NConfigProvider, GlobalThemeOverrides, darkTheme, zhCN, dateZhCN, enUS, dateEnUS } from 'naive-ui'
import Message from '@/components/message/Message.vue'
import { useAppStore } from '@/store/app'

const appStore = useAppStore()

const lightThemeOverrides = {
    Card: {
        color: 'rgba(42, 48, 60, 1)',
    },
    Tabs: {
        tabTextColorActiveCard: '#1eb853FF',
    },
    DataTable: {
        tdPaddingLarge: '16px',
    },
}

const darkThemeOverrides = {
    Card: {
        color: 'rgba(42, 48, 60, 1)',
    },
    Tabs: {
        tabTextColorActiveCard: '#1eb853FF',
    },
    DataTable: {
        tdPaddingLarge: '16px',
        tdColor: 'rgba(23, 18, 18, 1)',
        thColor: 'rgba(20, 16, 16, 1)',
    },
}
</script>

<template>
    <n-config-provider
        :locale="zhCN"
        :date-locale="dateZhCN"
        :theme="appStore.isDark ? null : darkTheme"
        :theme-overrides="appStore.isDark ? lightThemeOverrides : darkThemeOverrides"
    >
        <router-view></router-view>
        <n-message-provider>
            <Message />
        </n-message-provider>
    </n-config-provider>
</template>
