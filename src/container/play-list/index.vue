<template lang="pug">
  transition(name="play-list-fade")  
    div.play-list-container(v-if="playListChecking" @click="setPlayListChecking(false)")
      div.play-list-inner(@click.stop="")
        scrollView.play-list
          control-item(
            v-for="(item, index) in playList" 
            :key="index"
            :icon=" item.songid === playSong.songid ? 'icon-1': ' ' " 
            :btns="['collect', 'delete']"
            :data="item"
            :index="index"
            @btns-click="btnsClick"
            @click="singItemClick(item, index)"
          ) {{item.songname}}
        div.play-control
          div.btn(@click="removeAll") 清除播放列表
          div.btn(@click="setPlayListChecking(false)") 关闭
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { MessageBox } from 'mint-ui'
  import controlItem from '@/components/control-item.vue'
  import scrollView from '@/components/scroll-view.vue'

  export default {
    name: 'play-list',
    components: {
      controlItem,
      scrollView
    },
    computed: {
      ...mapGetters([
        'playList',
        'playSong',
        'playListChecking'
      ])
    },
    methods: {
      btnsClick(name, item){
        if (name === 'delete'){
          this.removePlayList(item)
        }
      },
      singItemClick(item, index){
        this.setPlayIndex(index)
      },
      removeAll(){
         MessageBox.confirm('确认要清除播放列表？')
          .then(action => {
            this.removeAllPlayList()
          })
          .catch(e => console.log('不清除'))
      },
      ...mapActions([
        'setPlayListChecking',
        'removePlayList',
        'setPlayIndex',
        'removeAllPlayList'
      ])
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../static/stylus/index.styl'
  .play-list-container
    fixed-page()
    background: rgba(0,0,0,0.6)
    &.play-list-fade-enter-active,
    &.play-list-fade-leave-active
      transition: opacity 0.3s
      .play-list-inner
        transition: transform 0.3s
    &.play-list-fade-enter, 
    &.play-list-fade-leave-to
      opacity: 0
      .play-list-inner
        transform: translate3d(0, 100%, 0)
  .play-list-inner
    position: absolute
    bottom: 0
    left: 0
    background-color: #fff
    width: 100%
    padding-top: $spacing
  .play-list
    position: relative
    height: 200px
  .play-control
    display: flex
    position: relative
    &:before
      sethalfbordertop()
    .btn
      flex: 1
      font-size: $fontSize
      height: ($fontSize*2) + ($spacing*2)
      display: flex
      align-items: center
      justify-content: center
    .del-icon
      width: 24px
      height: 24px
      
</style>
