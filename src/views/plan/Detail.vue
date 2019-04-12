<template>
  <div>
    <x-header>{{plan.title}}</x-header>
    <div class="">
      <flexbox style="margin-bottom: 15px">
        <img :src="plan.cover" class="img-cover"/>
      </flexbox>
      <flexbox >
        <flexbox-item :span="1"></flexbox-item>
        <flexbox-item :span="1"><img :src="plan.avatar" class="head"/></flexbox-item>
        <flexbox-item :span="6">
          <div class="ufont">
            <b>{{plan.username}}</b>
          </div>
        </flexbox-item>
        <flexbox-item :span="2">
          <x-button type="warn" mini class="signbg" @click.native="sign">报名</x-button>
        </flexbox-item>
      </flexbox>
      <flexbox  orient="vertical">
        <flexbox-item >
          <div class="title">{{plan.title}}</div>
        </flexbox-item>
        <flexbox-item >
          <div style="margin-left: 20px">{{plan.description}}</div>
        </flexbox-item>
      </flexbox>
      <flexbox class="propmargin">
        <flexbox-item>
          <div class="vux-1px-r">
            <span class="sfont">希望人数</span>
            <br/>
            {{plan.people}}人
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="vux-1px-r">
            <span class="sfont">已报名</span>
            <br/>
            {{apply}}人
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="vux-1px-r">
            <span class="sfont">人均预算</span>
            <br/>
            {{plan.budget}}元
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="vux-1px-r">
            <span class="sfont">费用方式</span>
            <br/>
            {{plan.fee}}
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox orient="vertical" style="margin-top: 15px">
        <flexbox-item><div style="margin-left: 25px"><img src="../../assets/img/start.svg" class="losvg imgcenter"/>出发地 &nbsp;<b>{{plan.start}}</b></div></flexbox-item>
        <flexbox-item><div style="margin-left: 25px"><img src="../../assets/img/destination.svg" class="losvg imgcenter"/>目的地 &nbsp;<b>{{plan.destination}}</b></div></flexbox-item>
        <flexbox-item><div style="margin-left: 25px"><img src="../../assets/img/time.svg" class="losvg imgcenter"/>起止时间 &nbsp;<b>{{plan.stime.substring(5,7)}}月{{plan.stime.substring(8,10)}}日 - {{plan.etime.substring(5,7)}}月{{plan.etime.substring(8,10)}}日</b></div></flexbox-item>
      </flexbox>
      <flexbox class="">
        <flexbox-item class="wantjoin"><b class="ml15">想约的({{apply}})</b></flexbox-item>
      </flexbox>
      <flexbox orient="vertical" class="itemWrapper">
        <flexbox-item>
          <img v-for="head in plan.joins" :key="head.id" :src="head.avatar" class="headlist" @click="person(head.userId)"/>
            <!--<router-link :to="{name:'PersonInfo',params: {id: head.userId}}"/>-->
        </flexbox-item>
        <!--<flexbox-item>{{plan.apply}}人已报名({{boy}}男{{girl}}女)</flexbox-item>-->
      </flexbox>
      <flexbox v-for="comment in plan.comments" :key="comment.id" class="borderbottom">
        <flexbox-item :span="2">
          <img :src="comment.avatar" class="commentlist"/>
        </flexbox-item>
        <flexbox-item :span="8">
          <flexbox orient="vertical">
            <flexbox-item class="mt0"><b>{{comment.username}}</b></flexbox-item>
            <flexbox-item style="margin-top: 0">{{comment.content}}</flexbox-item>
          </flexbox>
        </flexbox-item>
        <flexbox-item>{{comment.time}}</flexbox-item>
      </flexbox>
      <flexbox style="margin-bottom: 30px">
        <flexbox-item>
          <group>
            <x-input v-model="comment" placeholder="请输入评论内容">
              <x-button slot="right" type="primary" mini class="butBg" @click.native="publish">发布</x-button>
            </x-input>
          </group>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
import {Flexbox, FlexboxItem, XHeader, XButton, Card, Group, XInput, Divider} from 'vux'
import {config} from "../../utils/global"
import axios from 'axios'
export default {
  name: "Detail",
  inject: ['reload'],
  components: {
    FlexboxItem,
    Flexbox,
    XHeader,
    XButton,
    Card,
    XInput,
    Group,
    Divider
  },
  data() {
    return {
      comment: '',
      plan: {},
      apply: 0
    }
  },
  mounted() {
    this.init()
  },
  methods:{
    addlike(val) {
      let userId = localStorage.getItem('userId')

      const url = config.base_url + '/plan/like?userId=' + userId + '&destination=' + val
      axios
        .post(url)
        .then(response=>{
          console.log("success")
        })
    },
    person(id) {
      this.$router.push({name:'PersonInfo',params: {id: id}})
    },
    init() {
      const url = config.base_url + '/plan/detail?pid=' + this.$route.params.id
      axios
        .get(url)
        .then(response=>{
          console.log(response)
          this.addlike(response.data.data.destination)
          let data = response.data
          data.data.avatar = config.image_url + data.data.avatar
          data.data.cover = config.image_url + data.data.cover
          for (let i = 0; i < data.data.comments.length;i++){
            data.data.comments[i].avatar = config.image_url + data.data.comments[i].avatar
          }
          for (let i = 0; i < data.data.joins.length;i++){
            this.apply = data.data.joins.length
            data.data.joins[i].avatar = config.image_url + data.data.joins[i].avatar
          }
          this.plan = data.data

        })
    },
    sign() {
      const url = config.base_url + '/join/add'
      const pid = this.$route.params.id
      const userId = localStorage.getItem('userId')
      axios
        .post(url,{
          pid: pid,
          userId: userId,
        })
        .then(response=>{
          this.$vux.toast.text('报名成功', 'bottom')

        })
    },
    publish() {
      const pid = this.$route.params.id
      const url = config.base_url + '/comment/add'
      const userId = localStorage.getItem('userId')
      axios
        .post(url,{
          pid: pid,
          userId: userId,
          content: this.comment
        })
        .then(response=>{
          this.$vux.toast.text('评论成功', 'bottom')
          this.reload()
        })
    }
  }
}
</script>

<style scoped lang="less">
  @import '~vux/src/styles/1px.less';
  .butBg{
    background-color:#F70968;
  }

  .img-cover {
    width: 100%;
    height: auto;
  }

  .head {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    display: flex;

    align-items: center;
  }
  .headlist {
    width: 32px;
    height: 32px;
    border-radius: 32px;
    align-items: center;
    margin-left: 15px;
    margin-top: 10px;
  }
  .commentlist {
    width: 45px;
    height: 45px;
    border-radius: 32px;
    vertical-align: middle;
    margin-left: 15px;
  }

  .itemContent {
    align-items: center;
    margin-left: 20px;
    /*margin-right: 20px;*/
    margin-bottom: 10px;
  }

  .ufont {
    font-size: 20px;
    margin-left: 10px;
  }

  .title {
    font-size: 22px;
    font-weight: bold;
    margin-left: 20px;
  }
  .propmargin{
    /*display: flex;*/
    /*padding: 10px 0;*/
    /*margin-left: 10px;*/
    text-align: center;
  }
  .sfont{
    font-size: 12px;
  }
  .losvg{
    width: 24px;
    height: 24px;
  }
  .imgcenter{
    vertical-align: middle;
  }

  .mt20{
    margin-top: 20px;
  }
  .wantjoin{
    border-top: 10px solid #F5F5F5;
    border-bottom: 10px solid #F5F5F5;
    border-left: 5px solid pink;
    font-size: 20px;
    margin-left: 15px;
  }
  .ml15{
    margin-left: 15px;
  }
  .itemWrapper{
    border-bottom: 10px solid #F5F5F5;
  }
  .mt0{
    margin-top: 0px;
  }
  .borderbottom{
    margin: 15px 0 0 5px;
    border-bottom: 1px solid #F5F5F5;

  }

  .signbg{
    background-color: #4A90E2;
  }

</style>
