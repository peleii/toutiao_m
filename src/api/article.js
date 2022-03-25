import requset from '@/utils/request'
export const getChannelsList = () => {
  return requset({
    method: 'GET',
    url: '/v1_0/channels'
  })
}
