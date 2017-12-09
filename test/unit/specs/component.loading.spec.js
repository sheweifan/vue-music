import Vue from 'vue'
import { createVue } from '../utils'
import loading from '@/components/loading'

Vue.component(loading.name, loading)

describe('component loading', () => {
  const vm = createVue({
    template: `
      <loading :height="300"/>
    `
  })
  it('render', done => {
    const el = vm.$el
    expect(el.style.height).to.equal('300px')
    done()
  })
})
