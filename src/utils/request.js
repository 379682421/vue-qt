import axios from 'axios'
import { MessageBox , Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'


// 创建一个axios实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
    config => {

        if(store.getters.token){
            config.headers['X-Token'] = getToken();
        }
        
        return config
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;
        
        // 错误码
        switch(res.code){
            // 50008:非法令牌;50012:已登录其他客户端;50014:令牌过期;
            case 50008:
            case 50012:
            case 50014:
                // to re-login
                MessageBox.confirm('您已经登出，您可以取消停留在此页面，或再次登录', 'Confirm logout', {
                    confirmButtonText: '重新登录',
                    type: 'warning'
                }).then(() => {
                    // store.dispatch('user/resetToken').then(() => {
                    //     location.reload()
                    // })
                })
                break;
            default:
                return res;
        }

    },
    error => {
        console.log('err' + error);
        Message({
            message:error.message,
            type:'error',
            duration: 5000
        })
    }
)

export default service
