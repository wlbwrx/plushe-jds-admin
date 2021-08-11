import request from '@/utils/request';
// 高佣分类配置页面
// 查询
const shopHightCmsAllData = (query) => {
    return request({
        url:`/gds/share/product/countForShop`,
        method: 'get',
        params: query
    })
}
// 查看分享商品列表
const shopHightCmsAddData = (query) => {
    return request({
        url:`/gds/share/product/page/list`,
        method: 'get',
        params: query
    })
}
// 分页查询所有的商品列表
const shopHightCmsUpdateData = (query) => {
    return request({
        url:`/gds/share/product/pageCond`,
        method: 'post',
        data: query
    })
}
// 批量绑定商品接口
const shopWithSpuData = (query) => {
    return request({
        url:`/gds/share/product/add`,
        method: 'post',
        data: query
    })
}
// 批量设置分享佣金设置比例
const shopCmsLotRate = (query) => {
    return request({
        url:`/gds/share/product/update/cmsRate`,
        method: 'put',
        data: query
    })
    
}
// 解除关联接口
const shopCmsRemoveData = (query) => {
    return request({
        url:`/gds/share/product/remove`,
        method: 'post',
        data: query
    })
    
}
// ----------------------
export default {
    shopHightCmsAllData,
    shopHightCmsAddData,
    shopHightCmsUpdateData,
    shopWithSpuData,
    shopCmsLotRate,
    shopCmsRemoveData
}