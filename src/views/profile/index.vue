<script setup lang="ts">
import { computed, onMounted, ref, h, reactive } from 'vue'
import txAction from '@/const/txAction'
import { useRequest } from 'vue-request'
import { queryCosmosTxs } from '@/api'

const allTxActions = computed(() => {
    return Object.keys(txAction).map(v => {
        return {
            value: v,
            label: v,
        }
    })
})
const actionDefault = computed(() => {
    return allTxActions.value?.[0].value
})
const paginationReactive = reactive({
    page: 1,
    pageSize: 1,
    itemCount: 1,
    showSizePicker: true,
    pageSizes: [10, 20, 50, 100],
    onChange: page => {
        paginationReactive.page = page
    },
    onUpdatePageSize: pageSize => {
        paginationReactive.pageSize = pageSize
        paginationReactive.page = 1
    },
})
const paginationInfo = ref({
    limit: 2,
    offset: 0,
})
const currentPage = ref(1)
const { data, reload, run, loading } = useRequest(queryCosmosTxs, {
    errorRetryCount: 3,
    loadingDelay: 1500,
    manual: true,
    cacheKey: 'queryCosmosTxs',
    cacheTime: 300000, // 5 minutes
    staleTime: 300000, // 5 minutes
    onError: error => {
        console.log('queryCosmosTxs (⊙︿⊙) something error', error)
    },
    onSuccess: (res: any) => {
        paginationReactive.itemCount = res?.pagination.total
    },
})

const fetchCosmosTxs = () => {
    const requestParams = {
        action: txAction.Vote,
        address: 'cosmos1p2s0gv05xkm2ajrrku4xv2t9e64cvu4tn289zt',
        ...paginationInfo.value,
    }
    run(requestParams)
}

const cosmosTxs = computed(() => {
    return data.value?.['items'] || []
})
const totalCount = computed(() => {
    console.log(data.value?.['pagination']?.total)
    return data.value?.['pagination']?.total || 0
})
const onCurrentPage = value => {
    console.log('vvvvvvvvvvvvvale', value)
    if (value <= 1) {
        paginationInfo.value.offset = 0
    } else {
        paginationInfo.value.offset = (value - 1) * paginationInfo.value.limit
    }
    fetchCosmosTxs()
}
onMounted(() => {
    fetchCosmosTxs()
})

const columns = computed(() => {
    return [
        {
            title: 'col1',
            key: 'body.messages.@type',
            width: 110,
            render: row => {
                return h(
                    'div',
                    {},
                    {
                        default: () => {
                            console.log('row', row)
                            return row?.body?.messages?.[0]?.proposal_id
                        },
                    },
                )
            },
        },
    ]
})
</script>
<template>
    <div class="m-5">
        <n-grid cols="3" x-gap="20" y-gap="20" item-responsive>
            <n-grid-item span="3 1024:1"></n-grid-item>
            <n-grid-item span="3 1024:2">
                <n-space vertical size="large">
                    <n-radio-group v-model:value="actionDefault" name="actionRadio" size="large">
                        <n-radio-button v-for="action in allTxActions" :key="action.value" :value="action.value">
                            {{ action.label }}
                        </n-radio-button>
                    </n-radio-group>
                    <n-data-table
                        ref="table"
                        :paginate-single-page="false"
                        :pagination="paginationReactive"
                        :bordered="false"
                        :bottom-bordered="true"
                        :single-column="false"
                        :columns="columns"
                        :data="cosmosTxs"
                        :loading="loading"
                    />
                    <!-- <div class="flex justify-end">
                        <NPagination
                            v-model:page="currentPage"
                            v-model:page-size="paginationInfo.limit"
                            :item-count="Number(totalCount)"
                            @update:page="onCurrentPage"
                            :page-slot="5"
                            :page-sizes="[10, 20, 50, 100]"
                            show-size-picker
                        />
                    </div> -->
                </n-space>
            </n-grid-item>
        </n-grid>
    </div>
</template>
