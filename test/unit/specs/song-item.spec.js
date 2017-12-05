import Vue from 'vue'
import songItem from '@/components/song-item'

describe('songItem', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(songItem)
    const vm = new Constructor({
      propsData: {
        data: {
          songname: '呵呵',
          singer: '呵呵2'
        }
      }
    }).$mount()
    expect(vm.$el.querySelector('.name').textContent)
    .to.equal('呵呵')
    expect(vm.$el.querySelector('.singer').textContent)
    .to.equal('呵呵2')
  })
})
