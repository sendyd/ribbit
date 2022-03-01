<script setup>
import { ref, reactive, onBeforeMount, onMounted } from 'vue'
import HomeCategoryVue from './components/HomeCategory.vue';
import HomeBannerVue from './components/HomeBanner.vue';
import HomeNewsVue from './components/HomeNews.vue';
import HomeHotVue from './components/HomeHot.vue';
import HomebrandVue from './components/Homebrand.vue';
import HomeproductVue from './components/Homeproduct.vue'
import HomespecialVue from './components/Homespecial.vue';
</script>
<template>
  <!-- 首页轮播图 -->
  <div class="home-entry">
    <!-- 首页入口 -->

    <div class="container">
      <!-- 左侧分类 -->
      <HomeCategoryVue />
      <!-- 轮播图 -->
      <HomeBannerVue />
    </div>
  </div>
  <!-- 新鲜好物 -->
  <HomeNewsVue />
  <!-- 人气推荐 -->
  <HomeHotVue />
  <!-- 品牌推荐 -->
  <HomebrandVue />
  <!-- 首页商品 -->
  <HomeproductVue />
  <!-- 最新专题 -->
  <HomespecialVue />
</template>
<style scoped lang='less'>
@import "@/style/css/mixins.less";
</style>