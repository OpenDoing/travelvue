import Vue from 'vue'
import Router from 'vue-router'
import Tabbar from '@/views/Tabbar'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Tab',
      component: Tabbar
    },
  ]
})
