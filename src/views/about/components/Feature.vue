<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const features = computed(() => {
    return [
        {
            icon: '',
            title: t('feature.f1.title'),
            desc: t('feature.f1.desc'),
        },
        {
            icon: '',
            title: t('feature.f2.title'),
            desc: t('feature.f2.desc'),
        },
        {
            icon: '',
            title: t('feature.f3.title'),
            desc: t('feature.f3.desc'),
        },
    ]
})
</script>
<template>
    <div class="container px-5 py-24 mx-auto">
        <div class="text-center mb-20">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4">
                {{ $t('feature.title') }}
            </h1>
            <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">
                {{ $t('feature.desc') }}
            </p>
            <div class="flex mt-6 justify-center">
                <div class="w-16 h-1 rounded-full bg-green-500 inline-flex"></div>
            </div>
        </div>
        <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
            <div v-for="(item, index) in features" :key="index" class="p-4 md:w-1/3 flex flex-col text-center items-center">
                <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-5 flex-shrink-0">
                    <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-10 h-10"
                        viewBox="0 0 24 24"
                    >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                </div>
                <div class="flex-grow">
                    <h2 class="text-lg title-font text-primary font-medium mb-3">{{ item.title }}</h2>
                    <p class="leading-relaxed text-base opacity-60">
                        {{ item.desc }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
