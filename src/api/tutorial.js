import request from '@/utils/request';
// 活动配置页面
// 查询
const shopTutorialAllData = (query) => {
    return request({
        url:`/gds/tutorial/list`,
        method: 'get',
        params: query
    })
}
// 新增
const shopTutorialAddData = (query) => {
    return request({
        url:`/gds/tutorial/add`,
        method: 'post',
        data: query
    })
}
// 编辑
const shopTutorialUpdateData = (query) => {
    return request({
        url:`/gds/tutorial/${query.id}/update`,
        method: 'put',
        data: query
    })
}
// 删除
const shopTutorialDelData = (query) => {
    return request({
        url:`/gds/tutorial/${query.id}/delete`,
        method: 'DELETE',
        params: query
    })
}
// 启用/禁用活动
const shopTutorialEnableData = (query) => {
    return request({
        url:`/gds/tutorial/${query.id}/enable`,
        method: 'put',
        params: query
    })
}
// ----------------------
export default {
    shopTutorialAllData,
    shopTutorialAddData,
    shopTutorialUpdateData,
    shopTutorialDelData,
    shopTutorialEnableData
}