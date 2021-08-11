import Home from '@/views/home/index.vue';
// 定义路由配置
const routeSlide = [
    {
        path: '/',
        name: '首页',
        redirect: 'home',
        component: Home,
        children: [
            {
                path: 'home',
                name: '监测',
                meta: {
                    title : '监测'
                },
                component: () => import('@/views/homeIn')
            },
            {
                path: 'allocationShare',
                name: '品牌分享佣金配置',
                meta: {
                    title : '品牌分享佣金配置'
                },
                component: () => import('@/views/allocation/allocationShare')
            },
            {
                path: 'allocationApp',
                name: '培训配置',
                meta: {
                    title : '培训配置'
                },
                component: () => import('@/views/allocation/allocationApp')
            },
            {
                path: 'allocationPin',
                name: '品牌配置',
                meta: {
                    title : '品牌配置'
                },
                component: () => import('@/views/allocation/allocationPin')
            },
            {
                path: 'allocationText',
                name: '分享文案配置',
                meta: {
                    title : '分享文案配置'
                },
                component: () => import('@/views/allocation/allocationText')
            },
            {
                path: 'allocationAct',
                name: '品牌活动配置',
                meta: {
                    title : '品牌活动配置'
                },
                component: () => import('@/views/allocation/allocationAct')
            },
            // 高佣分类配置
            {
                path: 'allocationYjin',
                name: '高佣分类列表',
                meta: {
                    title : '高佣分类列表'
                },
                component: () => import('@/views/allocation/allocationYjin/commissionList')
            },
            {
                path: 'commissionPro',
                name: '关联高佣商品',
                meta: {
                    title : '关联高佣商品'
                },
                component: () => import('@/views/allocation/allocationYjin/commissionPro')
            },
            {
                path: 'commissionSee',
                name: '查看高佣商品',
                meta: {
                    title : '查看高佣商品'
                },
                component: () => import('@/views/allocation/allocationYjin/commissionSee')
            },
            {
                path: 'commissionSet',
                name: '设置高佣比例',
                meta: {
                    title : '设置高佣比例'
                },
                component: () => import('@/views/allocation/allocationYjin/commissionSet')
            },
            // 订单列表
            {
                path: 'orderList',
                name: '订单列表',
                meta: {
                    title : '订单列表'
                },
                component: () => import('@/views/order/orderList')
            },
            // 统计页面
            // {
            //     path: 'statisCategory',
            //     name: '按照品类统计',
            //     meta: {
            //         title : '按照品类统计'
            //     },
            //     component: () => import('@/views/statistical/CategoryList')
            // },
            // {
            //     path: 'statisProduct',
            //     name: '按照商品统计',
            //     meta: {
            //         title : '按照商品统计'
            //     },
            //     component: () => import('@/views/statistical/ProductList')
            // },
            // 用户列表
            {
                path: 'personalList',
                name: '用户列表',
                meta: {
                    title : '用户列表'
                },
                component: () => import('@/views/personalinfo/personalList')
            },
            // 提现页面
            {
                path: 'drawalList',
                name: '提现列表',
                meta: {
                    title : '提现列表'
                },
                component: () => import('@/views/withdrawal/drawalList')
            },
        ]
    },
    {
        path: '/login',
        name: '登录页面',
        component: () => import('@/views/login/login'), 
    }
]
export default routeSlide