<script setup lang="ts">
import Nav from '@/components/nav/Nav.vue'
import Footer from '@/components/footer/Footer.vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
</script>
<template>
    <div>
        <Nav />
        <div class="content">
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component" v-if="route.meta.keepAlive" :key="route.name" />
                </keep-alive>
                <component :is="Component" v-if="!route.meta.keepAlive" :key="route.name" />
            </router-view>
        </div>
        <div class="footer">
            <Footer />
        </div>
    </div>
</template>
