<template lang="pug">
  svg.icon(aria-hidden="true" @click="iconclick")
    use(:xlink:href="'#icon-'+ name")
</template>

<script>
  import '@/static/js/iconfont.js'
  
  export default {
    name: 'icon',
    props: ['name'],
    methods: {
      iconclick(){
        this.$emit('click')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../static/stylus/index.styl'

  .icon 
    width: 30px
    height: 30px
    vertical-align: -5px
    fill: currentColor
    overflow: hidden
</style>
