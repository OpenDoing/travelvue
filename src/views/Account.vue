<template>
  <div>
    <x-header class="headerbg">旅行记账</x-header>
    <x-icon class="fixButton" type="ios-plus" size="50" v-tap="{methods:addMoney}"></x-icon>
    <flexbox class="headerbg">
      <flexbox-item class="vux-1px-r fontColor">
        <p class="textc sfont">时间</p>
        <datetime
        v-model="month"
        format="YYYY-MM"
        @on-confirm="onConfirmM"
        class="fontColor"
        ></datetime>
      </flexbox-item>
      <flexbox-item class="vux-1px-r">
        <span class="sfont">收入</span>
        <br/>
        {{monthInsum}}
      </flexbox-item>
      <flexbox-item>
        <span class="sfont">支出</span>
        <br/>
        {{monthExpsum}}
      </flexbox-item>
    </flexbox>
    <flexbox style="margin-top: 15px">

    </flexbox>
    <flexbox v-for="money in list" :key="money.id" orient="vertical" class="borderbig">
      <flexbox-item class="borderb">
        <flexbox>
          <flexbox-item class="textl sfont">{{money.date.substring(5,7)}}月{{money.date.substring(8,10)}}日</flexbox-item>
          <flexbox-item class="textr sfont">支出:{{dayExpsum(money.category)}}</flexbox-item>
          <flexbox-item class="textr sfont">收入:{{dayInsum(money.category)}}</flexbox-item>
        </flexbox>
      </flexbox-item>
      <flexbox-item v-for="detail in money.category" :key="detail.id" class="borderb ml20">
        <div  @click="editMoney(detail.id)">
          <flexbox>
            <flexbox-item :span="2">
              <img :src="'../static/img/money/' + detail.img + '.svg'" class="iconCategory">
            </flexbox-item>
            <flexbox-item :span="7">{{detail.remark}}</flexbox-item>
            <flexbox-item style="margin-left: 20px">{{detail.cat === 0 ? detail.sum : '-'+detail.sum}}</flexbox-item>
          </flexbox>
        </div>

      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import {Flexbox, FlexboxItem, XHeader, XButton, Group, XInput, Divider, Datetime, Selector, XTextarea,Calendar,Cell   } from 'vux'
export default {
  name: "Account",
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
    Cell,
  },
  data() {
    return {
      month: '2019-03',
      list: [
        {
          date: '2019-02-25',
          expend: 100.69,
          income: 100,
          category: [
            {
              id: 1,
              cat: 0,
              img: 'cloth',
              remark: '买衣服',
              sum: 560
            },
            {
              id: 2,
              cat: 0,
              img: 'every',
              remark: '垃圾袋',
              sum: 56
            },
          ]
        },
        {
          date: '2019-02-24',
          expend: 100.69,
          income: 100,
          category: [
            {
              id: 1,
              cat: 0,
              img: 'face',
              remark: '美甲',
              sum: 46
            },
            {
              id: 2,
              cat: 1,
              img: 'food',
              remark: '零食',
              sum: 56
            },
          ]
        },
      ]
    }
  },
  computed: {
    monthExpsum: function () {
      let sum = 0;
      for (let i = 0;i < this.list.length; i++) {
        sum = sum + this.list[i].expend
      }
      return sum
    },
    monthInsum: function () {
      let sum = 0;
      for (let i = 0;i < this.list.length; i++) {
        sum = sum + this.list[i].income
      }
      return sum
    },

  },
  methods: {
    onConfirmM (val) {
      this.month = val
    },
    dayExpsum: function (list) {
      let sum = 0;
      for (let i = 0;i < list.length; i++) {
        if (list[i].cat === 1) {
          sum = sum + list[i].sum
        }
      }
      return sum
    },
    dayInsum: function (list) {
      let sum = 0;
      for (let i = 0;i < list.length; i++) {
        if (list[i].cat === 0) {
          sum = sum + list[i].sum
        }
      }
      return sum
    },
    addMoney() {
      this.$router.push({path: '/money/add/' + 1})
    },
    editMoney(id) {
      console.log('nice')
      this.$router.push({path: '/money/edit/' + id})
    }
  }
}
</script>

<style scoped lang="less">
  @import '~vux/src/styles/1px.less';
  .headerbg{
    background-color: #FFDA44;
  }
  .fontColor{
    color: black;
  }
  .iconCategory{
    width: 38px;
  }
  .borderb{
    border-bottom: 1px solid #F5F5F5;
  }
  .borderbig{
    border-bottom: 10px solid #F5F5F5;
  }
  .ml20{
    margin-left: 30px;
  }
  .textl{
    padding-left: 15px;
    text-align: left;
  }
  .textr{
    margin-right: 15px;
    text-align: right;
  }
  .textc{
    text-align: center;
  }
  .sfont{
    font-size: 12px;
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
