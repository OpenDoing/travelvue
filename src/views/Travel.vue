<template>
  <div>
    <flexbox>
      <flexbox-item>
        <Search
          v-model="value"
          auto-fixed
          @on-submit="init"
          placeholder="生活不止眼前的苟且，还有诗和远方"/>
      </flexbox-item>
      <!--<flexbox-item :span="2">-->
        <!--<router-link :to="{name:'AddPlan',params: {id: 1}}"><b class="fabu">发布</b></router-link>-->
      <!--</flexbox-item>-->
    </flexbox>

    <x-icon class="fixButton" type="ios-plus" size="50" v-tap="{methods:addplan}"></x-icon>
    <div class="wrapperbg">
      <flexbox orient="vertical">
        <flexbox-item v-for="plan in plans" :key="plan.id" class="itemWrapper">
          <router-link :to="{name:'Detail',params: {id: plan.id}}" style="color: black">
            <flexbox class="itemContent">
              <flexbox-item :span="1"><img :src="plan.avatar" class="head"/></flexbox-item>
              <flexbox-item :span="8">
                <div class="ufont">
                  <b>{{plan.username}}</b>
                  <mt-badge type="primary" size="small" v-if="plan.sex === '女'" color="#d4237a" class="ml15">♀</mt-badge>
                  <mt-badge type="primary" size="small" v-else color="#1296db" class="ml15">♂</mt-badge>
                </div>
              </flexbox-item>
              <flexbox-item :span="2"><div class="timefont">{{plan.ctime.substring(11,16)}}</div></flexbox-item>
            </flexbox>
            <flexbox class="itemContent" orient="vertical">
              <flexbox-item><div class="title">{{plan.title}}</div></flexbox-item>
              <flexbox-item><div>{{plan.description}}</div></flexbox-item>
            </flexbox>
            <flexbox class="itemContent" orient="vertical">
              <flexbox-item><div class=""><img src="../assets/img/destination.svg" class="losvg imgcenter"/>目的地 &nbsp;<b>{{plan.destination}}</b></div></flexbox-item>
              <flexbox-item><div><img src="../assets/img/time.svg" class="losvg imgcenter"/>起止时间 &nbsp;<b>{{plan.stime.substring(5,7)}}月{{plan.stime.substring(8,10)}}日 - {{plan.etime.substring(5,7)}}月{{plan.etime.substring(8,10)}}日</b></div></flexbox-item>
            </flexbox>
            <flexbox>
              <flexbox-item><img :src="plan.cover" class="img-cover"/></flexbox-item>
            </flexbox>
            <flexbox align="center" justify-content="center">
              <flexbox-item :span="9"></flexbox-item>
              <flexbox-item :span="3">
                <img src="../assets/img/join.svg" class="imgcenter"/>{{plan.joins.length}}
                <img src="../assets/img/comment.svg" class="imgcenter"/>{{plan.comments.length}}
              </flexbox-item>
            </flexbox>
          </router-link>

        </flexbox-item>
      </flexbox>
      <divider></divider>
      <divider>我是有底线的人</divider>

    </div>
  </div>
</template>

<script>
import { Search } from 'vux'
import { Flexbox, FlexboxItem, Divider, XImg, Icon,XButton   } from 'vux'
import { config } from "../utils/global"
import axios from 'axios'
export default {
  name: "Travel",
  components: {
    Search,
    Flexbox,
    FlexboxItem,
    Divider,
    XImg,
    Icon,
    XButton
  },
  data() {
    return {
      value: '',
      plans: [],
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    compare(property) {
      return function(a, b) {
        const value1 = a[property];
        const value2 = b[property];
        return value1 - value2;
      }
    },
    init(val) {
      let url = ''
      if (val){
        url = config.base_url + '/plan/des?destination=' + val
      }else {
        url = config.base_url + '/plan/list?id=1'
      }
      axios
        .get(url)
        .then(response=>{
          let data = response.data
          for (let i = 0; i < data.length;i++){
            data[i].avatar = config.image_url + data[i].avatar
            data[i].cover = config.image_url + data[i].cover
          }
          this.plans = data
          this.plans = this.plans.sort(this.compare("joins.length"))
          if (data.length === 0) {
            this.$vux.toast.text('暂无此目的地！', 'bottom')
          }
        })

    },
    addplan() {
      console.log(111)
      this.$router.push({path: '/plan/' + 1})
    }
  }
}
</script>

<style scoped>
  .flex-demo {
    text-align: center;
    color: #fff;
    background-color: #20b907;
    border-radius: 4px;
    background-clip: padding-box;
  }
  .wrapperbg{
    margin-top: 15px;
    /*background-color: grey;*/
  }
  .head{
    width: 32px;
    height: 32px;
    border-radius: 32px;
    display: flex;

    align-items: center;
  }
  .vcenter{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .itemWrapper{
    border-bottom: 10px solid #F5F5F5;
  }
  .itemContent{
    align-items: center;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 10px;
  }
  .ufont{
    font-size: 20px;
    margin-left: 10px;
  }
  .title{
    font-size: 22px;
    font-weight:bold;
  }
  .img-cover {
    width: 90%;
    height: auto;
    margin:10px 5px 5px 20px;
  }
  .losvg{
    width: 24px;
    height: 24px;
  }
  .imgcenter{
    vertical-align: middle;
  }
  .ml15{
    margin-left: 15px;
  }
  .timefont{
    font-size: 14px;
  }
  a {
    text-decoration: none;
  }
  .fabu{
    color: purple;
    font-size: 20px;
  }
  .fixButton{
    position: fixed;
    bottom: 100px;
    left: 80%;
  }
  .vux-x-icon {
    fill: #F70968;
  }
</style>
