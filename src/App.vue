<script setup lang="ts">
import {
    NConfigProvider,
    GlobalThemeOverrides,
    darkTheme,
    zhCN,
    dateZhCN,
    enUS,
    dateEnUS
} from 'naive-ui';
import Message from '@/components/message/Message.vue';

const themeOverrides: GlobalThemeOverrides = {
    Card: {
        color: 'rgba(42, 48, 60, 1)'
    },
    Tabs: {
        tabTextColorActiveCard: '#1eb853FF'
    }
};
</script>

<template>
    <n-config-provider
        :locale="zhCN"
        :date-locale="dateZhCN"
        :theme="darkTheme"
        :theme-overrides="themeOverrides"
    >
        <router-view></router-view>
        <n-message-provider>
            <Message />
        </n-message-provider>
    </n-config-provider>
</template>
