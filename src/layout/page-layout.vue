<script setup lang="ts">
import { ref, watch } from 'vue'
import Nav from '@/components/nav/Nav.vue'
import Footer from '@/components/footer/Footer.vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const transition = ['slide-top', 'slide-bottom']
const transitionName = ref(transition[0])

watch(
    () => route.meta.index,
    (newIndex, oldIndex) => {
        if (newIndex > oldIndex) {
            transitionName.value = transition[0]
        } else {
            transitionName.value = transition[1]
        }
    },
)
</script>
<template>
    <div>
        <Nav />
        <div class="min-h-[90vh] p-2 md:p-0">
            <router-view v-slot="{ Component }">
                <transition :name="transitionName" mode="out-in">
                    <keep-alive>
                        <component :is="Component" v-if="route.meta.keepAlive" :key="route.name" />
                    </keep-alive>
                </transition>
                <transition :name="transitionName" mode="out-in">
                    <component :is="Component" v-if="!route.meta.keepAlive" :key="route.name" />
                </transition>
            </router-view>
        </div>
        <Footer />
    </div>
</template>
<style>
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
    will-change: transform;
    transition: all 500ms;
    position: absolute;
}

.slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}

.slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}
/* .slide-left-enter {
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
}
.slide-left-enter-active {
    transition: all 0.5s ease;
}
.slide-left-leave-to {
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
}
.slide-left-leave-active {
    transition: all 0.5s ease;
} */
</style>
