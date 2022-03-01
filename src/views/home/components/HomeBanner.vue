<script setup>
import { ref ,reactive, onBeforeMount, onMounted } from 'vue'
import { useLazyData } from '@/hook';
import { findBanner } from '@/api/home'
import XtxCarousel from '@/components/library/xtx-carousel.vue';
//  const sliders = ref([])
//    findBanner().then(data => {
//      sliders.value = data.result
//    })

const{ target , result } = useLazyData(findBanner)
// console.log(sliders.value);
</script>
<template>
  <div ref="target" class="homeBanner">
    <XtxCarousel :sliders="result" autoPlay duration="2000"/>
  </div>
</template>
<style scoped lang='less'>
.homeBanner{
    width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98
}
//覆盖样式
.xtx-carousel {
  ::v-deep .carousel-btn.prev {
    margin-left: 250px;
  }
  ::v-deep .carousel-indicator {
    padding-left: 250px;
  }
}
</style>