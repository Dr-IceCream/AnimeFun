import axios from 'axios'

// 唯品会商品信息
export function getVipInfo(keyword) {
    const url = "/dingdanxiaProxyApi/vip/query";
    return axios
      .get(url, {
        params: {
          apikey: "5H6GNMqLAIt2EcVd1qOZOEOULS0LXBUw",
          keyword: keyword,
          page: "1"
        }
      })
      .then(res => {
        console.log(res)
        return Promise.resolve(res)
      });
  }
  