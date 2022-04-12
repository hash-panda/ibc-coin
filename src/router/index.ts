import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import PageLayout from '@/layout/page-layout.vue'
import appRoutes from './app'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: 'tokens',
    },
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
        name: '404',
        component: () => import('@/views/404/404'),
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
