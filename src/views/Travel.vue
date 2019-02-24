<template>
  <div>
  <Search
    v-model="value"
    placeholder="请输入目的地"/>

    约伴页面
  </div>
</template>

<script>
import { Search } from 'vux'
export default {
  name: "Travel",
  components: {
    Search
  },
  data() {
    return {
      value: ''
    }
  }
}
</script>

<style scoped>

</style>
