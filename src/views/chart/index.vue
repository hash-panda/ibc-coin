<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import KLine from './components/kLine/KLine.vue'
import TradingHistory from './components/TradingHistory.vue'
// import SwapCoin from './components/SwapCoin.vue'
import CoinInfo from './components/CoinInfo.vue'
</script>
<template>
    <div>
        <div class="grid grid-cols-1 my-2 mx-6 lg:flex lg:flex-row lg:m-4">
            <div class="lg:basis-1/2 xl:basis-3/5 2xl:basis-3/5 flex flex-col">
                <div class="mt-4 mr-4 mb-4">
                    <CoinInfo />
                </div>
                <div class="h-96 lg:h-full">
                    <KLine />
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
