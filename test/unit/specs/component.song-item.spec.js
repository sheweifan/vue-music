import Vue from 'vue'
import { createVue } from '../utils'
import songItem from '@/components/song-item'

Vue.component(songItem.name, songItem)

describe('component song-item', () => {
  let clickTimes = 0
  const vm = createVue({
    template: `
      <song-item
        :data="data"
        @click="handleClick"
      ></song-item>
    `,
    data(){
      return {
        data: {
          songname: '呵呵',
          singer: '呵呵2'
        }
      }
    },
    methods: {
      handleClick(){
        clickTimes++
      }
    }
  })

  it('songname', done => {
    const el = vm.$el.querySelector('.name')
    expect(el.textContent).to.equal('呵呵')
    done()
  })

  it('singer', done => {
    const el = vm.$el.querySelector('.singer')
    expect(el.textContent).to.equal('呵呵2')
    done()
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
