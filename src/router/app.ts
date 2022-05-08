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
        path: '/account/:address',
        name: 'account',
        component: () => import('@/views/profile/account/account.vue'),
        props: true,
        meta: {
            keepAlive: false,
            icon: '',
        },
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue'),
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
