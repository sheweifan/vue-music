<template lang="pug">
  div.control-item(@click="itemClick")
    icon.control-item-icon(:name="icon")
    span.control-item_title
      slot
</template>

<script>
  import icon from './icon.vue'
  
  export default {
    name: 'tag-list',
    components: {
      icon
    },
    props: ['data', 'icon', 'index'],
    methods: {
      itemClick(){
        this.$emit('click')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../static/stylus/index.styl'
  .control-item
    font-size: $fontSize
    padding: $spacing
    color: #666
    position: relative
    display: flex
    justify-content: center
    align-items: center
    &:not(:last-child):before
      sethalfborderbottom()
      left: $spacing
      right: $spacing
  .control-item-icon
    width: 20px
    height: 20px
    margin-right: $spacing
  .control-item_title
    flex: 1
</style>
