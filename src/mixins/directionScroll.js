// 滚动方向mixin 使用方式
// 1，watch scrollDirection (为1时，表示向上滑动，0为向下滑动)
const directionScroll = {
  data () {
    return {
      scrollDirection: 0
    }
  },
  mounted() {
    this.beforeScrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop

    // 节流
    var throttle = (fn, time) => {
      var last = 0
      return () => {
        var curr = +new Date()
        if (curr - last > time){
          fn.apply(this, arguments)
          last = curr
        }
      }
    }

    // this._bind = throttle(this._scroll, 100)
    window.addEventListener('scroll', this._scroll, false)
  },
  destroy() {
    window.removeEventListener('scroll', this._scroll, false)
  },
  methods: {
    _scroll() {
      const afterScrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (afterScrollTop < 0 || afterScrollTop > (document.body.scrollHeight - window.screen.availHeight)) {
        return;
      }
      this.scrollDirection = (afterScrollTop - this.beforeScrollTop) > 0 ? 1 : 0
      this.beforeScrollTop = afterScrollTop
    }
  }
}

export default directionScroll
