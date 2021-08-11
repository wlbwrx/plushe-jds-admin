import request from '@/utils/request';
// 活动配置页面
// 查询
const shopActAllData = (query) => {
    return request({
        url:`/gds/banner/page/list`,
        method: 'get',
        params: query
    })
}
// 新增
const shopActAddData = (query) => {
    return request({
        url:`/gds/banner/add`,
        method: 'post',
        data: query
    })
}
// 编辑
const shopActUpdateData = (query) => {
    return request({
        url:`/gds/banner/baseInfo/${query.id}/update`,
        method: 'put',
        data: query
    })
}
// 删除
const shopActDelData = (query) => {
    return request({
        url:`/gds/banner/${query.id}/delete`,
        method: 'DELETE',
        params: query
    })
}
// 排序
const shopActSortData = (query) => {
    return request({
        url:`/gds/banner/sort/${query.id}/update`,
        method: 'put',
        data: query
    })
}
// 启用/禁用活动
const shopActEnableData = (query) => {
    return request({
        url:`/gds/banner/${query.id}/enable`,
        method: 'put',
        params: query
    })
}
// ----------------------
export default {
    shopActAllData,
    shopActAddData,
    shopActUpdateData,
    shopActDelData,
    shopActSortData,
    shopActEnableData
}