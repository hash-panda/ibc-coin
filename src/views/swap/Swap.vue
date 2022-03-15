<script setup lang="ts">
import { ref } from 'vue';
import KLine from '@/components/kLine/KLine.vue';
import { ArrowAutofitHeight20Filled } from '@vicons/fluent';

const tradeHistory = ref([] as any);
const value = ref(0);
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
                <div class="card w-content h-80 bg-base-200 mt-4 mr-2">
                    <div class="card-body flex justify-center">
                        <!-- <h2 class="card-title">Swap</h2> -->
                        <div class="flex items-center justify-center">
                            <n-icon :component="ArrowAutofitHeight20Filled" size="60" :depth="1" />
                            <div class="basis-1/2 mx-5">
                                <n-space vertical>
                                    <n-card title="From" size="small">
                                        <n-input-number
                                            size="large"
                                            :show-button="false"
                                            v-model:value="value"
                                        >
                                            <template #suffix> ATOM </template>
                                        </n-input-number>
                                    </n-card>
                                    <n-card title="To" size="small">
                                        <n-input-number
                                            size="large"
                                            :show-button="false"
                                            v-model:value="value"
                                        >
                                            <template #suffix> USD </template>
                                        </n-input-number>
                                    </n-card>
                                </n-space>
                            </div>
                            <div class="basis-1/2 pl-10 pr-2">
                                <div class="h-52">
                                    <div class="flex justify-between items-center mb-2">
                                        <span class="mr-4">Price: </span>
                                        <span class="text-primary-content text-lg tracking-widest"
                                            >26.66 USD</span
                                        >
                                    </div>
                                    <div class="flex justify-between items-center mb-2">
                                        <span class="mr-4">Min received: </span>
                                        <span class="text-primary-content text-lg tracking-widest"
                                            >88</span
                                        >
                                    </div>
                                    <div class="flex justify-between items-center mb-2">
                                        <span class="mr-4">Tx fee: </span>
                                        <span class="text-primary-content text-lg tracking-widest"
                                            >-</span
                                        >
                                    </div>
                                    <div class="flex justify-between items-center mb-2">
                                        <span class="mr-4">DEX used: </span>
                                        <span class="text-primary-content text-lg tracking-widest"
                                            >OSIMOS</span
                                        >
                                    </div>
                                    <button class="btn btn-block mt-5">Wallet Not Connected</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="basis-1/3 grid gap-2 grid-cols-1">
                <div class="card w-full bg-base-300">
                    <div class="card-body">
                        <h1 class="card-title text-primary-content tracking-widest">ATOM</h1>
                        <span>Market Cap</span>
                        <span class="text-primary-content text-lg tracking-widest"
                            >312,212,212,000 USD</span
                        >
                        <span>Volume (24h)</span>
                        <span class="text-primary-content text-lg tracking-widest"
                            >212,212,000 USD</span
                        >
                        <div class="flex">
                            <div class="mr-4">
                                <div>Price</div>
                                <div class="text-primary-content text-lg tracking-widest"
                                    >26.66</div
                                >
                            </div>
                            <div>
                                <div>Change (24h)</div>
                                <div class="text-lg tracking-widest text-accent">+10.98%</div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Trading Hisotry -->
                <div class="card w-full bg-base-300">
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
