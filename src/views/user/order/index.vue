<script setup>
import { ref, reactive, onBeforeMount, onMounted } from 'vue'
const activeName = ref('all')
const clickTab = (name) => {
  console.log(name)
}
</script>
<template>
  <div class="member-order-page">
    <XtxTabs v-model="activeName" @click-tab="clickTab">
      <XtxTabsPanel name="all" label="全部订单">全部订单</XtxTabsPanel>
      <XtxTabsPanel name="unpay" label="待付款">待付款</XtxTabsPanel>
      <XtxTabsPanel name="deliver" label="待发货">待发货</XtxTabsPanel>
      <XtxTabsPanel name="receive" label="待收货">待收货</XtxTabsPanel>
      <XtxTabsPanel name="comment" label="待评价">待评价</XtxTabsPanel>
      <XtxTabsPanel name="complete" label="已完成">已完成</XtxTabsPanel>
      <XtxTabsPanel name="cancel" label="已取消">已取消</XtxTabsPanel>
    </XtxTabs>
  </div>
</template>
<style scoped lang='less'>
</style>

