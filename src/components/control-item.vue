<template lang="pug">
  div.control-item(@click="itemClick")
    icon.control-item-icon.left-icon(:name="icon" v-if="icon")
    span.control-item-title
      slot
    span.control-item-btns(v-if="btns")
      i(v-for="(item, index) in btns" :key="index" @click.stop="item.onClick")
        icon(:class="'control-item-icon ' + item.name + ' ' + (item.className || ' ') " :name="getIcon(item.name)")
</template>

<script>
  import icon from './icon.vue'
  
  export default {
    name: 'control-item',
    components: {
      icon
    },
    props: {
      icon: String,
      btns: {
        type: Array
      }
    },
    methods: {
      getIcon(name){
        switch (name){
          case 'collect':
            return 'icon-10'
          case 'delete':
            return 'guanbi'
          default :
            return name
        }
      },
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
    &.delete
      width: 15px
      height: 15px
    &.active
      color: $color
  .control-item-title
    flex: 1
  .control-item-btns
    display: flex
    justify-content: center
    align-items: center
</style>
