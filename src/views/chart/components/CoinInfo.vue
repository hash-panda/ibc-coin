<script setup lang="ts">
import { watch, onMounted, ref } from 'vue'
import { InfoCircle } from '@vicons/fa'
import { CoinPair } from '@/types/types'
import { useTokenStore } from '@/store/token'
import { useTokenFavoritesStore } from '@/store/tokenFavorites'
import { formatAmountWithDollar, formatAmountWithDollarDecimal, getTokenDisplayName } from '@/utils'
import { useRouter } from 'vue-router'
import { useRequest } from 'vue-request'
import { queryTokenStaticStatusListByChain } from '@/api'
import Favorites from '@/components/favorites/Favorites.vue'

const tokenStore = useTokenStore()
const tokenFavoritesStore = useTokenFavoritesStore()
const router = useRouter()

const { data: coinDetail, run: runTokenInfo } = useRequest(queryTokenStaticStatusListByChain, {
    // defaultParams: [{ chain: tokenStore.currentTokenInfo.chain, token_ids: [tokenStore.currentTokenInfo.tokenId] }],
    errorRetryCount: 5,
    pollingInterval: 1000 * 10,
    pollingWhenHidden: false,
    manual: true,
    onError: error => {
        console.log('queryTokenStaticStatusListByChain (⊙︿⊙) something error', error)
    },
    onSuccess: res => {
        tokenStore.setCurrentTokenInfo(res?.[0])
    },
})

const fetchTokenInfo = () => {
    runTokenInfo({ chain: tokenStore.currentTokenInfo.chain, token_ids: [tokenStore.currentTokenInfo.tokenId] })
}

onMounted(() => {
    fetchTokenInfo()
})

watch(
    () => tokenStore.currentTokenInfo.tokenId,
    () => {
        fetchTokenInfo()
    },
)

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
                    <div class="card-title inline-block text-bottom flex items-center">
                        <span class="tx-xl lg:text-3xl tracking-widest text-base-content">
                            {{ getTokenDisplayName(tokenStore.currentTokenInfo?.name) }}
                        </span>
                        <Favorites
                            :token-info="tokenStore.currentTokenInfo"
                            :favorite="tokenFavoritesStore.isFavoriteToken(tokenStore.currentTokenInfo?.tokenId)"
                        />
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
                        <div>
                            <div class="text-sm lg:text-sm mt-2 opacity-50">{{ $t('chart.coinInfo.marketCap') }}</div>
                            <div class="text-base-content text-sm md:text-base xl:text-lg tracking-widest">
                                {{ formatAmountWithDollar(tokenStore.currentTokenInfo?.marketCap) }}
                            </div>
                        </div>
                        <div>
                            <div class="flex items-center text-sm lg:text-sm mt-2 opacity-50">
                                <span class="mr-1">{{ $t('chart.coinInfo.volume') }}</span>
                                <n-tooltip trigger="hover">
                                    <template #trigger>
                                        <n-icon :component="InfoCircle" size="15" />
                                    </template>
                                    {{ $t('chart.coinInfo.volume.tips') }}
                                </n-tooltip>
                            </div>
                            <div class="text-base-content text-sm md:text-base xl:text-lg tracking-widest">
                                {{ formatAmountWithDollar(tokenStore.currentTokenInfo?.totalVolume) }}
                            </div>
                        </div>
                        <div class="flex mt-2">
                            <div class="mr-4">
                                <div class="text-sm lg:text-sm opacity-50">{{ $t('chart.coinInfo.price') }}</div>
                                <div class="text-base-content text-sm md:text-base xl:text-lg tracking-widest">
                                    {{ formatAmountWithDollarDecimal(tokenStore.currentTokenInfo?.currentPrice) }}
                                </div>
                            </div>
                            <div>
                                <div class="text-sm lg:text-sm opacity-50">{{ $t('chart.coinInfo.change') }}</div>
                                <div
                                    class="text-sm md:text-base xl:text-lg tracking-widest text-primary"
                                    :class="tokenStore.currentTokenInfo?.dailyPriceChangeInPercentage > 0 ? 'text-success' : 'text-error'"
                                >
                                    {{
                                        tokenStore.currentTokenInfo?.dailyPriceChangeInPercentage > 0
                                            ? '+' + tokenStore.currentTokenInfo?.dailyPriceChangeInPercentage
                                            : tokenStore.currentTokenInfo?.dailyPriceChangeInPercentage
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
