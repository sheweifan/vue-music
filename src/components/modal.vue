<template>
  <div class="common-modal-box" v-if="value">
    <div class="modal-mask"
      @touchmove.prevent
      @click="handleMask"
    ></div>
    <div class="modal-cont">
      <div class="title" v-if="title">{{title}}</div>
      <div class="context">
        <slot />
      </div>
      <div class="btns">
        <div
          v-for="(v, index) in buttons"
          :key="index"
          :class="['btn']"
          :style="v.color ? ('background:' + v.color) : ''"
          @click="handleClick({index: index})"
        >
          {{v.label}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const defaultBtns = [
  {
    label: '知道了',
    onClick: () => {}
  }
]
export default {
  name: 'Modal',
  // 貌似版本问题，无法自定义v-model，用vue提供的v-model解决
  // model: {
  //   prop: 'visable',
  //   event: 'close'
  // },
  props: {
    title: {
      type: String
    },
    buttons: {
      type: Array,
      default() {
        return defaultBtns
      }
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick(obj) {
      const { index } = obj
      typeof this.buttons[index].onClick === 'function' && this.buttons[index].onClick()
      this.$emit('input', false)
      this.$emit('close', this.buttons[index], index)
    },
    handleMask() {
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="stylus" scoped>
.common-modal-box
	.modal-mask
		position: fixed
		top: 0
		left: 0
		width: 100%
		height: 100%
		background-color: rgba(0,0,0,.3)
		z-index: 12
	.modal-cont
		position: fixed
		bottom: 15px
		left: 50%
		transform: translate(-50%, 0)
		box-sizing: border-box
		width: 90%
		background-color: #fff
		border-radius: 10px
		z-index: 12
    .title
      font-size: 16px
      line-height: 22px
      color: #333
      padding: 13px 0
      text-align: center
      border-bottom: 1px solid #EAEAEA
    .context
      margin: 12px 0 9px
      padding: 0 15px
      max-height: 50vh
      overflow-y: auto
      -webkit-overflow-scrolling: touch
    .btns
      padding: 15px 8px
      display: flex
      .btn
        flex: 1
        margin: 0 8px
        text-align: center
        font-size: 16px
        line-height: 22px
        padding: 11px 0
        color: #fff
        background: #999
        border-radius: 5px
        &.high,
        &:nth-last-child(1)
          background: #FF745B
</style>
