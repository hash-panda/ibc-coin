<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { formatAmountWithDollar, encodeAddress } from '@/utils'
import { ArrowOutlineUpRight48Filled } from '@vicons/fluent'
import dayjs from 'dayjs'
import { useLoadMore, useRequest } from 'vue-request'
import { queryTradingHistory, TradingHistoryRes } from '@/api'
import { useTokenStore } from '@/store/token'
import taiyang from '@/assets/images/order/taiyang.png'
import diqiu from '@/assets/images/order/diqiu.png'
import tuxing from '@/assets/images/order/tuxing.png'
import yueqiu from '@/assets/images/order/yueqiu.png'
import { Delicious } from '@vicons/fa'
import { useRouter, useRoute } from 'vue-router'

type TradingHistoryData = {
    data: TradingHistoryRes[]
    total: number
}

const tokenStore = useTokenStore()
const refreshStatus = ref(false)
const router = useRouter()
const showModal = ref(false)
const showLoading = ref(true)

// ！！！！不使用 加载更多 这种方式，仅仅展示最近的50条交易数据，其他的跳转页面使用分页查询
// function queryTradingHistoryService(params: { data?: TradingHistoryData; dataList?: TradingHistoryData['data'] }) {
//     const p = { page_size: 10, token_id: tokenStore.currentTokenInfo.tokenId, chain: tokenStore.currentTokenInfo.chain }
//     if (params?.dataList?.length !== undefined) {
//         p['page'] = params.dataList.length / p.page_size + 1
//     } else {
//         p['page'] = 1
//     }
//     return queryTradingHistory(p)
// }

// const { data, loadingMore, dataList, refreshing, loadMore, refresh } = useLoadMore<
//     TradingHistoryData,
//     Parameters<typeof queryTradingHistoryService>,
//     TradingHistoryData['data']
// >(queryTradingHistoryService as any, {
//     listKey: 'data',
//     errorRetryCount: 5,
//     pollingInterval: 1000 * 30,
//     pollingWhenHidden: true,
//     debounceInterval: 1000,
//     manual: false,
//     onBefore: () => {
//         refreshStatus.value = true
//     },
//     onAfter: () => {
//         setTimeout(() => {
//             refreshStatus.value = false
//         }, 1000)
//     },
// })

// watch(
//     () => tokenStore.currentTokenInfo.tokenId,
//     () => {
//         refresh()
//     },
// )

// const noMore = computed(() => dataList.value.length === data.value?.total)

const { data, reload, run, refresh } = useRequest(queryTradingHistory, {
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
const openAccount = (account: string) => {
    // TODO 各个不同的账户查询的链接是不同的，现在暂时使用 osmosis
    window.open(`https://www.mintscan.io/${tokenStore.currentTokenInfo.chain}/account/${account}`, '_blank')
}
const openTx = (tx: string) => {
    // TODO 各个不同的地址对应不同 mintscan 信息
    window.open(`https://www.mintscan.io/${tokenStore.currentTokenInfo.chain}/txs/${tx}`, '_blank')
}
</script>
<template>
    <div>
        <!-- <div class="absolute right-5 top-4 z-50 text-primary-focus text-xs">
          <button v-show="refreshStatus" class="btn btn-link btn-xs loading normal-case">{{ $t('tradingHistory.table.refresh') }}</button>
        </div> -->
        <n-spin :show="showLoading">
            <table class="table table-compact w-full">
                <thead>
                    <tr class="sticky inset-x-0 top-0 z-40">
                        <th class="normal-case">{{ $t('chart.tradingHistory.table.date') }}</th>
                        <th class="normal-case">{{ $t('chart.tradingHistory.table.coinPair') }}</th>
                        <th class="normal-case">{{ $t('chart.tradingHistory.table.volume') }}</th>
                        <th class="normal-case">{{ $t('chart.tradingHistory.table.tradeInfo') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in (data as any)" :key="item.id">
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
                            <!-- <div class="avatar align-middle">
                                <div class="w-8 rounded-full">
                                    <img :src="taiyang" />
                                </div>
                            </div>
                            <div class="avatar align-middle">
                                <div class="w-8 rounded-full">
                                    <img :src="tuxing" />
                                </div>
                            </div>
                            <div class="avatar align-middle">
                                <div class="w-8 rounded-full">
                                    <img :src="yueqiu" />
                                </div>
                            </div> -->
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
            </table>

            <n-empty v-if="(data as any)?.length <= 0" description="." class="h-96 justify-center">
                <template #icon>
                    <n-icon :component="Delicious" size="38" :depth="3" />
                </template>
            </n-empty>
            <!-- 加载更多的 按钮，暂时不用这种模式 -->
            <!-- <button class="btn btn-block btn-link mt-2" :class="{ loading: loadingMore }" :disabled="noMore" @click="loadMore">
                {{ noMore ? $t('tradingHistory.table.noMoreData') : $t('tradingHistory.table.loadMore') }}
            </button> -->
        </n-spin>
    </div>
</template>
<style scoped></style>
