import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import PageLayout from '@/layout/page-layout.vue'
import appRoutes from './app'
import { useTitle } from '@vueuse/core'

const routes: Array<RouteRecordRaw> = [
    {
        name: 'root',
        path: '/',
        component: PageLayout,
        children: appRoutes,
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('@/views/test/test.vue'),
        meta: {
            keepAlive: false,
            icon: '',
        },
    },
    {
        path: '/testDefineExpose',
        name: 'testDefineExpose',
        component: () => import('@/views/test/testDefineExpose.vue'),
        meta: {
            keepAlive: false,
            icon: '',
        },
    },
    {
        path: '/demo',
        name: 'demo',
        component: () => import('@/views/demo/demo.vue'),
        meta: {
            keepAlive: false,
            icon: '',
        },
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/',
        // name: '404',
        // component: () => import('@/views/404/404.vue'),
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.afterEach((to, from, next) => {
    //遍历meta改变title
    if (to.meta.customizeTitle) {
    } else {
        useTitle('Data Analysis of Cosmos Ecosystem - IBCcoin.org')
    }
    window.scrollTo(0, 0)
})

export default router
