<template lang="pug">
  header(:class="fixed ? 'v-head fixed': 'v-head'")
    span.goback(@click="gobackClick")
    p.title {{ title }}
    span.right
      slot
</template>

<script>
  export default {
    name: 'head',
    props: ['fixed', 'title'],
    methods: {
      gobackClick: function(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../static/stylus/index.styl'
  
  $h= 30px
  .v-head
    display: flex
    padding: $spacing
    align-items: center
    box-sizing: border-box
    width: 100%
    background: rgba(0,0,0,0.8)
    &.fixed
      top: 0
      left: 0
      position: fixed
      z-index: 2
    .right
      min-width: 30px
    .goback
      width: $h
      height: $h
      display: flex
      justify-content: center
      align-items: center
      flex: 0
      &:before
        setArrow(left, 8px, #fff, 2px)
        content: ''
        margin: 0 $spacing
    .title
      text-align: center
      font-size: 16px
      line-height: 2
      color: #fff
      flex: 1
      ellipsis()
</style>
