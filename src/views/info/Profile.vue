<template>
  <div>
    <x-header>编辑资料</x-header>
    <group>
      <x-input title="昵&emsp;&emsp;&nbsp;称" v-model="username" disabled ></x-input>
      <datetime title="生&emsp;&emsp;&nbsp;日" v-model="birth" value-text-align="left"></datetime>
      <selector title="情感状态" v-model="emotion" :options="list"></selector>
      <x-address title="地&emsp;&emsp;&nbsp;址" v-model="address" :list="addressData" placeholder="请选择地址" @on-shadow-change="addressPicker"></x-address>
      <popup-picker title="性&emsp;&emsp;&nbsp;别" :data="sexlist" v-model="sex" value-text-align="right"></popup-picker>
      <x-input title="手&emsp;&emsp;&nbsp;机" v-model="phone" required></x-input>

    </group>
    <flexbox class="mt40">
      <flexbox-item :span="3"></flexbox-item>
      <flexbox-item :span="6">
        <x-button type="primary" class="btnbor" @click.native="updateInfo">提交</x-button>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem,XHeader ,Divider,Cell,Group,XInput,Datetime,PopupPicker,Selector,XAddress, ChinaAddressV4Data,XButton,Value2nameFilter as value2name  } from 'vux'
import {config} from "../../utils/global";
import axios from 'axios'

export default {
  name: "Profile",
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
      address: [],
      addressData: ChinaAddressV4Data,
      username: '',
      birth: '',
      emotion: 3,
      list: [
        { key: 1, value: '单身' },
        { key: 2, value: '热恋' },
        { key: 3, value: '保密' },
      ],
      sexlist: [['男', '女']],
      sex: ['男'],
      where: '',
      phone: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    addressPicker(value) {
      this.where = value2name(value, ChinaAddressV4Data)
    },
    init() {
      const userId = localStorage.getItem('userId')
      const url = config.base_url + '/user/get?userId=' + userId
      axios
        .get(url)
        .then(response=>{
          const data = response.data
          this.username = data.data.username
          this.birth = data.data.birth.substring(0,10)
          this.phone = data.data.phone
          // this.address = data.data.address
          if (data.data.emotion === '单身') {
            this.emotion = 1
          } else if (data.data.emotion === '热恋') {
            this.emotion = 2
          } else {
            this.emotion = 3
          }
        })
    },
    updateInfo() {
      console.log(this.sex)
      const userId = localStorage.getItem('userId')
      const url = config.base_url + '/user/change?userId=' + userId + '&sex=' + this.sex + '&birth=' + this.birth
                  + '&phone=' + this.phone + '&address=' + this.where + '&emotion=' + this.list[this.emotion - 1].value
      axios
        .post(url)
        .then(response=>{
          this.$vux.toast.text('信息修改成功!', 'bottom')
        })
    }
  }
}
</script>

<style scoped>
  .btnbor{
    border-radius: 20px;
  }

  .mt40{
    margin-top: 40px;
  }
</style>
