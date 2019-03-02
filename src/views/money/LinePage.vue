<template>
  <div>
    <x-header class="headerbg" title="slot:overwrite-title">
        <!--<div @click="change">{{selectValue}}</div>-->
      <div class="overwrite-title-demo" slot="overwrite-title">
        <button-tab>
          <button-tab-item selected>支出</button-tab-item>
          <button-tab-item>收入</button-tab-item>
        </button-tab>
      </div>
    </x-header>

    <tab active-color="#FF9900">
      <tab-item selected @on-item-click="onItemClick">按周</tab-item>
      <tab-item @on-item-click="onItemClick">按月</tab-item>
    </tab>



    <div v-show="week">
      <v-chart :data="weekdata" prevent-default>
        <v-scale x :tick-count="7" />
        <v-tooltip :show-item-marker="false" show-x-value />
        <v-line shape="smooth" colors="#FFBD17"/>
      </v-chart>
      <flexbox orient="vertical">
        <flexbox-item>
          总支出:{{sumWeek}}
        </flexbox-item>
        <flexbox-item>
          平均值：{{avaWeek | numFilter}}
        </flexbox-item>
      </flexbox>
    </div>

    <div v-show="month">
      <v-chart :data="monthdata" prevent-default>
        <v-scale x :tick-count="4" />
        <v-tooltip :show-item-marker="false" show-x-value />
        <v-line shape="smooth" colors="#FFBD17"/>
      </v-chart>
      <flexbox orient="vertical">
        <flexbox-item>
          总支出:{{sumMonth}}
        </flexbox-item>
        <flexbox-item>
          平均值：{{avaMonth | numFilter}}
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, XHeader,Group, Swiper, Selector, Tab, TabItem,ButtonTab, ButtonTabItem } from 'vux'
import { VChart, VLine, VArea, VBar, VPie, VPoint, VScale, VAxis, VGuide, VTooltip, VLegend } from 'vux'
export default {
  name: "LinePage",
  components: {
    Flexbox, FlexboxItem, XHeader, Swiper, Selector,Group, Tab, TabItem,ButtonTab, ButtonTabItem,
    VChart, VLine, VArea, VBar, VPie, VPoint, VScale, VAxis, VGuide, VTooltip, VLegend
  },
  filters: {

    numFilter(value) {

      // 截取当前数据到小数点后两位

      let realVal = parseFloat(value).toFixed(2)

      // num.toFixed(2)获取的是字符串

      return parseFloat(realVal)

    }

  },
  computed: {
    sumWeek: function () {
      let sum = 0;
      for (let i = 0;i < this.weekdata.length; i++) {
        sum = sum + this.weekdata[i].value
      }
      return sum
    },
    avaWeek: function () {
      let ava = 0;
      let sum = 0;
      for (let i = 0;i < this.weekdata.length; i++) {
        sum = sum + this.weekdata[i].value
      }
      return sum/7
    },
    sumMonth: function () {
      let sum = 0;
      for (let i = 0;i < this.monthdata.length; i++) {
        sum = sum + this.monthdata[i].value
      }
      return sum
    },
    avaMonth: function () {
      let ava = 0;
      let sum = 0;
      for (let i = 0;i < this.monthdata.length; i++) {
        sum = sum + this.monthdata[i].value
      }
      return sum/7
    }
  },
  data() {
    return {
      way: 1,
      week: true,
      month: false,
      selectValue: '收入',
      list: [
        { key: 1, value: '支出' },
        { key: 2, value: '收入' },
      ],
      monthdata: [
        { date: '2017-06-05', value: 116 },
        { date: '2017-06-06', value: 129 },
        { date: '2017-06-07', value: 135 },
        { date: '2017-06-08', value: 86 },
        { date: '2017-06-09', value: 73 },
        { date: '2017-06-10', value: 85 },
        { date: '2017-06-11', value: 73 },
        { date: '2017-06-12', value: 68 },
        { date: '2017-06-13', value: 92 },
        { date: '2017-06-14', value: 130 },
        { date: '2017-06-15', value: 245 },
        { date: '2017-06-16', value: 139 },
        { date: '2017-06-17', value: 115 },
        { date: '2017-06-18', value: 111 },
        { date: '2017-06-19', value: 309 },
        { date: '2017-06-20', value: 206 },
        { date: '2017-06-21', value: 137 },
        { date: '2017-06-22', value: 128 },
        { date: '2017-06-23', value: 85 },
        { date: '2017-06-24', value: 94 },
        { date: '2017-06-25', value: 71 },
        { date: '2017-06-26', value: 106 },
        { date: '2017-06-27', value: 84 },
        { date: '2017-06-28', value: 93 },
        { date: '2017-06-29', value: 85 },
        { date: '2017-06-30', value: 73 },
        { date: '2017-07-01', value: 83 },
        { date: '2017-07-02', value: 125 },
        { date: '2017-07-03', value: 107 },
        { date: '2017-07-04', value: 82 },
        { date: '2017-07-05', value: 44 },
        { date: '2017-07-06', value: 72 },
        { date: '2017-07-07', value: 106 },
        { date: '2017-07-08', value: 107 },
        { date: '2017-07-09', value: 66 },
        { date: '2017-07-10', value: 91 },
        { date: '2017-07-11', value: 92 },
        { date: '2017-07-12', value: 113 },
        { date: '2017-07-13', value: 107 },
        { date: '2017-07-14', value: 131 },
        { date: '2017-07-15', value: 111 },
        { date: '2017-07-16', value: 64 },
        { date: '2017-07-17', value: 69 },
        { date: '2017-07-18', value: 88 },
        { date: '2017-07-19', value: 77 },
        { date: '2017-07-20', value: 83 },
        { date: '2017-07-21', value: 111 },
        { date: '2017-07-22', value: 57 },
        { date: '2017-07-23', value: 55 },
        { date: '2017-07-24', value: 60 }
      ],
      weekdata: [
        { date: '06-05', value: 116 },
        { date: '06-06', value: 129 },
        { date: '06-07', value: 135 },
        { date: '06-08', value: 86 },
        { date: '06-09', value: 73 },
        { date: '06-10', value: 85 },
        { date: '06-11', value: 73 }
        ]
    }
  },
  methods: {
    change() {
      if (this.selectValue === '收入') {
        this.selectValue = '支出'
      }else{
        this.selectValue = '收入'
      }
    },
    onItemClick(index) {
      if (index === 0) {
        this.week = true
        this.month = false
      } else {
        this.week = false
        this.month = true
      }
    },

  }
}
</script>

<style scoped>
  .headerbg{
    background-color: #F5F5F5;
  }
  .overwrite-title-demo {
    margin-top: 5px;
  }
</style>
