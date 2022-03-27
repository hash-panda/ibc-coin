<script setup lang="ts">
import { ref } from 'vue';
import TradingTable from './TradingTable.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
<template>
    <div>
        <div class="hidden lg:grid card w-full bg-base-300 trade-history-height">
            <div class="card-body gap-4 overflow-y-auto">
                <h2 class="card-title">{{ t('swap.tradingHistory.title') }}</h2>
                <div class="overflow-y-auto">
                    <TradingTable />
                </div>
            </div>
        </div>
        <div class="block lg:hidden">
            <h2 class="my-4 text-lg font-bold">{{ t('swap.tradingHistory.title') }}</h2>
            <TradingTable />
        </div>
    </div>
</template>
<style scoped>
.trade-history-height {
    height: calc(100vh - 6.8rem);
}
</style>
