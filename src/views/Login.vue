<template>
  <div>
    <!--<flexbox>-->
      <!--<flexbox-item :span="1"><img src="../../static/img/money/else/together.svg" class="loimg"></flexbox-item>-->
      <!--<flexbox-item ><h2>约伴同行</h2></flexbox-item>-->
    <!--</flexbox>-->
    <x-header class="" :left-options="{showBack: false}">登录</x-header>
    <flexbox>
      <flexbox-item>
        <img src="../../static/img/resource/home.jpg" class="home-cover"/>
      </flexbox-item>
    </flexbox>

    <flexbox orient="vertical">
      <flexbox-item>
        <group>
          <x-input v-model="username" placeholder="用户名" required>
            <img slot="label" src="../../static/img/resource/username.svg" class="ml15"/>
          </x-input>
        </group>
        <group>
          <x-input v-model="password" placeholder="密码" required type="password">
            <img slot="label" src="../../static/img/resource/password.svg" class="ml15"/>
          </x-input>
        </group>
      </flexbox-item>
      <flexbox-item>
        <flexbox>
          <flexbox-item :span="8"></flexbox-item>
          <flexbox-item><router-link :to="{name:'Register'}">新用户注册</router-link></flexbox-item>
        </flexbox>
      </flexbox-item>
    </flexbox>

    <flexbox class="mt40">
      <flexbox-item :span="3"></flexbox-item>
      <flexbox-item :span="6">
        <x-button type="primary" class="btnbor" @click.native="login">登录</x-button>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem,XHeader ,Divider,Cell,Group,XInput,XButton,Toast  } from 'vux'
import { config } from "../utils/global"
import axios from 'axios'
export default {
  name: "Login",
  components: {
    Flexbox,
    FlexboxItem,
    XHeader,
    Divider,
    Cell,
    Group,
    XInput,
    XButton,
    Toast
  },
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    login() {
      const url = config.base_url + '/user/login'
      axios
        .post(url,{
          username: this.username,
          password: this.password
        })
        .then(response => {
          let data = response.data
          console.log(data)
          if (data.errno === 0) {
            if (data.data.status === 1) {
              this.$cookies.set('userId', data.data.id, 60 * 60)
              this.$cookies.set('username', data.data.username,60 * 60)
              this.$router.push({path: '/'})
            } else {
              this.$vux.toast.text('您账号异常，已限制登录!', 'bottom')
            }
          }else if (data.errno === 403) {
            this.$vux.toast.text('账号密码不对', 'bottom')
          } else if (data.errno === 402) {
            this.$vux.toast.text('请输入正确的用户名！', 'bottom')
          } else {
            this.$vux.toast.text('登录出错！', 'bottom')
          }
        })
        .catch(error => {
          this.$vux.toast.text('不存在的用户名！', 'bottom')
        })
    }
  }

}
</script>

<style scoped>
.loimg{
  width: 40px;
}
  .btnbor{
    border-radius: 20px;
  }
.ml15{
  margin-left: 15px;
  margin-right: 15px;
}
  .mt40{
    margin-top: 40px;
  }
.home-cover {
  width: 100%;
  height: auto;
}
</style>
