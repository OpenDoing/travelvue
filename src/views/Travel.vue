<template>
  <div>
  <Search
    v-model="value"
    placeholder="生活不止眼前的苟且，还有诗和远方"/>

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
