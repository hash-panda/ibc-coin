<script setup lang="ts">
import { computed, h, ref } from 'vue'
import { CoinPair } from '@/types/types'
import { getImageSrc, formatAmountWithDollar, formatAmountWithDollarDecimal, getTokenDisplayName, getChainDisplayName } from '@/utils'
import { KeyboardShiftUppercase24Regular } from '@vicons/fluent'
import { useRouter } from 'vue-router'
import { useTokenStore } from '@/store/token'
import { useI18n } from 'vue-i18n'
import FavoritesVue from '@/components/favorites/Favorites.vue'
import { useTokenFavoritesStore } from '@/store/tokenFavorites'
import { NIcon, useMessage } from 'naive-ui'

const props = defineProps<{
    coinPairList: CoinPair[]
    showChain: Boolean
    showFavorite: Boolean
    defaultVolumeSortDescend: Boolean
    showTop: Boolean
}>()

const { t } = useI18n()
const router = useRouter()
const pagination = { pageSizes: [10, 20, 50, 100], showSizePicker: true }
const tokenStore = useTokenStore()
const searchKey = ref<string>('')
const tokenFavoritesStore = useTokenFavoritesStore()
const message = useMessage()

const renderSorterIcon = (order: string | boolean) => {
    const style = 'transform: translateY(-3px);'
    if (order === false) return h('div', { style }, ['🤔'])
    if (order === 'ascend') return h('div', { style }, ['👆'])
    if (order === 'descend') return h('div', { style }, ['👇'])
}

const columns = computed(() => {
    let columnsInfo = [
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
            render: row => {
                return h('span', {}, formatAmountWithDollar(row.totalVolume))
            },
            defaultSortOrder: props.defaultVolumeSortDescend ? 'descend' : false,
            renderSorterIcon: ({ order }) => {
                return renderSorterIcon(order)
            },
            sorter: (row1, row2) => row1.totalVolume - row2.totalVolume,
        },
        {
            title: t('tokens.table.header.change'),
            key: 'dailyPriceChangeInPercentage',
            width: 80,
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
            width: 35,
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
    const chainColumnInfo: any = {
        title: t('tokens.table.header.chain'),
        key: 'chain',
        width: 60,
        render: row => {
            return h('span', {}, getChainDisplayName(row.chain))
        },
    }
    if (props.showChain) {
        columnsInfo.unshift(chainColumnInfo)
    }
    const favoriteColumnInfo: any = {
        title: '',
        key: 'favorite',
        width: 30,
        render: row => {
            return h(FavoritesVue, { class: 'w-2', favorite: tokenFavoritesStore.isFavoriteToken(row.tokenId), tokenInfo: row })
        },
    }
    if (props.showFavorite) {
        columnsInfo.unshift(favoriteColumnInfo)
    }
    const topColumnInfo: any = {
        title: '',
        key: 'top',
        width: 20,
        render: row => {
            return h(NIcon, {
                class: 'hover:text-primary w-2',
                component: KeyboardShiftUppercase24Regular,
                size: 20,
                onClick: () => {
                    tokenFavoritesStore.onTokenTop(row.tokenId)
                    // message.success('')
                },
            })
        },
    }
    if (props.showTop) {
        columnsInfo.unshift(topColumnInfo)
    }
    return columnsInfo
})

const searchedData = computed(() => {
    let result = []
    if (searchKey.value) {
        const findOne = props.coinPairList.find(v => v.name?.toLowerCase() === searchKey.value.toLowerCase())
        if (findOne) {
            result = [findOne]
        } else {
            result = []
        }
    } else {
        result = props.coinPairList
    }
    return result
})

const onSearch = (value: any) => {
    searchKey.value = value?.target?._value ?? ''
}

const onClear = () => {
    searchKey.value = ''
}

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
                :scroll-x="850"
            />
        </n-space>
    </div>
</template>
