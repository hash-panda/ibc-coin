<script setup lang="ts">
import { ref } from 'vue';
import TradingTable from './TradingTable.vue';
import { CountdownProps } from 'naive-ui';

const countdownActive = ref(true);
const countdownDuration = ref(4000);
const renderCountdown: CountdownProps['render'] = ({ hours, minutes, seconds }) => {
    return `${String(seconds)}s`;
};
const countdownFinish = () => {
    countdownActive.value = false;
    countdownActive.value = true;
    countdownDuration.value = 5000;
    console.log('countdownDuration', countdownDuration);
};
</script>
<template>
    <div>
        <div class="hidden lg:grid card w-full bg-base-300 trade-history-height">
            <div class="card-body gap-4 overflow-y-auto">
                <h2 class="card-title pr-6 indicator">
                    {{ $t('swap.tradingHistory.title') }}
                    <span class="indicator-item indicator-middle badge badge-primary">
                        <n-countdown
                            :render="renderCountdown"
                            :duration="countdownDuration"
                            :active="countdownActive"
                            @finish="countdownFinish"
                        />
                    </span>
                </h2>

                <div class="overflow-y-auto">
                    <TradingTable />
                </div>
            </div>
        </div>
        <div class="block lg:hidden">
            <h2 class="my-4 ml-2 text-lg font-bold">{{ $t('swap.tradingHistory.title') }}</h2>
            <TradingTable />
        </div>
    </div>
</template>
<style scoped>
.trade-history-height {
    height: calc(100vh - 7.8rem);
}
</style>
