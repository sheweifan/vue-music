<template lang="pug">
  div(v-show="playList.length>0")
    transition(name="screen" 
                @enter="enter"
                @leave="leave"
                @after-enter="afterEnter"
                @after-leave="afterLeave")
      div.player-container(v-show="playScreen")
        div.player-head
          span.player-back(@click="hide")
          p.title {{playSong.songname}}
          p.name {{playSong.singer}}
        div.player-body
          div.inner
            div.img(ref="playerImg")
              img(:src="playSong.picUrl")
            scrollView.lyric#player-lyric
              p.lyric-item hehehehehe
              p.lyric-item hehehehehe
              p.lyric-item.active hehehehehe
              p.lyric-item hehehehehe
        div.player-control
          icon.player-icon(name="icon-5")
          //- icon(name="icon-6")
          //- icon(name="icon-8")
          div.plays
            icon.player-icon(name="icon-3")
            icon.player-icon.play(name="icon-1")
            //- icon(name="icon-4")
            icon.player-icon(name="icon-2")
          icon.player-icon(name="icon-10")
    transition(name="slideTop")
      div.player-mini(v-show="!playScreen" @click="show")
        div.img
          img(:src="playSong.picUrl")
        div.info
          p.title {{playSong.songname}}
          p.name {{playSong.singer}}
        div.btns
          icon.player-icon(name="icon-1")
          icon.player-icon(name="icon-9")
    audio(:src="playSong.url" @play="play" ref="audio")
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import icon from '@/components/icon'
  import scrollView from '@/components/scroll-view'

  const getAnimateData = () => {
    const winW = window.innerWidth
    const winH = window.innerHeight
    const miniLeft = 10
    const miniBottom = 10
    const miniWidth = 48
    const bigTop = 65
    const bigWidth = winW * 0.8
    const x = -bigWidth / 2 - miniLeft / 2
    const y = winH - bigTop - bigWidth / 2 - miniBottom - miniWidth / 2
    const scale = miniWidth / bigWidth
    return {
      x,
      y,
      scale
    }
  }

  const setAnimate = (el, {x, y, scale}, time = 0.3) => {
    return new Promise((resolve, reject) => {
      el.style.webkitTransform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      el.style.webkitTransition = `transform ${time}s`
      el.style.transition = `transform ${time}s`

      // el.addEventListener('transitionend', resolve)
      setTimeout(() => {
        resolve()
        // el.style.transition = ` `
        // el.style.webkitTransition = ` `
      }, time * 1000)
    })
  }

  export default {
    name: 'player',
    components: {
      icon,
      scrollView
    },
    data: function(){
      return {
        list: []
      }
    },
    computed: {
      ...mapGetters([
        'playList',
        'playIndex',
        'playMode',
        'playScreen',
        'formatList',
        'playSong'
      ])
    },
    methods: {
      enter: async function(dom, done){
        const el = this.$refs.playerImg
        const opts = getAnimateData()
        await setAnimate(el, opts, 0)
        const opts2 = {
          x: 0,
          y: 0,
          scale: 1.05
        }
        await setAnimate(el, opts2, 0.2)
        const opts3 = {
          x: 0,
          y: 0,
          scale: 1
        }
        await setAnimate(el, opts3, 0.05)
        done()
      },
      leave: async function(dom, done){
        const el = this.$refs.playerImg
        const opts = getAnimateData()
        await setAnimate(el, opts, 0.5)
        done()
      },
      afterEnter: function(){
        const el = this.$refs.playerImg
        el.style = ''
      },
      afterLeave: function(){
        const el = this.$refs.playerImg
        el.style = ''
      },
      hide: function(){
        this.changeScreen(false)
      },
      show: function(){
        this.changeScreen(true)
      },
      play: function(){
        // console.log(this.$refs.audio)
        // this.$refs.audio.play()
      },
      ...mapActions(['changeScreen'])
    },
    watch: {
      playSong(){
        // setTimeout(() => {
          // this.$refs.audio.play()
        // }, 1000)
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
    display: flex
    justify-content: space-around
    align-items: center
    padding: 0 0 $spacing*2
    box-sizing: border-box
    .plays
      color: $color
      display: flex
      align-items: center
  
  .player-icon
    padding: 0 ($spacing/2)
    &.play
      width: 50px
      height: 50px

  .player-body
    padding-top: 65px
    padding-bottom: 80px
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
</style>
