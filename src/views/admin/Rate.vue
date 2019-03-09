<template>
  <div>
    <x-header title="汇率管理"><router-link :to="{name: 'AddRate'}" slot="right" >新增</router-link></x-header>
    <div style="margin-top: 15px"></div>
    <flexbox v-for="area in rlist" :key="area.id" style="margin-top: 10px;border-bottom: 10px solid #F5F5F5;">

        <flexbox-item :span="1"></flexbox-item>
        <flexbox-item :span="2" class=""><img :src="area.flag" class="flag"/></flexbox-item>
        <flexbox-item :span="3">{{area.area}}</flexbox-item>
        <flexbox-item :span="2">{{area.ratem}}</flexbox-item>
        <flexbox-item><x-button mini @click.native="changeRate(area.id)">修改</x-button></flexbox-item>
    </flexbox>
    <confirm v-model="showDialog"
             show-input
             title="汇率"
             theme="android"
             placeholder="请输入小数位数不超过4位"
             :input-attrs="{type: 'number'}"
             @on-cancel="onCancel"
             @on-confirm="onConfirm">
    </confirm>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem,XHeader ,Divider,Cell,Group,XButton,TransferDomDirective as TransferDom,Confirm  } from 'vux'
import axios from 'axios'
import {config} from "../../utils/global"
export default {
  name: "Rate",
  inject: ['reload'],
  components: {
    Flexbox,
    FlexboxItem,
    XHeader,
    Divider,
    Cell,
    Group,
    XButton,
    Confirm
  },
  data() {
    return {
      rlist: [],
      ratem: '89op',
      showDialog: false,
      id: 0
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    onCancel() {
      this.showDialog = false
    },
    onConfirm(val) {
      this.showDialog = true
      const url = config.base_url + '/rate/change?ratem=' + val + '&id=' + this.id
      axios
        .post(url)
        .then(response=>{
          this.$vux.toast.text('汇率修改成功！', 'bottom')
        })
      this.reload()
    },
    changeRate(id) {
      this.showDialog = true
      this.id = id
    },
    init() {
      const url = config.base_url + '/rate/list'
      axios
        .get(url)
        .then(response=>{
          let data = response.data.data
          for (let i = 0; i < data.length;i++){
            data[i].flag = config.image_url + data[i].flag
          }
          this.rlist = data
        })
    }
  }
}
</script>

<style scoped>
  .flag{
    width: 60px;
    height: auto;
  }
</style>
