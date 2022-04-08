export default [
    {
        path: '/tokens',
        name: 'tokens',
        component: () => import(/* webpackChunkName: "tokens" */ '@/views/tokens/index.vue'),
        meta: {
            keepAlive: true,
            icon: '',
        },
    },
    {
        path: '/chart',
        name: 'chart',
        component: () => import(/* webpackChunkName: "chart" */ '@/views/chart/index.vue'),
        meta: {
            keepAlive: true,
            icon: '',
        },
    },
    {
        path: '/subscribe',
        name: 'subscribe',
        component: () => import(/* webpackChunkName: "subscribe" */ '@/views/subscribe/index.vue'),
        meta: {
            keepAlive: true,
            icon: '',
        },
    },
    {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '@/views/about/index.vue'),
        meta: {
            keepAlive: true,
            icon: '',
        },
    },
    {
        path: '/test',
        name: 'test',
        component: () => import(/* webpackChunkName: "test" */ '@/views/test/test.vue'),
        meta: {
            keepAlive: false,
            icon: '',
        },
    },
    {
        path: '/demo',
        name: 'demo',
        component: () => import(/* webpackChunkName: "demo" */ '@/views/demo/demo.vue'),
        meta: {
            keepAlive: false,
            icon: '',
        },
    },
]
