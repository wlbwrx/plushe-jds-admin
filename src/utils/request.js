import axios from 'axios';
import { ElLoading } from 'element-plus';
import { getToken } from '@/utils/auth.js'

let loadingShow = null // 加载loading
const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    baseURL: '/dev' + "/plusheoa/plushe-oa-web", 
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
});
function loading () {
  loadingShow = ElLoading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(255, 255, 255, 0.7)'
  });  
}
// 请求拦截器
service.interceptors.request.use(
    config => {
        if(getToken()){
            // 添加权限请求头
            config.headers['Authorization'] = getToken()
        }
        // if(getPayToken()){
        //     // 添加权限请求头
        //     config.headers['AccessToken'] = getPayToken()
        // }
        loading()
        // console.log(config.url)
        // alert(config.url.includes('/mobile/'))
        // if (config.url.includes('/add') || config.url.includes('/update') || config.url.includes('/apply/') || config.url.includes('/mobile/provider')) {
		// 	config.headers['Content-Type'] = 'application/json;charset=UTF-8'
		// }else{
        //     config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        //     // console.log(config.headers['Content-Type'])
        // }
        // console.log(config)
        return config;
    },
    error => {
        console.log(error.msg || '请求失败，请重新登录');
        return Promise.reject(error.data.msg);
    }
);

// 响应拦截器
service.interceptors.response.use(
    response => {
        loadingShow.close()
        // console.log(response.data)
        if (response.data.code === 0) {
            return response.data;
        } else {
            // Message.error(response.data.respDesc)
            return Promise.reject(response.data.msg);
        }
    },
    error => {
        loadingShow.close()
        // store.dispatch('user/signOut') // 失效了，要清除token
        // router.push({
        //     path: `/login`,
        // })
        return Promise.reject();
    }
);

export default service;