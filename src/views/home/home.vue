<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRequest } from 'vue-request'
import axios from 'axios'
import { useMenuStore } from '@/store/menu'
import Tokens from '@/views/tokens/index.vue'
import Subscribe from '@/views/subscribe/index.vue'
import Chart from '@/views/chart/index.vue'
import About from '@/views/about/index.vue'

const menuStore = useMenuStore()
const data = ref(0)

// const getWeather = () => {
//     return axios.post('/demoApi/common/weather/get15DaysWeatherByArea', {
//         apiKey: 'Ex2AFtn418512e0dd84329a443e14a881bfce3ef91cf6d8',
//         area: '北京'
//     });
// };
// const { data, run } = useRequest(getWeather, {
//     errorRetryCount: 5,
//     initialData: 'init',
//     onError: () => {
//         console.log('(⊙︿⊙) something error');
//     },
//     onSuccess: () => {
//         console.log('✿✿ヽ(°▽°)ノ✿ success');
//     }
// });
// run();
</script>
<template>
    <div>
        <Tokens v-show="menuStore.currentMenuId === 'pair'" />
        <Chart v-if="menuStore.currentMenuId === 'chart'" />
        <Subscribe v-show="menuStore.currentMenuId === 'subscribe'" />
        <About v-show="menuStore.currentMenuId === 'about'" />
    </div>
</template>
