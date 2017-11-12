<template lang="pug">
  div.tag-list
    span.tag-list-item(v-for="(item, index) in data" :key="index") {{ item.text }}
</template>

<script>
  export default {
    name: 'tag-list',
    props: ['data'],
    methods: {
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../static/stylus/index.styl'

  .tag-list
    padding: $spacing 0 0 $spacing
    .tag-list-item
      display: inline-block
      font-size: $fontSize
      line-height: 1.25
      padding: 2px $spacing
      margin-right: $spacing
      margin-bottom: $spacing
      background: rgba(0,0,0,0.1)
      border-radius: $radius
      color: #888
</style>
