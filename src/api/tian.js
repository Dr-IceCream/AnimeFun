import axios from 'axios'

// 天行数据动漫资讯（关键词搜索）
export function getSpecificAnimeNews(queryString) {
    const url = '/tianProxyApi/dongman/index'
    const data = {
        'key': "becefbc81886df8747e0a5df9b3eb9a1",
        'num': 10,
        'rand': 1,
        'word': queryString
    }
    return axios(url, {
        params: data
    }).then(res => {
        console.log(res)
        return Promise.resolve(res)
    })
}

// 天行数据动漫资讯(随机获取所有类型)
export function getAnimeNews() {
    const url = '/tianProxyApi/dongman/index'
    const data = {
        'key': "becefbc81886df8747e0a5df9b3eb9a1",
        'num': 10,
        'rand': 1,
    }
    return axios(url, {
        params: data
    }).then(res => {
        console.log(res)
        return Promise.resolve(res)
    })
}