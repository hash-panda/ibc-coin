<script setup lang="ts">
import { ref, onMounted } from 'vue';
import KLine from '@/components/kLine/KLine.vue';
import TradingHistory from './components/TradingHistory.vue';
import SwapCoin from './components/SwapCoin.vue';
import CoinInfo from './components/CoinInfo.vue';
import { useRequest } from 'vue-request';
import { queryKLine, queryTradingHistory } from '@/api';

// 30s 5m 30m 1h 1d
const timeInterval = ref('5m')

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

const { data:tradingHistoryList } = useRequest(queryTradingHistory, {
    defaultParams: [{ page:1, page_size: 10 }],
    errorRetryCount: 5,
    pollingInterval: 1000 * 30,
    debounceInterval: 1000,
    pollingWhenHidden: true,
    manual: false,
    onError: (error) => {
        console.log('queryTradingHistory (⊙︿⊙) something error', error);
    },
    onSuccess: (res) => {
        console.log('queryTradingHistory ✿✿ヽ(°▽°)ノ✿ success', data, data.value);
    }
});

onMounted(()=>{
  run({ token_id: 1, k_line_interval: timeInterval.value })
})

const onTimeIntervalSelect = (value) => {
  timeInterval.value = value
  console.log('当前选择的是：', timeInterval.value)
  run({ token_id: 1, k_line_interval: timeInterval.value })
}

</script>
<template>
    <div>
        <div class="grid grid-cols-1 my-2 mx-6 lg:flex lg:flex-row lg:m-4">
            <div class="lg:basis-1/2 xl:basis-3/5 2xl:basis-3/5 flex flex-col">
                <div class="mt-4 mr-4 mb-4">
                    <CoinInfo />
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
                <TradingHistory :data="tradingHistoryList" />
            </div>
        </div>
    </div>
</template>
<style scoped></style>
