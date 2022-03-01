<script setup>
import AppMemberAside from '@/components/app-member-aside.vue'


</script>

<template>
  <div class="container">
    <AppMemberAside />
    <article class="article">
      <RouterView />
    </article>
  </div>
</template>

<style scoped lang="less">
.container {
  display: flex;
  padding-top: 20px;
  .article {
    width: 1000px;
  }
}
</style>