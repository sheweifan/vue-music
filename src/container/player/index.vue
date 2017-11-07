<template lang="pug">
  div(v-show="playList.length>0")
    screenAnimate(img="playerImg")
      div.player-container(v-show="playScreen")
        div.player-head
          span.player-back(@click="hide")
          p.title {{playSong.songname}}
          p.name {{playSong.singer}}
        div.player-body
          div.inner
            div#playerImg.img(ref="playerImg")
              img(:class="(playing ? 'play' : 'pause')" :src="playSong.picUrl")
            scrollView.lyric#player-lyric
              p.lyric-item hehehehehe
              p.lyric-item hehehehehe
              p.lyric-item.active hehehehehe
              p.lyric-item hehehehehe
        div.player-control
          div.player-range
            span.start {{ nowTime | songTime }}
            vue-slider(
              class="range"
              v-model="nowTime" 
              :min="0" 
              :max="playSong.interval" 
              :tooltip="false"
              :height="3" 
              :process-style="{background:'#01b37e'}"
              :clickable="false" 
              @drag-start="rangeDragStart"
              @drag-end="rangeDragEnd"
            )
            span.end {{ playSong.interval | songTime }}
          div.inner
            icon.player-icon(:name="modeIcon" @click="modeChange")
            //- icon(name="icon-6")
            //- icon(name="icon-8")
            div(:class="audioReady ? 'plays ready': 'plays' ")
              icon.player-icon(name="icon-3" @click="prev")
              icon.player-icon.play(:name="playIcon" @click="togglePlay")
              //- icon(name="icon-4")
              icon.player-icon(name="icon-2" @click="next")
            icon.player-icon(name="icon-10")
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
          icon.player-icon(name="icon-9")
    audio(
      :src="playSong.url"
      ref="audio"
      @play="audioPlay"
      @canplay="canplay"
      @timeupdate="timeupdate"
      @ended="ended"
    )
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import vueSlider from 'vue-slider-component'
  import { isEqual } from 'lodash'
  import icon from '@/components/icon'
  import scrollView from '@/components/scroll-view'
  import { getLyric } from '@/api'
  import { playMode } from '@/config'

  import screenAnimate from './screen-animate'

  export default {
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
    data: function(){
      return {
        // 音频准备就绪
        audioReady: false,
        // 现在播放进度时间戳
        nowTime: 0
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
      ...mapGetters([
        'playList',
        'playIndex',
        'playMode',
        'playScreen',
        'formatList',
        'playSong',
        'playing'
      ])
    },
    methods: {
      // 隐藏screen
      hide: function(){
        this.setScreen(false)
      },
      // 显示screen
      show: function(){
        this.setScreen(true)
        getLyric(this.playSong.songmid)
          .then(data => {
            console.log(data)
          })
      },
      // 播放按钮
      togglePlay: function(){
        // if (!this.audioReady) return
        this.setPlaying(!this.playing)
      },
      audioPlay: function(){
        this.setPlaying(true)
      },
      // 上一首
      prev: function(){
        if (!this.audioReady) return
        const index = this.playIndex === 0 ? (this.playList.length - 1) : (this.playIndex - 1)
        this.setPlayIndex(index)
        this.audioReady = false
      },
      // 下一首
      next: function(){
        if (!this.audioReady) return
        const index = this.playIndex === (this.playList.length - 1) ? 0 : (this.playIndex + 1)
        this.setPlayIndex(index)
        this.audioReady = false
      },
      // 音频就绪
      canplay: function(){
        this.audioReady = true
      },
      // 音频结束
      ended: function(){
        if (this.playMode === playMode.loop){
          const audio = this.$refs.audio
          audio.currentTime = 0
          audio.play()
        } else {
          this.next()
        }
      },
      // 音频timeupdate方法
      timeupdate: function(e){
        this.nowTime = e.target.currentTime
      },
      // Range 拖拽开始
      rangeDragStart: function(){
        this.setPlaying(false)
      },
      // Range 拖拽结束
      rangeDragEnd: function(){
        const audio = this.$refs.audio
        audio.currentTime = this.nowTime
        this.setPlaying(true)
      },
      // 改变模式
      modeChange: function(){
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
        'setPlayMode'
      ])
    },
    watch: {
      playSong(newSong, oldSong){
        if (isEqual(newSong, oldSong)){
          return
        }
        this.$nextTick(() => {
          this.$refs.audio.play()
        })
      },
      playing(playing){
        const audio = this.$refs.audio
        this.$nextTick(() => {
          audio[playing ? 'play' : 'pause']()
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
    .lyric
      background: none
      margin-top: 85%
    .lyric-item
      font-size: 14px
      line-height: 1.5
      text-align: center
      color: #999
      &.active
        color: #333
        font-size: 16px
        line-height: 2
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
    z-index: 2
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
