<template>
  <div>
    <x-header>行程管理</x-header>
    <flexbox  orient="vertical">
      <flexbox-item v-for="plan in plans" :key="plan.id" style="margin-top: 10px;border-bottom: 10px solid #F5F5F5;">
        <div @click="del(plan.id)">
          用户名：{{plan.username}}
          <br/>
          行程标题：{{plan.title}}
          <br/>
          目的地: {{plan.destination}}
        </div>
      </flexbox-item>
    </flexbox>
      <confirm v-model="showConfirm"
               title="温馨提示"
               theme="android"
               confirm-text="删除"
               @on-cancel="onCancel"
               @on-confirm="onConfirm(delid)">
        <p style="text-align:left;">删除后数据不可恢复！</p>
      </confirm>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem,XHeader ,Divider,Cell,Group,XButton,TransferDomDirective as TransferDom,Confirm  } from 'vux'
import axios from 'axios'
import {config} from "../../utils/global"
export default {
  name: "Trip",
  inject: ['reload'],
  directives: {
    TransferDom
  },
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
    return{
      plans: [],
      showConfirm: false,
      delid: 0
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    onConfirm(id) {
      const url = config.base_url + '/plan/del?id=' + id
      axios
        .delete(url)
        .then(response=>{
          this.$vux.toast.text('删除成功！', 'bottom')
          this.reload()
        })
      this.showConfirm = false
    },
    onCancel() {
      this.showConfirm = false
    },
    del(id) {
      this.showConfirm = true
      this.delid = id
    },
    init() {
      const url = config.base_url + '/plan/list?id=1'
      axios
        .get(url)
        .then(response=>{
          let data = response.data
          for (let i = 0; i < data.length;i++){
            data[i].avatar = config.image_url + data[i].avatar
            data[i].cover = config.image_url + data[i].cover
          }
          this.plans = data
        })
    }
  }
}
</script>

<style scoped>

</style>
