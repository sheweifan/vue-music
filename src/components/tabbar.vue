<template lang="pug">
- 
  var obj = [{
    name: '推荐',
    link: '/recommend'
  },{
    name: '歌手',
    link: '/singer'
  },{
    name: '排行',
    link: '/rank'
  }]

div.tabbar
  each item in obj
    router-link.tabar-item(tag="div" to=""+item.link)
      span.tabar-item-info #{item.name} 
</template>

<script>
  export default {
    name: 'tabbar'
  }
</script>

<style lang="stylus" scoped>
  @import '../static/stylus/index.styl'
  
  .tabbar
    display: flex
    position: relative
    &:before
      sethalfborderbottom()
      
  .tabar-item
    flex: 1
    display: flex
    justify-content: center
    align-items: center
    &.router-link-active 
      .tabar-item-info
        color: $color
  .tabar-item-info
    color: #666
    font-size: $fontSize
    line-height: 2
    padding: $spacing 0;
</style>
