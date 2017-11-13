<template lang="pug">
    div.app-tab
      span.left
        icon(name="icon-11")
      tabbar(:data="tab")
      router-link.right(to="/search")
        icon(name="icon-7")
</template>

<script>
  import tabbar from '@/components/tabbar.vue'
  import icon from '@/components/icon.vue'
  export default {
    name: 'app',
    components: {
      tabbar,
      icon
    },
    data(){
      return {
        tab: [
          {
            name: '歌手',
            link: '/singer'
          },
          {
            name: '推荐',
            link: '/recommend'
          },
          {
            name: '排行',
            link: '/rank'
          }
        ]
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .app-tab
    position: fixed
    left: 0
    width: 100%
    top: 0
    display: flex
    background-color: #fff
    .tabbar
      flex: 1
      padding: 0 40px
    .left,
    .right
      width: 50px
      display: flex
      justify-content: center
      align-items: center
    .left
      .icon
        width: 28px
        height: 28px
        color: #666
    .right
      .icon
        width: 26px
        height: 26px
        color: #666
</style>
