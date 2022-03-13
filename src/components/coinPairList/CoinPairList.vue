<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { CoinPair } from '@/types/types';

const props = defineProps<{
    coinPairList: CoinPair[];
}>();
const coinPairHeader = ref(['Coin Pair', 'Price', 'MarketCap', '24h', ' ']);
</script>
<template>
    <div
        ><div class="overflow-x-auto w-full">
            <table class="table w-full">
                <!-- head -->
                <thead>
                    <tr>
                        <th v-for="item in coinPairHeader" :key="item">{{ item }}</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- row 1 -->
                    <tr v-for="coin in props.coinPairList" :key="coin.name" class="hover">
                        <td>
                            <div class="flex items-center space-x-3">
                                <div class="avatar">
                                    <div class="mask mask-squircle w-12 h-12">
                                        <img height="20" :src="coin.icon" />
                                    </div>
                                </div>
                                <div>
                                    <div class="font-bold">{{ coin.name }}</div>
                                    <div class="text-sm opacity-50">{{ coin.coinPair }}</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div>{{ coin.price }} {{ coin.priceUnit }}</div>
                        </td>
                        <td>{{ coin.marketCap }} {{ coin.marketCapUnit }}</td>
                        <td>{{ coin.h24 }}</td>
                        <th>
                            <button class="btn btn-outline btn-secondary btn-sm">SWAP</button>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div></div
    >
</template>
