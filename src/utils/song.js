import _map from 'lodash/map'

export const newSong = ({singer, songname, songmid, songid, albumname, albummid, interval}) => {
  return {
    singer: _map(singer, item => item.name).join('/'),
    songname,
    songmid,
    songid,
    albumname,
    interval,
    picUrl: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/${songid}.m4a?fromtag=46`
  }
}
