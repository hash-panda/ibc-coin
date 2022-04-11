<script setup lang="ts">
import { ref } from 'vue'
import CoinPairList from '@/views/tokens/components/CoinPairList.vue'
import junoMock from './mock/junoList'
import osmoMock from './mock/osmoList'
import scrtMock from './mock/scrtList'
import { getAtomPriceApi, getMarketPricesApi, queryTokenStaticStatusListByChain } from '@/api'
import { useRequest } from 'vue-request'

// const osmoList = ref(osmoMock);
// const junoList = ref(junoMock)
// const scrtList = ref(scrtMock);
const { data } = useRequest(getMarketPricesApi, {
    errorRetryCount: 5,
    pollingInterval: 1000 * 60,
    pollingWhenHidden: false,
    manual: false,
    onError: error => {
        console.log('getMarketPrices (⊙︿⊙) something error', error)
    },
    onSuccess: res => {
        console.log('getMarketPrices ✿✿ヽ(°▽°)ノ✿ success', data, data.value)
    },
})
const { data: osmoList } = useRequest(queryTokenStaticStatusListByChain, {
    defaultParams: [{ chain: 'osmosis' }],
    errorRetryCount: 5,
    pollingInterval: 1000 * 30,
    pollingWhenHidden: false,
    manual: false,
    onError: error => {
        console.log('queryTokenListByChain (⊙︿⊙) something error', error)
    },
    onSuccess: res => {
        console.log('queryTokenListByChain ✿✿ヽ(°▽°)ノ✿ success', res)
    },
})
const { data: junoList } = useRequest(queryTokenStaticStatusListByChain, {
    defaultParams: [{ chain: 'juno' }],
    errorRetryCount: 5,
    pollingInterval: 1000 * 30,
    pollingWhenHidden: false,
    manual: false,
    onError: error => {
        console.log('queryTokenListByChain (⊙︿⊙) something error', error)
    },
    onSuccess: res => {
        console.log('queryTokenListByChain ✿✿ヽ(°▽°)ノ✿ success', res)
    },
})
</script>
<template>
    <div class="w-full px-2 lg:px-36 xl:px-72 mt-10">
        <n-tabs type="card">
            <!-- <n-tab-pane name="All" tab="All">
                <CoinPairList key="osmo" :coin-pair-list="(data as any)" />
            </n-tab-pane> -->
            <n-tab-pane name="Osmosis" tab="Osmosis">
                <CoinPairList key="Osmosis" :coin-pair-list="(osmoList as any)" />
            </n-tab-pane>
            <n-tab-pane name="JunoSwap" tab="Junoswap">
                <CoinPairList key="Junoswap" :coin-pair-list="(junoList as any)" />
            </n-tab-pane>
            <!-- <n-tab-pane name="Sifchain" tab="Sifchain">
                <CoinPairList key="Sifchain" :coin-pair-list="[]" />
            </n-tab-pane> -->
            <!-- <n-tab-pane name="SCRT" tab="SCRT">
                <CoinPairList key="scrt" :coin-pair-list="scrtList" />
            </n-tab-pane> -->
        </n-tabs>
    </div>
</template>
