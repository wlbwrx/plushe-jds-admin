import request from '@/utils/request';

// 查询所有的品牌
const platformListData = () =>{
    return request({
        url: '/gds/shop/conf/all/list',
        method: 'get',
    })
}
// 品牌配置
const shopListData = (query) =>{
    return request({
        url: '/gds/shop/page/list',
        method: 'get',
        params: query
    })
}
// 新增品牌
const addShopData = (query) => {
    return request({
        url: '/gds/shop/add',
        method: 'post',
        data: query
    })
}
// 查询所有的平台和店铺 二级联动数据
const platformShopData = () => {
    return request({
        url: '/gds/shop/all/list',
        method: 'get'
    })
}
// 启用/禁用
const platformEablepData = (query) => {
    return request({
        url: `/gds/shop/${query.id}/enable`,
        method: 'put',
        params:query
    })
}
// 删除品牌
const platformDeleteData = (query) => {
    return request({
        url: `/gds/shop/${query.id}/delete`,
        method: 'DELETE',
        params:query
    })
}
// 更新品牌信息
const platformUpdateData = (query) => {
    return request({
        url: `/gds/shop/baseInfo/${query.id}/update`,
        method: 'put',
        data:query
    })
}
// 品牌配置排序
const platformSortData = (query) => {
    return request({
        url: `/gds/shop/sort/${query.id}/update`,
        method: 'put',
        params:query
    })
}
// 分享人佣金配置
const shopShareAllData = (query) => {
    return request({
        url: '/gds/share/shop/page/list',
        method: 'get',
        params: query
    })
}
// 分享佣金配置新增
const shopShareAddData = (query) => {
    return request({
        url: '/gds/share/shop/add',
        method: 'post',
        data: query
    })
}
// 分享佣金配置删除
const shopShareDelData = (query) => {
    return request({
        url: `/gds/share/shop/${query.id}/delete`,
        method: 'DELETE',
        params: query
    })
}
// 分享佣金配置修改
const shopShareUpdateData = (query) => {
    return request({
        url:`/gds/share/shop/${query.id}/update`,
        method: 'put',
        data: query
    })
}
// ------------



// 分享文案配置
// 查询
const shopTextAllData = (query) => {
    return request({
        url:`/gds/share/doc/template/pageQuery`,
        method: 'get',
        params: query
    })
}
// 新增
const shopTextAddData = (query) => {
    return request({
        url:`/gds/share/doc/template/batchAdd`,
        method: 'post',
        data: query
    })
}
// 编辑
const shopTextUpdateData = (query) => {
    return request({
        url:`/gds/share/doc/template/${query.id}/update`,
        method: 'put',
        data: query
    })
}
// 删除
const shopTextDelData = (query) => {
    return request({
        url:`/gds/share/doc/template/${query.id}/delete`,
        method: 'DELETE',
        params: query
    })
}
// ----------------------
export default {
    platformListData,
    shopListData,
    addShopData,
    platformShopData,
    platformEablepData,
    platformDeleteData,
    platformUpdateData,
    platformSortData,
    shopShareAllData,
    shopShareAddData,
    shopShareDelData,
    shopShareUpdateData,
    shopTextAllData,
    shopTextAddData,
    shopTextUpdateData,
    shopTextDelData
}