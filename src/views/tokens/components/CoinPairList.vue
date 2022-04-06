<script setup lang="ts">
import { reactive } from 'vue'
import { CoinPair } from '@/types/types'
import { getImageSrc, formatAmountWithDollar } from '@/utils'
import { Delicious } from '@vicons/fa'
import { useRouter } from 'vue-router'
import { useTokenStore } from '@/store/token'

const router = useRouter()
const tokenStore = useTokenStore()
const props = defineProps<{
    coinPairList: CoinPair[]
}>()

const openChart = (coin: CoinPair) => {
    tokenStore.setCurrentTokenInfo(coin)
    router.push({
        name: 'chart',
    })
}
</script>
<template>
    <div>
        <div v-if="coinPairList?.length > 0" class="overflow-x-auto w-full">
            <table class="table w-full">
                <!-- head -->
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
                    <!-- row 1 -->
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
                                <span>{{ coin.currentPrice }}</span>
                                <!-- <span class="uppercase"> {{ coin.currentPriceUnit }}</span> -->
                                <span class="uppercase">UST</span>
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
        </n-empty>
    </div>
</template>
