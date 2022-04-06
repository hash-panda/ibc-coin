export default [
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/home.vue'),
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/views/about/about.vue'),
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('@/views/test/test.vue'),
    },
    {
        path: '/demo',
        name: 'demo',
        component: () => import('@/views/demo/demo.vue'),
    },
]
