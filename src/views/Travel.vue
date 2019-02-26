<template>
  <div>
  <Search
    v-model="value"
    placeholder="生活不止眼前的苟且，还有诗和远方"/>
    <div class="wrapperbg">
      <flexbox orient="vertical">
        <flexbox-item v-for="plan in plans" :key="plan.id" class="itemWrapper">
          <router-link :to="{name:'Detail',params: {id: plan.id}}" style="color: black">
            <flexbox class="itemContent">
              <flexbox-item :span="1"><img :src="plan.avatar" class="head"/></flexbox-item>
              <flexbox-item :span="8">
                <div class="ufont">
                  <b>{{plan.username}}</b>
                  <mt-badge type="primary" size="small" v-if="plan.sex === 0" color="#d4237a" class="ml15">♀{{plan.age}}</mt-badge>
                  <mt-badge type="primary" size="small" v-else color="#1296db" class="ml15">♂{{plan.age}}</mt-badge>
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
                <img src="../assets/img/join.svg" class="imgcenter"/>{{plan.join}}
                <img src="../assets/img/comment.svg" class="imgcenter"/>{{plan.comment}}
              </flexbox-item>
            </flexbox>
          </router-link>

        </flexbox-item>
      </flexbox>
      <divider>我是有底线的人</divider>
      <divider></divider>
      <divider></divider>
    </div>
  </div>
</template>

<script>
import { Search } from 'vux'
import { Flexbox, FlexboxItem, Divider, XImg, Icon   } from 'vux'
export default {
  name: "Travel",
  components: {
    Search,
    Flexbox,
    FlexboxItem,
    Divider,
    XImg,
    Icon
  },
  data() {
    return {
      value: '',
      plans: [    {
        "id": 2,
        "userId": 1,
        "title": "1",
        "start": null,
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
        "age": 18
      },
        {
          "id": 3,
          "userId": 1,
          "title": "南京2日游",
          "start": "太原",
          "destination": "南京",
          "ctime": "2019-02-25T20:47:05",
          "stime": "2019-02-28T16:00:00.000+0000",
          "etime": "2019-03-02T16:00:00.000+0000",
          "cover": "http://localhost:8006/image/nanjing1.jpg",
          "description": "六朝古都，秦淮美食",
          "username": "oppo",
          "sex": 0,
          "avatar": "http://localhost:8006/image/7b18f34c-f533-4605-9172-7c89a8d25e19.jpg",
          "join": 2,
          "comment": 5,
          "age": 20
        },
        {
          "id": 4,
          "userId": 1,
          "title": "333",
          "start": null,
          "destination": "南京",
          "ctime": "2019-02-25T20:45:35",
          "stime": "2019-02-28T16:00:00.000+0000",
          "etime": "2019-03-02T16:00:00.000+0000",
          "cover": "http://localhost:8006/image/default.png",
          "description": "六朝古都，秦淮美食",
          "username": "oppo",
          "sex": 1,
          "avatar": "http://localhost:8006/image/7b18f34c-f533-4605-9172-7c89a8d25e19.jpg",
          "join": 6,
          "comment": 2,
          "age": 23
        },
        {
          "id": 5,
          "userId": 1,
          "title": "南京4日游",
          "start": "太原",
          "destination": "南京",
          "ctime": "2019-02-25T20:47:05",
          "stime": "2019-02-28T16:00:00.000+0000",
          "etime": "2019-03-02T16:00:00.000+0000",
          "cover": "http://localhost:8006/image/nanjing.jpg",
          "description": "六朝古都，秦淮美食",
          "username": "oppo",
          "sex": 1,
          "avatar": "http://localhost:8006/image/7b18f34c-f533-4605-9172-7c89a8d25e19.jpg",
          "join": 7,
          "comment": 20,
          "age": 19
        }
        ]
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
</style>
