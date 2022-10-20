import axios from 'axios'

export function getBingImages(queryString) {
    const url = "/bingProxyApi/v7.0/images/search";
    return axios.get(url, {
        headers: {
            "Ocp-Apim-Subscription-Key": "ab9742f156ac4718b62b751d89496976"
        },
        params: {
            q: queryString,
            mkt: "zh-CN"
        }
    }).then(res => {
        console.log(res);
        return Promise.resolve(res);
    });
}
