<script setup>
import GoodsRelevant from './components/goods-relevant.vue'
import { findGoods } from '@/api/goods'
import { useRoute } from 'vue-router'
import { watch, ref, nextTick, provide } from 'vue'
import goodsImgVue from './components/goods-img.vue'
import goodsSalesVue from './components/goods-sales.vue'
import goodsNameVue from './components/goods-name.vue'
import goodsSkuVue from './components/goods-sku.vue'
import goodsTabsVue from './components/goods-tabs.vue'
import goodsHotVue from './components/goods-hot.vue'
import goodsWarnVue from './components/goods-warn.vue'
import { useStore } from 'vuex'
import Message from '@/components/library/Message'


const store = useStore()
//获取商品详情 
// 获取商品详情


const useGoods = () => {
  // 出现路由地址商品ID发生变化，但是不会重新初始化组件
  const goods = ref(null)
  const route = useRoute()
  watch(() => route.params.id, (newVal) => {
    if (newVal && `/product/${newVal}` === route.path) {
      findGoods(route.params.id).then(data => {
        // 让商品数据为null让后使用v-if的组件可以重新销毁和创建
        goods.value = null
        nextTick(() => {
          goods.value = data.result
        })
      })
    }
  }, { immediate: true })
  return goods
}
const goods = useGoods()
const currSku = ref(null)
// sku改变时候触发
const changeSku = (sku) => {
  count.value = 1
  //  console.log(sku);
  if (sku.skuId) {
    goods.value.price = sku.price
    goods.value.oldPrice = sku.oldPrice
    goods.value.inventory = sku.inventory
  }
  //记录选择后的sku，可能有数据可能没数据
  currSku.value = sku
}

const add = () => {
  //约定加入购物车字段必须和后端保持一致
  // id skuId , name , attrsText picture price nowPrice selected stock count isEffective 
  const { skuId, specsText: attrsText, oldPrice, inventory: stock } = currSku.value
  const { name, price, id, mainPictures } = goods.value

  if (currSku.value && currSku.value.skuId) {
    store.dispatch('cart/insertCart', {
      skuId,
      attrsText,
      stock,
      id,
      name,
      price: oldPrice,
      nowPrice: price,
      picture: mainPictures[0],
      selected: true,
      count: count.value,
      isEffective: true
    }).then(() => {
      
      Message({ type: 'success', text: '加入购物车成功' })
    })
  } else {
    Message({ text: '请选择完整的规格' })
  }

}

// console.log(useGoods());
// console.log(goods);
//选择的数量
const count = ref(1)
provide('goods', goods)
</script>

<template>
  <div class="xtx-goods-page" v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="`/category/${goods.categories[1].id}`">{{ goods.categories[1].name }}</XtxBreadItem>
        <XtxBreadItem :to="`/category/sub/${goods.categories[0].id}`">{{ goods.categories[0].name }}</XtxBreadItem>
        <XtxBreadItem>{{ goods.name }}</XtxBreadItem>
      </XtxBread>

      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <goodsImgVue :images="goods.mainPictures" />
          <goodsSalesVue />
        </div>
        <div class="spec">
          <goodsNameVue :goods="goods" />
          <!-- 商品sku组件 -->
          <goodsSkuVue :goods="goods" @change="changeSku" />
          <!-- 数量选择组件 -->
          <XtxNumbox v-model="count" label="数量" :max="goods.inventory" />
          <XtxButton @click="add" type="primary" style="margin-top:20px;">加入购物车</XtxButton>
        </div>
      </div>
      <!-- 商品推荐 -->
      <!-- 商品推荐 -->
      <GoodsRelevant :goodsId="goods.id" />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs">
            <goodsTabsVue />
          </div>
          <!-- 注意事项 -->
          <div class="goods-warn">
            <goodsWarnVue />
          </div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <goodsHotVue :type="1" />
          <goodsHotVue :type="2" />
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
// .goods-tabs {
//   min-height: 600px;
//   background: #fff;
// }
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>