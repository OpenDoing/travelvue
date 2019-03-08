<template>
  <div>
    <x-header class="headerbg" title="slot:overwrite-title">
        <!--<div @click="change">{{selectValue}}</div>-->
      <div class="overwrite-title-demo" slot="overwrite-title">
        <button-tab>
          <button-tab-item selected @click.native="expBtn">支出</button-tab-item>
          <button-tab-item @click.native="inBtn">收入</button-tab-item>
        </button-tab>
      </div>
    </x-header>

    <tab active-color="#FF9900">
      <tab-item @on-item-click="weekLine">按周</tab-item>
      <tab-item @on-item-click="monthLine">按月</tab-item>
    </tab>

    <flexbox style="margin-top: 25px">
      <flexbox-item>
          <canvas id="lineChart" style="width: 100%"></canvas>
      </flexbox-item>
    </flexbox>

  </div>
</template>

<script>
import { Flexbox, FlexboxItem, XHeader,Group, Swiper, Selector, Tab, TabItem,ButtonTab, ButtonTabItem } from 'vux'
import { VChart, VLine, VArea, VBar, VPie, VPoint, VScale, VAxis, VGuide, VTooltip, VLegend } from 'vux'
import { config } from "../../utils/global"
import axios from 'axios'
import F2 from '@antv/f2'

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
  // computed: {
  //   sumWeek: function () {
  //     let sum = 0;
  //     for (let i = 0;i < this.weekdata.length; i++) {
  //       sum = sum + this.weekdata[i].value
  //     }
  //     return sum
  //   },
  //   avaWeek: function () {
  //     let ava = 0;
  //     let sum = 0;
  //     for (let i = 0;i < this.weekdata.length; i++) {
  //       sum = sum + this.weekdata[i].value
  //     }
  //     return sum/7
  //   },
  //   sumMonth: function () {
  //     let sum = 0;
  //     for (let i = 0;i < this.monthdata.length; i++) {
  //       sum = sum + this.monthdata[i].value
  //     }
  //     return sum
  //   },
  //   avaMonth: function () {
  //     let ava = 0;
  //     let sum = 0;
  //     for (let i = 0;i < this.monthdata.length; i++) {
  //       sum = sum + this.monthdata[i].value
  //     }
  //     return sum/7
  //   }
  // },
  data() {
    return {
      way: 1,
      week: true,
      month: false,
      selectValue: 0,
      monthEdata: [],
      monthIdata: [],
      weekEdata: [],
      weekIdata: [],
      chart: Object,
      // weekEdata: [{"date":"2019-03-01","value":78.65,"type":0},{"date":"2019-03-02","value":140.0,"type":0},{"date":"2019-03-04","value":21.0,"type":0},{"date":"2019-03-07","value":89.0,"type":0}]
    }
  },
  mounted() {
    this.weekExpend()
    this.weekIncome()
    this.monthExpend()
    this.monthIncome()
    // this.initcanvas(this.weekEdata)
    // this.weekExpend()
  },
  methods: {
    weekLine() {
      const chart = new F2.Chart({
        id: 'lineChart',
        pixelRatio: window.devicePixelRatio // 指定分辨率
      });
      // Step 2: 载入数据源
      // chart.source(this.list);
      let data = []
      if (this.selectValue === 0) {
        data = this.weekEdata
      } else {
        data = this.weekIdata
      }
      chart.source(data, {
        value: {
          tickCount: 5,
          min: 0
        },
        date: {
          type: 'timeCat',
          range: [0, 1],
          tickCount: 3
        }
      });
      chart.tooltip({
        custom: true,
        showXTip: true,
        showYTip: true,
        snap: true,
        crosshairsType: 'xy',
        crosshairsStyle: {
          lineDash: [2]
        }
      });
      // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
      // chart.interval().position('genre*sold').color('genre');
      chart.axis('date', {
        label: function label(text, index, total) {
          var textCfg = {};
          if (index === 0) {
            textCfg.textAlign = 'left';
          } else if (index === total - 1) {
            textCfg.textAlign = 'right';
          }
          return textCfg;
        }
      });
      chart.line().position('date*value');
      // chart.render();
      // Step 4: 渲染图表
      chart.render();
    },
    monthLine() {
      const chart = new F2.Chart({
        id: 'lineChart',
        pixelRatio: window.devicePixelRatio // 指定分辨率
      });
      // Step 2: 载入数据源
      // chart.source(this.list);
      let data = []
      if (this.selectValue === 0) {
        data = this.monthEdata
      } else {
        data = this.monthIdata
      }
      chart.source(data, {
        value: {
          tickCount: 5,
          min: 0
        },
        date: {
          type: 'timeCat',
          range: [0, 1],
          tickCount: 3
        }
      });
      chart.tooltip({
        custom: true,
        showXTip: true,
        showYTip: true,
        snap: true,
        crosshairsType: 'xy',
        crosshairsStyle: {
          lineDash: [2]
        }
      });
      // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
      // chart.interval().position('genre*sold').color('genre');
      chart.axis('date', {
        label: function label(text, index, total) {
          var textCfg = {};
          if (index === 0) {
            textCfg.textAlign = 'left';
          } else if (index === total - 1) {
            textCfg.textAlign = 'right';
          }
          return textCfg;
        }
      });
      chart.line().position('date*value').color('#FF9900');
      // chart.render();
      // Step 4: 渲染图表
      chart.render();
    },
    initcanvas(data) {
      console.log(data)
      const chart = new F2.Chart({
        id: 'mountNode',
        pixelRatio: window.devicePixelRatio
      })
      chart.source(data, {
        value: {
          tickCount: 5,
          min: 0
        },
        date: {
          type: 'timeCat',
          range: [0, 1],
          tickCount: 3
        }
      });
      chart.tooltip({
        custom: true,
        showXTip: true,
        showYTip: true,
        snap: true,
        crosshairsType: 'xy',
        crosshairsStyle: {
          lineDash: [2]
        }
      });
      chart.axis('date', {
        label: function label(text, index, total) {
          var textCfg = {};
          if (index === 0) {
            textCfg.textAlign = 'left';
          } else if (index === total - 1) {
            textCfg.textAlign = 'right';
          }
          return textCfg;
        }
      });
      chart.line().position('date*value');
      chart.render();
    },
    expBtn() {
      this.selectValue = 0
    },
    inBtn() {
      this.selectValue = 1
    },
    onItemClick(index) {
      if (index === 0) {
        this.week = true
        this.month = false
        // if (this.selectValue === 0) {
        //   this.weekExpend()
        // } else{
        //   this.weekIncome()
        // }
        this.weekExpend()
      } else {
        this.week = false
        this.month = true
        // if (this.selectValue === 0) {
        //   this.monthExpend()
        // } else{
        //   this.monthIncome()
        // }
      }
    },
    weekExpend() {
      const type = 0
      const userId = this.$cookies.get('userId')
      const url = config.base_url + '/money/week?userId=' + userId + '&type=' + type
      axios
        .get(url)
        .then(response=>{
          // this.weekdata = response.data.data
          for (let i = 0; i < response.data.data.length; i++) {
            this.weekEdata.push(response.data.data[i])
          }
          // console.log(this.weekEdata)
        })
    },
    weekIncome() {
      const type = 1
      const userId = this.$cookies.get('userId')
      const url = config.base_url + '/money/week?userId=' + userId + '&type=' + type
      axios
        .get(url)
        .then(response=>{
          // this.weekdata = response.data.data.data
          for (let i = 0; i < response.data.data.length; i++) {
            this.weekIdata.push(response.data.data[i])
          }
        })
    },
    monthExpend() {
      const type = 0
      const userId = this.$cookies.get('userId')
      const url = config.base_url + '/money/month?userId=' + userId + '&type=' + type
      axios
        .get(url)
        .then(response=>{
          // this.monthEdata = response.data.data.data
          for (let i = 0; i < response.data.data.length; i++) {
            this.monthEdata.push(response.data.data[i])
          }
        })
    },
    monthIncome() {
      const type = 1
      const userId = this.$cookies.get('userId')
      const url = config.base_url + '/money/month?userId=' + userId + '&type=' + type
      axios
        .get(url)
        .then(response=>{
          // this.monthIdata = response.data.data.data
          for (let i = 0; i < response.data.data.length; i++) {
            this.monthIdata.push(response.data.data[i])
          }
        })
    }
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
