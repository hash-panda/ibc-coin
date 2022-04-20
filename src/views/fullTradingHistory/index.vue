<script setup lang="ts">
import { computed, h, reactive, ref, onMounted, watch } from 'vue'
import { encodeAddress, formatAmountWithDollarDecimal, getTokenDisplayName } from '@/utils'
import { useRouter } from 'vue-router'
import { useTokenStore } from '@/store/token'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import { useRequest } from 'vue-request'
import { queryTradingHistory } from '@/api'
import { CloseCircleOutline } from '@vicons/ionicons5'

const { t } = useI18n()
const router = useRouter()
const tokenStore = useTokenStore()
const searchKey = ref<string>('')
const showLoading = ref<boolean>(false)
const tradeVolumeSelected = ref('medium')
const sortBy = ref<boolean>(false)
const formValue = ref({
    user: {
        name: '',
    },
})

const tradeVolumeSelectList = computed(() => {
    return [
        {
            value: 'small',
            label: '< $1,000',
        },
        {
            value: 'medium',
            label: '$1,000 - $10,000',
        },
        {
            value: 'large',
            label: '> $10,000',
        },
    ].map(s => {
        s.value = s.value.toLowerCase()
        return s
    })
})

const {
    data: tradingHistoryList,
    reload,
    run,
    refresh,
} = useRequest(queryTradingHistory, {
    // defaultParams: [{ page_size: 1000, token_id: tokenStore.currentTokenInfo.tokenId, chain: tokenStore.currentTokenInfo.chain }],
    errorRetryCount: 5,
    // pollingInterval: 1000 * 15,
    pollingWhenHidden: false,
    manual: true,
    onError: error => {
        console.log('queryTradingHistory (⊙︿⊙) something error', error)
        showLoading.value = false
    },
    onSuccess: res => {
        showLoading.value = false
        console.log('queryTradingHistory (⊙︿⊙) something res', res)
    },
})

const fetchTradingHistory = () => {
    showLoading.value = true
    const requestParams = {
        page_size: 200,
        token_id: tokenStore.currentTokenInfo.tokenId,
        chain: tokenStore.currentTokenInfo.chain,
        order_by_total_value: sortBy.value,
    }
    if (tradeVolumeSelected.value === 'small') {
        requestParams['max_total_value'] = 1000
    } else if (tradeVolumeSelected.value === 'large') {
        requestParams['min_total_value'] = 10000
    } else {
        requestParams['min_total_value'] = 1000
        requestParams['max_total_value'] = 10000
    }
    run(requestParams)
}

onMounted(() => {
    fetchTradingHistory()
})

const pagination = { pageSize: 10 }

const columns = computed(() => {
    return [
        {
            title: '交易日期',
            key: 'txTimestamp',
            width: 60,
            render: row => {
                return h('div', { class: 'text-xs' }, { default: () => dayjs.unix(row.txTimestamp).format('YYYY-MM-DD HH:mm:ss') })
            },
        },
        {
            title: '交易币对',
            key: 'tokenNameFrom',
            width: 50,
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
            title: '成交量',
            key: 'txTotalVolume',
            width: 40,
            render: row => {
                return h(
                    'div',
                    {
                        class:
                            row.tokenNameFrom?.toUpperCase() === tokenStore.currentTokenInfo.name?.toUpperCase()
                                ? 'font-bold text-error'
                                : 'font-bold text-success',
                    },
                    { default: () => formatAmountWithDollarDecimal(row.txTotalVolume) },
                )
            },
        },
        {
            title: '交易账户',
            key: 'userAddress',
            width: 40,
            render: row => {
                return h('div', {}, { default: () => encodeAddress(row.userAddress) })
            },
        },
        {
            title: '交易哈希',
            key: 'txHash',
            width: 40,
            render: row => {
                return h('div', {}, { default: () => encodeAddress(row.txHash) })
            },
        },
    ]
})

watch(
    () => sortBy.value,
    () => {
        fetchTradingHistory()
    },
)
watch(
    () => tradeVolumeSelected.value,
    () => {
        fetchTradingHistory()
    },
)

const backPage = () => {
    router.go(-1)
}
</script>
<template>
    <div class="m-5">
        <div class="fixed right-4 top-18 z-30">
            <n-icon @click="backPage" class="hover:text-primary" :component="CloseCircleOutline" size="30" :depth="2" />
        </div>
        <n-grid cols="3" x-gap="20" y-gap="20" item-responsive>
            <n-grid-item span="3 1024:1">
                <n-space vertical>
                    <n-card :bordered="false" title="基础信息">
                        <n-descriptions column="1" label-placement="left" size="medium" bordered>
                            <n-descriptions-item label-style="width: 150px">
                                <template #label>币种</template>
                                <span class="font-bold">{{ getTokenDisplayName(tokenStore.currentTokenInfo.name) }}</span>
                            </n-descriptions-item>
                            <n-descriptions-item>
                                <template #label>链</template>
                                <span class="font-bold">{{ tokenStore.currentTokenInfo.chain }}</span>
                            </n-descriptions-item>
                            <n-descriptions-item>
                                <template #label>当前价格</template>
                                <span class="font-bold">{{ formatAmountWithDollarDecimal(tokenStore.currentTokenInfo.currentPrice) }}</span>
                            </n-descriptions-item>
                        </n-descriptions>
                    </n-card>
                    <n-card :bordered="false" title="筛选">
                        <n-form ref="formRef" :model="formValue">
                            <n-form-item label="排序规则">
                                <n-switch :loading="showLoading" v-model:value="sortBy" :checked-value="true" :unchecked-value="false">
                                    <template #checked>交易金额</template>
                                    <template #unchecked>交易时间</template>
                                </n-switch>
                            </n-form-item>
                            <n-form-item label="交易金额">
                                <n-radio-group v-model:value="tradeVolumeSelected" size="small" name="radioButtonGroup" :disabled="showLoading">
                                    <n-radio-button v-for="item in tradeVolumeSelectList" :key="item.value" :value="item.value" :label="item.label" />
                                </n-radio-group>
                            </n-form-item>

                            <!-- <n-form-item label="交易账户">
                                <n-input v-model:value="formValue.user.name" placeholder="Input Name" />
                            </n-form-item> -->
                        </n-form>
                    </n-card>
                </n-space>
            </n-grid-item>
            <n-grid-item span="3 1024:2">
                <n-data-table
                    ref="table"
                    :paginate-single-page="false"
                    :bordered="false"
                    :bottom-bordered="true"
                    :single-column="false"
                    :columns="columns"
                    :data="tradingHistoryList"
                    :pagination="pagination"
                    :scroll-x="750"
                    :loading="showLoading"
                />
            </n-grid-item>
        </n-grid>
    </div>
</template>
