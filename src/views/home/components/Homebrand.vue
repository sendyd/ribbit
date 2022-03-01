<template>
  <div class="brand">
    <HomepanelVue title="热门品牌" subTitle="国际经典 品质保证">
      <template #right>
        <span
          :class="{ disabled: index === 0 }"
          class="iconfont icon-angle-left prev"
          @click="toggle(-1)"
        ></span>
        <span
          :class="{ disabled: index === 1 }"
          class="iconfont icon-angle-right next"
          @click="toggle(1)"
        ></span>
      </template>
       
        
          <div class="box" ref="target">
            <transition name="fade">
            <ul
              v-if="result.length"
              class="list "
              :style="{ transform: `translateX(${-index * 1240}px)` }"
            >
              <li  v-for="item in result" :key="item.id">
                <RouterLink to="/">
                  <img v-lazy="item.picture" alt />
                </RouterLink>
              </li>
            </ul>
            <div v-else class="skeleton">
              <XtxSkeleton
                class="item"
                v-for="i in 5"
                :key="i"
                animated
                bg="#e4e4e4"
                width="240px"
                height="305px"
              />
            </div>
            </transition>
          </div>
     
    
    </HomepanelVue>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HomepanelVue from './Homepanel.vue'
import { findBrand } from '@/api/home'
import { useLazyData } from '@/hook/index'
// const brands = ref([])
// findBrand(10).then(data => {
//   console.log(data);
//   brands.value = data.result
//   // console.log(brands.value);
// })
//传递一个回调函数
const { target, result } = useLazyData(() => findBrand(10))
// console.log(result.value);
// 切换效果，前提只有 0 1 两页
const index = ref(0)
// 1. 点击上一页
// 2. 点击下一页
const toggle = (step) => {
  const newIndex = index.value + step
  if (newIndex < 0 || newIndex > 1) return
  index.value = newIndex
}

</script>

<style scoped lang='less'>
@import "@/style/css/mixins.less";
.skeleton {
  width: 100%;
  display: flex;
  .item {
    margin-right: 10px;
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
.brand {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: var(--color-high-text);
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      .hoverShadow();
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>
