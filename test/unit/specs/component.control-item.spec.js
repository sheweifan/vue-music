import Vue from 'vue'
import _ from 'lodash'
import { createVue, triggerEvent } from '../utils'
import controlItem from '@/components/control-item'

Vue.component(controlItem.name, controlItem)

describe('component control-item', () => {
  let clickTimes = 0
  let clickBtnTimes = 0
  const propsData = {
    icon: 'collect',
    slot: '标题',
    btns: [
      {
        name: 'collect',
        classname: 'collect',
        onClick: () => {
          clickBtnTimes++
        }
      },
      {
        name: 'collect'
      }
    ]
  }

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

  it('btns && btns click', done => {
    const el = vm.$el.querySelector('.control-item-btns').querySelectorAll('i')
    _.forEach(el, item => {
      triggerEvent(item, 'click')
    })

    setTimeout(() => {
      expect(el.length).to.equal(propsData.btns.length)
      expect(clickBtnTimes).to.equal(1)
      done()
    }, 200)
  })

  it('click', done => {
    const el = vm.$el
    el.click()
    setTimeout(() => {
      expect(clickTimes).to.equal(1)
      done()
    }, 200)
  })
})
