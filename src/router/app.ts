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
            customizeTitle: true,
            icon: '',
        },
    },
    {
        path: '/bcre',
        name: 'bcre',
        component: () => import('@/views/chart/index.vue'),
        meta: {
            keepAlive: false,
            customizeTitle: true,
            tokenId: 'ffba0708-f5d6-4d30-9e5e-c6d07e590a86',
            icon: '',
        },
    },
    {
        path: '/cre',
        name: 'cre',
        component: () => import('@/views/chart/index.vue'),
        meta: {
            keepAlive: false,
            customizeTitle: true,
            tokenId: '40c1a926-8911-4733-a0b9-249fa3697118',
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
