import axios from 'axios';
import store from '@/store'; // 引入 Vuex
// import router from '@/router'; // 引入 Vue Router
import { Message } from 'element-ui'; //错误提示

const request = axios.create({
    timeout: 5000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json',
    }
});

// 请求拦截器
request.interceptors.request.use(
    config => {
        // 在请求发送之前，从vuex或localstorage中获取token
        const token = store.state.token;
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('请求拦截器---config---',config)
        return config;
    },
    error => {
        // 处理请求错误
        return Promise.reject(error);
    }
);

// 响应拦截器
request.interceptors.response.use(
    response => {
        // 处理响应数据
        console.log('响应拦截器---',response)
        if(response.data.code === 401){
            //当返回数据的状态码为401时，表示无权限
            //此时清除原有token并跳转到登录界面，并且携带当前页面的重定向路径
            store.commit('clearToken')
            // router.push({ path: '/Login', query: { redirect: router.currentRoute.fullPath } });

            //提示用户当前无权限
            Message.error('您尚未登录，若想访问更多信息请联系管理员！');

            return Promise.reject(new Error(response.message || '无权限'));
        }
        return response.data;
    },
    error => {
        console.log('网络错误---',error)
        return Promise.reject(error);
    }
);

export default request;
