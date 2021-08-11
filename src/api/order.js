import request from '@/utils/request';
// 订单列表 /gds/order/page/list
const orderListData = (query) =>{
    return request({
        url: '/gds/order/page/list',
        method: 'get',
        params: query
    })
}
export default{
    orderListData
}