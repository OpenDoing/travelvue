<template>
  <div>
    <x-header class="headerbg"><div slot="right" @click="del(page.id)">删除</div></x-header>
    <flexbox class="headerbg">
      <flexbox-item></flexbox-item>
      <flexbox-item class="fcenter">
        <img :src="'../../../static/img/money/' + page.kind + '.svg'" class="imgIcon">
        <br/>
        <span style="color: black;font-size: 14px">{{ page.category }}</span>
      </flexbox-item>
      <flexbox-item></flexbox-item>
    </flexbox>

    <flexbox orient="vertical">
      <flexbox-item>
        <group class="fpadding">
          <calendar title="日期" v-model="time" placeholder-align="right" :placeholder="page.time"></calendar>
        </group>
      </flexbox-item>
      <flexbox-item>
        <group class="fpadding">
          <x-input title="金额" required v-model="count" placeholder-align="right" type="number" :placeholder="page.count"></x-input>
        </group>
      </flexbox-item>
      <flexbox-item>
        <group class="fpadding">
          <x-input title="备注" required v-model="remark" placeholder-align="right" type="number" :placeholder="page.remark"></x-input>
        </group>
      </flexbox-item>
    </flexbox>

    <flexbox style="margin-top: 70px">
      <flexbox-item :span="3"></flexbox-item>
      <flexbox-item :span="6">
        <x-button type="primary" class="butBg">修改</x-button>
      </flexbox-item>
      <flexbox-item></flexbox-item>
    </flexbox>

    <div v-transfer-dom>
      <confirm v-model="showConfirm"
               title="温馨提示"
               theme="android"
               confirm-text="删除"
               @on-cancel="onCancel"
               @on-confirm="onConfirm(page.id)">
        <p style="text-align:left;">删除后数据不可恢复！</p>
      </confirm>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, XHeader, XButton, Group, XInput, Swiper, SwiperItem, Tab, TabItem,Calendar,Confirm,TransferDomDirective as TransferDom } from 'vux'
export default {
  name: "EditMoney",
  directives: {
    TransferDom
  },
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
    Calendar,
    Confirm
  },
  data() {
    return {
      date: 'TODAY',
      showConfirm: false,
      remark: '',
      count: '',
      time: '',
      page : {
        id: 5,
        category: '服饰',
        kind: 'face',
        count: '56',
        time: '2019-03-02',
        remark: 'nice'
      }
    }
  },
  methods: {
    del(id) {
      this.showConfirm = true
      console.log(id)
    },
    onConfirm(val) {
      console.log(val)
      this.showConfirm = false
    },
    onCancel() {
      this.showConfirm = false
    }
  }
}
</script>

<style scoped>
  .headerbg{
    background-color: #FFDA44;
  }
  .imgIcon{
    width: 55px;
    border-radius: 55px;
    background-color: #F5F5F5;
    text-align: center;
  }
  .fcenter{
    text-align: center;

  }
  .fpadding{
    padding-left: 15px;
    padding-right: 15px;
  }
  .butBg{
    background-color:#FFDA44;
    color: black;
  }
</style>
