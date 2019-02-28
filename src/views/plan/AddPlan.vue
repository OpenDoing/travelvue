<template>
  <div>
    <x-header>发布约计划</x-header>
    <flexbox class="bordert">
      <flexbox-item class="borderb borderr borderl">
        <group>
          <x-input v-model="title" required  placeholder="请输入行程标题" ></x-input>
        </group>
      </flexbox-item>
    </flexbox>
    <flexbox class="borderb">
      <flexbox-item class="borderr borderl">
        <group>
          <x-input v-model="start" required placeholder="出发地">
            <img slot="label" src="../../assets/img/start.svg" class="place"/>
          </x-input>
        </group>
      </flexbox-item>

      <flexbox-item class="borderr">
        <group>
          <x-input v-model="destination" required placeholder="目的地">
            <img slot="label" src="../../assets/img/destination.svg" class="place"/>
          </x-input>
        </group>
      </flexbox-item>
    </flexbox>
    <flexbox class="borderb">
      <flexbox-item class="borderr borderl" >
        <group>
          <datetime
            v-model="stime"
            title="启程"
            @on-confirm="onConfirmS"
            @on-hide="log('hide', $event)"></datetime>
        </group>
      </flexbox-item>
      <flexbox-item class="borderr">
        <group>
          <datetime
            v-model="etime"
            title="结束"
            @on-confirm="onConfirmE"
            @on-hide="log('hide', $event)"></datetime>
        </group>
      </flexbox-item>
    </flexbox>

    <flexbox class="borderb">
      <flexbox-item class="borderr borderl">
        <group>
          <x-input title="人数限制" required v-model="people" type="number"></x-input>
        </group>
      </flexbox-item>
    </flexbox>

    <flexbox class="borderb">
      <flexbox-item class="borderr borderl">
        <group>
          <selector title="费用方式" v-model="way" :options="list"></selector>
        </group>
      </flexbox-item>
    </flexbox>

    <flexbox class="borderb">
      <flexbox-item class="borderr borderl">
        <group>
          <x-textarea v-model="detail" placeholder="约伴计划详情描述"></x-textarea>
        </group>
      </flexbox-item>
    </flexbox>

  </div>
</template>

<script>
import {Flexbox, FlexboxItem, XHeader, XButton, Group, XInput, Divider, Datetime, Selector, XTextarea   } from 'vux'
export default {
  name: "AddPlan",
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
    XTextarea
  },
  data() {
    return {
      title: '',
      start: '',
      destination: '',
      stime: '',
      etime: '',
      budget: 100,
      way: 'AA',
      list: [
        { key: 1, value: 'AA' },
        { key: 2, value: '男A女免' },
        { key: 3, value: '免费（我请客）' },
      ],
      detail: '',
      people: 0
    }
  },
  methods: {

    onConfirmS (val) {
      this.stime = val
    },
    onConfirmE (val) {
      this.etime = val
    },
    log (str1, str2 = '') {
      console.log(str1, str2)
    },
  }
}
</script>

<style scoped>
  .bordert{
    border-top: 10px solid #F5F5F5;
  }
  .borderb{
    border-bottom: 10px solid #F5F5F5;
  }
  .borderl{
    border-left: 10px solid #F5F5F5;
  }
  .borderr{
    border-right: 10px solid #F5F5F5;
  }

.vux-x-icon {
  fill: #F70968;
}
  .place{
    width: 28px;
    height: 28px;
    vertical-align: middle;
    margin-right: 12px;

  }
</style>
