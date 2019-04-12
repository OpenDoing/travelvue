<template>
  <div>
    <x-header title="修改评论"><div slot="right" @click="del(id)">删除</div></x-header>
    <flexbox orient="vertical">
      <flexbox-item>
        <group>
          <x-input title="账号ID" required v-model="userid" disabled></x-input>
        </group>
      </flexbox-item>
      <flexbox-item>
        <group>
          <x-input title="评论内容" required v-model="content"></x-input>
        </group>
      </flexbox-item>
      <flexbox-item>
        <group>
          <x-input title="评论时间" required v-model="ctime" disabled></x-input>
        </group>
      </flexbox-item>
    </flexbox>

    <flexbox>
      <flexbox-item :span="3"></flexbox-item>
      <flexbox-item :span="6">
        <x-button type="primary" class="btnbor" @click.native="update">提交</x-button>
      </flexbox-item>
      <flexbox-item :span="3"></flexbox-item>
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
import { Flexbox, FlexboxItem, XHeader, XButton, Group, XInput, Swiper, SwiperItem, Tab, TabItem,Calendar,Confirm,TransferDomDirective as TransferDom } from 'vux'
import { config } from "../../utils/global"
import axios from 'axios'
export default {
  name: "UComment",
  components: {
    FlexboxItem,
    Flexbox,
    XHeader,
    XButton,
    Group,
    XInput,
    Swiper,
    SwiperItem,
    Tab,
    TabItem,
    Calendar,
    Confirm
  },
  data() {
    return{
      id: this.$route.params.id,
      showConfirm: false,
      userid: '',
      content: '',
      ctime: '',
      delid: 0
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const url = config.base_url + '/comment/get?id=' + this.$route.params.id
      axios
        .get(url)
        .then(response=>{
          this.userid = response.data.data.userId
          this.content = response.data.data.content
          this.ctime = response.data.data.ctime
        })
    },
    update() {
      const url = config.base_url + '/comment/change?id=' + this.id + '&content=' + this.content
      axios
        .post(url)
        .then(response=>{
          this.$vux.toast.text('更新成功！', 'bottom')
        })

    },
    del(id) {
      this.showConfirm = true
      this.delid = id
    },
    onCancel() {
      this.showConfirm = false
    },
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
  }
}
</script>

<style scoped>

</style>
