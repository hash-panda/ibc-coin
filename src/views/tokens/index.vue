<script setup lang="ts">
import { reactive } from 'vue'
import CoinPairList from '@/views/tokens/components/CoinPairList.vue'
import { queryTokenStaticStatusListByChain } from '@/api'
import { useRequest } from 'vue-request'
import { getImageSrc } from '@/utils'

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
        icon: 'crescent-logo.svg',
        data: crescentList as any,
    },
    {
        key: 'Osmosis',
        name: 'osmosis',
        icon: 'osmo-logo.svg',
        data: osmoList as any,
    },
    {
        key: 'JunoSwap',
        name: 'junoswap',
        icon: 'juno-logo.svg',
        data: junoList as any,
    },
])
</script>
<template>
    <div class="w-full px-2 sm:px-6 md:px-12 lg:px-36 xl:px-72 mt-4">
        <n-tabs type="card" :animated="true" :bar-width="200" display-directive="show">
            <n-tab-pane v-for="item in tokenList" :key="item.key" :name="item.name">
                <template #tab>
                    <n-avatar round :size="18" :src="getImageSrc(item.icon)" :style="{ backgroundColor: 'transparent' }" />
                    <span class="ml-1">{{ item.key }}</span>
                </template>
                <CoinPairList key="Crescent" :coin-pair-list="item.data" />
            </n-tab-pane>
        </n-tabs>
    </div>
</template>
