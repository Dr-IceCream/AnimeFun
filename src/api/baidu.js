import axios from 'axios'

// 百度百科(通过一铭API获得的)
export function getBaiduBaike(queryString) {
    const url = '/yimingProxyApi/dub'
    const data = {
        't': queryString
    }

    return axios(url, {
        params: data
    }).then(res => {
        console.log(res)
        return Promise.resolve(res)
    })
}