<script setup lang="ts">
import { ref, watch, computed, onMounted, h } from 'vue'
import { getTokenDisplayName, encodeAddress, formatAmountWithDollarDecimal } from '@/utils'
import dayjs from 'dayjs'
import { useRequest } from 'vue-request'
import { queryTradingHistory } from '@/api'
import { useTokenStore } from '@/store/token'
import { Delicious } from '@vicons/fa'
import { openAccount, openTx } from '@/utils/business'
import { useI18n } from 'vue-i18n'
import { NTag } from 'naive-ui'

const { t } = useI18n()
const tokenStore = useTokenStore()
const showModal = ref(false)

// true - sell ,false - buy
const isBuyOrSell = (row: any) => {
    return row.tokenNameFrom?.toUpperCase() === tokenStore.currentTokenInfo.name?.toUpperCase()
}

const columns = computed(() => {
    return [
        {
            title: '',
            key: 'buySell',
            width: 40,
            render: row => {
                return h(
                    NTag,
                    { size: 'small', type: isBuyOrSell(row) ? 'error' : 'success' },
                    {
                        default: () =>
                            isBuyOrSell(row) ? t('fullTradingHistory.table.header.buySell.sell') : t('fullTradingHistory.table.header.buySell.buy'),
                    },
                )
            },
        },
        {
            title: t('chart.tradingHistory.table.date'),
            key: 'txTimestamp',
            width: 100,
            render: row => {
                return h('div', { class: 'text-xs' }, [
                    h('div', {}, { default: () => dayjs.unix(row.txTimestamp).format('YYYY-MM-DD') }),
                    h('div', {}, { default: () => dayjs.unix(row.txTimestamp).format('HH:mm:ss') }),
                ])
            },
        },
        {
            title: t('chart.tradingHistory.table.coinPair'),
            key: 'tokenNameFrom',
            render: row => {
                return h('div', { class: 'text-xs' }, [
                    h('div', {}, [
                        h('span', { class: 'mr-1' }, { default: () => getTokenDisplayName(row.tokenNameFrom) }),
                        h('span', { class: 'font-bold text-error' }, { default: () => row.amountFrom }),
                    ]),
                    h('div', {}, [
                        h('span', { class: 'mr-1' }, { default: () => getTokenDisplayName(row.tokenNameTo) }),
                        h('span', { class: 'font-bold text-success' }, { default: () => row.amountTo }),
                    ]),
                ])
            },
        },
        {
            title: t('chart.tradingHistory.table.volume'),
            key: 'txTotalVolume',
            width: 80,
            render: row => {
                return h(
                    'div',
                    {
                        class: isBuyOrSell(row) ? 'font-bold text-error text-xs' : 'font-bold text-success text-xs',
                    },

                    { default: () => formatAmountWithDollarDecimal(row.txTotalVolume) },
                )
            },
        },
        {
            title: t('chart.tradingHistory.table.tradeInfo'),
            key: 'userAddress',
            render: row => {
                return h('div', { class: 'text-xs hover:cursor-pointer normal-case', onClick: () => openAccount(row.userAddress) }, [
                    h(
                        'div',
                        { class: 'underline hover:text-primary', onClick: () => openAccount(row.userAddress) },
                        { default: () => encodeAddress(row.userAddress) },
                    ),
                    h(
                        'div',
                        { class: 'underline hover:text-primary', onClick: () => openTx(row.txHash) },
                        { default: () => encodeAddress(row.txHash) },
                    ),
                ])
            },
        },
    ]
})

const { data, reload, run, loading } = useRequest(queryTradingHistory, {
    defaultParams: [{ page: 1, page_size: 50, token_id: tokenStore.currentTokenInfo.tokenId, chain: tokenStore.currentTokenInfo.chain }],
    errorRetryCount: 3,
    pollingInterval: 1000 * 15,
    pollingWhenHidden: false,
    manual: true,
    onError: error => {
        console.log('queryTradingHistory (⊙︿⊙) something error', error)
    },
    onSuccess: res => {},
})

const fetchTradingHistory = () => {
    run({ page_size: 50, token_id: tokenStore.currentTokenInfo.tokenId, chain: tokenStore.currentTokenInfo.chain })
}

onMounted(() => {
    fetchTradingHistory()
})

watch(
    () => tokenStore.currentTokenInfo.tokenId,
    () => {
        reload()
        fetchTradingHistory()
    },
)

const openAccountProfile = (account: string) => {
    // TODO 各个不同的账户查询的链接是不同的，现在暂时使用 osmosis
    showModal.value = true
}
</script>
<template>
    <div>
        <n-spin :show="loading">
            <!-- <table class="table table-compact w-full">
                <thead>
                    <tr class="sticky inset-x-0 top-0 z-40">
                        <th class="normal-case">{{ $t('chart.tradingHistory.table.date') }}</th>
                        <th class="normal-case">{{ $t('chart.tradingHistory.table.coinPair') }}</th>
                        <th class="normal-case">{{ $t('chart.tradingHistory.table.volume') }}</th>
                        <th class="normal-case">{{ $t('chart.tradingHistory.table.tradeInfo') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in (data?.['items'] as any)" :key="item.id">
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
                        <td class="text-xs">
                            {{ formatAmountWithDollar(item.txTotalVolume, 2) }}
                        </td>
                        <td>
                            <div>
                                <button @click="openAccountProfile(item.userAddress)" class="btn btn-xs btn-link btn-primary normal-case">
                                    {{ encodeAddress(item.userAddress) }}
                                </button>
                                <span
                                    class="tooltip tooltip-bottom align-middle tooltip-primary"
                                    :data-tip="$t('tradingHistory.table.openAddress')"
                                    @click="openAccount(item.userAddress)"
                                >
                                    <n-icon class="hover:text-primary" :component="ArrowOutlineUpRight48Filled" size="10" :depth="2" />
                                </span>
                            </div>
                            <div>
                                <button @click="openTx(item.txHash)" class="btn btn-link text-base-content normal-case btn-xs">
                                    Tx: {{ encodeAddress(item.txHash) }}
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table> -->
            <n-data-table
                ref="table"
                :paginate-single-page="false"
                :bordered="false"
                :bottom-bordered="true"
                :single-column="false"
                :columns="columns"
                :data="(data?.['items'] as any)"
                :loading="loading"
                max-height="500"
                min-height="500"
            />
            <!-- <n-empty v-if="(data as any)?.length <= 0" description="." class="h-96 justify-center">
                <template #icon>
                    <n-icon :component="Delicious" size="38" :depth="3" />
                </template>
            </n-empty> -->
        </n-spin>
    </div>
</template>
<style scoped></style>
