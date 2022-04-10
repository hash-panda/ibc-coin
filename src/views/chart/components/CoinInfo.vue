<script setup lang="ts">
import { ArrowRepeatAll16Regular } from '@vicons/fluent'
import { CoinPair } from '@/types/types'
import { useMenuStore } from '@/store/menu'
import { formatAmountWithDollar } from '@/utils'
import { useRouter } from 'vue-router'

const props = defineProps<{
    coinDetail: CoinPair
}>()

const router = useRouter()
const menuStore = useMenuStore()
const openTokensList = () => {
    router.push({
        name: 'tokens',
    })
}
</script>
<template>
    <div class="card w-full bg-base-400">
        <div class="card-body py-2">
            <div class="flex flex-row">
                <div class="w-full">
                    <div class="card-title inline-block text-bottom">
                        <span class="tx-xl lg:text-3xl tracking-widest text-base-content uppercase">{{ props.coinDetail?.name }}</span>
                        <span
                            class="tooltip tooltip-right ml-1 align-middle tooltip-primary"
                            :data-tip="$t('chart.coinInfo.openCoinPairList')"
                            @click="openTokensList"
                        >
                            <n-icon class="hover:text-primary" :component="ArrowRepeatAll16Regular" size="28" :depth="3" />
                        </span>
                        <!-- <span
                            class="tooltip tooltip-bottom ml-2"
                            :data-tip="$t('chart.coinInfo.openWeb')"
                            ><n-icon
                                class="hover:text-primary"
                                :component="ShareSquare"
                                size="18"
                                :depth="3"
                            />
                        </span> -->
                        <!-- <span
                            class="tooltip tooltip-bottom ml-2"
                            :data-tip="$t('chart.coinInfo.twitter')"
                        >
                            <n-icon
                                class="hover:text-primary"
                                :component="Twitter"
                                size="18"
                                :depth="3"
                            />
                        </span> -->
                        <!-- <span
                            class="tooltip tooltip-bottom ml-2"
                            :data-tip="$t('chart.coinInfo.telegram')"
                        >
                            <n-icon
                                class="hover:text-primary"
                                :component="TelegramPlane"
                                size="18"
                                :depth="3"
                            />
                        </span> -->
                        <!-- <span
                            class="tooltip tooltip-bottom ml-2"
                            :data-tip="$t('chart.coinInfo.discord')"
                        >
                            <n-icon
                                class="hover:text-primary"
                                :component="Discord"
                                size="18"
                                :depth="3"
                            />
                        </span> -->
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
                        <div>
                            <div class="text-sm lg:text-sm mt-2 opacity-50">{{ $t('chart.coinInfo.marketCap') }}</div>
                            <div class="text-base-content text-sm md:text-base xl:text-lg tracking-widest">
                                {{ formatAmountWithDollar(props.coinDetail?.marketCap) }}
                            </div>
                        </div>
                        <div>
                            <div class="text-sm lg:text-sm mt-2 opacity-50">{{ $t('chart.coinInfo.volume') }}</div>
                            <div class="text-base-content text-sm md:text-base xl:text-lg tracking-widest">
                                {{ formatAmountWithDollar(props.coinDetail?.totalVolume) }}
                            </div>
                        </div>
                        <div class="flex mt-2">
                            <div class="mr-4">
                                <div class="text-sm lg:text-sm opacity-50">{{ $t('chart.coinInfo.price') }}</div>
                                <div class="text-base-content text-sm md:text-base xl:text-lg tracking-widest">
                                    {{ props.coinDetail?.currentPrice }}
                                </div>
                            </div>
                            <div>
                                <div class="text-sm lg:text-sm opacity-50">{{ $t('chart.coinInfo.change') }}</div>
                                <div
                                    class="text-sm md:text-base xl:text-lg tracking-widest text-primary"
                                    :class="props.coinDetail?.dailyPriceChangeInPercentage > 0 ? 'text-success' : 'text-error'"
                                >
                                    {{
                                        props.coinDetail?.dailyPriceChangeInPercentage > 0
                                            ? '+' + props.coinDetail?.dailyPriceChangeInPercentage
                                            : props.coinDetail?.dailyPriceChangeInPercentage
                                    }}%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>