import axios from 'axios'

const prefix = 'http://vmusicapi.duapp.com'

// recommend
export function getRecommend(){
  const url = prefix + '/api/getRecommend'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getDiscList(){
  const url = prefix + '/api/getDiscList'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSongList(disstid){
  const url = prefix + '/api/getSongList'
  return axios.get(url, {
    params: {
      disstid
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// rank
export function getTopList(){
  const url = prefix + '/api/getTopList'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getMusicList(topid){
  const url = prefix + '/api/getMusicList'
  return axios.get(url, {
    params: {
      topid
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// search
export function getHotKey(){
  const url = prefix + '/api/getHotKey'
  return axios.get(url, {
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function search(query, page, zhida, perpage = 20){
  const url = prefix + '/api/search'
  return axios.get(url, {
    params: {
      w: query,
      p: page,
      perpage,
      n: perpage,
      catZhida: zhida ? 1 : 0
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// singer
export function getSingerList(){
  const url = prefix + '/api/getSingerList'
  return axios.get(url, {
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSingerDetail(singermid){
  const url = prefix + '/api/getSingerDetail'
  return axios.get(url, {
    params: {
      singermid
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// singer
export function getLyric(songmid){
  const url = prefix + '/api/getLyric'
  return axios.get(url, {
    params: {
      songmid
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
