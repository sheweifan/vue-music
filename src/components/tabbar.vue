<template lang="pug">
  div.tabbar
    router-link.tabar-item(v-for="(item, index) in data" :key="index" v-if="item.link" tag="div" :to="item.link")
      span.tabar-item-info {{item.name}}
</template>

<script>
  export default {
    name: 'tabbar',
    props: ['data']
  }
</script>

<style lang="stylus" scoped>
  @import '../static/stylus/index.styl'
  .tabbar
    display: flex
    background-color: #fff
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
        transform: scale(1.05)
        // font-weight: bold
  .tabar-item-info
    color: #666
    font-size: $fontSize
    line-height: 2
    padding: $spacing 0;
</style>
