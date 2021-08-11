import request from '@/utils/request';
// 分享数据统计
const shareData = (query) =>{
    return request({
        url: '/gds/share/monitor/page/list',
        method: 'get',
        params: query
    })
}

// 邀请成员统计
const memberData = (query) =>{
    return request({
        url: '/gds/share/monitor/member',
        method: 'get',
        params: query
    })
}

export default {
    shareData,
    memberData
}