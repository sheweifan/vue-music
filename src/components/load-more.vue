<template>
  <div class="load-more">
    <template
      v-for="(item, index) in list"
    >
      <slot :item="item" :index="index" />
    </template>
    <template v-if="hasMore">
      <slot name="loading" v-if="$slots.loading" />
      <AnimationLoadmore :circleFm="{background: theme}" v-else />
    </template>
    <template v-else>
      <template v-if="list.length === 0">
        <slot name="loading" v-if="$slots.none" />
        <div class="no-more" v-else>暂无数据</div>
      </template>
      <template v-else>
        <slot name="loading" v-if="$slots.noMore" />
        <div class="no-more" v-else>已全部展示</div>
      </template>
    </template>
  </div>
</template>

<script>
import AnimationLoadmore from './AnimationLoadmore';
const isDOMElement = (obj) => !!(obj && typeof window !== 'undefined' && (obj === window || obj.nodeType));
export default {
  name: 'LoadMore',
  components: {
    AnimationLoadmore
  },
  props: {
    // 离底部距离
    bottomSpace: {
      type: Number,
      default: 0
    },
    // 监听的参数，deep watch 变化会更新
    parmas: {
      type: [String, Number, Array, Object]
    },
    // 每次加载个数
    pageCount: {
      type: Number,
      default: 20
    },
    // 滚动主体
    scrollBody: {
      default() {
        return window
      }
    },
    theme: {
      type: String,
      default: '#ff745b'
    }
  },
  data() {
    return {
      // 当前页码
      page: 0,
      // 是否还有更多 $emit之后 callback 回传
      hasMore: true,
      // 列表 scope 给外部 item
      list: []
    }
  },
  created() {
    this.scroll = () => this._scroll.call(this)
    this.page++
    this._trigger()

    // deep watch
    this.parmas && this.$watch(() => this.parmas, () => {
      this.refresh()
    }, {
      deep: true
    })
  },
  destoryed() {
    this.scrollBody.removeEventListener('scroll', this.scroll)
  },
  methods: {
    _scroll() {
      const scrollTop = this.scrollBody.scrollTop || document.documentElement.scrollTop || document.body.scrollTop;
      const bodyH = this.scrollBody.scrollHeight || document.body.scrollHeight
      const winH = this.scrollBody.offsetHeight || window.screen.availHeight
      if (bodyH - scrollTop - winH <= this.bottomSpace) {
        this.page++
        this._trigger()
      }
    },
    _trigger() {
      return new Promise(resolve => {
        this.scrollBody.removeEventListener('scroll', this.scroll)
        this.$emit('render', this.page, ({data, hasMore = data.length >= this.pageCount}) => {
          this.list = [...this.list, ...data]
          this.scrollBody.addEventListener('scroll', this.scroll)
          this.hasMore = hasMore
          resolve()
        })
      })
    },
    refresh() {
      this.list = []
      this.page = 1
      this.hasMore = true
      return this._trigger()
    }
  },
  watch: {
    hasMore(val) {
      if (!val) {
        this.scrollBody.removeEventListener('scroll', this.scroll)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .load-more{
		.no-more {
	    width: 100%;
	    line-height: 44px;
	    font-size: 13px;
	    color: #999;
	    text-align: center;
	  }
  }
</style>
