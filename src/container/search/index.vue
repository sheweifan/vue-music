<template lang="pug">
  transition(name="slide")
    div.search-container
      searchBar(
        placeholder="搜索歌曲、歌手"
        @input="searchInput"
        @cancel-click="cancelClick"
      )
</template>

<script>
  import vHead from '@/components/v-head.vue'
  import scrollView from '@/components/scroll-view.vue'
  import searchBar from '@/components/search-bar.vue'
  export default {
    name: 'search',
    components: {
      vHead,
      scrollView,
      searchBar
    },
    data(){
      return {
      }
    },
    methods: {
      searchInput(val){
        console.log(val)
      },
      cancelClick(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../static/stylus/index.styl'
  .search-container
    fixed-page()
    z-index: 1
</style>
