<template>
  <div class="page-tabbar">
    <div class="page-wrap">

      <mt-tab-container class="page-tabbar-container" v-model="selected">
        <mt-tab-container-item id="约伴">
          <Travel></Travel>
        </mt-tab-container-item>
        <mt-tab-container-item id="汇率">
          <Exchange></Exchange>
        </mt-tab-container-item>
        <mt-tab-container-item id="记账">
          <Account></Account>
        </mt-tab-container-item>
        <mt-tab-container-item id="我的">
          <Info></Info>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="约伴" @click.native="travel">
        <img slot="icon" src="../assets/img/travel.png">
        约伴
      </mt-tab-item>
      <mt-tab-item id="汇率" @click.native="rate">
        <img slot="icon" src="../assets/img/exchange.png">
        汇率
      </mt-tab-item>
      <mt-tab-item id="记账" @click.native="money">
        <img slot="icon" src="../assets/img/account.png">
        记账
      </mt-tab-item>
      <mt-tab-item id="我的" @click.native="mine">
        <img slot="icon" src="../assets/img/mine.png">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
    <!--<Travel></Travel>-->
</template>

<script>
import Info from './Info'
import Travel from "./Travel"
import Exchange from "./Exchange"
import Account from "./Account"
import { Tabbar, TabbarItem,XHeader } from 'vux'
import {config} from "../utils/global"

export default {
  name: "Tabbar",
  components: {
    Account,
    Exchange,
    Travel,
    Info,
    Tabbar,
    TabbarItem,
    XHeader
  },
  data() {
    return {
      selected: config.selected
    }
  },
  methods: {
    travel() {
      config.selected = '约伴'
    },
    rate() {
      config.selected  = '汇率'
    },
    money() {
      config.selected  = '记账'
    },
    mine() {
      config.selected  = '我的'
    }
  }
}
</script>

<style scoped>
  .page-tabbar {
    overflow: hidden;
    height: 100vh;
  }

  .page-wrap {
    overflow: auto;
    height: 100%;
    padding-bottom: 100px;
  }
</style>
