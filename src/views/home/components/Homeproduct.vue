<script setup>
import HomepanelVue from './Homepanel.vue'
import HomegoodsVue from './Homegoods.vue'
import { findGoods } from '@/api/home';
import { useLazyData  } from '@/hook/index';
import XtxMore from '@/components/library/xtx-more.vue';
const { target , result } = useLazyData(findGoods)
// console.log(result);
</script>

<template>
  <div class="home-product"  ref="target">
    <HomepanelVue :title="cate.name" v-for="cate in result" :key="cate.id">
      <template #right>
        <div class="sub">
          <RouterLink v-for="sub in cate.children" :key="sub.id" :to="`/category/sub/${sub.id}`">{{sub.name}}</RouterLink>
        </div>
        <XtxMore :path="`/category/${cate.id}`" />
      </template> -->
      <div class="box" ref="target" >
        <RouterLink class="cover" :to="`/category/${cate.id}`">
          <img v-lazy="cate.picture" alt="">
          <strong class="label">
            <span>{{cate.name}}</span>
            <span>{{cate.seleInfo}}</span>
          </strong>
        </RouterLink>
        <ul class="goods-list">
          <li v-for="item in cate.goods" :key="item.id">
            <HomegoodsVue :goods="item"/>
          </li>
        </ul>
      </div>
    </HomepanelVue>
  </div>
</template>



<style scoped lang='less'>
.home-product {
  background: #fff;
  height: 2900px;
  .sub {
    margin-bottom: 2px;
    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;
      &:hover {
        background: var(--color-high-text);
        color: #fff;
      }
      &:last-child {
        margin-right: 80px;
      }
    }
  }
  .box {
    display: flex;
    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0,-50%,0);
        span {
          text-align: center;
          &:first-child {
            width: 76px;
            background: rgba(0,0,0,.9);
          }
          &:last-child {
            flex: 1;
            background: rgba(0,0,0,.7);
          }
        }
      }
    }
    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;
        &:nth-last-child(-n+4) {
          margin-bottom: 0;
        }
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
