<script setup>
import { ref, reactive, onBeforeMount, onMounted } from 'vue'
import AppNavBar from '@/components/AppNavBar.vue'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import AppHeaderSticky from '../components/AppHeaderSkity.vue'
import { useStore } from 'vuex'
const store = useStore()
store.dispatch('category/getList')
</script>
<template>
  <div>
    <!-- 顶部导航栏 -->
    <AppNavBar />
    <AppHeaderSticky />
    <AppHeader />
    <div class="container">
      <router-view></router-view>
    </div>
    <AppFooter />
  </div>
</template>
<style scoped lang='less'>
// .container{
//   height:5500px;
// }
</style>