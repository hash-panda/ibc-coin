<script setup lang="ts">
import { NConfigProvider, GlobalThemeOverrides, darkTheme, zhCN, dateZhCN, enUS, dateEnUS } from 'naive-ui'
import { useAppStore } from '@/store/app'

const appStore = useAppStore()

const common = {
    common: {
        fontWeightStrong: '600',
        primaryColor: '#1eb853FF',
        primaryColorHover: '#1eb853FF',
        primaryColorPressed: '#1eb853FF',
        primaryColorSuppl: '#1eb853FF',
    },
}

const lightThemeOverrides = {
    ...common,
    Card: {
        color: 'rgba(247, 247, 250, 1)',
    },
    DataTable: {
        tdPaddingMedium: '12px',
    },
}

const darkThemeOverrides = {
    ...common,
    DataTable: {
        tdPaddingMedium: '12px',
        tdColor: 'rgba(23, 18, 18, 1)',
        thColor: 'rgba(20, 16, 16, 1)',
        borderColor: 'rgba(45, 45, 48, 0.4)',
        thColorHover: 'rgba(20, 16, 16, 1)',
        tdColorHover: 'rgba(20, 16, 16, 1)',
    },
    Card: {
        color: 'rgba(20, 16, 16, 1)',
    },
    Descriptions: {
        thColor: 'rgba(23, 18, 18, 1)',
        tdColor: 'rgba(20, 16, 16, 1)',
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
    </n-config-provider>
</template>
