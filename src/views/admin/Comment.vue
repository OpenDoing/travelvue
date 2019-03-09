<template>
  <div>
    <x-header>评论管理</x-header>
    <flexbox  orient="vertical">
      <flexbox-item v-for="comment in comments" :key="comment.id" style="margin-top: 10px;border-bottom: 10px solid #F5F5F5;">
        <div @click="del(comment.id)">
          用户名：{{comment.username}}
          <br/>
          评论内容：{{comment.content}}
          <br/>
          评论时间: {{comment.ctime}}
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
  name: "Comment",
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
    return{
      comments: [],
      showConfirm: false,
      delid: 0
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    onConfirm(id) {
      const url = config.base_url + '/comment/del?id=' + id
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
    init(){
      const url = config.base_url + '/comment/list'
      axios
        .get(url)
        .then(response=>{
          this.comments = response.data.data
        })
    }
  }
}
</script>

<style scoped>

</style>
