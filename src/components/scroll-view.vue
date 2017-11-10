<template lang="pug">
  div.scroll-wrapper(:id="id")
    div.scroll-scroller
      slot
</template>

<script>
  import IScroll from 'iscroll'
  export default {
    name: 'scroll-view',
    props: ['id'],
    mounted: function(){
      this.scroll = new IScroll('#' + this.id, {
        scrollX: false,
        freeScroll: true,
        preventDefault: false
      })
    },
    updated: function () {
      this.$nextTick(() => {
        this.scroll.refresh()
        setTimeout(() => {
          this.scroll.refresh()
        }, 1000)
      })
    },
    beforeDestroy: function(){
      this.scroll.destroy()
      this.scroll = null
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../static/stylus/index.styl'
    
  .scroll-wrapper
    background: #fff
    position: absolute
    top: 0
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    z-index: 2
  .scroll-scroller
    position: absolute
    width: 100%
    -webkit-tap-highlight-color: rgba(0,0,0,0)
    -webkit-transform: translateZ(0)
    -moz-transform: translateZ(0)
    -ms-transform: translateZ(0)
    -o-transform: translateZ(0)
    transform: translateZ(0)
    -webkit-touch-callout: none
    -webkit-user-select: none
    -moz-user-select: none
    -ms-user-select: none
    user-select: none
    -webkit-text-size-adjust: none
    -moz-text-size-adjust: none
    -ms-text-size-adjust: none
    -o-text-size-adjust: none
    text-size-adjust: none

</style>
