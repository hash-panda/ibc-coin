<script setup lang="ts">
import { reactive } from 'vue'
import CoinPairList from '@/views/tokens/components/CoinPairList.vue'
import { queryTokenStaticStatusListByChain } from '@/api'
import { useTokenFavoritesStore } from '@/store/tokenFavorites'
import { useRequest } from 'vue-request'
import { getImageSrc } from '@/utils'
import { useI18n } from 'vue-i18n'

const tokenFavoritesStore = useTokenFavoritesStore()
const { t } = useI18n()

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
        tokenFavoritesStore.editFavoriteToken(res as any)
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
        tokenFavoritesStore.editFavoriteToken(res as any)
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
        tokenFavoritesStore.editFavoriteToken(res as any)
    },
})

const tokenList = reactive([
    {
        key: 'Crescent',
        name: 'Crescent',
        icon: 'crescent-logo.svg',
        data: crescentList as any,
    },
    {
        key: 'Osmosis',
        name: 'Osmosis',
        icon: 'osmo-logo.svg',
        data: osmoList as any,
    },
    {
        key: 'junoswap',
        name: 'Junoswap',
        icon: 'juno-logo.svg',
        data: junoList as any,
    },
])
</script>
<template>
    <div class="w-full px-2 sm:px-6 md:px-12 lg:px-28 xl:px-64 mt-4">
        <n-tabs type="card" :animated="true" :bar-width="200" display-directive="show">
            <n-tab-pane v-for="item in tokenList" :key="item.key" :name="item.name">
                <template #tab>
                    <n-avatar round :size="18" :src="getImageSrc(item.icon)" :style="{ backgroundColor: 'transparent' }" />
                    <span class="ml-1">{{ item.name }}</span>
                </template>
                <CoinPairList
                    key="Crescent"
                    :coin-pair-list="item.data"
                    :defaultVolumeSortDescend="true"
                    :showChain="false"
                    :showFavorite="false"
                    :showTop="false"
                />
            </n-tab-pane>
            <!-- 自选 favorites -->
            <n-tab-pane name="favorites">
                <template #tab>
                    <n-avatar round :size="18" :src="getImageSrc('favorites.png')" :style="{ backgroundColor: 'transparent' }" />
                    <span class="ml-1">{{ $t('tokens.favorites') }}</span>
                </template>
                <CoinPairList
                    key="favorites"
                    :coin-pair-list="tokenFavoritesStore.favorites"
                    :defaultVolumeSortDescend="false"
                    :showChain="true"
                    :showFavorite="true"
                    :showTop="true"
                />
            </n-tab-pane>
        </n-tabs>
    </div>
</template>
