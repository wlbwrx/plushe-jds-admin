const sideBars = [
    {
        name: '数据',
        path: 'home',
        icon: 'el-icon-data-line',
        redirect: 'home',
        subs: [
            {
                name: "分享统计",
                path: 'home',
                icon: 'allocation',
            }
        ]
    },
    {
        name: '配置',
        path: 'allocation',
        icon: 'el-icon-setting',
        subs:[
            {
                name: '品牌配置',
                path: 'allocationPin',
                icon: 'allocation',
            },
            {
                name: '品牌分享佣金配置',
                path: 'allocationShare',
                icon: 'allocation',
            },
            {
                name: '分享文案配置',
                path: 'allocationText',
                icon: 'allocation',
            },
            {
                name: '品牌活动配置',
                path: 'allocationAct',
                icon: 'allocation',
            },
            {
                name: '培训配置',
                path: 'allocationApp',
                icon: 'allocation',
            },
            {
                name: '高佣分类配置',
                path: 'allocationYjin',
                icon: 'allocation'
            },
        ]
    },
    {
        name: '订单',
        path: 'order',
        icon: 'el-icon-shopping-cart-full',
        subs: [
            {
                name: '订单列表',
                path: 'orderList',
                icon: 'allocation',
            }
        ]
    },
    // {
    //     name: '统计',
    //     path: 'statistical',
    //     icon: 'el-icon-data-line',
    //     subs: [
    //         {
    //             name: '按照品类统计',
    //             path: 'statisCategory',
    //             icon: 'allocation',
    //         },
    //         {
    //             name: '按照商品统计',
    //             path: 'statisProduct',
    //             icon: 'allocation',
    //         }
    //     ]
    // },
    {
        name: '用户信息',
        path: 'personalinfo',
        icon: 'el-icon-user',
        subs: [
            {
                name: '用户列表',
                path: 'personalList',
                icon: 'allocation',
            }
        ]
    },
    {
        name: '提现',
        path: 'withdrawal',
        icon: 'el-icon-money',
        subs: [
            {
                name: '提现列表',
                path: 'drawalList',
                icon: 'allocation',
            }
        ]
    }
]

export default sideBars