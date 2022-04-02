import request from '@/utils/request'
// 获取用户频道列表
export const getUserChannelsList = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}
// 获取推荐文章
export const getArticleList = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params: params
  })
}
// 获取所有频道列表
export const getAllChannelsList = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}
// 设置用户的频道（部分覆盖）
export const setUserChannels = (channel) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}
// 删除指定用户频道
export const deleteUserChannels = (channelid) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelid}`
  })
}
// 获取文章详情
export const getArticleDetail = (articleId) => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${articleId}`
  })
}
// 收藏文章
export const collectArticle = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}
// 取消收藏
export const cancelCollect = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}
// 点赞文章
export const likingArticle = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target
    }
  })
}
// 取消点赞文章
export const cancelLiking = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${target}`
  })
}
// 获取评论
export const getComments = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}
// 点赞评论
export const likingComment = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}
// 取消评论文章
export const cancelLikingComment = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${target}`
  })
}
// 发布评论
export const publishComment = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
