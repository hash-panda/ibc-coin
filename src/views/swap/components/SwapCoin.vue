<script setup lang="ts">
import { ArrowAutofitHeight20Filled } from '@vicons/fluent';
</script>
<template>
    <div class="card w-content h-72 bg-base-200 mt-4 mr-2">
        <div class="card-body flex justify-center">
            <div class="flex items-center justify-center">
                <n-icon
                    :component="ArrowAutofitHeight20Filled"
                    class="hover:text-primary"
                    size="60"
                    :depth="2"
                />
                <div class="basis-1/2 mx-5">
                    <n-space vertical :size="20">
                        <n-card title="From" size="small">
                            <n-input-number size="large" :show-button="false" v-model:value="value">
                                <template #suffix> ATOM </template>
                            </n-input-number>
                        </n-card>
                        <n-card title="To" size="small">
                            <n-input-number size="large" :show-button="false" v-model:value="value">
                                <template #suffix> UST </template>
                            </n-input-number>
                        </n-card>
                    </n-space>
                </div>
                <div class="basis-1/2 pl-10 pr-2">
                    <div class="h-62">
                        <div class="flex justify-between items-center mb-1">
                            <span class="mr-4">Price: </span>
                            <span class="text-primary-content text-base tracking-widest"
                                >26.66 UST</span
                            >
                        </div>
                        <div class="flex justify-between items-center mb-1">
                            <span class="mr-4">Min received: </span>
                            <span class="text-primary-content text-base tracking-widest">88</span>
                        </div>
                        <div class="flex justify-between items-center mb-1">
                            <span class="mr-4">Tx fee: </span>
                            <span class="text-primary-content text-base tracking-widest">-</span>
                        </div>
                        <div class="flex justify-between items-center mb-2">
                            <span class="mr-4">DEX used: </span>
                            <span class="text-primary-content text-base tracking-widest"
                                >OSIMOS</span
                            >
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="mr-4">Slippage: </span>
                            <span class="text-primary-content text-base tracking-widest"
                                ><div class="btn-group">
                                    <input
                                        type="radio"
                                        name="options"
                                        data-title="0.5%"
                                        class="btn btn-xs"
                                    />
                                    <input
                                        type="radio"
                                        name="options"
                                        data-title="1%"
                                        class="btn btn-xs"
                                        checked
                                    />
                                    <input
                                        type="radio"
                                        name="options"
                                        data-title="4%"
                                        class="btn btn-xs"
                                    /> </div
                            ></span>
                        </div>

                        <button class="btn btn-block mt-5">Wallet Not Connected</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
