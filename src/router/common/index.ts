export const commonRouter = [
    {
        path: '/',
        name: '首页态势概览',
        component: () => import('@/views/dashboard/index.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/views/About.vue')
    }
]
