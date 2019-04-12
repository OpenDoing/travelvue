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
import Line from '@/views/Line'
import AdminHome from '@/views/AdminHome'
import User from '@/views/admin/User'
import Trip from '@/views/admin/Trip'
import Rate from '@/views/admin/Rate'
import Comment from '@/views/admin/Comment'
import AddRate from '@/views/admin/AddRate'
import PersonInfo from '@/views/PersonInfo'
import UComment from '@/views/admin/UComment'
import UPlan from '@/views/admin/UPlan'
import Account from '@/views/Account'
import Info from '@/views/Info'
import Exchange from '@/views/Exchange'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home/account',
      name: 'Account',
      component: Account
    },
    {
      path: '/home/info',
      name: 'Info',
      component: Info
    },
    {
      path: '/home/exchange',
      name: 'Exchange',
      component: Exchange
    },
    {
      path: '/home',
      name: 'Tabbar',
      component: Tabbar
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
    {
      path: '/info/:id',
      name: 'PersonInfo',
      component: PersonInfo
    },
    {
      path: '/line',
      name: 'Line',
      component: Line
    },
    {
      path: '/admin',
      name: 'AdminHome',
      component: AdminHome
    },
    {
      path: '/admin/user',
      name: 'User',
      component: User
    },
    {
      path: '/admin/trip',
      name: 'Trip',
      component: Trip
    },
    {
      path: '/admin/trip/:id',
      name: 'UPlan',
      component: UPlan
    },
    {
      path: '/admin/rate',
      name: 'Rate',
      component: Rate
    },
    {
      path: '/admin/comment',
      name: 'Comment',
      component: Comment
    },
    {
      path: '/admin/comment/:id',
      name: 'UComment',
      component: UComment
    },
    {
      path: '/admin/addrate',
      name: 'AddRate',
      component: AddRate
    }

  ]
})
