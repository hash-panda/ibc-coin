<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { formatAmountWithDollar, encodeAddress } from '@/utils';
import { ArrowOutlineUpRight48Filled } from '@vicons/fluent';
import dayjs from 'dayjs';
import { useRequest, useLoadMore } from 'vue-request';
import { queryTradingHistory, TradingHistoryRes } from '@/api';

type TradingHistoryData = {
    data: TradingHistoryRes[];
    total: number;
};

const { t } = useI18n();
const refreshStatus = ref(false);

function testService(params: { data?: TradingHistoryData; dataList?: TradingHistoryData['data'] }) {
    const p = { page_size: 10 };
    if (params?.dataList?.length !== undefined) {
        p['page'] = params.dataList.length / p.page_size + 1;
    } else {
        p['page'] = 1;
    }
    return queryTradingHistory(p);
}

const { data, loadingMore, dataList, refreshing, loadMore, refresh } = useLoadMore<
    TradingHistoryData,
    Parameters<typeof testService>,
    TradingHistoryData['data']
>(testService as any, {
    listKey: 'data',
    errorRetryCount: 5,
    pollingInterval: 1000 * 30,
    pollingWhenHidden: true,
    debounceInterval: 1000,
    manual: false,
    onBefore: () => {
        refreshStatus.value = true;
    },
    onAfter: () => {
        setTimeout(() => {
            refreshStatus.value = false;
        }, 1000);
    }
});

const noMore = computed(() => dataList.value.length === data.value?.total);

const openAccountProfile = (account: string) => {
    // TODO 各个不同的账户查询的链接是不同的，现在暂时使用 osmosis
    window.open(`https://www.mintscan.io/osmosis/account/${account}`, '_blank');
};
const openAccount = (account: string) => {
    // TODO 各个不同的账户查询的链接是不同的，现在暂时使用 osmosis
    window.open(`https://www.mintscan.io/osmosis/account/${account}`, '_blank');
};
const openTx = (tx: string) => {
    // TODO 各个不同的地址对应不同 mintscan 信息
    window.open(`https://www.mintscan.io/osmosis/txs/${tx}`, '_blank');
};
</script>
<template>
    <div>
        <!-- <div class="absolute right-5 top-4 z-50 text-primary-focus text-xs">
          <button v-show="refreshStatus" class="btn btn-link btn-xs loading normal-case">{{ $t('tradingHistory.table.refresh') }}</button>
        </div> -->
        <n-spin :show="refreshing">
            <table class="table table-compact w-full">
                <thead>
                    <tr class="sticky inset-x-0 top-0 z-40">
                        <th class="normal-case">{{ $t('swap.tradingHistory.table.date') }}</th>
                        <th class="normal-case">{{ $t('swap.tradingHistory.table.coinPair') }}</th>
                        <th class="normal-case">{{ $t('swap.tradingHistory.table.volume') }}</th>
                        <th class="normal-case">{{ $t('swap.tradingHistory.table.tradeInfo') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in (dataList as any)" :key="item.id">
                        <th class="text-xs">
                            <div>{{ dayjs.unix(item.txTimestamp).format('YYYY-MM-DD') }}</div>
                            <div>{{ dayjs.unix(item.txTimestamp).format('HH:mm:ss') }}</div>
                        </th>
                        <td class="text-xs uppercase">
                            {{ item.tokenNameFrom }}
                            <span class="text-error">{{ item.amountFrom }}</span>
                            <br />
                            {{ item.tokenNameTo }}
                            <span class="text-success">{{ item.amountTo }}</span>
                        </td>
                        <td class="text-xs">{{ formatAmountWithDollar(item.txTotalVolume, 2) }}</td>
                        <td>
                            <div>
                                <button
                                    @click="openAccountProfile(item.userAddress)"
                                    class="btn btn-xs btn-link btn-primary normal-case"
                                    >{{ encodeAddress(item.userAddress) }}</button
                                >
                                <span
                                    class="tooltip tooltip-bottom align-middle tooltip-primary"
                                    :data-tip="$t('tradingHistory.table.openAddress')"
                                    @click="openAccount(item.userAddress)"
                                    ><n-icon
                                        class="hover:text-primary"
                                        :component="ArrowOutlineUpRight48Filled"
                                        size="10"
                                        :depth="2"
                                    />
                                </span>
                            </div>
                            <div>
                                <button
                                    @click="openTx(item.txHash)"
                                    class="btn btn-link text-neutral-content normal-case btn-xs"
                                    >Tx: {{ encodeAddress(item.txHash) }}</button
                                >
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button
                class="btn btn-block mt-2"
                :class="{ loading: loadingMore }"
                :disabled="noMore"
                @click="loadMore"
            >
                {{
                    noMore
                        ? $t('tradingHistory.table.noMoreData')
                        : $t('tradingHistory.table.loadMore')
                }}
            </button>
        </n-spin>
    </div>
</template>
<style scoped></style>
