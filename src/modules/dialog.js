import Vue from 'vue'
import Component from '../components/Dialog.vue'

const Dialog = Vue.extend(Component)
/**
 * 弹窗方法
 * @param {Object} opts
 * @param {String} opts.title
 * @param {Array} opts.buttons
 * @param {Function} opts.onClose
 * @returns {Promise}
 * @example
 *  $dialog({
      title: 'hehe',
      onClose: function()
      buttons:[{
        label: '取消'
      },
      {
        label: '确定',
        onClick: function(){}
      }]
    })
 */
export const dialog = (opts) => {
  // 如果是标题,就是默认按钮项
  if (typeof opts === 'string') {
    opts = {
      title: opts
    }
  }
  const { onClose, ...propsData } = opts
  const comp = new Dialog({
    propsData
  })
  const vm = comp.$mount()
  document.body.appendChild(vm.$el)
  return new Promise((resolve, reject) => {
    vm.$on('close', (...args) => {
      const index = args[1]
      document.body.removeChild(vm.$el)
      vm.$destroy()
      onClose && onClose(...args)
      // 正常引导操作都是按钮最后一个, 根据这个判断promise,
      // 如果不是最后一个通过buttons.onClick也可以准确知道点击,这种情况就不要调then就可以了
      index === vm.buttons.length - 1 ? resolve(...args) : reject(...args)
    })
  })
}

const install = (Vue) => {
  Vue.component(Component.name, Component)
  Vue.prototype.$dialog = dialog
}

export default install
