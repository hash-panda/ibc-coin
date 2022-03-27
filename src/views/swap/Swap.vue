<script setup lang="ts">
import { ref } from 'vue';
import KLine from '@/components/kLine/KLine.vue';
import TradingHistory from './components/TradingHistory.vue';
import SwapCoin from './components/SwapCoin.vue';
import CoinInfo from './components/CoinInfo.vue';

const tradeHistory = ref([] as any);
const value = ref(0);
tradeHistory.value = [];

const openAccount = () => {
    window.open(
        'https://finder.extraterrestrial.money/columbus-5/address/terra1y8r363ykn0p7x0p7krcrxzpthl07et9rp4vklf',
        '_blank'
    );
};
const openTx = () => {
    window.open(
        'https://finder.extraterrestrial.money/columbus-5/tx/B55E343A2E4223CFD65AA40A20EFF403496FFA1C223932DB34422DD3FAFD9EEB',
        '_blank'
    );
};
</script>
<template>
    <div>
        <div class="grid grid-cols-1 m-1 lg:flex lg:flex-row lg:m-4">
            <div class="lg:basis-1/2 xl:basis-3/5 2xl:basis-3/5 flex flex-col">
                <div class="mt-4 mr-4">
                    <CoinInfo />
                </div>
                <div class="h-96 lg:h-full">
                    <KLine />
                </div>

                <!-- Swap -->
                <!-- <SwapCoin /> -->
            </div>
            <!-- Right -->
            <div class="lg:basis-1/2 xl:basis-2/5 2xl:basis-2/5 grid gap-2 grid-cols-1">
                <!-- Trading Hisotry -->
                <TradingHistory />
            </div>
        </div>
    </div>
</template>
<style scoped></style>
