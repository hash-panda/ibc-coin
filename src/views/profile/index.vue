<script setup lang="ts">
import { computed, onMounted } from 'vue'
import txAction from '@/const/txAction'
import { usePagination } from 'vue-request'
import { queryCosmosTxs } from '@/api'

const { data, run, current, totalPage, loading, pageSize } = usePagination(queryCosmosTxs, {
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

const fetchCosmosTxs = () => {
    const requestParams = {
        action: txAction.Vote,
        address: 'cosmos1p2s0gv05xkm2ajrrku4xv2t9e64cvu4tn289zt',
    }
    run(requestParams)
}

const cosmosTxs = computed(() => data.value?.['items'] || [])

onMounted(() => {
    fetchCosmosTxs()
})

const columns = computed(() => {
    return [
        {
            title: 'col1',
            key: 'txHash',
            width: 110,
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
