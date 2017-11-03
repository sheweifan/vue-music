<template lang="pug">
div
  div.rank-list
    router-link.rank-list-item(tag="div" v-for="item in list" :key="item.id" :to="'/rank/'+ item.id")
      div.img
        img(v-lazy="item.picUrl")
      ul.list
        li(v-for="(child, index) in item.songList") {{index+1}} 、 {{child.songname}} - {{child.singername}}
  router-view
</template>

<script>
  import { getTopList } from '@/api'
  export default {
    name: 'rank',
    data: function(){
      return {
        list: new Array(10).fill(56)
      }
    },
    methods: {
      _getTopList: async function(){
        const { success, data } = await getTopList()
        if (success){
          const { topList } = data
          this.list = topList
        }
      }
    },
    created: function(){
      this._getTopList()
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../static/stylus/index.styl'
  .rank-list
    padding-top: $spacing
    // fixed-page(true)
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
      flex: 1
      li
        font-size: $fontSize
        line-height: 1.5
        color: #333
        ellipsisLn(1)
</style>
