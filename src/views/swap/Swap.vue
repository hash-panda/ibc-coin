<script setup lang="ts">
import { ref, onMounted } from 'vue';
import KLine from '@/components/kLine/KLine.vue';
import TradingHistory from './components/TradingHistory.vue';
import SwapCoin from './components/SwapCoin.vue';
import CoinInfo from './components/CoinInfo.vue';
import { useRequest } from 'vue-request';
import { queryKLine, queryTokenStaticStatusListByChain } from '@/api';

// 30s 5m 30m 1h 1d
const timeInterval = ref('5m');

const { data, run, loading } = useRequest(queryKLine, {
    // defaultParams: [{ token_id: 1, k_line_interval: timeInterval.value }],
    errorRetryCount: 5,
    pollingInterval: 1000 * 30,
    debounceInterval: 1000,
    pollingWhenHidden: true,
    onError: (error) => {
        console.log('getMarketPrices (⊙︿⊙) something error', error);
    },
    onSuccess: (res) => {
        console.log('getMarketPrices ✿✿ヽ(°▽°)ノ✿ success', data, data.value);
    }
});

const { data: tokenDetail } = useRequest(queryTokenStaticStatusListByChain, {
    defaultParams: [{ chain: 'osmosis', token_ids: ['4822fe2c-db91-468a-9ff4-68bbe9b2caba'] }],
    errorRetryCount: 5,
    pollingInterval: 1000 * 30,
    pollingWhenHidden: false,
    manual: false,
    onError: (error) => {
        console.log('queryTokenStaticStatusListByChain (⊙︿⊙) something error', error);
    },
    onSuccess: (res) => {
        console.log('queryTokenStaticStatusListByChain ✿✿ヽ(°▽°)ノ✿ success', res);
    }
});

onMounted(() => {
    run({ token_id: 1, k_line_interval: timeInterval.value });
});

const onTimeIntervalSelect = (value) => {
    timeInterval.value = value;
    console.log('当前选择的是：', timeInterval.value);
    run({ token_id: 1, k_line_interval: timeInterval.value });
};
</script>
<template>
    <div>
        <div class="grid grid-cols-1 my-2 mx-6 lg:flex lg:flex-row lg:m-4">
            <div class="lg:basis-1/2 xl:basis-3/5 2xl:basis-3/5 flex flex-col">
                <div class="mt-4 mr-4 mb-4">
                    <CoinInfo :coinDetail="tokenDetail?.[0]" />
                </div>
                <div class="h-96 lg:h-full">
                    <KLine :data="data" @timeIntervalSelect="onTimeIntervalSelect" />
                </div>
                <!-- Swap -->
                <!-- <SwapCoin /> -->
            </div>
            <!-- <div class="divider lg:divider-horizontal"></div> -->
            <!-- Right -->
            <div class="lg:basis-1/2 xl:basis-2/5 2xl:basis-2/5 grid gap-2 grid-cols-1">
                <!-- Trading Hisotry -->
                <TradingHistory />
            </div>
        </div>
    </div>
</template>
<style scoped></style>
