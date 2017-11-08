<template lang="pug">
  transition(name="screen" 
              @enter="enter"
              @leave="leave"
              @after-enter="afterEnter"
              @after-leave="afterLeave")
    slot
</template>

<script>
  const getAnimateData = () => {
    const winW = window.innerWidth
    const winH = window.innerHeight
    const miniLeft = 10
    const miniBottom = 10
    const miniWidth = 48
    const bigTop = 65
    const bigWidth = winW * 0.8
    const x = -bigWidth / 2 - miniLeft / 2
    const y = winH - bigTop - bigWidth / 2 - miniBottom - miniWidth / 2
    const scale = miniWidth / bigWidth
    return {
      x,
      y,
      scale
    }
  }

  const setAnimate = (el, {x, y, scale}, time = 0.3) => {
    return new Promise((resolve, reject) => {
      el.style.webkitTransition = `transform ${time}s`
      el.style.transition = `transform ${time}s`
      el.style.webkitTransform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`

      // el.addEventListener('transitionend', resolve)
      setTimeout(() => {
        resolve()
        // el.style.transition = ` `
        // el.style.webkitTransition = ` `
      }, time * 1000)
    })
  }

  export default {
    name: 'sreen-ainimate',
    props: ['img'],
    methods: {
      enter: async function(dom, done){
        const el = this.$vnode.context.$refs[this.img]
        const opts = getAnimateData()
        await setAnimate(el, opts, 0)
        const opts2 = {
          x: 0,
          y: 0,
          scale: 1.05
        }
        await setAnimate(el, opts2, 0.2)
        const opts3 = {
          x: 0,
          y: 0,
          scale: 1
        }
        await setAnimate(el, opts3, 0.05)
        done()
      },
      leave: async function(dom, done){
        const el = this.$vnode.context.$refs[this.img]
        const opts = getAnimateData()
        await setAnimate(el, opts, 0.3)
        done()
      },
      afterEnter: function(){
        const el = this.$vnode.context.$refs[this.img]
        el.style.webkitTransition = ``
        el.style.transition = ``
        el.style.webkitTransform = ``
        el.style.transform = ``
      },
      afterLeave: function(){
        const el = this.$vnode.context.$refs[this.img]
        el.style.webkitTransition = ``
        el.style.transition = ``
        el.style.webkitTransform = ``
        el.style.transform = ``
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .screen-leave-active,
  .screen-enter-active
    opacity: 1
    transition: opacity 0.3s
    .player-head,
    .player-control
      transition: transform 0.3s ease-in
  .screen-enter,
  .screen-leave-to
    opacity: 0
    .player-head
      transform: translateY(-100%) translateZ(0)
    .player-control
      transform: translateY(100%) translateZ(0)
</style>
