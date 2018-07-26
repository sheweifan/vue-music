import Vue from 'vue'

const eventBus = new Vue()
const nativeEvents = ['jsRefreshWebview', 'goBack', 'topFuncBtn', 'refreshing']
nativeEvents.forEach(key => {
  window[key] = (...arge) => {
    console.error(`客户端调本地方法${key}方法未定义参数是`, args)
  }
})
let nativeEventKey = 0

const nativeEventsMixin = {
  created() {
    this.nativeEventKey = nativeEventKey + 1
    nativeEvents.forEach(key => {
      window[key] = (...args) => {
        eventBus.$emit(key + this.nativeEventKey, args)
      }
    })
  },
  methods: {
    addNativeEventWather(key, callback) {
      return new Promise(resolve => {
        eventBus.$on(key + this.nativeEventKey, () => {
          typeof callback === 'function' ? callback() : resolve()
        })
      })
    },
    removeNativeEventWather(key) {
      eventBus.$off(key + this.nativeEventKey)
    }
  },
  beforeDestroy() {
    nativeEvents.forEach(key => {
      eventBus.$off(key + this.nativeEventKey)
    })
  }
}

export default nativeEventsMixin
