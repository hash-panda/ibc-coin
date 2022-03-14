<script setup lang="ts">
import { ref } from 'vue';
import CoinPairList from '@/components/coinPairList/CoinPairList.vue';
import junoMock from './mock/junoList';
import osmoMock from './mock/osmoList';
import scrtMock from './mock/scrtList';
import { getAtomPriceApi, getMarketPricesApi } from '@/api';
import { useRequest } from 'vue-request';

const osmoList = ref(osmoMock);
const junoList = ref(junoMock);
// const scrtList = ref(scrtMock);
const { data, run } = useRequest(getMarketPricesApi, {
    errorRetryCount: 5,
    pollingInterval: 1000 * 60,
    pollingWhenHidden: false,
    onError: (error) => {
        console.log('getMarketPrices (⊙︿⊙) something error', error);
    },
    onSuccess: (res) => {
        console.log('getMarketPrices ✿✿ヽ(°▽°)ノ✿ success', data, data.value);
    }
});
run();
</script>
<template>
    <div class="w-full px-6 lg:px-36 xl:px-72 mt-10">
        <n-tabs type="card">
            <n-tab-pane name="All" tab="All">
                <CoinPairList key="osmo" :coin-pair-list="(data as any)" />
            </n-tab-pane>
            <n-tab-pane name="OSMO" tab="OSMO">
                <CoinPairList key="osmo" :coin-pair-list="osmoList" />
            </n-tab-pane>
            <n-tab-pane name="JUNO" tab="JUNO">
                <CoinPairList key="juno" :coin-pair-list="junoList" />
            </n-tab-pane>
            <!-- <n-tab-pane name="SCRT" tab="SCRT">
                <CoinPairList key="scrt" :coin-pair-list="scrtList" />
            </n-tab-pane> -->
        </n-tabs>
    </div>
</template>
