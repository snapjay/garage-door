// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'

import VueSocketio from 'vue-socket.io'

import VueMaterial from 'vue-material'

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css' // This line here

Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.use(VueSocketio, 'http://192.168.3.130:3000')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App},
  sockets: {
    connect: function () {
      console.log('socket connected')
    }
  }
})
