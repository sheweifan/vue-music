var {
  getRecommend,
  getDiscList,
  getSongList
} = require('./recommend');
var {
  getTopList,
  getMusicList,
} = require('./rank');
var {
  getHotKey,
  search,
} = require('./search');
var {
  getSingerList,
  getSingerDetail,
} = require('./singer');
var {
  getLyric,
} = require('./song');

module.exports = (apiRoutes)=>{
  // recommend
  apiRoutes.get('/getRecommend', getRecommend)
  apiRoutes.get('/getDiscList', getDiscList)
  apiRoutes.get('/getSongList', getSongList)

  // rank
  apiRoutes.get('/getTopList', getTopList)
  apiRoutes.get('/getMusicList', getMusicList)

  // search
  apiRoutes.get('/getHotKey', getHotKey)
  apiRoutes.get('/search', search)


  //singer
  apiRoutes.get('/getSingerList', getSingerList)
  apiRoutes.get('/getSingerDetail', getSingerDetail)

  //singer
  apiRoutes.get('/getLyric', getLyric)
  
}