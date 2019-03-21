<template>
  <div>
    <x-header  :left-options="{showBack: false}">汇率换算</x-header>
    <flexbox class="wrapper cfont">
      <flexbox-item :span="2"><img src="../assets/img/china.svg" class="flag"/></flexbox-item>
      <flexbox-item :span="6">CNY</flexbox-item>
      <flexbox-item :span="4">
        <x-input type="number" v-model="money" @on-focus="del()"></x-input>
      </flexbox-item>
    </flexbox>
    <flexbox v-for="country in countries" :key="country.id" class="bodywrapper bodyfont">
      <flexbox-item class="ml15"></flexbox-item>
      <flexbox-item :span="2" class=""><img :src="country.flag" class="flag"/></flexbox-item>
      <flexbox-item :span="6">{{country.area}}</flexbox-item>
      <flexbox-item :span="4">
        <span><b style="font-size: 20px">{{country.ratem * money | numFilter}}</b></span>
        <br/>
        <p class="typefont">{{country.type}}</p>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import {Flexbox, FlexboxItem, XHeader, XButton, Group, XInput, Divider} from 'vux'
import { config } from "../utils/global"
import axios from 'axios'
export default {
  name: "Exchange",
  components: {
    FlexboxItem,
    Flexbox,
    XHeader,
    XButton,
    XInput,
    Group,
    Divider
  },
  data() {
    return {
      money: 100,
      countries: [
        // {
        //   id: 1,
        //   name: 'HKD',
        //   rate: 1.17,
        //   type: '港币',
        //   flag: 'http://localhost:8006/image/hk.svg'
        // },
        // {
        //   id: 2,
        //   name: 'USD',
        //   rate: 0.6,
        //   type: '美元',
        //   flag: 'http://localhost:8006/image/us.svg'
        // },
        // {
        //   id: 3,
        //   name: 'EUR',
        //   rate: 0.15,
        //   type: '欧元',
        //   flag: 'http://localhost:8006/image/eur.svg'
        // },
        // {
        //   id: 4,
        //   name: 'JPY',
        //   rate: 16,
        //   type: '日元',
        //   flag: 'http://localhost:8006/image/jpy.svg'
        // }
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const url = config.base_url + '/rate/list'
      axios
        .get(url)
        .then(response=>{
          for (let i = 0; i < response.data.data.length;i++){
            response.data.data[i].flag = config.image_url + response.data.data[i].flag
          }
          this.countries = response.data.data
        })
    },
    del(value, event) {
      this.money = 0
    }
  },
  filters: {

    numFilter(value) {

      // 截取当前数据到小数点后两位

      let realVal = parseFloat(value).toFixed(2)

      // num.toFixed(2)获取的是字符串

      return parseFloat(realVal)

    }

  }
}
</script>

<style scoped>
.flag{
  width: 60px;
  height: auto;
}
.wrapper{
  margin-top: 15px;
  margin-left: 20px;
  margin-right: 15px;
}
  .cfont{
    align-items: center;
    font-size: 22px;
  }
  .bodywrapper{
    padding-top: 15px;
    padding-bottom: 15px;
    background-color: lightslategray;
    color: #ffffff;
    padding-right: 15px;
    border-bottom: 1px solid #F5F5F5;

  }
  .ml15{
    margin-left: 15px;
  }
  .typefont{
    font-size: 10px;
  }
</style>
