<script setup lang="ts">
import type { PropType } from 'vue'
import { Star24Filled, Star24Regular } from '@vicons/fluent'
import { useTokenFavoritesStore } from '@/store/tokenFavorites'
import { CoinPair } from '@/types/types'
import { useMessage } from 'naive-ui'
import { useI18n } from 'vue-i18n'

const props = defineProps({
    favorite: {
        type: Boolean,
        default: false,
    },
    tokenInfo: {
        type: Object as PropType<CoinPair>,
    },
})
const { t } = useI18n()
const tokenFavoritesStore = useTokenFavoritesStore()
const message = useMessage()

// 收藏
const collect = () => {
    tokenFavoritesStore.addTokenToFavorites(props.tokenInfo)
    message.success(t('favorites.collect'))
}

// 取消收藏
const cancel = () => {
    tokenFavoritesStore.removeTokenFromFavorites(props.tokenInfo.tokenId)
    message.success(t('favorites.cancel'))
}
</script>
<template>
    <div>
        <span class="tooltip tooltip-right ml-1 align-middle tooltip-primary" :data-tip="$t('favorites.tips')">
            <n-icon v-if="props.favorite" @click="cancel" :component="Star24Filled" size="24" color="#fceb3c" />
            <n-icon v-else @click="collect" :component="Star24Regular" size="24" />
        </span>
    </div>
</template>
<style scoped></style>
