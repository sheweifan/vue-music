<template lang="pug">
  div.rank-list
    div.rank-list-item(v-for="(index, item) in list" :key="index")
      div.img
        img(src="http://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_4_300_206379449.jpg")
      ul.list
        li 1 至少还有你 (Live)-林俊杰
        li 2 至少还有你 (Live)-林俊杰
        li 3 至少还有你至少还有你至少还有你至少还有你 (Live)-林俊杰

</template>

<script>
  export default {
    name: 'rank',
    data: function(){
      return {
        list: new Array(10).fill(56)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../static/stylus/index.styl'
  .rank-list
    padding-top: $spacing
  .rank-list-item
    margin: 0 $spacing $spacing
    border-radius: $radius
    overflow: hidden
    display: flex
    align-items: center
    background: $borderColor
    .img,
    .img img
      width: 100px
      height: 100px
    .img
      margin-right: $spacing
    .list 
      li
        font-size: $fontSize
        line-height: 1.5
        color: #333
        ellipsisLn(1)
</style>
