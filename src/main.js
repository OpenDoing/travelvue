// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import vueTap from 'v-tap'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueCookies from 'vue-cookies'
import  { ToastPlugin } from 'vux'
import Mui from 'vue-awesome-mui'
Vue.use(Mui)

Vue.use(ToastPlugin)
Vue.use(VueCookies)
Vue.use(ElementUI)
Vue.use(vueTap)
Vue.config.productionTip = false
Vue.use(MintUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
