<template>
  <div class="tab-bar-container">
    <tab
      :value="value"
      :data="data"
      :fixed="fixed"
      @change="tabChange"
    >
      <!-- <template slot-scope="scope">
        <slot name="tab-item" v-bind="scope" />
      </template> -->
      <template slot="left">
        <slot name="left" />
      </template>
      <template slot="right">
        <slot name="right" />
      </template>
    </tab>
    <div
      class="tab-box-container"
      v-for="(item, index) in slots"
      :key="index"
      v-if="index === value"
    >
      <component :is="{render: () => item}"/>
    </div>
  </div>
</template>

<script>
import Tab from './tab.vue'
/**
  <tabbar
    :data="[
      { label: '全部'},
      { label: '待支付'},
      { label: '待完成'}
    ]"
    v-model="tabActive"
  >
    <!-- <div slot="tab-item" slot-scope="scope">
      {{scope.item.label}}
    </div> -->
    <div>1</div>
    <div>2</div>
    <div>3</div>
  </tabbar>
 */
export default {
  name: 'Tabbar',
  components: {
    Tab
  },
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
  methods: {
    tabChange(index) {
      this.$emit('input', index)
    }
  },
  // watch: {
  //   value(val, oldVal) {
  //     if (val === oldVal) return
  //     const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  //     this.boxScrollTops = this.boxScrollTops || new Array(this.data.length).fill(0)
  //     this.boxScrollTops[this.value] = scrollTop
  //   }
  // },
  computed: {
    slots() {
      return (this.$slots.default || []).filter(item => item.text !== ' ')
    }
  },
  // updated() {
  //   console.log('update')
  //   // window.scrollTo(0, this.boxScrollTops[this.value])
  // }
}
</script>
