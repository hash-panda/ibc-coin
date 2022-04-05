<script setup lang="ts">
import { ref, defineProps } from 'vue';
import TradingTable from './TradingTable.vue';
import { InfoCircle } from '@vicons/fa';
</script>
<template>
    <div>
        <div class="card w-full bg-neutral trade-history-height">
            <div class="card-body gap-4 overflow-y-auto">
                <h2 class="card-title pr-6 indicator align-middle">
                    {{ $t('swap.tradingHistory.title') }}
                    <span
                        class="tooltip tooltip-right align-middle tooltip-primary"
                        :data-tip="$t('tradingHistory.table.refreshInfo')"
                        ><n-icon
                            class="hover:text-primary"
                            :component="InfoCircle"
                            size="15"
                            :depth="2"
                        />
                    </span>
                </h2>
                <div class="overflow-y-auto">
                    <TradingTable />
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.trade-history-height {
    height: calc(100vh - 7.8rem);
}
</style>
