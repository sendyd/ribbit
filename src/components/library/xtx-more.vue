<script setup>
import { defineProps } from 'vue';

const {path} = defineProps({
     path: {
      type: String,
      default: '/'
    }
})
</script>
<script>
export default {
  name:'Xtx-more'
}
</script>
<template>
<!-- 查看全部组件 -->
  <RouterLink :to="path" class="xtx-more">
    <span>查看全部</span>
    <i class="iconfont icon-angle-right"></i>
  </RouterLink>
</template>



<style scoped lang='less'>
.xtx-more {
  margin-bottom: 2px;
  span {
    font-size: 16px;
    vertical-align: middle;
    margin-right: 4px;
    color: #999;
  }
  i {
    font-size: 14px;
    vertical-align: middle;
    position: relative;
    top: 2px;
    color: #ccc;
  }
  &:hover {
    span,i {
      color: var(--color-high-text);
    }
  }
}
</style>