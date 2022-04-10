<script setup lang="ts">
import { computed } from 'vue'
import iCosmosDAOLogo from '@/assets/images/iCosmosDAO.jpeg'
import defi100Logo from '@/assets/images/defi100.png'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const partners = computed(() => {
    return [
        {
            icon: defi100Logo,
            name: 'DeFi100',
            desc: t('partner.defi100.desc'),
        },
        {
            icon: iCosmosDAOLogo,
            name: 'iCosmosDAO',
            desc: t('partner.iCosmosDAO.desc'),
        },
    ]
})
</script>
<template>
    <div class="container px-5 lg:px-20 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-20">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4">
                {{ $t('partner.title') }}
            </h1>
            <!-- <p class="lg:w-2/3 mx-auto leading-relaxed text-base"></p> -->
            <div class="flex mt-6 justify-center">
                <div class="w-16 h-1 rounded-full bg-green-500 inline-flex"></div>
            </div>
        </div>
        <div class="flex flex-wrap -m-2">
            <div v-for="(item, index) in partners" :key="index" class="p-2 lg:w-1/2 md:w-1/2 w-full">
                <div class="h-full flex items-center border-gray-100 border-opacity-60 border hover:border-primary p-4 rounded-lg">
                    <img alt="partner" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" :src="item.icon" />
                    <div class="flex-grow">
                        <h2 class="title-font font-medium">
                            {{ item.name }}
                        </h2>
                        <p class="opacity-60">{{ item.desc }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
