<template>
  <div>
    <x-header :left-options="{showBack: true, backText: '返回'}" >注册</x-header>
    <!--<flexbox>-->
      <!--<flexbox-item :span="4"></flexbox-item>-->
      <!--<flexbox-item>-->
        <!--<el-upload-->
          <!--class="avatar-uploader"-->
          <!--:action="local"-->
          <!--:show-file-list="false"-->
          <!--:on-progress="diyupload"-->
          <!--:data="uploadData"-->
          <!--name="file">-->
          <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
          <!--<i v-else class="el-icon-picture avatar-uploader-icon"></i>-->
        <!--</el-upload>-->
      <!--</flexbox-item>-->
    <!--</flexbox>-->
    <flexbox>
      <flexbox-item>
        <group>
          <x-input title="用户名" v-model="username" required></x-input>
          <x-input title="密码" v-model="password" required type="password"></x-input>
          <datetime title="生日" v-model="birth" value-text-align="right"></datetime>
          <x-address
            title="地址"
            v-model="address"
            @on-shadow-change="addressPicker"
            :list="addressData"
            :raw-value="true"
            placeholder="请选择地址"></x-address>
          <selector title="情感状态" v-model="emotion" :options="list" direction="rtl"></selector>
          <popup-picker title="性别" :data="sexlist" v-model="sex" value-text-align="right"></popup-picker>
          <x-input title="手机号码" v-model="phone" required></x-input>
        </group>
      </flexbox-item>
    </flexbox>
    <flexbox class="mt40">
      <flexbox-item :span="3"></flexbox-item>
      <flexbox-item :span="6">
        <x-button type="primary" class="btnbor"  @click.native="reg">注册</x-button>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem,XHeader ,Divider,Cell,Group,XInput,XButton,Datetime,XAddress, ChinaAddressV4Data,PopupPicker,Selector,Value2nameFilter as value2name  } from 'vux'
import { config } from "../utils/global"
import axios from 'axios'
export default {
  name: "Register",
  components: {
    Flexbox,
    FlexboxItem,
    XHeader,
    Divider,
    Cell,
    Group,
    XInput,
    XButton,
    Datetime,
    XAddress,
    PopupPicker,
    Selector
  },
  data() {
    return {
      local: config.upload_avatar,
      uploadData: {userId: 2},
      imageUrl: '',
      address: [],
      birth: '1998-01-01',
      addressData: ChinaAddressV4Data,
      emotion: 3,
      list: [
        { key: 1, value: '单身' },
        { key: 2, value: '热恋' },
        { key: 3, value: '保密' },
      ],
      sexlist: [['男', '女']],
      sex: ['男'],
      phone: '',
      username: '',
      password: '',
      where: '',
      idOK: false,
      userId: 0
    }
  },
  methods: {
    diyupload(event, file, fileLis) {
      this.imageUrl = URL.createObjectURL(file.raw);
      // this.imageUrl = 'http://localhost:8006/image/nanjing.jpg'
      console.log(this.imageUrl)
    },
    addressPicker(value) {
      this.where = value2name(value, ChinaAddressV4Data)
    },
    reg() {
      const url = config.base_url + '/user/register'
      const emotion = this.list[this.emotion - 1].value
      axios
        .post(url,{
          username: this.username,
          password: this.password,
          sex: this.sex[0],
          birth: this.birth,
          phone: this.phone,
          emotion: emotion,
          where: this.where
        })
        .then(response=>{
          this.$vux.toast.text('注册成功！', 'bottom')
          window.localStorage.setItem('userId', data.data.id)
          window.localStorage.setItem('username', data.data.username)
          this.userId = response.data.data.id
          this.idOK = true
          this.$router.push({path: '/home'})

          console.log(response)
        })
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
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    margin-left: 15px;
    margin-top: 15px;
    width: 80px;
    height: auto;
    display: block;
  }
  .btnbor{
    border-radius: 20px;
  }
  .mt40{
    margin-top: 40px;
  }
</style>
