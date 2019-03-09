<template>
  <div>
    <x-header>管理员</x-header>
    <div>
      <h2>用户管理：</h2>
      对用户进行限制登录以及解除限制
      <h2>行程管理：</h2>
      对行程单进行删除
        <h2>汇率：</h2>
      添加汇率以及国家
          <h2>评论：</h2>
      对不当的言论进行删除
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
