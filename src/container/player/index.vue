<template lang="pug">
  div(v-show="playList.length>0")
    screenAnimate(img="playerImg")
      div.player-container(v-show="playScreen")
        div.player-head
          span.player-back(@click="hide")
          p.title {{playSong.songname}}
          p.name {{playSong.singer}}
        div.player-body
          audio(
            ref="audio"
            :src="playSong.url"
            @play="audioPlay"
            @error="error"
            @timeupdate="timeupdate"
            @ended="ended"
          )
          div.inner
            div#playerImg.img(ref="playerImg")
              img(:class="(playing ? 'play' : 'pause')" :src="playSong.picUrl")
            scrollView.lyric#player-lyric(ref="lyric")
              div.lyric-list
                p.lyric-item(v-if="lyric.length === 0") 正在获取歌词
                p(
                  v-else
                  v-for="(item, index) in lyric"
                  :class="(lyricIndex===index) ? 'lyric-item active' : 'lyric-item'"
                  :ket="index"
                ) {{item.txt}}
        div.player-control
          div.player-range
            span.start {{ nowTime | songTime }}
            vue-slider(
              ref="range"
              class="range"
              v-model="nowTime" 
              :min="0" 
              :max="playSong.interval" 
              :tooltip="false"
              :height="3" 
              :dot-size="20"
              :process-style="{background:'#01b37e'}"
              :clickable="true" 
              @drag-start="rangeDragStart"
              @drag-end="rangeDragEnd"
              @callback="rangeChange"
            )
            span.end {{ playSong.interval | songTime }}
          div.inner
            icon.player-icon(:name="modeIcon" @click="modeChange")
            div(:class="audioReady ? 'plays ready': 'plays' ")
              icon.player-icon(name="icon-3" @click="prev")
              icon.player-icon.play(:name="playIcon" @click="togglePlay")
              icon.player-icon(name="icon-2" @click="next")
            icon(:class=" 'player-icon ' + ( isCollected(playSong) ? 'active' : '' ) " name="icon-10" @click="toggleCollect(playSong)")
    transition(name="slideTop")
      div.player-mini(v-show="!playScreen" @click="show")
        div.progress
          div.inner(:style="'width:'+ (nowTime/playSong.interval*100) +'%'")
        div(:class="'img '+ (playing ? 'play' : 'pause')")
          img(:src="playSong.picUrl")
        div.info
          p.title {{playSong.songname}}
          p.name {{playSong.singer}}
        div.btns
          i(@click.stop="togglePlay")
            icon.player-icon(:name="playIcon")
          i(@click.stop="setPlayListChecking(true)")
            icon.player-icon(name="icon-9")

</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import vueSlider from 'vue-slider-component'
  import { Toast } from 'mint-ui'
  import _isEqual from 'lodash/isEqual'
  import _findLastIndex from 'lodash/findLastIndex'
  import icon from '@/components/icon'
  import scrollView from '@/components/scroll-view'
  import { getLyric } from '@/api'
  import { playMode } from '@/config'
  import { base642Lyric } from '@/utils'
  import screenAnimate from './screen-animate'
  import { collectMixin } from '@/mixins'

  export default {
    mixins: [collectMixin],
    name: 'player',
    components: {
      icon,
      scrollView,
      screenAnimate,
      vueSlider
    },
    filters: {
      // 时间戳转mm:ss格式
      songTime(val){
        let m = parseInt(val / 60)
        let s = parseInt(val % 60)
        m = m < 10 ? '0' + m : m
        s = s < 10 ? '0' + s : s
        return m + ':' + s
      }
    },
    data(){
      return {
        // 音频准备就绪
        audioReady: false,
        // 现在播放进度时间戳
        nowTime: 0,
        lyric: []
      }
    },
    computed: {
      // 拿到播放的icon
      playIcon(){
        return this.playing ? 'icon-4' : 'icon-1'
      },
      // 拿到模式的icon
      modeIcon(){
        const nowMode = this.playMode

        if (nowMode === playMode.order){
          return 'icon-6'
        }

        if (nowMode === playMode.random){
          return 'icon-8'
        }

        if (nowMode === playMode.loop){
          return 'icon-5'
        }
      },
      lyricIndex(){
        const nowTime = this.nowTime
        const lyric = this.lyric
        let idx = _findLastIndex(lyric, function(item, index){
          return nowTime > item.time
        })
        return Math.max(0, idx)
      },
      ...mapGetters([
        'playList',
        'playIndex',
        'playMode',
        'playScreen',
        'playSong',
        'playing',
        'playListChecking'
      ])
    },
    created(){
      // 黑科技
      const f = () => {
        console.log('play方法没有src报的错， 移动端部分浏览器没办法主动播放，必须先摸到屏幕先播放后暂停， 完成其他功能后再处理')
        this.$refs.audio.play()
        this.$refs.audio.pause()
        document.removeEventListener('touchstart', f)
      }
      document.addEventListener('touchstart', f)
    },
    methods: {
      _getLyric(){
        getLyric(this.playSong.songmid)
          .then(({success, lyric}) => {
            if (success){
              const { lines } = base642Lyric(lyric)
              this.lyric = lines
            }
          })
      },
      // 隐藏screen
      hide: function(){
        this.setScreen(false)
      },
      // 显示screen
      show: function(){
        this.setScreen(true)
        this.$nextTick(() => {
          this.$refs.range && this.$refs.range.refresh()
        })
      },
      // 播放按钮
      togglePlay: function(){
        if (!this.audioReady) return
        this.setPlaying(!this.playing)
      },
      audioPlay: function(){
        this.audioReady = true
      },
      // 上一首
      prev(){
        if (!this.audioReady) return
        if (this.playList.length === 1){
          this.loop()
          return
        }
        const index = this.playIndex === 0 ? (this.playList.length - 1) : (this.playIndex - 1)
        this.setPlayIndex(index)
        this.audioReady = false
      },
      // 下一首
      next(){
        if (!this.audioReady) return
        if (this.playList.length === 1){
          this.loop()
          return
        }
        const index = this.playIndex === (this.playList.length - 1) ? 0 : (this.playIndex + 1)
        this.setPlayIndex(index)
        this.audioReady = false
      },
      // 音频就绪
      // canplay: function(){
      //   this.audioReady = true
      // },
      loop(){
        const audio = this.$refs.audio
        audio.currentTime = 0
        audio.play()
      },
      // 音频结束
      ended(){
        if (this.playMode === playMode.loop){
          this.loop()
        } else {
          this.next()
        }
      },
      error(){
        if (this.playList.length > 1) {
          Toast({
            message: '出错了，自动播放下一首',
            position: 'bottom',
            duration: 2000
          })
          setTimeout(() => {
            this.next()
          }, 1500)
        } else {
          Toast({
            message: '出错了，试试别的歌曲吧',
            position: 'bottom',
            duration: 1000
          })
          this.setPlaying(false)
        }
      },
      // 音频timeupdate方法
      timeupdate(e){
        this.nowTime = e.target.currentTime
      },
      // Range 拖拽开始
      rangeDragStart(e){
        this.setPlaying(false)
      },
      // Range 拖拽结束
      rangeDragEnd(e){
        const audio = this.$refs.audio
        audio.currentTime = this.nowTime
        this.setPlaying(true)
      },
      rangeChange(e){
        const audio = this.$refs.audio
        audio.currentTime = e
      },
      // 改变模式
      modeChange(){
        const nowMode = this.playMode
        let modec = ''
        if (nowMode === playMode.order){
          modec = playMode.random
        }

        if (nowMode === playMode.random){
          modec = playMode.loop
        }

        if (nowMode === playMode.loop){
          modec = playMode.order
        }

        this.setPlayMode({
          mode: modec,
          index: this.playIndex
        })
      },
      ...mapActions([
        'setScreen',
        'setPlaying',
        'setPlayIndex',
        'setPlayMode',
        'setPlayListChecking',
        'addPlayHistory'
      ])
    },
    watch: {
      playSong(newSong, oldSong){
        if (_isEqual(newSong, oldSong)){
          return
        }
        this.$nextTick(() => {
          this._getLyric()
          // if (this.playListChecking && !this.playing){
          //   return
          // }
          this.addPlayHistory(newSong)
          this.$refs.audio.play()
        })
      },
      playing(newPlaying){
        const audio = this.$refs.audio
        this.$nextTick(() => {
          const event = newPlaying ? 'play' : 'pause'
          audio[event]()
        })
      },
      nowTime(){
        if (this.lyric.length === 0){
          return
        }
        this.$nextTick(() => {
          if (this.lastLyricIndex === this.lyricIndex) return
          this.lastLyricIndex = this.lyricIndex
          const lyric = this.$refs.lyric
          const oft = lyric.$el.querySelectorAll('.lyric-item')[this.lyricIndex].offsetTop
          const activeItemH = lyric.$el.querySelector('.lyric-item.active').offsetHeight
          const outerH = lyric.$el.offsetHeight
          const top = -oft + outerH / 2 - activeItemH / 2
          lyric.scroll.scrollTo(0, top, 200)
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../static/stylus/index.styl'
  .player-container
    fixed-page()
    background-color: rgba(255,255,255,0.95)
    z-index: 3
  .player-head
    text-align: center
    position: absolute
    left: 0
    width: 100%
    top: 0
    box-sizing: border-box
    padding: $spacing 50px
    .title
      font-size: $font-size
      line-height: 1
      color: #333
      ellipsisLn(1)
    .name
      font-size: 14px
      line-height: 1.5
      color: #999
      ellipsisLn(1)
  .player-back
    position: absolute
    left: 0
    top: 0
    width: 50px
    height: 50px
    display: flex
    justify-content: center
    align-items: center
    &:after
      setArrow(down, 10px, $boderColor, 1px)
      margin-top: -5px
      content: ''
  
  .player-control
    position: absolute
    bottom: 0
    width: 100%
    .inner
      display: flex
      justify-content: space-around
      align-items: center
      padding: 0 0 $spacing*2
    .plays
      color: $color
      display: flex
      align-items: center
      opacity: 0.5
      &.ready
        opacity: 1
  .player-icon
    padding: 0 ($spacing/2)
    &.play
      width: 50px
      height: 50px
    &.active
      color: $color

  .player-body
    padding-top: 65px
    padding-bottom: 115px
    box-sizing: border-box
    height: 100%
    .inner
      position: relative
      height: 100%
    .img
      width: 80%
      margin: 0 auto
      border-radius: 50%
      overflow: hidden
      img
        width: 100%
        border-radius: 50%
    .lyric
      background: none
      margin-top: 85%
    .lyric-item
      font-size: 14px
      line-height: 1.5
      text-align: center
      color: #999
      padding: 0 $spacing
      &.active
        color: #333
        font-size: 16px
        line-height: 1.5
        padding-top: (16*0.5/2)px
        padding-bottom: (16*0.5/2)px
  .player-range
    padding: $spacing
    display: flex
    .range
      flex: 1
    .start,
    .end
      padding: 0 $spacing
      font-size: 14
      line-height: 1.25
      color: #999
  .player-mini
    position: fixed
    bottom: 0
    background: #fff
    width: 100%
    // z-index: 2
    padding: $spacing
    display: flex
    align-items: center
    box-sizing: border-box
    &:before
      sethalfbordertop()
    .progress
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      height: 2px
      .inner
        height: 2px
        background: $color
    .img,
    .img img
      width: 48px
      height: 48px
    .img
      border-radius: 50%
      overflow: hidden
    .info
      margin: 0 $spacing
      flex: 1
    .title
      font-size: 16px
      line-height: 1.5
      color: #333
      ellipsisLn(1)
    .name
      font-size: 14px
      line-height: 1.25
      color: #999
      ellipsisLn(1)
      
   @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
  .player-container .img img,
  .player-mini .img
    animation: rotate 20s linear infinite
    &.pause
      animation-play-state: paused

</style>
