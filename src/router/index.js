import Vue from 'vue'
import Router from 'vue-router'
import Tabbar from '@/views/Tabbar'
import Detail from '@/views/plan/Detail'
import AddPlan from '@/views/plan/AddPlan'
import AddMoney from '@/views/money/AddMoney'
import LinePage from '@/views/money/LinePage'
import EditMoney from '@/views/money/EditMoney'
import Password from '@/views/info/Password'
import Profile from '@/views/info/Profile'
import Login from '@/views/Login'
import Register from '@/views/Register'
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
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
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
    {
      path: '/money/add/:id',
      name: 'AddMoney',
      component: AddMoney
    },
    {
      path: '/money/line/:id',
      name: 'LinePage',
      component: LinePage
    },
    {
      path: '/money/edit/:id',
      name: 'EditMoney',
      component: EditMoney
    },
    {
      path: '/info/password/:id',
      name: 'Password',
      component: Password
    },
    {
      path: '/info/edit/:id',
      name: 'Profile',
      component: Profile
    },
  ]
})
