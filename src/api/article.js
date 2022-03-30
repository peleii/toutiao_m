import requset from '@/utils/request'
// 获取用户频道列表
export const getUserChannelsList = () => {
  return requset({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}
// 获取推荐文章
export const getArticleList = (params) => {
  return requset({
    method: 'GET',
    url: '/v1_0/articles',
    params: params
  })
}
// 获取所有频道列表
export const getAllChannelsList = () => {
  return requset({
    method: 'GET',
    url: '/v1_0/channels'
  })
}
// 设置用户的频道（部分覆盖）
export const setUserChannels = (channel) => {
  return requset({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}
// 删除指定用户频道
export const deleteUserChannels = (channelid) => {
  return requset({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelid}`
  })
}
