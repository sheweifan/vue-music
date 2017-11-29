const recommend = require('./recommend');
const rank = require('./rank');
const search = require('./search');
const singer = require('./singer');
const song = require('./song');

module.exports = (apiRoutes)=>{
  // recommend
  apiRoutes.get('/getRecommend', recommend.getRecommend)
  apiRoutes.get('/getDiscList', recommend.getDiscList)
  apiRoutes.get('/getSongList', recommend.getSongList)

  // rank
  apiRoutes.get('/getTopList', rank.getTopList)
  apiRoutes.get('/getMusicList', rank.getMusicList)

  // search
  apiRoutes.get('/getHotKey', search.getHotKey)
  apiRoutes.get('/search', search.search)


  //singer
  apiRoutes.get('/getSingerList', singer.getSingerList)
  apiRoutes.get('/getSingerDetail', singer.getSingerDetail)

  //singer
  apiRoutes.get('/getLyric', song.getLyric)
  
}