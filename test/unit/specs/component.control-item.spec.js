import Vue from 'vue'
import { createVue } from '../utils'
import controlItem from '@/components/control-item'

Vue.component(controlItem.name, controlItem)

const propsData = {
  icon: 'collect',
  slot: '标题',
  btns: [
    {
      name: 'collect',
      classname: 'collect',
      onClick: () => {
        console.log(111)
      }
    },
    {
      name: 'collect'
    }
  ]
}

describe('component control-item', () => {
  let clickTimes = 0
  const vm = createVue({
    template: `<control-item 
      :icon="icon"
      :btns="btns"
      @click="handleClick"
    >
      {{ slot }}
    </control-item>`,
    data(){
      return propsData
    },
    methods: {
      handleClick () {
        clickTimes++
      }
    }
  })

  it('slot', done => {
    const el = vm.$el.querySelector('.control-item-title')
    expect(el.textContent).to.contain(propsData.slot)
    done()
  })

  it('icon', done => {
    const el = vm.$el.querySelectorAll('.left-icon')
    expect(el.length).to.equal(1)
    done()
  })

  it('btns', done => {
    const el = vm.$el.querySelector('.control-item-btns').querySelectorAll('i')
    expect(el.length).to.equal(propsData.btns.length)
    done()
  })

  it('btns', done => {
    const el = vm.$el
    el.click()
    setTimeout(() => {
      expect(clickTimes).to.equal(1)
      done()
    }, 200)
  })
})
