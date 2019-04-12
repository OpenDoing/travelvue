<template>
  <div>
    <x-header title="修改约计划"></x-header>
    <!--<div slot="right" @click="del(id)">删除</div>-->
    <flexbox class="bordert">
      <flexbox-item class="borderb borderr borderl">
        <group>
          <x-input v-model="title" required  placeholder="行程标题"></x-input>
        </group>
      </flexbox-item>
    </flexbox>
    <flexbox class="borderb">
      <flexbox-item class="borderr borderl">
        <group>
          <x-input v-model="start" required placeholder="出发地">
            <img slot="label" src="../../assets/img/start.svg" class="place"/>
          </x-input>
        </group>
      </flexbox-item>

      <flexbox-item class="borderr">
        <group>
          <x-input v-model="destination" required placeholder="目的地">
            <img slot="label" src="../../assets/img/destination.svg" class="place"/>
          </x-input>
        </group>
      </flexbox-item>
    </flexbox>
    <flexbox class="borderb">
      <flexbox-item class="borderr borderl" >
        <group>
          <calendar title="启程" v-model="stime" @on-change="onConfirmS"></calendar>
        </group>
      </flexbox-item>
      <flexbox-item class="borderr">
        <group>
          <calendar title="结束" v-model="etime" @on-change="onConfirmE"></calendar>
        </group>
      </flexbox-item>
    </flexbox>

    <flexbox class="borderb">
      <flexbox-item class="borderr borderl">
        <group>
          <x-input title="人数限制" required v-model="people" type="number"></x-input>
        </group>
      </flexbox-item>
    </flexbox>

    <flexbox class="borderb">
      <flexbox-item class="borderr borderl">
        <group>
          <x-input title="人均预算" required v-model="budget" type="number"></x-input>
        </group>
      </flexbox-item>
    </flexbox>

    <flexbox class="borderb">
      <flexbox-item class="borderr borderl">
        <group>
          <selector title="费用方式" v-model="way" :options="list"></selector>
        </group>
      </flexbox-item>
    </flexbox>

    <flexbox class="borderb">
      <flexbox-item class="borderr borderl">
        <group>
          <x-textarea v-model="description" placeholder="约伴计划详情描述"></x-textarea>
        </group>
      </flexbox-item>
    </flexbox>
    <flexbox class="mt15">
      <flexbox-item :span="3"></flexbox-item>
      <flexbox-item :span="6">
        <x-button type="warn" class="butBg" @click.native="updatePlan">提交修改</x-button>
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
  import {Flexbox, FlexboxItem, XHeader, XButton, Group, XInput, Divider, Datetime, Selector, XTextarea,Calendar,Cell ,Confirm  } from 'vux'
  import Uploader from 'vux-uploader'
  import {config} from "../../utils/global"
  import axios from 'axios'
  export default {
    name: "UPlan",
    components: {
      FlexboxItem,
      Flexbox,
      XHeader,
      XButton,
      XInput,
      Group,
      Divider,
      Datetime,
      Selector,
      XTextarea,
      Calendar,
      Uploader,
      Cell,
      Confirm
    },
    data() {
      return {
        id: this.$route.params.id,
        showConfirm: false,
        title: '',
        start: '',
        destination: '',
        stime: '',
        etime: '',
        budget: 100,
        description: '',
        way: 1,
        list: [
          { key: 1, value: 'AA' },
          { key: 2, value: '男A女免' },
          { key: 3, value: '免费（我请客）' },
        ],
        detail: '',
        people: 0,
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
      init() {
        const url = config.base_url + '/plan/get?id=' + this.$route.params.id
        axios
          .get(url)
          .then(response=>{
            console.log(response)
            this.title = response.data.data.title
            this.start = response.data.data.start
            this.destination = response.data.data.destination
            this.people = response.data.data.people
            this.description = response.data.data.description
            this.stime = response.data.data.stime
            this.etime = response.data.data.etime
          })
      },
      onConfirmS (val) {
        this.stime = val
      },
      onConfirmE (val) {
        this.etime = val
      },
      log (str1, str2 = '') {
        console.log(str1, str2)
      },
      updatePlan() {
        const way = this.list[this.way - 1].value
        const url = config.base_url + '/plan/change?id=' + this.$route.params.id + '&title=' + this.title + '&start=' + this.start
          + '&destination=' + this.destination + '&budget=' + this.budget + '&people=' + this.people + '&fee=' + way + '&description=' + this.description
          + '&stime=' + this.stime + '&etime=' + this.etime
        const userId = localStorage.getItem('userId')
          axios
            .post(url)
            .then(response=>{
              this.$vux.toast.text('提交成功！', 'bottom')
              console.log(response)
            })
      }
    }
  }
</script>

<style scoped>
  .bordert{
    border-top: 10px solid #F5F5F5;
  }
  .borderb{
    border-bottom: 10px solid #F5F5F5;
  }
  .borderl{
    border-left: 10px solid #F5F5F5;
  }
  .borderr{
    border-right: 10px solid #F5F5F5;
  }

  .vux-x-icon {
    fill: #F70968;
  }
  .place{
    width: 28px;
    height: 28px;
    vertical-align: middle;
    margin-right: 12px;

  }
  .butBg{
    background-color:#F70968;
  }
  .mt15{
    margin-top: 15px;
  }
  .avatar-uploader .el-upload {
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    margin-left: 15px;
    margin-top: 15px;
    border-radius: 16px;
    border: 1px solid #d9d9d9;
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    margin-left: 15px;
    margin-top: 15px;
    width: 178px;
    height: auto;
    display: block;
  }
</style>
