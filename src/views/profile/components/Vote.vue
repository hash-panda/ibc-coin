<script setup lang="ts">
import { computed, onMounted, ref, h, reactive } from 'vue'
import txAction from '@/const/txAction'
import { useRequest } from 'vue-request'
import { queryTxs } from '@/api'
import { encodeAddress, getChainTypeByAddress, getVoteOption } from '@/utils'
import businessCommon from '@/utils/business'
import { useClipboard } from '@vueuse/core'
import { useMessage } from 'naive-ui'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const message = useMessage()
const { copy } = useClipboard()
const { openTx, openProposal } = businessCommon()
const props = defineProps({
    address: {
        type: String,
    },
})
const paginationInfo = ref({
    limit: 100,
    offset: 0,
})
const currentPage = ref(1)

onMounted(() => {
    fetchCosmosTxs()
})

const columns = computed(() => {
    return [
        {
            title: t('account.header.proposalId'),
            key: 'proposalId',
            render: row => {
                return h(
                    'div',
                    {
                        class: 'underline text-primary hover:cursor-pointer',
                        onClick: () => {
                            openProposal(row?.tx?.body?.messages?.[0]?.proposal_id, row?.tx?.body?.messages?.[0]?.voter)
                        },
                    },
                    {
                        default: () => {
                            return row?.tx?.body?.messages?.[0]?.proposal_id
                        },
                    },
                )
            },
        },
        {
            title: t('account.header.voter'),
            key: 'voter',
            render: row => {
                return h(
                    'div',
                    {
                        class: 'hover:text-primary hover:cursor-pointer',
                        onClick: () => {
                            copy(row?.tx?.body?.messages?.[0]?.voter)
                            message.success(t('wallet.copied'))
                        },
                    },
                    {
                        default: () => {
                            return encodeAddress(row?.tx?.body?.messages?.[0]?.voter, false)
                        },
                    },
                )
            },
        },
        {
            title: t('account.header.option'),
            key: 'voteResult',
            render: row => {
                return h(
                    'div',
                    { class: 'text-primary' },
                    {
                        default: () => {
                            return getVoteOption(row?.tx?.body?.messages?.[0]?.option)
                        },
                    },
                )
            },
        },
        {
            title: t('account.header.txHash'),
            key: 'txHash',
            render: row => {
                return h(
                    'div',
                    { class: 'underline hover:text-primary hover:cursor-pointer normal-case', onClick: () => openTx(row?.txhash) },
                    {
                        default: () => {
                            return encodeAddress(row?.txhash, false)
                        },
                    },
                )
            },
        },
        {
            title: t('account.header.height'),
            key: 'height',
            render: row => {
                return h(
                    'div',
                    {},
                    {
                        default: () => {
                            return row?.height
                        },
                    },
                )
            },
        },
        {
            title: t('account.header.timestamp'),
            key: 'timestamp',
            render: row => {
                return h(
                    'div',
                    {},
                    {
                        default: () => {
                            return row?.timestamp
                        },
                    },
                )
            },
        },
    ]
})

const cosmosTxs = computed(() => {
    return data.value?.['items'] || []
})

const totalCount = computed(() => {
    console.log(data.value?.['pagination']?.total)
    return data.value?.['pagination']?.total || 0
})

const { data, reload, run, loading } = useRequest(queryTxs, {
    errorRetryCount: 3,
    manual: true,
    cacheKey: 'queryCosmosTxsVote',
    cacheTime: 300000, // 5 minutes
    staleTime: 300000, // 5 minutes
    onError: error => {
        console.log('queryCosmosTxs (⊙︿⊙) something error', error)
    },
    onSuccess: (res: any) => {},
})

const fetchCosmosTxs = () => {
    const requestParams = {
        action: txAction.Vote,
        address: props.address,
        ...paginationInfo.value,
    }
    run(requestParams, getChainTypeByAddress(props.address))
}

const onCurrentPage = value => {
    if (value <= 1) {
        paginationInfo.value.offset = 0
    } else {
        paginationInfo.value.offset = (value - 1) * paginationInfo.value.limit
    }
    fetchCosmosTxs()
}
</script>
<template>
    <n-space vertical size="large">
        <n-data-table
            ref="table"
            :paginate-single-page="false"
            :bordered="false"
            :bottom-bordered="true"
            :single-column="false"
            :columns="columns"
            :data="cosmosTxs"
            :loading="loading"
        />
        <div class="flex justify-end">
            <NPagination
                v-model:page="currentPage"
                v-model:page-size="paginationInfo.limit"
                :item-count="Number(totalCount)"
                @update:page="onCurrentPage"
                :page-slot="5"
                :page-sizes="[50, 100]"
                :show-size-picker="false"
            />
        </div>
    </n-space>
</template>
