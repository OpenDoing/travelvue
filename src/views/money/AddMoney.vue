<template>
  <div>
    <x-header class="headerbg">添加收支</x-header>
    <tab active-color="#FF9900">
      <tab-item selected @on-item-click="onItemClick">支出</tab-item>
      <tab-item @on-item-click="onItemClick">收入</tab-item>
    </tab>
    <swiper v-show="expend" style="margin-top: 30px;">
      <swiper-item>
        <flexbox>
          <flexbox-item  v-for="icon in eiconList.slice(0,4)" :key="icon.id" :span="3" class="iconWrapper imgIcon" style="margin-left: 0" >
            <div @click="chooseE1(icon.name)"><img :src="icon.path" class="imgIcon">
            <br>
            <span style="color: grey;font-size: 14px">{{icon.name}}</span></div>
          </flexbox-item>
        </flexbox>
        <flexbox>
          <flexbox-item  v-for="icon in eiconList.slice(4,8)" :key="icon.id" :span="3" class="iconWrapper imgIcon" style="margin-left: 0;margin-top: 20px">
            <div @click="chooseE1(icon.name)"><img :src="icon.path" class="imgIcon">
            <br>
            <span style="color: grey;font-size: 14px">{{icon.name}}</span></div>
          </flexbox-item>
        </flexbox>
      </swiper-item>
      <swiper-item >
        <flexbox>
          <flexbox-item v-for="icon in eiconList.slice(8,12)" :key="icon.id" :span="3" class="iconWrapper imgIcon" style="margin-left: 0">
            <div @click="chooseE1(icon.name)"><img :src="icon.path" class="imgIcon">
            <br>
            <span style="color: grey;font-size: 14px">{{icon.name}}</span></div>
          </flexbox-item>
        </flexbox>
      </swiper-item>
    </swiper>

    <swiper v-show="income" style="margin-top: 30px;">
      <swiper-item>
        <flexbox>
          <flexbox-item  v-for="icon in iiconList.slice(0,4)" :key="icon.id" :span="3" class="iconWrapper imgIcon" style="margin-left: 0">
            <div @click="chooseE1(icon.name)"><img :src="icon.path" class="imgIcon">
              <br>
              <span style="color: grey;font-size: 14px">{{icon.name}}</span></div>
          </flexbox-item>
        </flexbox>
        <flexbox>
          <flexbox-item  v-for="icon in iiconList.slice(4,5)" :key="icon.id" :span="3" class="iconWrapper imgIcon" style="margin-left: 0">
            <div @click="chooseE1(icon.name)"><img :src="icon.path" class="imgIcon">
              <br>
              <span style="color: grey;font-size: 14px">{{icon.name}}</span></div>
          </flexbox-item>
        </flexbox>
      </swiper-item>

    </swiper>

    <flexbox>
      <flexbox-item>
        <group>
          <calendar title="时间" v-model="today" @on-change=""></calendar>
        </group>
      </flexbox-item>
    </flexbox>
    <flexbox>
      <flexbox-item>
        <group>
          <x-input v-model="iconClass" placeholder="分类" disabled>
            <img slot="label" src="../../../static/img/money/else/category.svg" class="place"/>
          </x-input>
        </group>
      </flexbox-item>
    </flexbox>
    <flexbox>
      <flexbox-item>
        <group>
          <x-input v-model="count" placeholder="金额" type="number">
            <img slot="label" src="../../../static/img/money/else/count.svg" class="place"/>
          </x-input>
        </group>
      </flexbox-item>
    </flexbox>
    <flexbox>
      <flexbox-item>
        <group>
          <x-input v-model="remark" placeholder="点击填写备注">
            <img slot="label" src="../../../static/img/money/else/remark.svg" class="place"/>
          </x-input>
        </group>
      </flexbox-item>
    </flexbox>
    <flexbox style="margin-top: 40px">
      <flexbox-item :span="3"></flexbox-item>
      <flexbox-item :span="6">
        <x-button type="primary" class="">添加</x-button>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, XHeader, XButton, Group, XInput, Swiper, SwiperItem, Tab, TabItem,Calendar } from 'vux'
// import SwiperItem from "vux/src/components/swiper/swiper-item";
export default {
  name: "Add",
  components: {
    FlexboxItem,
    Flexbox,
    XHeader,
    XButton,
    Group,
    XInput,
    Swiper,
    SwiperItem,
    Tab,
    TabItem,
    Calendar
  },
  data() {
    return {
      today: 'TODAY',
      iconClass: '',
      count: 0,
      remark: '',
      income: false,
      expend: true,
      eiconList: [
        {
          id: 1,
          name: '服饰',
          path: '../../../static/img/money/cloth.svg'
        },
        {
          id: 2,
          name: '日用',
          path: '../../../static/img/money/every.svg'
        },
        {
          id: 3,
          name: '美容',
          path: '../../../static/img/money/face.svg'
        },
        {
          id: 4,
          name: '餐饮',
          path: '../../../static/img/money/food.svg'
        },
        {
          id: 5,
          name: '娱乐',
          path: '../../../static/img/money/happy.svg'
        },
        {
          id: 6,
          name: '医疗',
          path: '../../../static/img/money/medical.svg'
        },
        {
          id: 7,
          name: '通讯',
          path: '../../../static/img/money/phone.svg'
        },
        {
          id: 8,
          name: '住房',
          path: '../../../static/img/money/rent.svg'
        },
        {
          id: 9,
          name: '购物',
          path: '../../../static/img/money/shopping.svg'
        },
        {
          id: 10,
          name: '运动',
          path: '../../../static/img/money/sport.svg'
        },
        {
          id: 11,
          name: '交通',
          path: '../../../static/img/money/subway.svg'
        },
        {
          id: 12,
          name: '门票',
          path: '../../../static/img/money/ticket.svg'
        },
      ],
      iiconList: [
        {
          id: 1,
          name: '工资',
          path: '../../../static/img/money/income/salary.svg'
        },
        {
          id: 2,
          name: '兼职',
          path: '../../../static/img/money/income/parttime.svg'
        },
        {
          id: 3,
          name: '理财',
          path: '../../../static/img/money/income/management.svg'
        },
        {
          id: 4,
          name: '红包',
          path: '../../../static/img/money/income/redpackage.svg'
        },
        {
          id: 5,
          name: '其他',
          path: '../../../static/img/money/income/else.svg'
        },
      ]
    }
  },
  methods: {
    onItemClick(index) {
      if (index === 0) {
        this.expend = true
        this.income = false
      } else {
        this.expend = false
        this.income = true
      }
    },
    chooseE1(val) {
      console.log(val)
      this.iconClass = val
    },
    onConfirmE (val) {
      this.today = val
    },
  }
}
</script>

<style scoped>
  .imgIcon{
    width: 45px;
    text-align: center;
  }
  .iconWrapper{
    margin-left: 0px;
    /*horiz-align: center;*/
  }
  img{
    fill: #369;
    color: blue;
  }
  .imgwrapper{

  }
  /*.imgwrapper:focus{*/
    /*background-color: pink;*/
  /*}*/
  .vux-flexbox-item:active{
    background-color: #F5F5F5;
  }
  .headerbg{
    background-color: #F5F5F5;
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
</style>
