<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { CoinPair } from '@/types/types';
import { getImageSrc } from '@/utils';
import { useMenuStore } from '@/store/menu';

const menuStore = useMenuStore();
const props = defineProps<{
    coinPairList: CoinPair[];
}>();
const coinPairHeader = ref(['Coin Pair', 'Price', 'Market Cap', 'Change(24h)', ' ']);

const openSwap = () => {
    menuStore.setCurrentMenuId('swap');
};
</script>
<template>
    <div
        ><div class="overflow-x-auto w-full">
            <table class="table w-full">
                <!-- head -->
                <thead>
                    <tr>
                        <th class="normal-case" v-for="item in coinPairHeader" :key="item">{{
                            item
                        }}</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- row 1 -->
                    <tr v-for="coin in props.coinPairList" :key="coin.name" class="hover">
                        <td>
                            <div class="flex items-center space-x-3">
                                <div class="avatar">
                                    <div class="mask mask-squircle w-12 h-12">
                                        <img height="20" :src="getImageSrc(coin.icon)" />
                                    </div>
                                </div>
                                <div>
                                    <div class="font-bold">{{ coin.name }}</div>
                                    <div class="text-sm opacity-50">{{ coin.coinPair }}</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div
                                >{{ coin.currentPrice }}
                                <span class="uppercase"> {{ coin.currentPriceUnit }}</span></div
                            >
                        </td>
                        <td
                            >{{ coin.marketCap }}
                            <span class="uppercase"> {{ coin.marketCapUnit }}</span></td
                        >
                        <td
                            class="font-bold"
                            :class="
                                coin.dailyPriceChangeInPercentage > 0
                                    ? 'text-success'
                                    : 'text-error'
                            "
                            >{{
                                coin.dailyPriceChangeInPercentage > 0
                                    ? '+' + coin.dailyPriceChangeInPercentage
                                    : coin.dailyPriceChangeInPercentage
                            }}
                            %</td
                        >
                        <th>
                            <button class="btn btn-outline btn-accent btn-sm" @click="openSwap"
                                >SWAP</button
                            >
                        </th>
                    </tr>
                </tbody>
            </table>
        </div></div
    >
</template>
