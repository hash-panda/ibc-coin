import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: '',
        component: () => import('@/views/home/home.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/home.vue')
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('@/views/test/test.vue')
    },
    {
        path: '/demo',
        name: 'demo',
        component: () => import('@/views/demo/demo.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('@/views/404/404')
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
