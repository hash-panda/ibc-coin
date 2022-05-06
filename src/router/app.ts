export default [
    {
        path: '/',
        name: 'tokens',
        component: () => import('@/views/tokens/index.vue'),
        meta: {
            keepAlive: true,
            icon: '',
        },
    },

    // {
    //     path: '/chart/:chain?/:token?',
    //     name: 'chart',
    //     component: () => import('@/views/chart/index.vue'),
    //     props: true,
    //     meta: {
    //         keepAlive: true,
    //         customizeTitle: true,
    //         icon: '',
    //     },
    // },
    // {
    //     path: '/bcre',
    //     name: 'bcre',
    //     component: () => import('@/views/chart/index.vue'),
    //     meta: {
    //         keepAlive: false,
    //         customizeTitle: true,
    //         tokenId: 'ffba0708-f5d6-4d30-9e5e-c6d07e590a86',
    //         chain: 'crescent',
    //         icon: '',
    //     },
    // },
    // {
    //     path: '/cre',
    //     name: 'cre',
    //     component: () => import('@/views/chart/index.vue'),
    //     meta: {
    //         keepAlive: false,
    //         customizeTitle: true,
    //         tokenId: '40c1a926-8911-4733-a0b9-249fa3697118',
    //         chain: 'crescent',
    //         icon: '',
    //     },
    // },
    // {
    //     path: '/mntl',
    //     name: 'mntl',
    //     component: () => import('@/views/chart/index.vue'),
    //     meta: {
    //         keepAlive: false,
    //         customizeTitle: true,
    //         tokenId: 'b6313a80-a2a9-4e7c-a1bb-d074d42b31e9',
    //         chain: 'osmosis',
    //         icon: '',
    //     },
    // },
    // {
    //     path: '/evmos',
    //     name: 'evmos',
    //     component: () => import('@/views/chart/index.vue'),
    //     meta: {
    //         keepAlive: false,
    //         customizeTitle: true,
    //         tokenId: '8936c299-d01c-432d-90fa-1ff4222a83e3',
    //         chain: 'evmos',
    //         icon: '',
    //     },
    // },

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
        path: '/history',
        name: 'history',
        component: () => import('@/views/fullTradingHistory/index.vue'),
        beforeEnter: (to, from) => {
            return { name: 'fullTradingHistory', params: { token: 'atom', chain: 'osmosis' } }
        },
        meta: {
            keepAlive: false,
            icon: '',
        },
    },
    {
        path: '/:token',
        name: 'chartToken',
        component: () => import('@/views/chart/index.vue'),
        beforeEnter: (to, from) => {
            const soloUrl = [
                {
                    token: 'cre',
                    chain: 'crescent',
                },
                {
                    token: 'bcre',
                    chain: 'crescent',
                },
                {
                    token: 'mntl',
                    chain: 'osmosis',
                },
                {
                    token: 'evmos',
                    chain: 'evmos',
                },
            ]
            const index = soloUrl.findIndex(v => v.token === to.params.token)
            if (index >= 0) {
                return { name: 'chart', params: { token: soloUrl[index].token, chain: soloUrl[index].chain } }
            } else {
                return { path: '/' }
            }
        },
        meta: {
            keepAlive: false,
            icon: '',
        },
    },
    {
        path: '/:chain/:token',
        name: 'chart',
        component: () => import('@/views/chart/index.vue'),
        props: true,
        meta: {
            keepAlive: true,
            customizeTitle: true,
            icon: '',
        },
    },
    {
        path: '/:chain/:token/history',
        name: 'fullTradingHistory',
        component: () => import('@/views/fullTradingHistory/index.vue'),
        props: true,
        meta: {
            keepAlive: false,
            icon: '',
        },
    },
]
