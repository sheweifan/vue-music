<template lang="pug">
div
  div.recommend-swiper
    mt-swipe(:auto="4000")
      mt-swipe-item
        img(src="http://y.gtimg.cn/music/common/upload/t_focus_info_iphone/205414.jpg")
      mt-swipe-item
        img(src="http://y.gtimg.cn/music/common/upload/t_focus_info_iphone/205414.jpg")
      mt-swipe-item
        img(src="http://y.gtimg.cn/music/common/upload/t_focus_info_iphone/205414.jpg")
  div.recommend-list-tile 热门歌单推荐
  div.recommend-list
    router-link.recommend-list-item(tag="div" to="/" v-for="(item, index) in list" :key="index")
      div.img
        img(src="http://p.qpic.cn/music_cover/PiajxSqBRaELMiaFiadPqlaJy3Jr1pbibnnP6K9wxOtL7r3y9Qt8vTlibrg/600?n=1?id="+index)
      div.info
        p.title bad boy
        p.desc 昨日的某个遗憾，今天却越来越难以释怀
</template>

<script>
	export default {
		name: 'recommend',
    data: function(){
      return {
        list: new Array(10).fill(56)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../static/stylus/index.styl'
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
