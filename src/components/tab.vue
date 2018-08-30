<template>
  <div :class="{
    'tab-list': true,
    'fixed': fixed
  }">
    <div class="tab-list-container">
      <slot name="left" />
      <v-touch
        tag="div"
        v-for="(item,index) in data"
        @tap="tabItemClick(index)"
        :class="{
          'tab-list-item': true,
          active: value === index
        }"
        :key="item.label"
      >
        <!-- <slot v-if="$slots.default" :item="item" :active="value === index" :index="index" /> -->
        <span class="tab-list-item-default">
          {{item.label}}
          <em v-if="item.bullet" class="bullet">
            {{item.bullet}}
          </em>
        </span>
      </v-touch>
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tab',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    value: {
      type: [String, Number],
      required: true
    },
    fixed: {
      type: Boolean,
      default: true
    }
  },
  created() {
  },
  methods: {
    tabItemClick(index) {
      this.$emit('change', index)
    }
  },
  computed: {
    sslots() {
      return this.$slots
    }
  }
}
</script>

<style scope lang="stylus">
  .tab-list
    &.fixed
      height: 45px
      .tab-list-container
        position: fixed
        z-index: 10
        width: pxToRem(750)
        left: 50%
        transform: translateX(-50%)
  .tab-list-container
    display: flex
    width: 100%
    background-color: #F3F4F5
    border-bottom: 1px solid #ddd
  .tab-list-item
    flex: 1
    text-align: center
    &.active
      .tab-list-item-default
      color: #459cf3
      border-bottom: 1px solid #459cf3
    .bullet
      font-size: 11px
      color: #FFFFFF
      line-height: 15px
      background: #FF5B5B
      border-radius: 7.5px
      width: 20px
      height: 15px
      top: 5px
      position: absolute
      left: 100%
  .tab-list-item-default
    padding: 9px 0
    display: inline-block
    height: 25px
    line-height: 25px
    font-size: 15px
    color: #000
    position: relative
</style>
