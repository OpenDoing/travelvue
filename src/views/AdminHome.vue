<template>
  <div>
    <x-header :left-options="{backText: '退出'}">管理员</x-header>
    <div>
      <h2>用户管理：</h2>
      对用户进行限制登录以及解除限制
      <h2>行程管理：</h2>
      对行程单进行查看和编辑(说明：每个行程单绑定的有其他用户的报名信息和评论信息，因此对行程单的删除，
      会导致极大的数据不安全性，本系统暂未提供行程单的删除)
        <h2>汇率：</h2>
      添加汇率、修改汇率以及地区
          <h2>评论：</h2>
      对不当的言论进行编辑或者删除
    </div>
    <tabbar>
      <tabbar-item selected link="/admin/user">
        <img slot="icon" src="../assets/img/tab/user.svg">
        <span slot="label">用户</span>
      </tabbar-item>
      <tabbar-item link="/admin/trip">
        <img slot="icon" src="../assets/img/tab/trip.svg">
        <span slot="label">行程</span>
      </tabbar-item>
      <tabbar-item link="/admin/rate">
        <img slot="icon" src="../assets/img/tab/rate.svg">
        <span slot="label">汇率</span>
      </tabbar-item>
      <tabbar-item link="/admin/comment">
        <img slot="icon" src="../assets/img/tab/comment.svg">
        <span slot="label">评论</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem,XHeader } from 'vux'
export default {
  name: "AdminHome",
  components: {
    Tabbar,
    TabbarItem,
    XHeader
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>

</style>
