import axios from 'axios'

// 
export function getComic(queryString) {
    const url = '/comicProxyApi/comicsum/search.php'
    const data = {
        's': queryString
    }

    return axios(url, {
        params: data
    }).then(res => {
        console.log(res)
        return Promise.resolve(res)
    })
}