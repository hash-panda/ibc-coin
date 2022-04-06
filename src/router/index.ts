import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import PageLayout from '@/layout/page-layout.vue'
import appRoutes from './app'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: '',
        component: () => import('@/views/home/home.vue'),
    },
    {
        name: 'root',
        path: '/',
        component: PageLayout,
        children: appRoutes,
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
