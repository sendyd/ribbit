<script setup>
import { ref, reactive, onBeforeMount, onMounted } from 'vue'
import HomepanelVue from './Homepanel.vue';
import HomeSkeletonVue from './HomeSkeleton.vue';
import { findNew } from '@/api/home'
import { useLazyData } from '@/hook';
import XtxMore from '@/components/library/xtx-more.vue';
// const goods = ref([])
// findNew().then(data => {
//   goods.value = data.result
// })

const { target , result} = useLazyData( findNew)
// console.log(result);

</script>
<template>
  <div>
    <HomepanelVue title="新鲜好物" subTitle="新鲜出炉 品质靠谱">
      <template #right>
        <XtxMore />
      </template>
      <div ref="target">
        <transition name="fade">
          <!-- 面板内容 -->
          <ul class="goods-list" v-if="result.length">
            <li v-for="item in result" :key="item.id">
              <RouterLink :to="`/product/${item.id}`">
                <img v-lazy="item.picture" alt />
                <p class="name ellipsis">{{ item.name }}</p>
                <p class="price">&yen;{{ item.price }}</p>
              </RouterLink>
            </li>
          </ul>
          <HomeSkeletonVue bg="#f0f9f4" v-else />
        </transition>
      </div>
    </HomepanelVue>
  </div>
</template>
<style scoped lang='less'>
@import "@/style/css/mixins.less";
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: var(--color-price);
    }
  }
}
</style>