import axios from 'axios'

// trace.moe(图像识别)
export function getTrace (queryUrl) {
    const url = '/traceProxyApi'
    const data = {
      anilistInfo :'',
      url : queryUrl,
    }
  
    return axios(url, {
      params: data
    }).then(res => {
      console.log(res)
      return Promise.resolve(res)
    })
  }