<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getAtomPriceApi, getMarketPricesApi } from '@/api';
import { useRequest } from 'vue-request';

const currencyInfo = ref([
    // {
    //     denom: 'uatom',
    //     prices: [
    //         {
    //             currency: 'usd',
    //             current_price: 26.25,
    //             total_volume: 374235007.1210662,
    //             daily_price_change_in_percentage: -4.498906359343885,
    //             market_cap: 7612247918.816787
    //         }
    //     ],
    //     last_updated: '2022-03-14T03:43:44Z'
    // }
]);
// getMarketPricesApi();
// const getMarketPrices = () => {
//     const { data, run } = useRequest(getMarketPricesApi, {
//         errorRetryCount: 5,
//         // pollingInterval: 1000 * 10,
//         pollingWhenHidden: false,
//         onError: (error) => {
//             console.log('getMarketPrices (⊙︿⊙) something error', error);
//         },
//         onSuccess: () => {
//             console.log('getMarketPrices ✿✿ヽ(°▽°)ノ✿ success', data, data.value);
//         }
//     });

//     run();
// };
// const getAtomPrice = () => {
//     const { data, run } = useRequest(getAtomPriceApi, {
//         errorRetryCount: 5,
//         // pollingInterval: 1000 * 60,
//         pollingWhenHidden: false,
//         onError: (error) => {
//             console.log('getAtomPrice (⊙︿⊙) something error', error);
//         },
//         onSuccess: (res) => {
//             console.log('getAtomPrice ✿✿ヽ(°▽°)ノ✿ success', data, res);
//             if (data.value) {
//             }
//         }
//     });
//     currencyInfo.value = data.value as any;
//     run();
// };
// onMounted(() => {
//     getMarketPrices();
//     getAtomPrice();
// });
const { data, run } = useRequest(getMarketPricesApi, {
    errorRetryCount: 5,
    pollingInterval: 1000 * 10,
    pollingWhenHidden: false,
    onError: (error) => {
        console.log('getMarketPrices (⊙︿⊙) something error', error);
    },
    onSuccess: () => {
        console.log('getMarketPrices ✿✿ヽ(°▽°)ノ✿ success', data, data.value);
    }
});

run();
</script>
<template>
    <div>
        <h1>你好，test</h1>
        <div v-for="item in (data as any)" :key="item.name">
            <span>{{ item.name }}</span>
            <img :src="item.icon" />
            <p>{{ item.denom }}</p>
            <p>{{ item.prices?.[0]?.current_price }} {{ item.prices?.[0]?.currency }}</p>
            <p>{{ item.prices?.[0]?.total_volume }} {{ item.prices?.[0]?.currency }}</p>
            <p>{{ item.prices?.[0]?.market_cap }} {{ item.prices?.[0]?.currency }}</p>
            <p>{{ item.prices?.[0]?.daily_price_change_in_percentage }} %</p>
            <p>上次更新时间：{{ item.last_updated }} </p>
            <div>-----------------------------------------</div>
        </div>
    </div>
</template>
