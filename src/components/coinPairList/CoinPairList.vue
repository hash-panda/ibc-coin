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
                        <th
                            class="normal-case"
                            :class="
                                item === 'Change(24h)' || item === ' ' ? 'hidden sm:table-cell' : ''
                            "
                            v-for="item in coinPairHeader"
                            :key="item"
                            >{{ item }}</th
                        >
                    </tr>
                </thead>
                <tbody>
                    <!-- row 1 -->
                    <tr v-for="coin in props.coinPairList" :key="coin.name" class="hover">
                        <td class="p-2 md:p-4">
                            <div class="flex items-center sm:space-x-3">
                                <div class="avatar hidden sm:table-cell">
                                    <div class="mask mask-squircle w-6 h-6 md:w-12 md:h-12">
                                        <img :src="getImageSrc(coin.icon)" />
                                    </div>
                                </div>
                                <div>
                                    <div class="font-bold link link-hover" @click="openSwap">{{
                                        coin.name
                                    }}</div>
                                    <div class="text-sm opacity-50">{{ coin.coinPair }}</div>
                                </div>
                            </div>
                        </td>
                        <td class="p-2 md:p-4">
                            <div
                                >{{ coin.currentPrice }}
                                <!-- <span class="uppercase"> {{ coin.currentPriceUnit }}</span> -->
                                <span class="uppercase"> UST</span>
                            </div>
                            <div
                                ><div
                                    class="font-bold md:hidden"
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
                                    %</div
                                ></div
                            >
                        </td>
                        <td class="p-2 md:p-4"
                            >{{ coin.marketCap }}
                            <!-- <span class="uppercase"> {{ coin.marketCapUnit }}</span> -->
                            <span class="uppercase"> UST</span>
                        </td>
                        <td
                            class="p-2 md:p-4 font-bold hidden md:table-cell"
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
                        <th class="hidden sm:table-cell">
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
