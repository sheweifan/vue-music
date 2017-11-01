<template lang="pug">
div
  mt-index-list
    mt-index-section.singer-list(index="A")
      router-link.singer-list-item(tag="div" to="/")
        div.img
          img(src="https://y.gtimg.cn/music/photo_new/T001R300x300M0000025NhlN2yWrP4.jpg?max_age=2592000")
        p.title 周杰伦
      router-link.singer-list-item(tag="div" to="/")
        div.img
          img(src="https://y.gtimg.cn/music/photo_new/T001R300x300M0000025NhlN2yWrP4.jpg?max_age=2592000")
        p.title 周杰伦
      router-link.singer-list-item(tag="div" to="/")
        div.img
          img(src="https://y.gtimg.cn/music/photo_new/T001R300x300M0000025NhlN2yWrP4.jpg?max_age=2592000")
        p.title 周杰伦
      router-link.singer-list-item(tag="div" to="/")
        div.img
          img(src="https://y.gtimg.cn/music/photo_new/T001R300x300M0000025NhlN2yWrP4.jpg?max_age=2592000")
        p.title 周杰伦
      router-link.singer-list-item(tag="div" to="/")
        div.img
          img(src="https://y.gtimg.cn/music/photo_new/T001R300x300M0000025NhlN2yWrP4.jpg?max_age=2592000")
        p.title 周杰伦
</template>

<script>
  export default {
    name: 'singer',
    data: function(){
      return {
        list: new Array(10).fill(56)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../static/stylus/index.styl'

  .singer-list-item
    padding: $spacing
    display: flex
    align-items: center
    position: relative
    &:before
      sethalfborderbottom()
    .img,
    .img img
      width: 60px
      height: 60px
      border-radius: 50%
    .img
      margin-right: $spacing
    .title
      font-size: $fontSize
      line-height: 1.5
      color: #666
</style>
