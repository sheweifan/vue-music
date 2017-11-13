<template lang="pug">
  transition(name="slide")
    div.search-container
      searchBar(
        placeholder="搜索歌曲、歌手"
        @input="searchInput"
        @cancel-click="cancelClick"
      )
      scroll-view.search-history#search-history
        h3.search-title 热门搜索
        tag-list(:data="history")
</template>

<script>
  import { map, take } from 'lodash'
  import vHead from '@/components/v-head.vue'
  import scrollView from '@/components/scroll-view.vue'
  import searchBar from '@/components/search-bar.vue'
  import tagList from '@/components/tag-list.vue'
  import { getHotKey } from '@/api'

  export default {
    name: 'search',
    components: {
      vHead,
      scrollView,
      searchBar,
      tagList
    },
    data(){
      return {
        history: []
      }
    },
    methods: {
      searchInput(val){
        console.log(val)
      },
      cancelClick(){
        this.$router.go(-1)
      },
      _getHotKey(){
        getHotKey().then(({data, success}) => {
          if (success){
            const { hotkey } = data
            const takeHotKey = take(hotkey, 10)
            const parseHotkey = map(takeHotKey, ({k, n}) => ({
              text: k,
              value: n
            }))
            this.history = parseHotkey
          }
        })
      }
    },
    created(){
      this._getHotKey()
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../static/stylus/index.styl'
  .search-container
    fixed-page()
    z-index: 1
    .search-history
      top: 40px
  .search-title
    font-size: $fontSize
    line-height: 1.5
    padding: $spacing $spacing 0
    color: #333
</style>
