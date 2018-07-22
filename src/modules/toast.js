import Vue from 'vue'
import Component from '../components/Toast.vue'
const Toast = Vue.extend(Component)

/**
 * 信息提示
 * @param {[object, string]} opts
 * @param {type} opts.string 类型 默认defualt 可选['loading', 'success', 'fail']
 * @param {text} opts.text 文字
 * @param {function} opts.callback 回调方法
 * @return {object} {}.hide 隐藏方法
 */
export const toast = (opts) => {
  opts = typeof opts === 'string' ? { type: opts } : opts
  const comp = new Toast({
    propsData: opts
  })
  const vm = comp.$mount()
  document.body.appendChild(vm.$el)
  const close = () => {
    opts.callback && opts.callback.call(vm)
    try {
      document.body.removeChild(vm.$el)
    } catch (e) {}
    vm.$destroy()
  }
  vm.$on('close', close)
  return {
    close() {
      vm.close()
    }
  }
}

/**
 * 包装方法，对参数进行处理
 * @param {function} fn
 */
const wrap = fn => (text, callback, time) => {
  // 如果只有两个参数，并且第二个参数是数字，就把第二参数当作关闭时间
  if (typeof callback === 'number') {
    [time, callback] = [callback, () => {}]
  }
  return fn(text, callback, time)
}

/**
 * 加载中
 * @param {string} text
 * @param {function} callback
 * @return {object} {}.close 隐藏方法
 */
export const loading = wrap((text, callback, time) => {
  return toast({type: 'loading', text, time, callback})
})

/**
 * 成功
 * @param {string} text
 * @param {number} time
 * @param {function} callback
 * @return {object} {}.close 隐藏方法
 */
export const success = wrap((text, callback, time) => {
  return toast({type: 'success', text, time, callback})
})

/**
 * 失败
 * @param {string} text
 * @param {number} time
 * @param {function} callback
 * @return {object} {}.close 隐藏方法
 */
export const fail = wrap((text, callback, time) => {
  return toast({type: 'fail', text, time, callback})
})

const install = (Vue) => {
  Vue.component(Component.name, Component)
  Vue.prototype.$toast = toast
  Vue.prototype.$loading = loading
  Vue.prototype.$success = success
  Vue.prototype.$fail = fail
}

export default install
