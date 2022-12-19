import request from '@/utils/request'

// 获取频道下文章列表数据
export function loadArticleList(params) {
  return request({
    url: '/v1_0/articles',
    params
  })
}
