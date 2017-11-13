export const newSinger = item => ({
  id: item.Fsinger_mid,
  title: item.Findex,
  name: item.Fsinger_name,
  imgUrl: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
})
