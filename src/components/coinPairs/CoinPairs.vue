<script setup lang="ts">
import { ref } from 'vue';
import CoinPairList from '@/components/coinPairList/CoinPairList.vue';
import junoMock from './mock/junoList';
import osmoMock from './mock/osmoList';
import scrtMock from './mock/scrtList';

const osmoList = ref(osmoMock);
const junoList = ref(junoMock);
const scrtList = ref(scrtMock);
</script>
<template>
    <div class="w-full px-6 lg:px-36 xl:px-72 mt-10">
        <n-tabs type="card">
            <n-tab-pane name="OSMO" tab="OSMO">
                <CoinPairList key="osmo" :coin-pair-list="osmoList" />
            </n-tab-pane>
            <n-tab-pane name="JUNO" tab="JUNO">
                <CoinPairList key="juno" :coin-pair-list="junoList" />
            </n-tab-pane>
            <n-tab-pane name="SCRT" tab="SCRT">
                <CoinPairList key="scrt" :coin-pair-list="scrtList" />
            </n-tab-pane>
        </n-tabs>
    </div>
</template>
