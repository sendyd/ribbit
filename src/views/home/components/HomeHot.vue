<script setup>
import { ref, reactive, onBeforeMount, onMounted } from 'vue'
import HomepanelVue from './Homepanel.vue';
import HomeSkeletonVue from './HomeSkeleton.vue';
import { findHot } from '@/api/home'
import { useLazyData } from '@/hook';
// const goods = ref([])
// findHot().then(data => {
//   goods.value = data.result
// })

const { target , result} = useLazyData( findHot)
// console.log(result);
 
</script>
<template>
  <div >
    <HomepanelVue title="人气推荐" subTitle="人气爆款 不容错过">
     <div ref="target">
        <transition name="fade">
        <!-- 判断有没有goods数据 -->
        <ul v-if="result.length" ref="pannel" class="goods-list">
          <li v-for="item in result" :key="item.id">
            <RouterLink to="/">
              <img v-lazy="item.picture" alt />
              <p class="name">{{ item.title }}</p>
              <p class="desc">{{ item.alt }}</p>
            </RouterLink>
          </li>
        </ul>
        <HomeSkeletonVue v-else />
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
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>