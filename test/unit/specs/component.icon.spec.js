import Vue from 'vue'
import _ from 'lodash'
import { createVue, triggerEvent } from '../utils'
import icon from '@/components/icon'

Vue.component(icon.name, icon)

const icons = [
  'shanchu',
  'guanbi',
  'icon-',
  'icon-1',
  'icon-2',
  'icon-3',
  'icon-4',
  'icon-5',
  'icon-6',
  'icon-7',
  'icon-8',
  'icon-9',
  'icon-10',
  'icon-11'
]

describe('component icon', () => {
  let clickTimes = 0
  const vm = createVue({
    template: `
      <div>
        <icon
          class="icon-test"
          v-for="(item, index) in icons"
          :key="index"
          :name="item"
          @click="handleClick"
          />
      </div>
    `,
    data(){
      return {
        icons
      }
    },
    methods: {
      handleClick(){
        clickTimes++
      }
    }
  })

  it('name', done => {
    const el = vm.$el.querySelectorAll('.icon-test')
    _.forEach(el, (item, index) => {
      const svg = item.querySelector('use')
      const name = svg.getAttribute('xlink:href')
      expect(svg).to.not.equal(null)
      expect(name).to.equal('#icon-' + icons[index])
    })
    done()
  })

  it('click', done => {
    const el = vm.$el.querySelectorAll('.icon-test')
    _.forEach(el, item => triggerEvent(item, 'click'))
    setTimeout(() => {
      expect(clickTimes).to.equal(icons.length)
      done()
    }, 200)
  })
})
