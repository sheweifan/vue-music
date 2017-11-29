const config = require('./config');
const commonParams = config.commonParams
const options = config.options
const jsonp = config.jsonp

const getSingerList = exports.getSingerList = function (req, res) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const params = Object.assign({}, req.query ? req.query : {}, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })

  jsonp(url, params)
    .then(data=>res.json(data))
};


const getSingerDetail = exports.getSingerDetail = function (req, res) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const params = Object.assign({}, req.query ? req.query : {}, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 80,
    songstatus: 1,
    // singermid: singerId
  })

  jsonp(url, params)
    .then(data=>res.json(data))
};

