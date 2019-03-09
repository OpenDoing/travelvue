<template>
  <div>
    <x-header>个人主页</x-header>
    <flexbox>
      <flexbox-item :span="4"></flexbox-item>
      <flexbox-item><img :src="user.avatar" class="avatar"/></flexbox-item>
    </flexbox>
    <group>
      <x-input title="昵&emsp;&emsp;&nbsp;称" v-model="user.username" disabled></x-input>
      <x-input title="生&emsp;&emsp;&nbsp;日" v-model="user.birth.substring(0,10)" disabled></x-input>
      <x-input title="情感状态" v-model="user.emotion" disabled></x-input>
      <x-input title="地&emsp;&emsp;&nbsp;址" v-model="user.address" disabled></x-input>
      <x-input title="性&emsp;&emsp;&nbsp;别" v-model="user.sex" disabled></x-input>
      <x-input title="手&emsp;&emsp;&nbsp;机" v-model="user.phone" disabled></x-input>
    </group>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem,XHeader ,Divider,Cell,Group,XInput,Datetime,PopupPicker,Selector,XAddress, ChinaAddressV4Data,XButton,Value2nameFilter as value2name  } from 'vux'
import {config} from "../utils/global"
import axios from 'axios'
export default {
  name: "PersonInfo",
  components: {
    Flexbox,
    FlexboxItem,
    XHeader,
    Divider,
    Cell,
    Group,
    XInput,
    Datetime,
    PopupPicker,
    Selector,
    XAddress,
    XButton
  },
  data() {
    return {
      user: {}
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const id = this.$route.params.id
      const url = config.base_url + '/user/get?userId=' + id
      axios
        .get(url)
        .then(response=>{
          response.data.data.avatar = config.image_url + response.data.data.avatar
          this.user = response.data.data
        })
    }
  }
}
</script>

<style scoped>
.avatar{
  width: 100px;
  height: auto;
  border-radius: 100px;
}
</style>
