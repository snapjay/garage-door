import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/Views/Main'
import Opener from '@/Views/Pages/Opener'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '/',
          name: 'Opener',
          component: Opener
        }
      ]
    }
  ]
})
