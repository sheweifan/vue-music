/* eslint-disable */
import Vue from 'vue'
// import Element from 'main/index.js'

// Vue.use(Element)

let id = 0

const createElm = function() {
  const elm = document.createElement('div')

  elm.id = 'app' + ++id
  document.body.appendChild(elm)

  return elm
}

/**
 * 回收 vm
 * @param  {Object} vm
 */
exports.destroyVM = function(vm) {
  vm.$destroy && vm.$destroy()
  vm.$el &&
  vm.$el.parentNode &&
  vm.$el.parentNode.removeChild(vm.$el)
}

/**
 * 创建一个 Vue 的实例对象
 * @param  {Object|String}  Compo   组件配置，可直接传 template
 * @param  {Boolean=false} mounted 是否添加到 DOM 上
 * @return {Object} vm
 */
exports.createVue = function(Compo, mounted = false) {
  if (Object.prototype.toString.call(Compo) === '[object String]') {
    Compo = { template: Compo }
  }
  return new Vue(Compo).$mount(mounted === false ? null : createElm())
}

/**
 * 创建一个测试组件实例
 * @link http://vuejs.org/guide/unit-testing.html#Writing-Testable-Components
 * @param  {Object}  Compo          - 组件对象
 * @param  {Object}  propsData      - props 数据
 * @param  {Boolean=false} mounted  - 是否添加到 DOM 上
 * @return {Object} vm
 */
exports.createTest = function(Compo, propsData = {}, mounted = false) {
  if (propsData === true || propsData === false) {
    mounted = propsData
    propsData = {}
  }
  const elm = createElm()
  const Ctor = Vue.extend(Compo)
  return new Ctor({ propsData }).$mount(mounted === false ? null : elm)
}

/**
 * 触发一个事件
 * mouseenter, mouseleave, mouseover, keyup, change, click 等
 * @param  {Element} elm
 * @param  {String} name
 * @param  {*} opts
 */
exports.triggerEvent = function(elm, name, ...opts) {
  let eventName

  if (/^mouse|click/.test(name)) {
    eventName = 'MouseEvents'
  } else if (/^key/.test(name)) {
    eventName = 'KeyboardEvent'
  } else {
    eventName = 'HTMLEvents'
  }
  const evt = document.createEvent(eventName)

  evt.initEvent(name, ...opts)
  elm.dispatchEvent
    ? elm.dispatchEvent(evt)
    : elm.fireEvent('on' + name, evt)

  return elm
}

/**
 * 触发 “mouseup” 和 “mousedown” 事件
 * @param {Element} elm
 * @param {*} opts
 */
exports.triggerClick = function(elm, ...opts) {
  exports.triggerEvent(elm, 'mousedown', ...opts)
  exports.triggerEvent(elm, 'mouseup', ...opts)

  return elm
}

// https://github.com/ustbhuangyi/better-scroll/blob/master/test/unit/utils/event.js
export function createEvent (type, name) {
  const e = document.createEvent(type || 'Event')
  e.initEvent(name, true, true)
  return e
}

export function dispatchTouch (target, name = 'touchstart', touches) {
  const event = createEvent('', name)
  event.touches = event.targetTouches = event.changedTouches = Array.isArray(touches) ? touches : [touches]
  target.dispatchEvent(event)
}

export function dispatchTouchStart (target, touches) {
  dispatchTouch(target, 'touchstart', touches)
}

export function dispatchTouchMove (target, touches) {
  dispatchTouch(target, 'touchmove', touches)
}

export function dispatchTouchEnd (target, touches) {
  dispatchTouch(target, 'touchend', touches)
}

export function dispatchSwipe (target, touches, duration, cb) {
  if (!Array.isArray(touches)) {
    touches = [touches]
  }
  dispatchTouchStart(target, touches[0])
  const moveAndEnd = () => {
    dispatchTouchMove(target, touches[1] || touches[0])
    dispatchTouchEnd(target, touches[2] || touches[1] || touches[0])
    cb && cb()
  }
  if (duration) {
    setTimeout(moveAndEnd, duration)
  } else {
    moveAndEnd()
  }
}
