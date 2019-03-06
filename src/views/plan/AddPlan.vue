<template>
  <div>
    <x-header>发布约计划</x-header>
    <flexbox class="bordert">
      <flexbox-item class="borderb borderr borderl">
        <group>
          <x-input v-model="title" required  placeholder="请输入行程标题"></x-input>
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
    <flexbox>
      <flexbox-item>
        <el-upload
        class="avatar-uploader"
        :action="local"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :data="uploadData"
        name="file">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      </flexbox-item>
      <flexbox-item><--建议添加横版图片</flexbox-item>
    </flexbox>
    <flexbox class="mt15">
      <flexbox-item :span="3"></flexbox-item>
      <flexbox-item :span="6">
        <x-button type="warn" class="butBg" @click.native="addPlan">添加约伴计划</x-button>
      </flexbox-item>
    </flexbox>

  </div>
</template>

<script>
import {Flexbox, FlexboxItem, XHeader, XButton, Group, XInput, Divider, Datetime, Selector, XTextarea,Calendar,Cell   } from 'vux'
import Uploader from 'vux-uploader'
import {config} from "../../utils/global"
import axios from 'axios'
export default {
  name: "AddPlan",
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
    Cell
  },
  data() {
    return {
      local: 'http://localhost:8006/plan/cover/',
      uploadData: {
        userId: this.$cookies.get('userId')
      },
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
      imageUrl: '',
      imgaddress: ''
      // varmax: 2,
      // uploadUrl: '',
      // params: {},
      // images: [
      //   { url: 'http://localhost:8006/image/7b18f34c-f533-4605-9172-7c89a8d25e19.jpg' }
      // ]
    }
  },
  methods: {

    onConfirmS (val) {
      this.stime = val
    },
    onConfirmE (val) {
      this.etime = val
    },
    log (str1, str2 = '') {
      console.log(str1, str2)
    },
    handleAvatarSuccess(response, file, fileList) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.imgaddress = response.data

    },
    addPlan() {
      const url = config.base_url + '/plan/add'
      const way = this.list[this.way - 1].value
      const userId = this.$cookies.get('userId')
      if (this.imgaddress) {
        axios
          .post(url,{
            userId: userId,
            title: this.title,
            start: this.start,
            destination: this.destination,
            stime: this.stime,
            etime: this.etime,
            budget: this.budget,
            people: this.people,
            fee: way,
            description: this.description,
            cover: this.imgaddress
          })
          .then(response=>{
            this.$vux.toast.text('添加计划成功！', 'bottom')
            console.log(response)
          })
      } else {
        this.$vux.toast.text('等等，图片还在上传！', 'bottom')
      }

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
