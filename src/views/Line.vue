<template>
  <div>
    <canvas id="myChart" width="400" height="260"></canvas>
    <x-button @click.native="init">85</x-button>
  </div>

</template>

<script>
  import F2 from '@antv/f2'
  import {config} from "../utils/global";
  import axios from 'axios'
  import XButton from "vux/src/components/x-button/index";

  export default {
  name: "LineA",
    components: {XButton},
    data() {
    return {
      list: [
        {
          date: "2017-06-05",
          value: 116
        }, {
          date: "2017-06-06",
          value: 129
        }, {
          date: "2017-06-07",
          value: 135
        }, {
          date: "2017-06-08",
          value: 86
        }, {
          date: "2017-06-09",
          value: 73
        }, {
          date: "2017-06-10",
          value: 85
        }
      ],
      weekEdata: []
    }
  },
  created() {
    this.req()
    // this.init()
  },
  methods: {
    req() {
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
          console.log(this.weekEdata)
        })
    },
    init() {
      const chart = new F2.Chart({
        id: 'myChart',
        pixelRatio: window.devicePixelRatio // 指定分辨率
      });
      // Step 2: 载入数据源
      // chart.source(this.list);

      chart.source(this.weekEdata, {
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
    }
  },

}
</script>

<style scoped>

</style>
