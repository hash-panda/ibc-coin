<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const tradeHistory = ref([] as any);
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
    <table class="table table-compact w-full">
        <thead>
            <tr class="sticky inset-x-0 top-0 z-40">
                <th class="normal-case">{{ t('swap.tradingHistory.table.date') }}</th>
                <th class="normal-case">{{ t('swap.tradingHistory.table.coinPair') }}</th>
                <th class="normal-case">{{ t('swap.tradingHistory.table.price') }}</th>
                <th class="normal-case">{{ t('swap.tradingHistory.table.tradeInfo') }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in 20" :key="item">
                <th class="text-xs">2022/2/22<br />14:00:99</th>
                <td class="text-xs">ATOM 90.04<br />UST 10232</td>
                <td class="text-xs">26.66</td>
                <td>
                    <button
                        @click="openAccount"
                        class="btn btn-xs btn-outline btn-accent normal-case mr-2"
                        >{{ t('swap.tradingHistory.btn.trader') }}</button
                    >
                    <button @click="openTx" class="btn btn-outline btn-accent normal-case btn-xs">{{
                        t('swap.tradingHistory.btn.tx')
                    }}</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<style scoped>
.trade-history-height {
    height: calc(100vh - 6.8rem);
}
</style>
