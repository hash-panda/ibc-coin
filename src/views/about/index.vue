<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Roadmap from './components/Roadmap.vue'
import Feature from './components/Feature.vue'
import Partner from './components/Partner.vue'
import Faq from './components/Faq.vue'
import Donation from './components/Donation.vue'
import { LOCALE_OPTIONS } from '@/locales'
import useLocale from '@/hooks/locale'
import { useAppStore } from '@/store/app'
import { themeChange } from 'theme-change'

const topRef = ref(null)
const featureRef = ref(null)
const roadmapRef = ref(null)
const partnerRef = ref(null)
const faqRef = ref(null)
const donationRef = ref(null)
const appStore = useAppStore()
const { changeLocale } = useLocale()

onMounted(() => {
    themeChange(false)
})

const locale = computed(() => {
    const currentLocale = LOCALE_OPTIONS.find(item => item.value === appStore.locale)
    changeLocale(currentLocale.value)
    return currentLocale
})

const scrollTop = () => {
    topRef.value.scrollIntoView({ block: 'start', behavior: 'smooth' })
}

const scrollToFeature = () => {
    featureRef.value.scrollIntoView({ block: 'start', behavior: 'smooth' })
}

const scrollToRoadmap = () => {
    roadmapRef.value.scrollIntoView({ block: 'start', behavior: 'smooth' })
}

const scrollToPartner = () => {
    partnerRef.value.scrollIntoView({ block: 'start', behavior: 'smooth' })
}

const scrollToFaq = () => {
    faqRef.value.scrollIntoView({ block: 'start', behavior: 'smooth' })
}

const scrollToDonation = () => {
    donationRef.value.scrollIntoView({ block: 'start', behavior: 'smooth' })
}

const setLocale = () => {
    appStore.setLocale()
}

const changeTheme = () => {
    appStore.changeTheme(!appStore.isDark)
}
</script>

<template>
    <div id="top" ref="topRef" class="text-base-content">
        <!-- <ul class="menu bg-base-100 border border-0 border-l-2 border-l-primary p-2 w-32 fixed top-32 right-5 z-50">
            <li @click="scrollTop">
                <a class="hover:text-primary">{{ $t('header.menu.top') }}</a>
            </li>
            <li @click="scrollToFeature">
                <a class="hover:text-primary">{{ $t('header.menu.feature') }}</a>
            </li>
            <li @click="scrollToRoadmap">
                <a class="hover:text-primary">{{ $t('header.menu.roadmap') }}</a>
            </li>
            <li @click="scrollToPartner">
                <a class="hover:text-primary">{{ $t('header.menu.partner') }}</a>
            </li>
            <li @click="scrollToFaq">
                <a class="hover:text-primary">{{ $t('header.menu.faq') }}</a>
            </li>
            <li @click="scrollToDonation">
                <a class="hover:text-primary">{{ $t('header.menu.donation') }}</a>
            </li>
        </ul> -->
        <n-anchor affix :trigger-top="100" :top="100" class="fixed right-2 md:right-10 z-20 bg-base-100" ignore-gap>
            <n-anchor-link :title="$t('header.menu.top')" href="#top" />
            <n-anchor-link :title="$t('header.menu.feature')" href="#feature" />
            <n-anchor-link :title="$t('header.menu.roadmap')" href="#roadmap" />
            <n-anchor-link :title="$t('header.menu.partner')" href="#partner" />
            <n-anchor-link :title="$t('header.menu.faq')" href="#faq" />
            <n-anchor-link :title="$t('header.menu.donation')" href="#donation" />
        </n-anchor>
        <!-- banner -->
        <section class="body-font">
            <div class="container mx-auto flex flex-col items-center justify-center px-5 pt-14 pb-24">
                <img class="mb-10 w-5/6 rounded object-cover object-center md:w-1/2 lg:w-1/2" alt="ibcCoin" src="@/assets/images/banner.png" />
                <div class="w-full text-center lg:w-2/3">
                    <h1 class="title-font mb-4 text-3xl font-medium sm:text-4xl">
                        {{ $t('banner.title') }}
                    </h1>
                    <p class="mb-8 leading-relaxed">
                        {{ $t('banner.desc') }}
                    </p>
                    <div class="flex justify-center">
                        <button @click="scrollToFeature" class="btn btn-outline ml-4">
                            {{ $t('banner.learnMore') }}
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- feature -->
        <section id="feature" ref="featureRef" class="body-font">
            <Feature />
        </section>

        <!-- roadmap -->
        <section id="roadmap" ref="roadmapRef" class="body-font">
            <Roadmap />
        </section>

        <!-- partner -->
        <section id="partner" ref="partnerRef" class="body-font">
            <Partner />
        </section>

        <!-- FAQ -->
        <section id="faq" ref="faqRef" class="body-font overflow-hidden">
            <Faq />
        </section>

        <!-- Donation -->
        <section id="donation" ref="donationRef" class="body-font">
            <Donation />
        </section>
    </div>
</template>
