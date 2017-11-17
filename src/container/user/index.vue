<template lang="pug">
  transition(name="slide")
    div.user-container(ref="page-container")
      div(v-if="list.length > 0")
        div.user-play-btn
          a(href="javascript:" @click="playAll") 全部随机播放
        scroll-view(
          ref="user-scroll"
          class="user-scroller"
          :watchs="list"
        )
          div.song-list
            song-item(
              v-for="(item, index) in list" 
              :data="item" 
              :key="item.songid"
              @click="itemClick(item, index)"
            )
      div.user-list-none(v-else) 暂无内容
      v-head(fixed="true")
        //- span(slot="right") 
        //-   icon(name="icon-1")
        div.user-head-tab
          a(
            href="javascript:"
            v-for="(item, index) in tabs"
            :key="index"
            :class="(tabActive === index ? 'active' : '')"
            @click="tabClick(index)"
          ) {{item.title}}
</template>

<script>
  import _findIndex from 'lodash/findIndex'
  import { mapActions, mapGetters } from 'vuex'
  import vHead from '@/components/v-head.vue'
  import icon from '@/components/icon.vue'
  import scrollView from '@/components/scroll-view.vue'
  import songItem from '@/components/song-item.vue'
  import { playListMixin } from '@/mixins'
  import { playMode } from '@/config'

  export default {
    mixins: [playListMixin],
    name: 'user',
    components: {
      vHead,
      icon,
      scrollView,
      songItem
    },
    computed: {
      list(){
        return this[this.tabs[this.tabActive].listName]
      },
      ...mapGetters([
        'collectHistory',
        'playHistory'
      ])
    },
    data() {
      return {
        tabActive: 0,
        tabs: [
          {
            title: '收藏记录',
            listName: 'collectHistory'
          },
          {
            title: '历史纪录',
            listName: 'playHistory'
          }
        ]
      }
    },
    methods: {
      playListChange(playList){
        this.setOffsetBottom(this.$refs['page-container'])
      },
      tabClick(index){
        this.tabActive = index
      },
      itemClick(item, index){
        this.addPlayList({
          list: [item]
        })
      },
      playAll(){
        this.listPlay({
          list: this.list,
          mode: playMode.random
        })
      },
      ...mapActions([
        'addPlayList',
        'listPlay'
      ])
    },
    watchs: {
      list(){
        setTimeout(() => {
          this.$refs['user-scroll'].scroll.scrollTo(0, 0, 0)
        }, 30)
      }
    },
    created(){
      // 显示有内容的列表
      const index = _findIndex(this.tabs, item => this[item.listName].length > 0)
      this.tabActive = index === -1 ? 0 : index
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../static/stylus/index.styl'
  .user-container
    fixed-page()
    z-index: 1
    .user-scroller
      top: 110px
  .user-play-btn
    margin-top: 52px
    display: flex
    height: 58px
    justify-content: center
    align-items: center
    a
      font-size: $fontSize
      display: block
      position: relative
      line-height: 1
      padding: $spacing
      &:before
        sethalfborder()
        border-radius: ($radius*2)
  .user-head-tab
    a
      display: inline-block
      color: #fff
      padding: 0 $spacing
      opacity: 0.5
      &.active
        opacity: 1
  .user-list-none
    padding-top: 52px
    text-align: center
    line-height: 4
    color: #999
</style>
