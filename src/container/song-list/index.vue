<template lang="pug">
  transition(name="slide")
    div.song-container
      scroll-view(
        ref="page-container"
        :class="'song-container '+ is"
        :watchs="list"
      )
        div
          div.img
            img(v-if="logo" v-lazy="logo")
            span.play-btn(@click="songListPlay(0, true)") 全部播放
          div.song-list
            song-item(
              v-for="(item, index) in list" 
              :key="item.songid" 
              :data="item" 
              @click="songListPlay(index)"
            )
      v-head(fixed="true" :title="nick")
</template>

<script>
  import _map from 'lodash/map'
  import { mapActions } from 'vuex'
  import vHead from '@/components/v-head.vue'
  import songItem from '@/components/song-item.vue'
  import scrollView from '@/components/scroll-view.vue'
  import { getSongList, getSingerDetail, getMusicList } from '@/api'
  import { playMode } from '@/config'
  import { playListMixin } from '@/mixins'
  import { song } from '@/utils'

  const { newSong } = song
  const songFormater = (data) => _map(data, newSong)

  const singerFormater = (data) => _map(data, ({musicData}) => newSong(musicData))

  const rankFormater = (data) => _map(data, ({data}) => newSong(data))

  export default {
    mixins: [playListMixin],
    name: 'song-list',
    components: {
      vHead,
      scrollView,
      songItem
    },
    data() {
      return {
        nick: '',
        logo: '',
        list: [],
        is: ''
      }
    },
    methods: {
      async _getSongList(id){
        const data = await getSongList(id)
        const { success, cdlist } = data
        if (success){
          const { songlist, logo, nick } = cdlist[0]
          this.logo = logo
          this.nick = nick
          this.list = songFormater(songlist)
        }
      },
      async _getSingerDetail(id){
        const { success, data } = await getSingerDetail(id)
        if (success){
          const {list} = data
          this.logo = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
          this.nick = data.singer_name
          this.list = singerFormater(list)
        }
      },
      async _getMusicList(id){
        const {success, songlist, topinfo} = await getMusicList(id)
        // console.log({success, songlist, topinfo})
        if (success){
          this.logo = topinfo.pic_v12
          this.nick = topinfo.ListName
          this.list = rankFormater(songlist)
        }
      },
      songListPlay(index, isall = false){
        if (isall){
          this.listPlay({
            list: this.list,
            mode: playMode.order
          })
        } else {
          this.play({
            list: this.list,
            index
          })
        }
      },
      playListChange(playList){
        this.setOffsetBottom(this.$refs['page-container'].$el)
        this.$refs['page-container'].scroll.refresh()
      },
      ...mapActions([
        'listPlay',
        'play'
      ])
    },
    created(){
      const {path, params} = this.$route
      let is = ''
      if (path.indexOf('recommend') > 0) {
        this._getSongList(params.id)
        is = 'recommend'
      } else if (path.indexOf('singer') > 0) {
        this._getSingerDetail(params.id)
        is = 'singer'
      } else if (path.indexOf('rank') > 0) {
        this._getMusicList(params.id)
        is = 'rank'
      }
      this.is = is
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../static/stylus/index.styl'
  .song-container
    fixed-page()
    .img
      height: 80vw
      overflow: hidden
      position: relative
    .play-btn
      position: absolute
      bottom: $spacing
      width: 200px
      text-align: center
      background-color: $opacityBg
      line-height: 1.5
      padding: $spacing
      color: #fff
      border-radius: $radius
      margin-left: -100px
      left: 50%
  .song-list
    padding: $spacing 0

</style>
