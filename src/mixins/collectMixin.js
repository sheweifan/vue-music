import { mapGetters, mapActions } from 'vuex'
import _findIndex from 'lodash/findIndex'

export const collectMixin = {
  methods: {
    isCollected(item){
      if (!item.songid) return false
      const index = _findIndex(this.collectHistory, {songid: item.songid})
      return index > -1
    },
    toggleCollect(item){
      this[this.isCollected(item) ? 'removeCollectHistory' : 'addCollectHistory'](item)
    },
    ...mapActions([
      'addCollectHistory',
      'removeCollectHistory'
    ])
  },
  computed: {
    ...mapGetters([
      'collectHistory'
    ])
  }
}
