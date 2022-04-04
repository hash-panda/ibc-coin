<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { formatAmountWithDollar, encodeAddress } from '@/utils'
import dayjs from 'dayjs'

const props = defineProps<{
    data: any;
}>();

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
                <th class="normal-case">{{ t('swap.tradingHistory.table.volume') }}</th>
                <th class="normal-case">{{ t('swap.tradingHistory.table.tradeInfo') }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in data" :key="item.id">
                <th class="text-xs">
                  <div>{{ dayjs.unix(item.txTimestamp).format('YYYY-MM-DD') }}</div>
                  <div>{{ dayjs.unix(item.txTimestamp).format('HH:mm:ss') }}</div>
                </th>
                <td class="text-xs uppercase">
                  {{ item.tokenNameFrom }} <span class="text-error">{{ item.amountFrom }}</span>
                  <br />
                  {{ item.tokenNameTo }} <span class="text-success">{{ item.amountTo }}</span>
                </td>
                <td class="text-xs">{{ formatAmountWithDollar(item.txTotalVolume,2) }}</td>
                <td>
                  <div>
                    <button
                        @click="openAccount"
                        class="btn btn-xs btn-link btn-primary normal-case mr-2"
                        >{{ encodeAddress(item.userAddress) }}</button>
                    </div>
                  <div>
                    <button
                        @click="openTx"
                        class="btn btn-link text-neutral-content normal-case btn-xs"
                        >Tx: {{ encodeAddress(item.txHash) }}</button>
                  </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<style scoped></style>
