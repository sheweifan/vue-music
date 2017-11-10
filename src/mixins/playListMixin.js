import { mapGetters } from 'vuex'
import { size } from '@/config'

export const playListMixin = {
  methods: {
    playListChange(){
      console.error('未指定事件')
    },
    // 改变底部距离用的，因为很多页面有相同逻辑，所以抽离出来
    setOffsetBottom(el, styleKey = 'bottom', offSize = size.miniPlayerHeight){
      el.style[styleKey] = (this.playList.length > 0 ? offSize : 0) + 'px'
    }
  },
  mounted() {
    this.playListChange(this.playList)
  },
  activated() {
    this.playListChange(this.playList)
  },
  watch: {
    playList(){
      this.playListChange(this.playList)
    }
  },
  computed: {
    ...mapGetters([
      'playList'
    ])
  }
}
