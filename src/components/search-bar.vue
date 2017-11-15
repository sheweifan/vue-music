<template lang="pug">
  div.search-bar
    div.search-input
      input.input(
        ref="input"
        type="search"
        :placeholder="placeholder"
        v-model="currentValue"
      )
      i(
        @click="cleanValue"
        v-show="currentValue !== ''"
      )
        icon.clean(
          name="guanbi"
        )
    a.search-cancel(href="javascript:" @click="cancelClick") 取消
</template>

<script>
  import icon from './icon.vue'
  import { debounce } from 'lodash'

  export default {
    name: 'search-bar',
    components: {
      icon
    },
    props: {
      value: {
        default: '',
        type: String
      },
      placeholder: {
        default: '请输入搜索内容',
        type: String
      }
    },
    data(){
      return {
        currentValue: this.value
      }
    },
    methods: {
      cleanValue(){
        this.currentValue = ''
        this.$refs['input'].focus()
      },
      cancelClick(){
        this.$emit('cancel-click')
      }
    },
    created(){
      this.$watch('currentValue', debounce((val) => {
        this.$emit('input', val)
      }, 300))
    },
    watch: {
      value(val){
        this.currentValue = val
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../static/stylus/index.styl'
  $p= $spacing/2
  $h= $fontSize*1.7
  .search-bar
    padding: $p 0 $p $spacing
    background: $opacityBg
    display: flex
  .search-input
    flex: 1
    display: flex
    background: #fff
    align-items: center
    .clean
      width: 14px
      height: 14px
      padding: 12px
    .input
      background: none
      flex: 1
      font-size: 14px
      line-height: $h
      padding: $p $spacing
  .search-cancel
    padding 0  $spacing
    color: #fff
    font-size: $fontSize
    line-height: $h
    padding: $p $spacing
</style>
