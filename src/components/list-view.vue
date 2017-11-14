<template lang="pug">
  scroll-view(:watchs="loading" @pullUp="pullUp")
    slot
    div.list-view-footer
      mt-spinner(:type="2" v-if="loading")
      p(v-else-if="pageIndex === totalPage") 没有更多了
      p(v-else="pageIndex < totalPage") 上拉加载更多
</template>

<script>
  import scrollView from './scroll-view.vue'
  
  export default {
    name: 'list-view',
    props: ['totalPage'],
    data(){
      return {
        loading: false,
        pageIndex: 0
      }
    },
    components: {
      scrollView
    },
    methods: {
      _endLoad(){
        this.loading = false
      },
      _load(){
        this.loading = true
        this.pageIndex++
        this.$emit('loadMore', this.pageIndex, this._endLoad)
      },
      pullUp(){
        if (this.loading || this.pageIndex === this.totalPage) return
        this._load()
      }
    },
    created(){
      this.$nextTick(this._load)
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../static/stylus/index.styl'
  .list-view-footer
    display: flex
    justify-content: center
    align-items: center
    height: 42px
    font-size: $fontSize
    color: #999
</style>
