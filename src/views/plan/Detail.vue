<template>
  <div>
    <x-header>{{plan.title}}</x-header>
    <div class="">
      <flexbox style="margin-bottom: 15px">
        <img :src="plan.cover" class="img-cover"/>
      </flexbox>
      <flexbox class="itemContent">
        <flexbox-item :span="1"><img :src="plan.avatar" class="head"/></flexbox-item>
        <flexbox-item :span="8">
          <div class="ufont">
            <b>{{plan.username}}</b>
          </div>
        </flexbox-item>
        <flexbox-item :span="3">
          <x-button type="warn" mini class="signbg">报名</x-button>
        </flexbox-item>
      </flexbox>
      <flexbox class="itemContent" orient="vertical">
        <flexbox-item>
          <div class="title">{{plan.title}}</div>
        </flexbox-item>
        <flexbox-item>
          <div>{{plan.description}}</div>
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
            人
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
      <flexbox class="itemContent mt20 " orient="vertical">
        <flexbox-item><div class=""><img src="../../assets/img/start.svg" class="losvg imgcenter"/>出发地 &nbsp;<b>{{plan.start}}</b></div></flexbox-item>
        <flexbox-item><div class=""><img src="../../assets/img/destination.svg" class="losvg imgcenter"/>目的地 &nbsp;<b>{{plan.destination}}</b></div></flexbox-item>
        <flexbox-item><div><img src="../../assets/img/time.svg" class="losvg imgcenter"/>起止时间 &nbsp;<b>{{plan.stime.substring(5,7)}}月{{plan.stime.substring(8,10)}}日 - {{plan.etime.substring(5,7)}}月{{plan.etime.substring(8,10)}}日</b></div></flexbox-item>
      </flexbox>
      <flexbox class="">
        <flexbox-item class="wantjoin"><b class="ml15">想约的({{plan.apply}})</b></flexbox-item>
      </flexbox>
      <flexbox orient="vertical" class="itemWrapper">
        <flexbox-item><img v-for="head in joinlist" :key="head.id" :src="plan.avatar" class="headlist"/></flexbox-item>
        <flexbox-item>{{plan.apply}}人已报名({{boy}}男{{girl}}女)</flexbox-item>
      </flexbox>
      <flexbox v-for="comment in comments" :key="comment.id" class="borderbottom">
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
      <group>
        <x-input  v-model="comment" placeholder="请输入评论内容">
          <x-button slot="right" type="primary" mini class="butBg">发布</x-button>
        </x-input>
      </group>
    </div>
  </div>
</template>

<script>
import {Flexbox, FlexboxItem, XHeader, XButton, Card, Group, XInput, Divider} from 'vux'
export default {
  name: "Detail",
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
      plan: {
        "id": 2,
        "userId": 1,
        "title": "1",
        "start": "北京",
        "destination": "南京",
        "ctime": "2019-02-25T20:45:35",
        "stime": "2019-02-28T16:00:00.000+0000",
        "etime": "2019-03-02T16:00:00.000+0000",
        "cover": "http://localhost:8006/image/nanjing.jpg",
        "description": "六朝古都，秦淮美食",
        "username": "旅行发烧友",
        "sex": 1,
        "avatar": "http://localhost:8006/image/7b18f34c-f533-4605-9172-7c89a8d25e19.jpg",
        "join": 1,
        "comment": 2,
        "age": 18,
        "fee": "AA",
        "budget": 1000,
        "people": 5,
        "apply": 1
      },
      boy: 1,
      girl: 2,
      joinlist: [
        {
          id: 1,
          avatar: 'http://localhost:8006/image/7b18f34c-f533-4605-9172-7c89a8d25e19.jpg'
        },
        {
          id: 2,
          avatar: 'http://localhost:8006/image/7b18f34c-f533-4605-9172-7c89a8d25e19.jpg'
        },
        {
          id: 3,
          avatar: 'http://localhost:8006/image/7b18f34c-f533-4605-9172-7c89a8d25e19.jpg'
        }
      ],
      comments:[
        {
          id: 1,
          avatar:'http://localhost:8006/image/7b18f34c-f533-4605-9172-7c89a8d25e19.jpg',
          username: 'oppo',
          content: '你好',
          time: '20:18'
        },
        {
          id: 2,
          avatar:'http://localhost:8006/image/7b18f34c-f533-4605-9172-7c89a8d25e19.jpg',
          username: '666',
          content: '怎么玩',
          time: '10:18'
        }
      ]
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
    margin-right: 20px;
    margin-bottom: 10px;
  }

  .ufont {
    font-size: 20px;
    margin-left: 10px;
  }

  .title {
    font-size: 22px;
    font-weight: bold;
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
