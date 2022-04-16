<script setup lang="ts">
import { computed, h } from 'vue'
import { CoinPair } from '@/types/types'
import { getImageSrc, formatAmountWithDollar } from '@/utils'
import { Delicious } from '@vicons/fa'
import { useRouter } from 'vue-router'
import { useTokenStore } from '@/store/token'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
    coinPairList: CoinPair[]
}>()

const { t } = useI18n()
const router = useRouter()
const pagination = { pageSize: 10 }
const tokenStore = useTokenStore()

const columns = computed(() => {
    return [
        {
            title: t('tokens.table.header.coinPair'),
            key: 'name',

            // render: row => {
            //     return h('NAvatar', {
            //         size: 48,
            //         src: row.avatar,
            //     })
            // },
        },
        {
            title: t('tokens.table.header.price'),
            key: 'currentPrice',
            render: row => {
                return h('span', {}, formatAmountWithDollar(row.currentPrice, 8))
            },
            sorter: (row1, row2) => row1.currentPrice - row2.currentPrice,
        },
        {
            title: t('tokens.table.header.marketCap'),
            key: 'marketCap',
            render: row => {
                return h('span', {}, formatAmountWithDollar(row.marketCap))
            },
            sorter: (row1, row2) => row1.marketCap - row2.marketCap,
        },
        {
            title: t('tokens.table.header.totalVolume'),
            key: 'totalVolume',
            render: row => {
                return h('span', {}, formatAmountWithDollar(row.totalVolume))
            },
            sorter: (row1, row2) => row1.totalVolume - row2.totalVolume,
        },
        {
            title: t('tokens.table.header.change'),
            key: 'dailyPriceChangeInPercentage',
            render: row => {
                return h(
                    'span',
                    {
                        class: row.dailyPriceChangeInPercentage > 0 ? 'font-bold text-success' : 'font-bold text-error',
                    },
                    row.dailyPriceChangeInPercentage > 0 ? `+${row.dailyPriceChangeInPercentage} %` : `${row.dailyPriceChangeInPercentage} %`,
                )
            },
            sorter: (row1, row2) => row1.dailyPriceChangeInPercentage - row2.dailyPriceChangeInPercentage,
        },
        {
            title: '',
            key: 'options',
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
        <n-data-table
            ref="table"
            :paginate-single-page="false"
            size="large"
            :bordered="false"
            :bottom-bordered="false"
            :single-column="false"
            :columns="columns"
            :data="coinPairList"
            :pagination="pagination"
        />
        <!-- <div v-if="coinPairList?.length > 0" class="overflow-x-auto w-full">
            <table class="table w-full">
                <thead>
                    <tr>
                        <th class="normal-case">{{ $t('tokens.table.header.coinPair') }}</th>
                        <th class="normal-case">{{ $t('tokens.table.header.price') }}</th>
                        <th class="normal-case">{{ $t('tokens.table.header.marketCap') }}</th>
                        <th class="normal-case">{{ $t('tokens.table.header.totalVolume') }}</th>
                        <th class="normal-case hidden md:table-cell">{{ $t('tokens.table.header.change') }}</th>
                        <th class="normal-case hidden md:table-cell"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="coin in props.coinPairList" :key="coin.name" class="hover">
                        <td class="p-2 md:p-4">
                            <div class="flex items-center sm:space-x-3">
                                <div class="avatar hidden sm:table-cell">
                                    <div class="mask mask-squircle w-6 h-6 md:w-12 md:h-12">
                                        <img :src="getImageSrc(coin.icon)" />
                                    </div>
                                </div>
                                <div>
                                    <div class="font-bold link link-hover uppercase" @click="openChart(coin)">{{ coin.name }}</div>
                                    <div class="text-sm opacity-50 uppercase">{{ coin.coinPair }}</div>
                                </div>
                            </div>
                        </td>
                        <td class="p-2 md:p-4">
                            <div v-if="coin.currentPrice">
                                <span>{{ formatAmountWithDollar(coin.currentPrice, 8) }}</span>
                            </div>
                            <div v-else>--</div>
                            <div>
                                <div class="font-bold md:hidden" :class="coin.dailyPriceChangeInPercentage > 0 ? 'text-success' : 'text-error'">
                                    {{
                                        coin.dailyPriceChangeInPercentage > 0
                                            ? '+' + coin.dailyPriceChangeInPercentage
                                            : coin.dailyPriceChangeInPercentage
                                    }}
                                    %
                                </div>
                            </div>
                        </td>
                        <td class="p-2 md:p-4">
                            <div>
                                {{ formatAmountWithDollar(coin.marketCap) }}
                            </div>
                        </td>
                        <td class="p-2 md:p-4">
                            <div>
                                {{ formatAmountWithDollar(coin.totalVolume) }}
                            </div>
                        </td>
                        <td
                            class="p-2 md:p-4 font-bold hidden md:table-cell"
                            :class="coin.dailyPriceChangeInPercentage > 0 ? 'text-success' : 'text-error'"
                        >
                            {{ coin.dailyPriceChangeInPercentage > 0 ? '+' + coin.dailyPriceChangeInPercentage : coin.dailyPriceChangeInPercentage }}
                            %
                        </td>
                        <th class="hidden sm:table-cell">
                            <button class="btn btn-outline btn-primary btn-sm normal-case" @click="openChart(coin)">
                                {{ $t('tokens.table.btn.chart') }}
                            </button>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
        <n-empty v-else description="." class="h-96 justify-center">
            <template #icon>
                <n-icon :component="Delicious" size="38" :depth="3" />
            </template>
        </n-empty> -->
    </div>
</template>
