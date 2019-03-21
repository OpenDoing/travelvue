<template>
  <div>
    <x-header class="headerbg" :left-options="{showBack: false}">个人中心</x-header>
    <flexbox style="margin-top: 20px">
      <flexbox-item :span="1"></flexbox-item>
      <flexbox-item :span="6">
        <flexbox orient="vertical">
          <flexbox-item><p style="font-size: 22px;"><b>{{username}}561</b></p></flexbox-item>
          <flexbox-item>ID:{{userId}}</flexbox-item>
        </flexbox>
      </flexbox-item>
      <flexbox-item :span="4">
        <!--<img src="../assets/logo.png" class="avatar">-->
        <el-upload
          class="avatar-uploader"
          :action="local"
          :show-file-list="false"
          :on-progress="uploadAva"
          :data="uploadData"
          name="file">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-picture avatar-uploader-icon"></i>
        </el-upload>
      </flexbox-item>

    </flexbox>
    <!--<flexbox style="margin-top: 20px;">-->
      <!--<flexbox-item :span="1"></flexbox-item>-->
      <!--<flexbox-item class="bg" style="border-radius: 10px">-->
        <!--<flexbox>-->
          <!--<flexbox-item :span="3" class="paddingimg">-->
            <!--<img src="../../static/img/money/else/plan.svg" class="plan"/>-->
          <!--</flexbox-item>-->
          <!--<flexbox-item>-->
            <!--<flexbox orient="vertical">-->
              <!--<flexbox-item><b>我创建的</b></flexbox-item>-->
              <!--<flexbox-item style="margin-top: 0">{{createNum}}条</flexbox-item>-->
            <!--</flexbox>-->
          <!--</flexbox-item>-->
        <!--</flexbox>-->
      <!--</flexbox-item>-->
      <!--<flexbox-item class="bg" style="border-radius: 10px;margin-left: 15px">-->
        <!--<flexbox>-->
          <!--<flexbox-item :span="3" class="paddingimg">-->
            <!--<img src="../../static/img/money/else/plan.svg" class="plan"/>-->
          <!--</flexbox-item>-->
          <!--<flexbox-item>-->
            <!--<flexbox orient="vertical">-->
              <!--<flexbox-item><b>我加入的</b></flexbox-item>-->
              <!--<flexbox-item style="margin-top: 0">{{joinNum}}条</flexbox-item>-->
            <!--</flexbox>-->
          <!--</flexbox-item>-->
        <!--</flexbox>-->
      <!--</flexbox-item>-->
      <!--<flexbox-item :span="1"></flexbox-item>-->
    <!--</flexbox>-->
    <flexbox style="margin-top: 30px" class="borderb"></flexbox>
    <flexbox orient="vertical">
      <flexbox-item>
        <group>
          <cell title="编辑资料" :link="'/info/edit/' + userId" >
            <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../static/img/money/else/edit.svg">
          </cell>

          <cell title="修改密码" :link="'/info/password/' + userId" >
            <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../static/img/money/else/password.svg">
          </cell>
          <cell title="切换账号"  @click.native="changeAccount">
            <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../static/img/money/else/login.svg">
          </cell>
        </group>
      </flexbox-item>
      <flexbox-item style="margin-top: 0">
        <group>

        </group>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem,XHeader ,Divider,Cell,Group  } from 'vux'
import axios from 'axios'
import {config} from "../utils/global"

export default {
  name: "Info",
  components: {
    Flexbox,
    FlexboxItem,
    XHeader,
    Divider,
    Cell,
    Group
  },
  data() {
    return {
      local: config.upload_avatar,
      uploadData: {
        userId: localStorage.getItem('userId')
      },
      userId: '',
      username: '',
      createNum: 0,
      joinNum: 0,
      imageUrl: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    changeAccount() {
      window.localStorage.clear();
      this.$router.push({path: '/'})
    },
    init() {
      const userId = localStorage.getItem('userId')
      const url = config.base_url + '/user/info?userId=' + userId
      axios
        .get(url)
        .then(response=>{
          let data = response.data
          this.username = data.data.username
          this.userId = data.data.id
          this.createNum = data.data.createNum
          this.joinNum = data.data.joinNum
          this.imageUrl = config.image_url + data.data.avatar
        })
    },
    uploadAva(response, file, fileList) {
      this.imageUrl = URL.createObjectURL(file.raw);
      // this.imageUrl = 'http://localhost:8006/image/nanjing.jpg'
    },
  }
}
</script>

<style scoped>
  .avatar{
    width: 70px;
    height: 70px;
    border-radius: 70px;
  }
  .plan{
    width: 38px;
  }
  .tleft{
    text-align: left;
    align-items: left;
  }
  .bg{
    background-color: #FFE9F5;
  }
  .borderb{
    border-bottom: 10px solid #F5F5F5;
  }
  .paddingimg{
    padding-left: 15px;padding-top: 10px;padding-bottom: 10px
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
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
</style>
