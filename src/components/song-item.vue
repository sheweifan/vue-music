<template lang="pug">
  div.song-item(@click="itemClick")
    p.name {{data.songname}}
    p.singer {{data.singer}}
</template>

<script>
  export default {
    name: 'tag-list',
    props: ['data'],
    methods: {
      itemClick(){
        this.$emit('click')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../static/stylus/index.styl'
  .song-item
    padding: $spacing
    position: relative
    &:not(:nth-last-child(1)):after
      sethalfborderbottom()
      left: $spacing
      right: $spacing
  .name
    font-size: $fontSize
    lin-height: 2
    color: #333
    margin-bottom: ($spacing/2)
    ellipsis()
  .singer
    font-size: ($fontSize*0.8)
    lin-height: 1.5
    color: #999
    ellipsis()
</style>
