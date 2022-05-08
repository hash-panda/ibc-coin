<script setup lang="ts">
import { ref, watch, computed, onMounted, h } from 'vue'
import { getTokenDisplayName, encodeAddress, formatAmountWithDollarDecimal } from '@/utils'
import dayjs from 'dayjs'
import { useRequest } from 'vue-request'
import { queryTradingHistory } from '@/api'
import { useTokenStore } from '@/store/token'
import { Delicious } from '@vicons/fa'
import businessCommon from '@/utils/business'
import { useI18n } from 'vue-i18n'
import { NTag } from 'naive-ui'

const { t } = useI18n()
const tokenStore = useTokenStore()
const showModal = ref(false)
const { openAccount, openTx } = businessCommon()

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
            width: 90,
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
            width: 130,
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
            width: 90,
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
            width: 120,
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
    loadingDelay: 1500,
    manual: true,
    onError: error => {
        console.log('queryTradingHistory (⊙︿⊙) something error', error)
    },
    onSuccess: res => {},
})

const fetchTradingHistory = () => {
    if (tokenStore.currentTokenInfo.tokenId) {
        run({ page_size: 50, token_id: tokenStore.currentTokenInfo.tokenId, chain: tokenStore.currentTokenInfo.chain })
    }
}

onMounted(() => {
    // fetchTradingHistory()
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
            <n-data-table
                ref="table"
                :paginate-single-page="false"
                :bordered="false"
                :bottom-bordered="true"
                :single-column="false"
                :columns="columns"
                :data="(data?.['items'] as any)"
                :loading="loading"
                min-height="100%"
                max-height="100%"
                :scroll-x="470"
            />
            <div v-if="data?.['items']?.length > 0" class="text-center opacity-50 my-4">
                {{ $t('fullTradingHistory.table.length.preText') }}{{ data?.['items']?.length }}{{ $t('fullTradingHistory.table.length.lastText') }}
            </div>
        </n-spin>
    </div>
</template>
<style scoped></style>
