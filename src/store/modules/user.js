// import allRoutes from '@/router/routes';
import http from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth.js'

const user = {
    state: {
        token: getToken(),
        routes: [],  //路由列表用于展示
        
    },
    mutations:{
        // set_routes: (state, routes) => {
        //     // state.routes = allRoutes.contact(routes)
        //     console.log(state, allRoutes.contact(routes))
        // },
        SET_TOKEN: (state, token) => {
            setToken(token)
            state.token = token
        }
    },
    actions:{
        // 账号登录
        login({ commit }, params) {
            return new Promise((resolve, reject) => {
                http.loginData(params)
                .then(response=> {
                    const { data } = response
                    commit('SET_TOKEN', data.token) // 设置token
                    resolve()
                })   
                .catch(error => {
                    reject(error)
                })
            })
        },
        // 退出登录
        loginOut({ commit } ){
            return new Promise(resolve => {
                commit('SET_TOKEN', '');
                removeToken();
                resolve();
            });
        },

    }
}
export default user