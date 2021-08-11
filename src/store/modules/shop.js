import http from '@/api/shop'

const shop = {
    state : {
        platform: [] // 储存所有平台信息
    }, 
    mutations: {
        SET_PLATFORM: (state, platformData) => {
            state.platform = platformData
        }
    },
    actions: {
        // 获取所有平台信息，并存到状态里
        getPlatform( {commit} ){
            return new Promise((resolve, reject) => {
                http.platformListData()
                .then( res => {
                    const { data } = res
                    commit('SET_PLATFORM', data)
                    resolve(res)
                })
                .catch(error=> {
                    reject(error)
                })
            })
        }
    }
}

export default shop