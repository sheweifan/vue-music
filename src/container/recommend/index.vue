<template lang="pug">
div
  div.recommend-container(ref="page-container")
    div.recommend-swiper
      mt-swipe(:auto="4000")
        mt-swipe-item(v-if="slider.length === 0")
          loading
        mt-swipe-item(v-else v-for="item in slider" key="item.id")
          a(:href="item.linkUrl")
            img(:src="item.picUrl")
    div.recommend-list-tile 热门歌单推荐
    loading(v-if="list.length === 0" :height="200")
    div.recommend-list(v-else)
      router-link.recommend-list-item(tag="div" :to="'/recommend/'+item.dissid" v-for="item in list" :key="item.dissid")
        div.img
          img(:src="item.imgurl")
        div.info
          p.title {{item.creator.name}}
          p.desc {{item.dissname}}
  router-view
</template>

<script>
  import { getRecommend, getDiscList } from '@/api'
  import { playListMixin } from '@/mixins'
  import loading from '@/components/loading.vue'

	export default {
    mixins: [playListMixin],
  	name: 'recommend',
    components: {
      loading
    },
    data(){
      return {
        slider: [],
        list: []
      }
    },
    methods: {
      async _getRecommend(){
        const {success, data} = await getRecommend()

        if (success) {
          const { slider } = data
          this.slider = slider
        }
      },
      async _getDiscList(){
        const {success, data} = await getDiscList()

        if (success) {
          const { list } = data
          this.list = list
        }
      },
      playListChange(playList){
        this.setOffsetBottom(this.$refs['page-container'])
      }
    },
    created(){
      this._getRecommend()
      this._getDiscList()
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../static/stylus/index.styl'
  .recommend-container
    fixed-page(true)
  .recommend-swiper
    height: (432/1080*100)vw
  .recommend-list-tile
    font-size: $fontSize
    line-height: 2
    padding: $spacing 0 ($spacing/2)
    color: $color
    text-align: center
    
  $h= 60px
  .recommend-list
    padding-bottom: ($spacing/2)
  .recommend-list-item
    padding: ($spacing/2) $spacing
    display: flex
    align-items: center
    .img
      width: $h
      height: $h
      margin-right: $spacing
      img
        width: $h
        height: $h
    .title
      ellipsisLn(1)
      font-size: $fontSize
      color: #333
      line-height: 1.5
    .desc
      ellipsisLn(2)
      font-size: 14px
      line-height: 1.2
      color: #999
      height: ($fontSize*2)
</style>
