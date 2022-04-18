<script setup lang="ts">
import { NConfigProvider, GlobalThemeOverrides, darkTheme, zhCN, dateZhCN, enUS, dateEnUS } from 'naive-ui'
import Message from '@/components/message/Message.vue'
import { useAppStore } from '@/store/app'

const appStore = useAppStore()

const common = {
    Common: {
        fontWeightStrong: '600',
        primaryColor: '#1eb853FF',
        primaryColorHover: '#1eb853FF',
        primaryColorPressed: '#1eb853FF',
        primaryColorSuppl: '#1eb853FF',
    },
    Tabs: {
        tabTextColorActiveCard: '#1eb853FF',
    },
    DataTable: {
        // tdPaddingMedium: '15px',
    },
    Pagination: {
        itemTextColorHover: '#1eb853FF',
        itemTextColorPressed: '#1eb853FF',
        itemTextColorActive: '#1eb853FF',
    },
}

const lightThemeOverrides = {
    ...common,
    Card: {
        color: 'rgba(42, 48, 60, 1)',
    },
    DataTable: {
        // tdPaddingMedium: '15px',
    },
}

const darkThemeOverrides = {
    ...common,
    DataTable: {
        tdPaddingMedium: '15px',
        tdColor: 'rgba(23, 18, 18, 1)',
        thColor: 'rgba(20, 16, 16, 1)',
        borderColor: 'rgba(45, 45, 48, 0.2)',
        thColorHover: 'rgba(20, 16, 16, 1)',
        tdColorHover: 'rgba(20, 16, 16, 1)',
    },
}
</script>

<template>
    <n-config-provider
        :locale="appStore.locale === 'zh-CN' ? zhCN : null"
        :date-locale="appStore.locale === 'zh-CN' ? dateZhCN : null"
        :theme="appStore.isDark ? null : darkTheme"
        :theme-overrides="appStore.isDark ? lightThemeOverrides : darkThemeOverrides"
    >
        <router-view></router-view>
        <n-message-provider>
            <Message />
        </n-message-provider>
    </n-config-provider>
</template>
