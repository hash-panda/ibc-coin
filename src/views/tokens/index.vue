<script setup lang="ts">
import { reactive } from 'vue'
import CoinPairList from '@/views/tokens/components/CoinPairList.vue'
import { queryTokenStaticStatusListByChain } from '@/api'
import { useRequest } from 'vue-request'

const { data: crescentList } = useRequest(queryTokenStaticStatusListByChain, {
    defaultParams: [{ chain: 'crescent' }],
    errorRetryCount: 5,
    pollingInterval: 1000 * 15,
    pollingWhenHidden: false,
    manual: false,
    onError: error => {
        console.log('queryTokenStaticStatusListByChain (⊙︿⊙) something error', error)
    },
    onSuccess: res => {
        console.log('queryTokenStaticStatusListByChain ✿✿ヽ(°▽°)ノ✿ success', res)
    },
})
const { data: osmoList } = useRequest(queryTokenStaticStatusListByChain, {
    defaultParams: [{ chain: 'osmosis' }],
    errorRetryCount: 5,
    pollingInterval: 1000 * 15,
    pollingWhenHidden: false,
    manual: false,
    onError: error => {
        console.log('queryTokenStaticStatusListByChain (⊙︿⊙) something error', error)
    },
    onSuccess: res => {
        console.log('queryTokenStaticStatusListByChain ✿✿ヽ(°▽°)ノ✿ success', res)
    },
})
const { data: junoList } = useRequest(queryTokenStaticStatusListByChain, {
    defaultParams: [{ chain: 'juno' }],
    errorRetryCount: 5,
    pollingInterval: 1000 * 15,
    pollingWhenHidden: false,
    manual: false,
    onError: error => {
        console.log('queryTokenStaticStatusListByChain (⊙︿⊙) something error', error)
    },
    onSuccess: res => {
        console.log('queryTokenStaticStatusListByChain ✿✿ヽ(°▽°)ノ✿ success', res)
    },
})

const tokenList = reactive([
    {
        key: 'Crescent',
        name: 'crescent',
        data: crescentList as any,
    },
    {
        key: 'Osmosis',
        name: 'osmosis',
        data: osmoList as any,
    },
    {
        key: 'JunoSwap',
        name: 'junoswap',
        data: junoList as any,
    },
])
</script>
<template>
    <div class="w-full px-2 lg:px-36 xl:px-72 mt-4">
        <n-tabs type="card" :animated="true" :bar-width="200">
            <n-tab-pane v-for="item in tokenList" :key="item.key" :name="item.name">
                <template #tab>
                    {{ item.key }}
                </template>
                <CoinPairList key="Crescent" :coin-pair-list="item.data" />
            </n-tab-pane>
        </n-tabs>
    </div>
</template>
