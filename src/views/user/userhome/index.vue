<script setup>
import homeOverviewVue from './components/home-overview.vue';
import homePanelVue from './components/home-panel.vue';
import goodsRelevantVue from '@/views/goods/components/goods-relevant.vue';
import goodsItemVue from '@/views/category/components/goods.item.vue';
import {ref} from 'vue'
import { findCollect , findHistory } from '@/api/member';


const collectGoods = ref([])
findCollect({
  page: 1,
  pageSize: 4
}).then(data => {
  collectGoods.value = data.result.items
})

const historyGoods = ref([])
findHistory({
  page: 1,
  pageSize: 4
}).then(data => {
  historyGoods.value = data.result.items
})
</script>

<template>
  <div class="member-home">
    <!-- 概览 -->
    <homeOverviewVue />
    <!-- 收藏 -->
    <homePanelVue title="我的收藏">
      <goodsItemVue  v-for="item in collectGoods" :key="item.id" :sub="item" />
    </homePanelVue>
    <!-- 足迹 -->
    <homePanelVue title="我的足迹">
      <goodsItemVue v-for="item in historyGoods" :key="item.id" :sub="item" />
    </homePanelVue>
    <!-- 猜你 -->
    <goodsRelevantVue />
  </div>
</template>

<style scoped lang="less">
:deep(.xtx-carousel) .carousel-btn.prev {
  left: 5px;
}
:deep(.xtx-carousel) .carousel-btn.next {
  right: 5px;
}
</style>