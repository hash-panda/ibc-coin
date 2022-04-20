<script setup lang="ts">
import { computed, h, ref, onMounted } from 'vue'
import { CoinPair } from '@/types/types'
import { getImageSrc, formatAmountWithDollar, formatAmountWithDollarDecimal, getTokenDisplayName } from '@/utils'
import { useRouter } from 'vue-router'
import { useTokenStore } from '@/store/token'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import { useRequest } from 'vue-request'
import { queryTradingHistory, TradingHistoryRes } from '@/api'

const { t } = useI18n()
const router = useRouter()
const pagination = { pageSize: 20 }
const tokenStore = useTokenStore()
const searchKey = ref<string>('')
const showLoading = ref<boolean>(false)

const renderSorterIcon = (order: string | boolean) => {
    const style = 'transform: translateY(-3px);'
    if (order === false) return h('div', { style }, ['🤔'])
    if (order === 'ascend') return h('div', { style }, ['👆'])
    if (order === 'descend') return h('div', { style }, ['👇'])
}

const {
    data: tradingHistoryList,
    reload,
    run,
    refresh,
} = useRequest(queryTradingHistory, {
    defaultParams: [{ page_size: 50, token_id: tokenStore.currentTokenInfo.tokenId, chain: tokenStore.currentTokenInfo.chain }],
    errorRetryCount: 5,
    pollingInterval: 1000 * 15,
    pollingWhenHidden: false,
    manual: true,
    onError: error => {
        console.log('queryTradingHistory (⊙︿⊙) something error', error)
        showLoading.value = false
    },
    onSuccess: res => {
        showLoading.value = false
    },
})

const fetchTradingHistory = () => {
    showLoading.value = true
    run({ page_size: 50, token_id: tokenStore.currentTokenInfo.tokenId, chain: tokenStore.currentTokenInfo.chain })
}

onMounted(() => {
    fetchTradingHistory()
})

const columns = computed(() => {
    return [
        {
            title: t('tokens.table.header.coinPair'),
            key: 'name',
            width: 90,
            fixed: 'left',
            render: row => {
                return h(
                    'div',
                    {
                        class: 'flex items-center',
                    },
                    [
                        h('div', { class: 'avatar' }, h('div', { class: 'mask mask-squircle w-8 h-8' }, h('img', { src: getImageSrc(row.icon) }))),
                        h('div', { class: 'ml-2' }, [
                            h(
                                'div',
                                { class: 'font-bold btn-link link link-hover', onClick: () => openChart(row) },
                                { default: () => getTokenDisplayName(row.name) },
                            ),
                            h('div', { class: 'text-[10px] md:text-xs opacity-50' }, { default: () => row.coinPair }),
                        ]),
                    ],
                )
            },
        },
        {
            title: t('tokens.table.header.price'),
            key: 'currentPrice',
            width: 60,
            render: row => {
                return h('span', {}, formatAmountWithDollarDecimal(row.currentPrice))
            },
            renderSorterIcon: ({ order }) => {
                return renderSorterIcon(order)
            },
            sorter: (row1, row2) => row1.currentPrice - row2.currentPrice,
        },
        {
            title: t('tokens.table.header.marketCap'),
            key: 'marketCap',
            width: 90,
            render: row => {
                return h('span', {}, formatAmountWithDollar(row.marketCap))
            },
            renderSorterIcon: ({ order }) => {
                return renderSorterIcon(order)
            },
            sorter: (row1, row2) => row1.marketCap - row2.marketCap,
        },
        {
            title: t('tokens.table.header.totalVolume'),
            key: 'totalVolume',
            width: 90,

            defaultSortOrder: 'descend',
            renderSorterIcon: ({ order }) => {
                return renderSorterIcon(order)
            },
            sorter: (row1, row2) => row1.totalVolume - row2.totalVolume,
        },
        {
            title: t('tokens.table.header.change'),
            key: 'dailyPriceChangeInPercentage',
            width: 80,

            renderSorterIcon: ({ order }) => {
                return renderSorterIcon(order)
            },
            sorter: (row1, row2) => row1.dailyPriceChangeInPercentage - row2.dailyPriceChangeInPercentage,
        },
        {
            title: '',
            key: 'options',
            width: 40,
        },
    ]
})

const searchedData = computed(() => {
    let result = [] as any
    if (searchKey.value) {
        const findOne = tradingHistoryList.value?.find(v => v.name?.toLowerCase() === searchKey.value.toLowerCase())
        if (findOne) {
            result = [findOne]
        } else {
            result = []
        }
    } else {
        result = tradingHistoryList.value
    }
    return result
})

const onSearch = (value: any) => {
    searchKey.value = value?.target?._value ?? ''
}

const onClear = () => {
    searchKey.value = ''
}
</script>
<template>
    <div>
        <n-space vertical>
            <n-input-group>
                <n-input
                    clearable
                    :placeholder="$t('tokens.table.btn.search.placeholder')"
                    :style="{ width: '40%' }"
                    @blur="onSearch"
                    @clear="onSearch"
                />
                <!-- <n-button type="primary" ghost>{{ $t('tokens.table.btn.search') }}</n-button> -->
            </n-input-group>
            <n-data-table
                ref="table"
                :paginate-single-page="false"
                :bordered="false"
                :bottom-bordered="true"
                :single-column="false"
                :columns="columns"
                :data="searchedData"
                :pagination="pagination"
                :scroll-x="750"
                :loading="showLoading"
            />
        </n-space>
    </div>
</template>
