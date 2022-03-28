<script setup lang="ts">
import { ShareSquare, TelegramPlane, Twitter, Discord } from '@vicons/fa';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
<template>
    <div class="card w-full bg-base-400">
        <div class="card-body py-2">
            <div class="flex flex-row">
                <div class="w-full">
                    <div class="card-title inline-block text-bottom">
                        <span class="tx-xl lg:text-3xl tracking-widest text-base-content"
                            >ATOM</span
                        >
                        <span
                            class="tooltip tooltip-bottom ml-2"
                            :data-tip="t('swap.coinInfo.openWeb')"
                            ><n-icon
                                class="hover:text-primary"
                                :component="ShareSquare"
                                size="18"
                                :depth="3"
                            />
                        </span>
                        <span
                            class="tooltip tooltip-bottom ml-2"
                            :data-tip="t('swap.coinInfo.twitter')"
                        >
                            <n-icon
                                class="hover:text-primary"
                                :component="Twitter"
                                size="18"
                                :depth="3"
                            />
                        </span>
                        <span
                            class="tooltip tooltip-bottom ml-2"
                            :data-tip="t('swap.coinInfo.telegram')"
                        >
                            <n-icon
                                class="hover:text-primary"
                                :component="TelegramPlane"
                                size="18"
                                :depth="3"
                            />
                        </span>
                        <span
                            class="tooltip tooltip-bottom ml-2"
                            :data-tip="t('swap.coinInfo.discord')"
                        >
                            <n-icon
                                class="hover:text-primary"
                                :component="Discord"
                                size="18"
                                :depth="3"
                            />
                        </span>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
                        <div>
                            <div class="text-sm lg:text-sm mt-2 text-neutral-content">{{
                                t('swap.coinInfo.marketCap')
                            }}</div>
                            <div
                                class="text-base-content text-sm md:text-base xl:text-lg tracking-widest"
                                >312,212,212,000,000 UST</div
                            >
                        </div>
                        <div>
                            <div class="text-sm lg:text-sm mt-2">{{
                                t('swap.coinInfo.volume')
                            }}</div>
                            <div
                                class="text-base-content text-sm md:text-base xl:text-lg tracking-widest"
                                >212,212,000 UST</div
                            >
                        </div>
                        <div class="flex mt-2">
                            <div class="mr-4">
                                <div class="text-sm lg:text-sm">{{ t('swap.coinInfo.price') }}</div>
                                <div
                                    class="text-base-content text-sm md:text-base xl:text-lg tracking-widest"
                                    >26.66</div
                                >
                            </div>
                            <div>
                                <div class="text-sm lg:text-sm">{{
                                    t('swap.coinInfo.change')
                                }}</div>
                                <div
                                    class="text-sm md:text-base xl:text-lg tracking-widest text-primary"
                                    >+10.98%</div
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
