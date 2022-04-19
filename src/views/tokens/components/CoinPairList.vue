<script setup lang="ts">
import { computed, h } from 'vue'
import { CoinPair } from '@/types/types'
import { getImageSrc, formatAmountWithDollar, formatAmountWithDollarDecimal, getTokenDisplayName } from '@/utils'
import { Delicious } from '@vicons/fa'
import { useRouter } from 'vue-router'
import { useTokenStore } from '@/store/token'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
    coinPairList: CoinPair[]
}>()

const { t } = useI18n()
const router = useRouter()
const pagination = { pageSize: 9 }
const tokenStore = useTokenStore()

const renderSorterIcon = (order: string | boolean) => {
    const style = 'transform: translateY(-3px);'
    if (order === false) return h('div', { style }, ['🤔'])
    if (order === 'ascend') return h('div', { style }, ['👆'])
    if (order === 'descend') return h('div', { style }, ['👇'])
}

const columns = computed(() => {
    return [
        {
            title: t('tokens.table.header.coinPair'),
            key: 'name',
            width: 150,
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
                            h('div', { class: 'text-xs	opacity-50' }, { default: () => row.coinPair }),
                        ]),
                    ],
                )
            },
        },
        {
            title: t('tokens.table.header.price'),
            key: 'currentPrice',
            width: 100,
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
            width: 150,
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
            width: 150,
            render: row => {
                return h('span', {}, formatAmountWithDollar(row.totalVolume))
            },
            defaultSortOrder: 'descend',
            renderSorterIcon: ({ order }) => {
                return renderSorterIcon(order)
            },
            sorter: (row1, row2) => row1.totalVolume - row2.totalVolume,
        },
        {
            title: t('tokens.table.header.change'),
            key: 'dailyPriceChangeInPercentage',
            width: 140,
            render: row => {
                return h(
                    'span',
                    {
                        class: row.dailyPriceChangeInPercentage > 0 ? 'font-bold text-success' : 'font-bold text-error',
                    },
                    row.dailyPriceChangeInPercentage > 0 ? `+${row.dailyPriceChangeInPercentage} %` : `${row.dailyPriceChangeInPercentage} %`,
                )
            },
            renderSorterIcon: ({ order }) => {
                return renderSorterIcon(order)
            },
            sorter: (row1, row2) => row1.dailyPriceChangeInPercentage - row2.dailyPriceChangeInPercentage,
        },
        {
            title: '',
            key: 'options',
            width: 100,
            render(row) {
                return h(
                    'button',
                    {
                        class: 'btn btn-outline btn-primary btn-sm normal-case',
                        onClick: () => openChart(row),
                    },
                    { default: () => t('tokens.table.btn.chart') },
                )
            },
        },
    ]
})

const openChart = (coin: CoinPair) => {
    tokenStore.setCurrentTokenInfo(coin)
    router.push({
        name: 'chart',
    })
}
</script>
<template>
    <div>
        <n-space vertical>
            <!-- <n-input-group>
                <n-input :style="{ width: '40%' }" />
                <n-button type="primary" ghost>搜索</n-button>
            </n-input-group> -->
            <n-data-table
                ref="table"
                :paginate-single-page="false"
                :bordered="false"
                :bottom-bordered="true"
                :single-column="false"
                :columns="columns"
                :data="coinPairList"
                :pagination="pagination"
            />
        </n-space>
    </div>
</template>
