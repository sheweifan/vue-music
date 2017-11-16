<template lang="pug">
  div.loading(:style="{ height: height+'px' }")
    mt-spinner(:type="2")
</template>

<script>
  export default {
    name: 'loading',
    props: ['height']
  }
</script>

<style lang="stylus" scoped>
  @import '../static/stylus/index.styl'
  .loading
    display: flex
    justify-content: center
    align-items: center
    min-height: 42px
    height: 100%
    font-size: $fontSize
    color: #999
</style>
