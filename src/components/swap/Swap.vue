<script setup lang="ts">
import { ref } from 'vue';
import KLine from '@/components/kLine/KLine.vue';

const tradeHistory = ref([] as any);
tradeHistory.value = [];

const openAccount = () => {
    window.open(
        'https://finder.extraterrestrial.money/columbus-5/address/terra1y8r363ykn0p7x0p7krcrxzpthl07et9rp4vklf',
        '_blank'
    );
};
const openTx = () => {
    window.open(
        'https://finder.extraterrestrial.money/columbus-5/tx/B55E343A2E4223CFD65AA40A20EFF403496FFA1C223932DB34422DD3FAFD9EEB',
        '_blank'
    );
};
</script>
<template>
    <div>
        <div class="flex flex-row m-4">
            <div class="basis-2/3"
                ><KLine />
                <div class="card w-content h-72 bg-base-200 mt-4 mr-2">
                    <div class="card-body">
                        <h2 class="card-title">Swap</h2>
                    </div>
                </div>
            </div>
            <div class="basis-1/3 grid gap-2 grid-cols-1">
                <div class="card w-full bg-base-200">
                    <div class="card-body">
                        <span>Market Cap</span>
                        <span class="text-primary-content text-xl tracking-widest"
                            >312,212,212,000 USD</span
                        >
                        <span>Volume (24h)</span>
                        <span class="text-primary-content text-xl tracking-widest"
                            >212,212,000 USD</span
                        >
                        <span>Change (24h)</span>
                        <span class="text-primary-content text-xl tracking-widest">+10.98%</span>
                        <!-- <div class="card-actions justify-end">
                            <button class="btn btn-primary">Buy Now</button>
                        </div> -->
                    </div>
                </div>
                <div class="card w-full bg-base-200">
                    <div class="card-body">
                        <h2 class="card-title">Trading History</h2>
                        <div class="overflow-y-auto h-72">
                            <table class="table table-compact w-full">
                                <thead>
                                    <tr class="sticky inset-x-0 top-0 z-50">
                                        <th class="normal-case">Date</th>
                                        <th class="normal-case">Coin Pair</th>
                                        <th class="normal-case">Price(USD)</th>
                                        <th class="normal-case">Trader | tx</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in 12" :key="item">
                                        <th class="text-xs">2022/2/22<br />14:00:99</th>
                                        <td class="text-xs">ATOM 90.04<br />USD 10232</td>
                                        <td class="text-xs">26.66</td>
                                        <td>
                                            <button
                                                @click="openAccount"
                                                class="btn btn-xs btn-outline btn-accent normal-case mr-2"
                                                >trader</button
                                            >
                                            <button
                                                @click="openTx"
                                                class="btn btn-outline btn-accent normal-case btn-xs"
                                                >Tx</button
                                            >
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- <div class="card-actions justify-end">
                            <button class="btn btn-primary">Buy Now</button>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
