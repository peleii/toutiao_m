// 用户相关请求模块
import request from '@/utils/request'
// 登录认证
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data: data
  })
}
// 获取验证码
export const sendCode = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
// 获取用户自己的信息
export const getMyInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
  })
}

// 关注用户
export const following = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}
// 取消关注
export const cancelFollowing = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
  })
}
