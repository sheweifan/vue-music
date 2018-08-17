<template>
  <div class="toast" v-if="visable">
    <v-touch class="toast-mask" @touchmove.prevent @tap="handleMask"></v-touch>
    <div class="toast-cont">
      <i class="yxl-font yxl-font-loading520" v-if="type === 'loading'"></i>
      <i class="yxl-font yxl-font-concern" v-if="type === 'success'"></i>
      <i class="yxl-font yxl-font-FM51delete" v-if="type === 'fail'"></i>
      <span class="toast-text">{{text}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    time: {
      type: Number,
      default() {
        return this.type === 'loading' ? 0 : 3000
      }
    },
    text: {
      type: String,
      default(val) {
        switch(this.type) {
          case 'loading':
            return '加载中...'
          case 'success':
            return '操作成功'
          case 'fail':
            return '操作失败'
          default:
            return ''
        }
      }
    },
  },
  data() {
    return {
      visable: true
    }
  },
  mounted() {
    this.time !== 0 && this._setTimer()
  },
  methods: {
    handleMask() {
      this.type !== 'loading' && this.close()
    },
    close() {
      this.visable = false
      clearTimeout(this._timer)
      this.$emit('close')
    },
    _setTimer() {
      this._timer = setTimeout(() => {
        this.close()
      }, this.time)
    }
  },
  destoryed() {
    clearTimeout(this._timer)
  }

}
</script>

<style lang="stylus" scoped>
@keyframes loading
  from
    transform: rotate(0deg)
  to
    transform: rotate(359deg)
.toast-mask
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: rgba(0,0,0,.3)
  z-index: 12
.toast-cont
  position: fixed
  top: 50%
  left: 50%
  transform: translate(-50%, 0)
  max-width: 80%
  background: rgba(0,0,0,0.3)
  z-index: 12
  padding: 10px
  color: #fff
  font-size: 15px
  line-height: 20px
  border-radius: 10px
  .yxl-font
    margin: 0 5px
    display: inline-block
    vertical-align: middle
  .yxl-font-loading520
    font-size: 20px
    line-height: 20px
    height: 20px
    transform-origin: 45% 45%
    animation: loading 1s linear infinite
</style>
