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
            chain: 'crescent',
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
            chain: 'crescent',
            icon: '',
        },
    },
    {
        path: '/mntl',
        name: 'mntl',
        component: () => import('@/views/chart/index.vue'),
        meta: {
            keepAlive: false,
            customizeTitle: true,
            tokenId: 'b6313a80-a2a9-4e7c-a1bb-d074d42b31e9',
            chain: 'osmosis',
            icon: '',
        },
    },
    {
        path: '/evmos',
        name: 'evmos',
        component: () => import('@/views/chart/index.vue'),
        meta: {
            keepAlive: false,
            customizeTitle: true,
            tokenId: '8936c299-d01c-432d-90fa-1ff4222a83e3',
            chain: 'evmos',
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
