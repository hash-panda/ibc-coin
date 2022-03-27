<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRequest } from 'vue-request';
import axios from 'axios';
import { useMenuStore } from '@/store/menu';
import Nav from '@/components/nav/Nav.vue';
import CoinPairs from '@/components/coinPairs/CoinPairs.vue';
import Subscribe from '@/components/subscribe/Subscribe.vue';
import Swap from '@/views/swap/swap.vue';

const menuStore = useMenuStore();
const data = ref(0);

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
        <Nav />
        <CoinPairs v-show="menuStore.currentMenuId === 'pair'" />
        <Swap v-show="menuStore.currentMenuId === 'swap'" />
        <Subscribe v-show="menuStore.currentMenuId === 'subscribe'" />
    </div>
</template>
