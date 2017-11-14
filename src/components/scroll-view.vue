<template lang="pug">
  div(:class="'scroll-wrapper '+ newId")
    div.scroll-scroller
      slot
</template>

<script>
  import IScroll from 'iscroll'
  import _random from 'lodash/random'

  export default {
    name: 'scroll-view',
    props: ['watchs'],
    computed: {
      newId(){
        return 'scroll-' + _random(9999999)
      }
    },
    methods: {
      _scroll(){
        this.$emit('scroll', this.scroll)
      },
      _scrollEnd(e){
        this.$emit('scrollEnd', this.scroll)
        if (this.scroll.y <= this.scroll.maxScrollY) {
          this.$emit('pullUp', this.scroll)
        } else if (this.scroll.y >= 0) {
          this.$emit('pullDown', this.scroll)
        }
      }
    },
    mounted(){
      this.scroll = new IScroll('.' + this.newId, {
        scrollX: false,
        freeScroll: true,
        preventDefault: false
      })

      this.scroll.on('scroll', this._scroll)
      this.scroll.on('scrollEnd', this._scrollEnd)
    },
    updated(){
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    beforeDestroy(){
      this.scroll.destroy()
      this.scroll = null
    },
    watch: {
      watchs() {
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      }
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
    // z-index: 2
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
