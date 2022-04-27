<script setup lang="ts">
import { ref } from 'vue'
import TradingTable from './TradingTable.vue'
import { InfoCircle } from '@vicons/fa'
import taiyang from '@/assets/images/order/taiyang.png'
import diqiu from '@/assets/images/order/diqiu.png'
import tuxing from '@/assets/images/order/tuxing.png'
import yueqiu from '@/assets/images/order/yueqiu.png'
import { useRouter } from 'vue-router'

const router = useRouter()

const openFullHistory = () => {
    router.push({
        name: 'fullTradingHistory',
    })
}
</script>
<template>
    <div>
        <div class="card w-full">
            <div>
                <h2 class="card-title pr-6 indicator align-middle">
                    {{ $t('chart.tradingHistory.title') }}
                    <n-tooltip trigger="hover">
                        <template #trigger>
                            <n-icon :component="InfoCircle" size="15" />
                        </template>
                        {{ $t('tradingHistory.table.refreshInfo') }}
                    </n-tooltip>
                    <!-- <span class="tooltip tooltip-right align-middle tooltip-primary" :data-tip="$t('tradingHistory.table.refreshInfo')">
                        <n-icon  :component="InfoCircle" size="15" :depth="2" />
                    </span> -->
                </h2>
                <div>
                    <n-space justify="end" class="items-center">
                        <!-- <n-space size="large">
                            <n-tooltip trigger="hover">
                                <template #trigger>
                                    <div class="avatar">
                                        <div class="w-8 rounded-full">
                                            <img :src="taiyang" />
                                        </div>
                                    </div>
                                </template>
                                {{ $t('chart.trading.sun.tip') }}
                            </n-tooltip>
                            <n-tooltip trigger="hover">
                                <template #trigger>
                                    <div class="avatar">
                                        <div class="w-8 rounded-full">
                                            <img :src="tuxing" />
                                        </div>
                                    </div>
                                </template>
                                {{ $t('chart.trading.tuxing.tip') }}
                            </n-tooltip>
                            <n-tooltip trigger="hover">
                                <template #trigger>
                                    <div class="avatar">
                                        <div class="w-8 rounded-full">
                                            <img :src="yueqiu" />
                                        </div>
                                    </div>
                                </template>
                                {{ $t('chart.trading.moon.tip') }}
                            </n-tooltip>
                        </n-space> -->
                        <button class="btn btn-link normal-case" @click="openFullHistory">
                            {{ $t('tradingHistory.table.fullHistoryBtn') }}
                        </button>
                    </n-space>
                </div>
                <div class="trade-history-height overflow-y-auto">
                    <TradingTable />
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.trade-history-height {
    height: calc(100vh - 10.8rem);
}
</style>
