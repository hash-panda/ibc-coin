<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import KLine from '@/components/kLine/KLine.vue'
import TradingHistory from './components/TradingHistory.vue'
// import SwapCoin from './components/SwapCoin.vue'
import CoinInfo from './components/CoinInfo.vue'
import { useRequest } from 'vue-request'
import { queryKLine, queryTokenStaticStatusListByChain } from '@/api'
import { useTokenStore } from '@/store/token'

const tokenStore = useTokenStore()
// 30s 5m 30m 1h 1d
const timeInterval = ref('5m')
const kLineRequestParams = ref({
    token_id: tokenStore.currentTokenInfo.tokenId,
    k_line_interval: timeInterval.value,
})
const {
    data,
    run,
    reload: kLineReload,
    refresh: kLineRefresh,
    loading,
} = useRequest(queryKLine, {
    // defaultParams: [{ token_id: 1, k_line_interval: timeInterval.value }],
    errorRetryCount: 5,
    pollingInterval: 1000 * 30,
    debounceInterval: 1000,
    pollingWhenHidden: true,
    onError: error => {
        console.log('getMarketPrices (⊙︿⊙) something error', error)
    },
    onSuccess: res => {
        console.log('getMarketPrices ✿✿ヽ(°▽°)ノ✿ success', data, data.value)
    },
})

const fetchKLine = () => {
    run({ token_id: tokenStore.currentTokenInfo.tokenId, k_line_interval: timeInterval.value })
}

const { data: tokenDetail, run: runTokenInfo } = useRequest(queryTokenStaticStatusListByChain, {
    // defaultParams: [{ chain: tokenStore.currentTokenInfo.chain, token_ids: [tokenStore.currentTokenInfo.tokenId] }],
    errorRetryCount: 5,
    pollingInterval: 1000 * 15,
    pollingWhenHidden: true,
    manual: true,
    onError: error => {
        console.log('queryTokenStaticStatusListByChain (⊙︿⊙) something error', error)
    },
    onSuccess: res => {
        console.log('queryTokenStaticStatusListByChain ✿✿ヽ(°▽°)ノ✿ success', res[0])
        tokenStore.setCurrentTokenInfo(res?.[0])
    },
})

const fetchTokenInfo = () => {
    runTokenInfo({ chain: tokenStore.currentTokenInfo.chain, token_ids: [tokenStore.currentTokenInfo.tokenId] })
}

onMounted(() => {
    fetchKLine()
    fetchTokenInfo()
})

watch(
    () => tokenStore.currentTokenInfo.tokenId,
    () => {
        fetchTokenInfo()
    },
)

const onTimeIntervalSelect = value => {
    timeInterval.value = value
    console.log('当前选择的是：', timeInterval.value)
    fetchKLine()
}
</script>
<template>
    <div>
        <div class="grid grid-cols-1 my-2 mx-6 lg:flex lg:flex-row lg:m-4">
            <div class="lg:basis-1/2 xl:basis-3/5 2xl:basis-3/5 flex flex-col">
                <div class="mt-4 mr-4 mb-4">
                    <CoinInfo :coinDetail="tokenStore.currentTokenInfo" />
                </div>
                <div class="h-96 lg:h-full">
                    <KLine :data="data" @timeIntervalSelect="onTimeIntervalSelect" />
                </div>
                <!-- Chart -->
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
