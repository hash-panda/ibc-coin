<script setup lang="ts">
import { computed, onMounted, ref, h, reactive } from 'vue'
import txAction from '@/const/txAction'
import { useRequest } from 'vue-request'
import { queryCosmosTxs } from '@/api'

const paginationInfo = ref({
    limit: 100,
    offset: 0,
})
const currentPage = ref(1)

onMounted(() => {
    fetchCosmosTxs()
    console.log('sssssssssssssend')
})

const columns = computed(() => {
    return [
        {
            title: 'hehe',
            key: 'proposalId',
            width: 110,
            render: row => {
                return h(
                    'div',
                    {},
                    {
                        default: () => {
                            console.log('row', row)
                            return row?.tx?.body?.messages?.[0]?.proposal_id
                        },
                    },
                )
            },
        },
        {
            title: 'voter',
            key: 'voter',
            width: 110,
            render: row => {
                return h(
                    'div',
                    {},
                    {
                        default: () => {
                            console.log('row', row)
                            return row?.tx?.body?.messages?.[0]?.voter
                        },
                    },
                )
            },
        },
        {
            title: 'voteResult',
            key: 'voteResult',
            width: 110,
            render: row => {
                return h(
                    'div',
                    {},
                    {
                        default: () => {
                            console.log('row', row)
                            return row?.tx?.body?.messages?.[0]?.option
                        },
                    },
                )
            },
        },
        {
            title: 'timestamp',
            key: 'timestamp',
            width: 110,
            render: row => {
                return h(
                    'div',
                    {},
                    {
                        default: () => {
                            console.log('row', row)
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

const { data, reload, run, loading } = useRequest(queryCosmosTxs, {
    errorRetryCount: 3,
    loadingDelay: 1500,
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
        action: txAction.Send,
        address: 'cosmos1p2s0gv05xkm2ajrrku4xv2t9e64cvu4tn289zt',
        ...paginationInfo.value,
    }
    run(requestParams)
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
    <div>
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
    </div>
</template>
