// 封装 axios 请求模块

import axios from "axios"
import store from '@/store'

const request = axios.create({ //create会返回一个新的axios对象，axios.create的详细介绍看当日资料中的离线文章
  baseURL: "http://toutiao.itheima.net/" // 基础路径
})

request.interceptors.request.use(
  config => {
    if(store?.state?.user?.token) {
      config.headers['Authorization'] = 'Bearer ' +store.state.user.token
    }

    return config
  },
  err => {
    return Promise.reject(err)
  }
)


export default request