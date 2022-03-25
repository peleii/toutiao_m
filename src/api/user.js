// 用户相关请求模块
import requset from '@/utils/request'
// 登录认证
export const login = (data) => {
  return requset({
    method: 'POST',
    url: '/v1_0/authorizations',
    data: data
  })
}
// 获取验证码
export const sendCode = (mobile) => {
  return requset({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
// 获取用户自己的信息
export const getMyInfo = () => {
  return requset({
    method: 'GET',
    url: '/v1_0/user'
  })
}
