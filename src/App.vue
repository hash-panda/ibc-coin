<script setup lang="ts">
import { ref } from 'vue';
import { NConfigProvider, GlobalThemeOverrides, darkTheme } from 'naive-ui';

const themeOverrides: GlobalThemeOverrides = {
    Card: {
        color: 'rgba(42, 48, 60, 1)'
    },
    Tabs: {
        tabTextColorActiveLine: '#6419e6FF',
        tabTextColorHoverLine: '#6419e6FF'
    }
};

// ...
</script>

<template>
    <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
        <router-view></router-view>
    </n-config-provider>
</template>
