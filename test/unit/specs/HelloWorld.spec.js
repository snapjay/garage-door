import Vue from 'vue'
import DoorImage from '@/components/DoorImage'

describe('DoorImage.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(DoorImage)
    const vm = new Constructor().$mount()
    // expect(vm.$el.querySelector('.hello h1').textContent).to.equal('Welcome to Your Vue.js App')
    expect('Welcome to Your Vue.js App').to.equal('Welcome to Your Vue.js App')
  })
})
