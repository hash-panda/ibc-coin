export default [
    {
        path: '/tokens',
        name: 'tokens',
        component: () => import('@/views/tokens/index.vue'),
        meta: {
            keepAlive: true,
            icon: '',
        },
    },
    {
        path: '/chart',
        name: 'chart',
        component: () => import('@/views/chart/index.vue'),
        meta: {
            keepAlive: true,
            icon: '',
        },
    },
    {
        path: '/subscribe',
        name: 'subscribe',
        component: () => import('@/views/subscribe/index.vue'),
        meta: {
            keepAlive: true,
            icon: '',
        },
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/views/about/index.vue'),
        meta: {
            keepAlive: true,
            icon: '',
        },
    },
    {
        path: '/full-trading-history',
        name: 'fullTradingHistory',
        component: () => import('@/views/fullTradingHistory/index.vue'),
        meta: {
            keepAlive: false,
            icon: '',
        },
    },
]
