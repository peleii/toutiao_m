import axios from 'axios'
import store from '@/store'
const requset = axios.create({
  baseURL: 'http://toutiao.itheima.net'

})
// 请求拦截器
// 添加一个请求拦截
// eslint-disable-next-line no-unused-expressions
requset.interceptors.request.use(function (config) {
  // 请求发起会经过这里
  // config:配置对象，本次请求的配置对象
  console.log(config)
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 注意：这里必须要return config 否则请求停在这里出不去
  return config
// eslint-disable-next-line no-sequences
}), function (err) {
  // 如果请求出错了（还没有发出去）会进入这里
  return Promise.reject(err)
}
export default requset
