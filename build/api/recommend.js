const {commonParams, options, jsonp} = require('./config');

const getRecommend = exports.getRecommend = function (req, res) {
  var url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
  const params = Object.assign({}, req.query ? req.query : {}, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  jsonp(url, params)
    .then(data=>res.json(data))
};

const getDiscList = exports.getDiscList = function (req, res) {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  const params = Object.assign({}, req.query ? req.query : {}, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })
  jsonp(url, params)
    .then(data=>res.json(data))
};

const getSongList = exports.getSongList = function (req, res) {
  var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
  const params = Object.assign({}, req.query ? req.query : {}, {
    // disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
  })
  jsonp(url, params)
    .then(data=>res.json(data))
};
