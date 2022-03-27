<script setup lang="ts">
import { ref } from 'vue';
import TradingTable from './TradingTable.vue';

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
        <div class="hidden lg:grid card w-full bg-base-300 trade-history-height">
            <div class="card-body gap-4 overflow-y-auto">
                <h2 class="card-title">Trading History</h2>
                <div class="overflow-y-auto">
                    <TradingTable />
                </div>
            </div>
        </div>
        <div class="block lg:hidden">
            <h2 class="my-4 text-lg font-bold">Trading History</h2>
            <TradingTable />
        </div>
    </div>
</template>
<style scoped>
.trade-history-height {
    height: calc(100vh - 6.8rem);
}
</style>
