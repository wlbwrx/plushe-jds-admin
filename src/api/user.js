import request from '@/utils/request';

// 登录接口
const loginData = (query) =>{
    return request({
        url: '/oa/login',
        method: 'post',
        // headers:{
        //     "Authorization": getLoginType() + ' ' +   getToken(),
        //     "Content-Type": "application/x-www-form-urlencoded"
        // },
        data: query
    })
}
// 分销客用户列表信息 /gds/gds/user/list
const userListData = (query) => {
    return request({
        url: '/gds/user/list',
        method: 'get',
        params:query
    })
}
// 查看用户详情
const userDetailData = (query) => {
    return request({
        url: '/gds/user/userInfo',
        method: 'get',
        params: query
    })
}

// 提现接口列表
const withDrawData = (query) => {
    return request({
        url: '/gds/withdraw/list',
        method: 'post',
        data: query
    })
}
// 查询提现信息
const withDrawIdData = (query) => {
    return request({
        url: '/gds/withdraw/id',
        method: 'post',
        data: query
    })
}
// 提现通过
const withDrawPassData = (query) => {
    return request({
        url: '/gds/withdraw/pass',
        method: 'post',
        data: query
    })
}
// 退出登录接口

export default{
    loginData,
    userListData,
    userDetailData,
    withDrawData,
    withDrawIdData,
    withDrawPassData
}