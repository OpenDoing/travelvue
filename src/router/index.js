import Vue from 'vue'
import Router from 'vue-router'
import Tabbar from '@/views/Tabbar'
import Detail from '@/views/plan/Detail'
import AddPlan from '@/views/plan/AddPlan'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Tab',
      component: Tabbar
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/plan/:id',
      name: 'AddPlan',
      component: AddPlan
    },
  ]
})
