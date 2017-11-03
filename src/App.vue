<template lang="pug">
  div#app
    div.app-tab-brank
    div.app-tab
      span.left
      tabbar(:data="tab")
      span.right
    keep-alive
      router-view
</template>

<script>
	import '../static/css/reset.css'
  import tabbar from '@/components/tabbar.vue'
	export default {
		name: 'app',
    components: {
      tabbar
    },
    data: function(){
      return {
        tab: [
          {
            name: '推荐',
            link: '/recommend'
          },
          {
            name: '歌手',
            link: '/singer'
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
  .app-tab-brank
    padding-top: 52px
  .app-tab
    position: fixed
    z-index: 1
    left: 0
    width: 100%
    top: 0
    display: flex
    background-color: #fff
    .tabbar
      flex: 1
    .left
      width: 50px
    .right
      width: 50px
</style>
