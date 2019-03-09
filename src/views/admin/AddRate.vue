<template>
  <div>
    <x-header>新增汇率</x-header>
    <flexbox>
      <flexbox-item>
        <group>
          <x-input v-model="area" title="地区" required/>
          <x-input v-model="type" title="币种" placeholder="货币类型" required/>
          <x-input v-model="ratem" type="number" title="地区" required/>
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
          name="file">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </flexbox-item>
      <flexbox-item>添加国旗</flexbox-item>
    </flexbox>
    <flexbox>
      <flexbox-item :span="3"></flexbox-item>
      <flexbox-item :span="6">
        <x-button @click.native="addRate">提交</x-button>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem,XHeader ,Divider,Cell,Group,XButton,TransferDomDirective as TransferDom,Confirm,XInput  } from 'vux'
import axios from 'axios'
import {config} from "../../utils/global"
export default {
  name: "AddRate",
  components: {
    Flexbox,
    FlexboxItem,
    XHeader,
    Divider,
    Cell,
    Group,
    XButton,
    Confirm,
    XInput
  },
  data() {
    return{
      local:config.base_url + '/rate/flag',
      area: '',
      type: '',
      ratem: 0.0,
      imageUrl: '',
      imgaddress: ''
    }
  },
  methods: {
    handleAvatarSuccess(response, file, fileList) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.imgaddress = response.data
    },
    addRate() {
      const url = config.base_url + '/rate/add'
      if (this.imgaddress) {
        axios
          .post(url,{
            area: this.area,
            type: this.type,
            ratem: this.ratem,
            flag: this.imgaddress
          })
          .then(response=>{
            this.$vux.toast.text('添加地区成功！', 'bottom')
            console.log(response)
          })
      } else {
        this.$vux.toast.text('等等，国旗还在上传！', 'bottom')
      }

    }
  }
}
</script>

<style scoped>
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
</style>
