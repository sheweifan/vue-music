const axios = require('axios');

const commonParams = exports.commonParams = {
  g_tk: 1928093487,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}

const qqHeader = exports.qqHeader = {
  referer: 'https://c.y.qq.com/',
  host: 'c.y.qq.com'
}

const request = exports.request = (url,params)=>{
  return axios.get(url, {
    headers: qqHeader,
    params: Object.assign({},commonParams,params)
  })
}


exports.jsonp = (url,params)=>{
  return new Promise((res,rej)=> {
    request(url,params)
      .then((response) => {
        var ret = response.data
        if (typeof ret === 'string') {
          
          // var reg = /^\w+\(({[^()]+})\)$/
          var reg = /\(([^)]*)\)/
          var matches = ret.match(reg)
          if (matches) {
            ret = JSON.parse(matches[1])
          }
          // ret = ret.replace('MusicJsonCallback(', '')
          // ret = ret.substr(0, ret.length-1);
          // ret = JSON.parse(ret)

        }
        res(ret);
      })
      .catch((e) => {
        rej(e);
        console.log(e)
    })
  }) 
}