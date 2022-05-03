<script setup lang="ts">
import { useTopHotStore } from '@/store/topHot'
import { formatAmountWithDollarDecimal, getImageSrc, getTokenDisplayName } from '@/utils'
import { CoinPair } from '@/types/types'
import { useRouter } from 'vue-router'
import { useTokenStore } from '@/store/token'

const topHotStore = useTopHotStore()
const router = useRouter()
const tokenStore = useTokenStore()

const openChart = (coin: CoinPair) => {
    tokenStore.setCurrentTokenInfo(coin)
    router.push({
        name: 'chart',
        params: {
            chain: coin.chain,
            token: coin.name,
        },
    })
}
</script>
<template>
    <div>
        <div class="grid grid-cols-4 gap-1 md:gap-4 my-6">
            <div
                v-for="item in topHotStore.topTokens"
                :key="item.name"
                class="flex items-center sm:space-x-2 pl-2 md:pl-2 lg:pl-4 pr-2 md:pr-4 lg:pr-6 py-2 rounded-md border border-primary border-opacity-50 hover:border-primary"
            >
                <div class="avatar hidden sm:table-cell">
                    <n-avatar round :src="getImageSrc(item.icon)" :fallback-src="getImageSrc('logo.png')" />
                    <!-- <img :src="getImageSrc(item.icon)" /> -->
                </div>
                <div>
                    <div class="font-bold link link-hover text-primary uppercase" @click="openChart(item)">{{ getTokenDisplayName(item.name) }}</div>
                    <div class="text-[0.5rem] uppercase">
                        <span class="opacity-50 mr-2">{{ formatAmountWithDollarDecimal(item.currentPrice) }}</span>
                        <br class="md:hidden" />
                        <span :class="item.dailyPriceChangeInPercentage > 0 ? 'font-bold text-success' : 'font-bold text-error'">
                            {{
                                item.dailyPriceChangeInPercentage > 0
                                    ? `+${item.dailyPriceChangeInPercentage} %`
                                    : `${item.dailyPriceChangeInPercentage} %`
                            }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
