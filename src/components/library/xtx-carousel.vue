

<template>
  <!-- 走马灯组件 -->

  <div class="xtx-carousel" @mouseenter="stop()" @mouseleave="start()">
    <!-- 轮播图图片容器 -->
    <ul class="carousel-body">
      <!-- 显示图片加上fade -->
      <li
        class="carousel-item"
        v-for="(item,index) in sliders"
        :key="index"
        :class="{ fade: currentIndex === index }"
      >
        <RouterLink v-if="item.hrefUrl" :to="item.hrefUrl">
          <img v-lazy="item.imgUrl" alt />
        </RouterLink>
        <div v-else class="slider">
          <RouterLink v-for="goods in item" :key="goods.id" :to="`/product/${goods.id}`">
            <img :src="goods.picture" alt />
            <p class="name ellipsis">{{ goods.name }}</p>
            <p class="price">&yen;{{ goods.price }}</p>
          </RouterLink>
        </div>
      </li>
    </ul>
    <!-- 上一张 -->
    <a href="javascript:;" class="carousel-btn prev">
      <i @click="toggle(-1)" class="iconfont icon-angle-left"></i>
    </a>
    <!-- 下一张 -->
    <a href="javascript:;" class="carousel-btn next">
      <i @click="toggle(1)" class="iconfont icon-angle-right"></i>
    </a>
    <!-- 指示器 -->
    <div class="carousel-indicator">
      <!-- active激活指示器 -->
      <span
        @click="handleIndicator(index)"
        :class="{ active: currentIndex === index }"
        v-for="(item , index) in sliders"
        :key="index"
      ></span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'XtxCarousel'
}
</script>
<script setup>
import { ref, watch , onUnmounted , defineProps} from 'vue'

 const props = defineProps({
     sliders: {
      type: Array,
      default: () => []
    },
    duration: {
      type: Number,
      default: 3000
    },
    autoPlay: {
      type: Boolean,
      default: false
    }
})
    // 默认显示的图片的索引
    const currentIndex = ref(0)
       // 自动播放
    let timer = null
    const autoPlayFn = () => {
      clearInterval(timer)
      timer = setInterval(() => {
        currentIndex.value++
        if (currentIndex.value >= props.sliders.length) {
          currentIndex.value = 0
        }
      }, props.duration)
    }
    watch(() => props.sliders, (newVal) => {
      // 有数据&开启自动播放，才调用自动播放函数
      if (newVal.length && props.autoPlay) {
        currentIndex.value = 0
        autoPlayFn()
      }
    }, { immediate: true })
        // 鼠标进入停止，移出开启自动，前提条件：autoPlay为true
    const stop = () => {
      if (timer) clearInterval(timer)
    }
    const start = () => {
      if (props.sliders.length && props.autoPlay) {
        autoPlayFn()
      }
    }
  // 上一张下一张
    const toggle = (step) => {
      const newIndex = currentIndex.value + step
      if (newIndex >= props.sliders.length) {
        currentIndex.value = 0
        return
      }
      if (newIndex < 0) {
        currentIndex.value = props.sliders.length - 1
        return
      }
      currentIndex.value = newIndex
    }

    //点击指示器
    const handleIndicator = (index) => {
        currentIndex.value = index
    }
     // 组件消耗，清理定时器
    onUnmounted(() => {
      clearInterval(timer)
    })
 

</script>
<style scoped lang="less">

.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
// 轮播商品
.slider {
  display: flex;
  justify-content: space-around;
  padding: 0 40px;
  > a {
    width: 240px;
    text-align: center;
    img {
      padding: 20px;
      width: 230px!important;
      height: 230px!important;
    }
    .name {
      font-size: 16px;
      color: #666;
      padding: 0 40px;
    }
    .price {
      font-size: 16px;
      color: var(--color-price);
      margin-top: 15px;
    }
  }
}
</style>