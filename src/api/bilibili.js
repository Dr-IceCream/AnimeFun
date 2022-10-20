import axios from 'axios'

// 默认搜索词
export function getSearchDefaultWords () {
  const url = '/bilibiliProxyApi/x/web-interface/search/default'

  return axios.get(url).then(res => {
    return Promise.resolve(res)
  })
}

// 搜索热词
export function getHotWords () {
  const url = 'https://s.search.bilibili.com/main/hotword'

  return axios.get(url).then(res => {
    return Promise.resolve(res)
  })
}
// 分区视频
export function getRegion (ps, rid) {
  const url = '/bilibiliProxyApi/x/web-interface/dynamic/region'
  const data = {
    rid
  }
  if (ps >= 0) data.ps = ps
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res)
  })
}

// 搜索提示词
export function getSuggest (query) {
  const url = '/bilibiliProxyApi/suggest'
  const data = {
    'term': query,
  }

  return axios.get(url, {
    params: data
  }).then(res => {
    console.log(res)
    //console.log(res.data)
    //console.log(res.data[0].name)
    return Promise.resolve(res)
  })
}

// 搜索结果列表
export function getResultList (keyword, page, pagesize) {
  const url = '/bilibiliProxyApi/x/web-interface/search/all/v2'
  const data = {
    keyword,
    page,
    pagesize
  }

  return axios(url, {
    params: data
  }).then(res => {
    console.log(res)
    return Promise.resolve(res)
  })
}

// 搜索结果列表排序方式
export function getResultTypeList (keyword, page, pagesize, type) {
  const url = '/bilibiliProxyApi/x/web-interface/search/type'
  const data = {
    keyword,
    page,
    pagesize,
    order: type,
    search_type: 'video'
  }

  return axios(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res)
  })
}

