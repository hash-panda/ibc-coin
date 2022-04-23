<script setup lang="ts">
import { computed, h, reactive, ref, onMounted, watch } from 'vue'
import { encodeAddress, formatAmountWithDollarDecimal, getTokenDisplayName } from '@/utils'
import { useRouter } from 'vue-router'
import { useTokenStore } from '@/store/token'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import { useRequest, usePagination } from 'vue-request'
import { queryTradingHistory } from '@/api'
import { CloseCircleOutline } from '@vicons/ionicons5'
import { openAccount, openTx } from '@/utils/business'
import { NTag } from 'naive-ui'

const { t } = useI18n()
const router = useRouter()
const tokenStore = useTokenStore()
const tradeVolumeSelected = ref('medium')
const sortBy = ref<boolean>(false)
const userAddress = ref<string>('')
const useAddressSearchKey = ref<string>('')
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

const { data, run, current, totalPage, loading, pageSize } = usePagination(queryTradingHistory, {
    errorRetryCount: 3,
    // pollingInterval: 1000 * 15,
    pollingWhenHidden: false,
    manual: true,
    pagination: {
        currentKey: 'page',
        pageSizeKey: 'page_size',
        totalKey: 'total',
    },
})

const fetchTradingHistory = () => {
    // showLoading.value = true
    const requestParams = {
        page: 1,
        page_size: 10,
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

    if (userAddress.value) {
        requestParams['user_address'] = userAddress.value
    } else {
        delete requestParams['user_address']
        console.log('requestParams', requestParams)
    }
    run(requestParams)
}

const tradingHistoryList = computed(() => data.value?.['items'] || [])

onMounted(() => {
    fetchTradingHistory()
})

// true - sell ,false - buy
const isBuyOrSell = (row: any) => {
    return row.tokenNameFrom?.toUpperCase() === tokenStore.currentTokenInfo.name?.toUpperCase()
}

const columns = computed(() => {
    return [
        {
            title: t('fullTradingHistory.table.header.buySell'),
            key: 'buySell',
            render: row => {
                return h(
                    NTag,
                    { size: 'small', type: isBuyOrSell(row) ? 'error' : 'success' },
                    {
                        default: () =>
                            isBuyOrSell(row) ? t('fullTradingHistory.table.header.buySell.sell') : t('fullTradingHistory.table.header.buySell.buy'),
                    },
                )
            },
        },
        {
            title: t('fullTradingHistory.table.header.date'),
            key: 'txTimestamp',
            render: row => {
                return h('div', { class: 'text-xs' }, { default: () => dayjs.unix(row.txTimestamp).format('YYYY-MM-DD HH:mm:ss') })
            },
        },
        {
            title: t('fullTradingHistory.table.header.coinPair'),
            key: 'tokenNameFrom',
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
            title: t('fullTradingHistory.table.header.volume'),
            key: 'txTotalVolume',
            render: row => {
                return h(
                    'div',
                    {
                        class: isBuyOrSell(row) ? 'font-bold text-error' : 'font-bold text-success',
                    },

                    { default: () => formatAmountWithDollarDecimal(row.txTotalVolume) },
                )
            },
        },
        {
            title: t('fullTradingHistory.table.header.trader'),
            key: 'userAddress',
            render: row => {
                return h(
                    'div',
                    { class: 'underline hover:text-primary hover:cursor-pointer normal-case', onClick: () => openAccount(row.userAddress) },
                    { default: () => encodeAddress(row.userAddress) },
                )
            },
        },
        {
            title: t('fullTradingHistory.table.header.txHash'),
            key: 'txHash',
            render: row => {
                return h(
                    'div',
                    { class: 'underline hover:text-primary hover:cursor-pointer normal-case', onClick: () => openTx(row.txHash) },
                    { default: () => encodeAddress(row.txHash) },
                )
            },
        },
    ]
})

watch(
    () => [sortBy.value, tradeVolumeSelected.value],
    () => {
        fetchTradingHistory()
    },
)

const onUserAddressClear = () => {
    userAddress.value = ''
    fetchTradingHistory()
}
const onUserAddressBlur = value => {
    console.log(value.target._value)
    // if (value.target._value) {
    fetchTradingHistory()
    // }
}

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
                    <n-card :bordered="false" :title="$t('fullTradingHistory.basicInfo.title')">
                        <n-descriptions column="1" label-placement="left" size="medium" bordered>
                            <n-descriptions-item label-style="width: 150px">
                                <template #label>{{ $t('fullTradingHistory.basicInfo.tokenName') }}</template>
                                <span class="font-bold">{{ getTokenDisplayName(tokenStore.currentTokenInfo.name) }}</span>
                            </n-descriptions-item>
                            <n-descriptions-item>
                                <template #label>{{ $t('fullTradingHistory.basicInfo.chain') }}</template>
                                <span class="font-bold">{{ tokenStore.currentTokenInfo.chain }}</span>
                            </n-descriptions-item>
                            <n-descriptions-item>
                                <template #label>{{ $t('fullTradingHistory.basicInfo.currentPrice') }}</template>
                                <span class="font-bold">{{ formatAmountWithDollarDecimal(tokenStore.currentTokenInfo.currentPrice) }}</span>
                            </n-descriptions-item>
                        </n-descriptions>
                    </n-card>
                    <n-card :bordered="false" :title="$t('fullTradingHistory.filter.title')">
                        <n-form ref="formRef" :model="formValue">
                            <n-form-item :label="$t('fullTradingHistory.filter.sortBy')">
                                <n-switch :loading="loading" v-model:value="sortBy" :checked-value="true" :unchecked-value="false">
                                    <template #checked>{{ $t('fullTradingHistory.filter.amount') }}</template>
                                    <template #unchecked>{{ $t('fullTradingHistory.filter.date') }}</template>
                                </n-switch>
                            </n-form-item>
                            <n-form-item :label="$t('fullTradingHistory.filter.amount')">
                                <n-radio-group v-model:value="tradeVolumeSelected" size="small" name="radioButtonGroup" :disabled="loading">
                                    <n-radio-button v-for="item in tradeVolumeSelectList" :key="item.value" :value="item.value" :label="item.label" />
                                </n-radio-group>
                            </n-form-item>
                            <n-form-item :label="$t('fullTradingHistory.filter.address')">
                                <n-input
                                    v-model:value="userAddress"
                                    clearable
                                    :disabled="loading"
                                    :placeholder="$t('fullTradingHistory.filter.address.placeholder')"
                                    @clear="onUserAddressClear"
                                    @blur="onUserAddressBlur"
                                />
                            </n-form-item>
                        </n-form>
                    </n-card>
                </n-space>
            </n-grid-item>
            <n-grid-item span="3 1024:2">
                <n-space vertical size="large">
                    <n-data-table
                        ref="table"
                        :paginate-single-page="false"
                        :bordered="false"
                        :bottom-bordered="true"
                        :single-column="false"
                        :columns="columns"
                        :data="tradingHistoryList"
                        :loading="loading"
                    />
                    <div class="flex justify-end">
                        <NPagination
                            v-model:page="current"
                            v-model:page-size="pageSize"
                            :page-count="totalPage"
                            :page-slot="5"
                            :page-sizes="[5, 10, 20]"
                            show-size-picker
                        />
                    </div>
                </n-space>
            </n-grid-item>
        </n-grid>
    </div>
</template>
