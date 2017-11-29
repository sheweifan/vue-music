const config = require('./config');
const commonParams = config.commonParams
const options = config.options
const jsonp = config.jsonp

const getHotKey = exports.getHotKey = function (req, res) {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';
   const params = Object.assign({}, req.query ? req.query : {}, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })
  jsonp(url, params)
    .then(data=>res.json(data))
};

const search = exports.search = function (req, res) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp';

  const params = Object.assign({}, req.query ? req.query : {}, {
    // w: query,
    // p: page,
    // perpage,
    // n: perpage,
    // catZhida: zhida ? 1 : 0,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    remoteplace: 'txt.mqq.all',
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })
  
  jsonp(url, params)
    .then(data=>res.json(data))
};
