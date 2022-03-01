<template>
  <RouterLink :to="`/product/${sub.id}`" class='goods-item' v-if="sub" >
    <img v-lazy="sub.picture" alt="">
    <p class="name ellipsis">{{sub.desc}}</p>
    <p class="desc ellipsis">{{sub.name}}</p>
    <p class="price">&yen;{{sub.price}}</p>
  </RouterLink>
</template>

<script setup>
import { defineProps } from 'vue';
 const { sub } = defineProps({
   sub:{
     typeof:Object,
     default:()=>{{}}
   }
 })
//  console.log(sub);
</script>

<style scoped lang='less'>
@import url(@/style/css/mixins.less);
.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  .hoverShadow();
  img {
    width: 160px;
    height: 160px;
  }
  p {
    padding-top: 10px;
  }
  .name {
    font-size: 16px;
  }
  .desc {
    color: #999;
    height: 29px;
  }
  .price {
    color: var(--color-price);
    font-size: 20px;
  }
}
</style>