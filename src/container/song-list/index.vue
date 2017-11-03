<template lang="pug">
  transition(name="slide")
    div.song-container
      v-head(fixed="true" :title="nick")
      div.img
        img(v-if="logo" :src="logo")
      ul.song-list
        li(v-for="item in list" :key="item.songid")
          p.name {{item.songname}}
          p.singer {{item.singer}}
        
</template>

<script>
  import { map } from 'lodash'
  import vHead from '@/components/v-head.vue'
  import { getSongList, getSingerDetail, getMusicList } from '@/api'

  const newSong = ({singer, songname, songmid, songid, albumname, albummid, interval}) => {
    return {
      singer: map(singer, item => item.name).join('/'),
      songname,
      songmid,
      songid,
      albumname,
      interval,
      picUrl: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000`,
      url: `http://ws.stream.qqmusic.qq.com/${songid}.m4a?fromtag=46`
    }
  }

  const songFormater = (data) => {
    return map(data, newSong)
  }

  const singerFormater = (data) => {
    return map(data, ({musicData}) => newSong(musicData))
  }

  const rankFormater = (data) => {
    return map(data, ({data}) => newSong(data))
  }

  export default {
    name: 'song-list',
    components: {
      vHead
    },
    data: function(){
      return {
        nick: '',
        logo: '',
        list: []
      }
    },
    methods: {
      _getSongList: async function(id){
        const data = await getSongList(id)
        const { success, cdlist } = data
        if (success){
          const { songlist, logo, nick } = cdlist[0]
          this.logo = logo
          this.nick = nick
          this.list = songFormater(songlist)
        }
      },
      _getSingerDetail: async function(id){
        const { success, data } = await getSingerDetail(id)
        if (success){
          const {list} = data
          this.logo = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
          this.nick = data.singer_name
          this.list = singerFormater(list)
        }
      },
      _getMusicList: async function(id){
        const {success, songlist, topinfo} = await getMusicList(id)
        console.log({success, songlist, topinfo})
        if (success){
          this.logo = topinfo.pic_v12
          this.nick = topinfo.ListName
          this.list = rankFormater(songlist)
        }
      }
    },
    created: function(){
      const {path, params} = this.$route
      if (path.indexOf('recommend') > 0) {
        this._getSongList(params.id)
      } else if (path.indexOf('singer') > 0) {
        this._getSingerDetail(params.id)
      } else if (path.indexOf('rank') > 0) {
        this._getMusicList(params.id)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../static/stylus/index.styl'
  .song-container
    fixed-page()
    &::-webkit-scrollbar {
      display: none
    }
    .img
      height: 100vw
      overflow: hidden
  
  .song-list
    padding: $spacing 0
    li
      padding: $spacing
      position: relative
      &:after
        sethalfborderbottom()
        left: $spacing
        right: $spacing
    .name
      font-size: $fontSize
      lin-height: 2
      color: #333
      margin-bottom: ($spacing/2)
      ellipsis()
    .singer
      font-size: ($fontSize*0.8)
      lin-height: 1.5
      color: #999
      ellipsis()

</style>
