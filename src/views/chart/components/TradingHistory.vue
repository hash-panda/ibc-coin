<script setup lang="ts">
import { ref } from 'vue'
import TradingTable from './TradingTable.vue'
import { InfoCircle } from '@vicons/fa'
import taiyang from '@/assets/images/order/taiyang.png'
import diqiu from '@/assets/images/order/diqiu.png'
import tuxing from '@/assets/images/order/tuxing.png'
import yueqiu from '@/assets/images/order/yueqiu.png'
</script>
<template>
    <div>
        <div class="card w-full bg-neutral trade-history-height">
            <div class="card-body gap-4 overflow-y-auto">
                <h2 class="card-title pr-6 indicator align-middle">
                    {{ $t('chart.tradingHistory.title') }}
                    <span class="tooltip tooltip-right align-middle tooltip-primary" :data-tip="$t('tradingHistory.table.refreshInfo')">
                        <n-icon class="hover:text-primary" :component="InfoCircle" size="15" :depth="2" />
                    </span>
                </h2>
                <div>
                    <div class="avatar">
                        <div class="w-8 rounded-full">
                            <img :src="taiyang" />
                        </div>
                    </div>
                    <div class="avatar">
                        <div class="w-8 rounded-full">
                            <img :src="tuxing" />
                        </div>
                    </div>
                    <div class="avatar">
                        <div class="w-7 rounded-full">
                            <img :src="yueqiu" />
                        </div>
                    </div>
                </div>
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
