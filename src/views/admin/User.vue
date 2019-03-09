<template>
  <div>
    <x-header>用户管理</x-header>
    <flexbox orient="vertical" style="margin-top: 15px">
      <flexbox-item v-for="user in users" :key="user.id" style="margin-top: 15px;border-bottom: 10px solid #F5F5F5;">
        <flexbox>
          <flexbox-item :span="1"></flexbox-item>
          <flexbox-item :span="5">
            {{user.username}}
          </flexbox-item>
          <flexbox-item :span="3">
            <x-button mini type="warn" @click.native="limit(user.id)">限登</x-button>
          </flexbox-item>
          <flexbox-item :span="3">
            <x-button mini type="primary" @click.native="normal(user.id)">解封</x-button>
          </flexbox-item>
        </flexbox>
        <flexbox>
          <flexbox-item :span="1"></flexbox-item>
          <flexbox-item>
            当前状态：{{user.status === 1 ? '正常' : '异常'}}
          </flexbox-item>
        </flexbox>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem,XHeader ,Divider,Cell,Group,XButton  } from 'vux'
import axios from 'axios'
import {config} from "../../utils/global"
export default {
  name: "User",
  inject: ['reload'],
  components: {
    Flexbox,
    FlexboxItem,
    XHeader,
    Divider,
    Cell,
    Group,
    XButton
  },
  data() {
    return {
      users: [
        {
          id: 1,
          username: "556"
        },
        {
          id: 2,
          username: "556"
        },
        {
          id: 3,
          username: "556"
        },
        {
          id: 4,
          username: "556"
        }
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const url = config.base_url + '/user/users'
      axios
        .get(url)
        .then(response=>{
          this.users = response.data.data
        })
    },
    limit(id) {
      const url = config.base_url + '/user/status?status=0&userId=' + id
      axios
        .post(url)
        .then(response=>{
          this.$vux.toast.text('已限制该用户！', 'bottom')
        })
      this.reload()
    },
    normal(id) {
      const url = config.base_url + '/user/status?status=1&userId=' + id
      axios
        .post(url)
        .then(response=>{
          this.$vux.toast.text('已解封该用户！', 'bottom')
        })
      this.reload()

    }
  }
}
</script>

<style scoped>

</style>
