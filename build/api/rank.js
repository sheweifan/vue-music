const {commonParams, options, jsonp} = require('./config');

const getTopList = exports.getTopList = function (req, res) {
  var url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg';

  const params = Object.assign({}, req.query ? req.query : {}, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  jsonp(url, params)
    .then(data=>res.json(data))
};

const getMusicList = exports.getMusicList = function (req={}, res={}) {
  var url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  const params = Object.assign({}, req.query ? req.query : {}, {
    // topid,
    needNewCode: 1,
    uin: 0,
    tpl: 3,
    page: 'detail',
    type: 'top',
    platform: 'h5'
  })
  

  jsonp(url, req.query||{})
    .then(data=>res.json(data))
};

