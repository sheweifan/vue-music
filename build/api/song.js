const {commonParams, options, jsonp} = require('./config');

const getLyric = exports.getLyric = function (req, res) {
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

  const params = Object.assign({}, req.query ? req.query : {}, {
    // songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  })

  jsonp(url, params)
    .then(data=>res.json(data))
};

