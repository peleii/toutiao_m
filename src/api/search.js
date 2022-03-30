import requset from '@/utils/request'
export const getSuggest = (q) => {
  return requset({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }

  })
}
export const getResult = (params) => {
  return requset({
    method: 'GET',
    url: '/v1_0/search',
    params: params
  })
}
