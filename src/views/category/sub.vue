<script setup>
import { ref, reactive, onBeforeMount, onMounted, watch } from 'vue'
import subBreadVue from './components/subBread.vue';
import subFilterVue from './components/subFilter.vue';
import XtxCheckbox from '@/components/library/xtx-checkbox.vue';
import subSortVue from './components/subSort.vue';
import goodsItemVue from './components/goods.item.vue';
import XtxInfiniteLoading from '@/components/library/xtx-infinite-loading.vue';
import { findSubCategoryGoods } from '@/api/categoryApi'
import { useRoute } from 'vue-router'
const route = useRoute()
const loading = ref(false)
const finished = ref(false)
// 查询参数
let reqParams = {
  page: 1,
  pageSize: 20
}
const list = ref([])
const getData = () => {
  // console.log('load');
  loading.value = true
  reqParams.categoryId = route.params.id
  // console.log(reqParams.categoryId);
  findSubCategoryGoods(reqParams).then(({result}) => {
    // console.log(res);
   
      if (result.items.length) {

        //有数据加载数据
        list.value.push(...result.items)
        //把page改成下一页码
        reqParams.page++
        // console.log(list.value);
      } else {
        //没有数据，加载完成
        finished.value = true
      }
      loading.value = false
 
  })
  // console.log(res);
  //在更改二级类目的时候应该重新加载数据
  watch(() => route.params.id, (newVal) => {
    // console.log(newVal);
    if (newVal && `/category/sub/${newVal}` === route.path) {
      
      finished.value = false
      list.value = []
      reqParams = {
        page: 1,
        pageSize: 20
      }
    }
  })

}
 // 监听筛选区改变
    const changeFilter = (filterParams) => {
      // console.log(filterParams);
      reqParams = { ...reqParams, ...filterParams }
      reqParams.page = 1
      list.value = []
      finished.value = false
    }
    // 监听排序改变
    const changeSort = (sortParams) => {
      // console.log(sortParams);
      reqParams = { ...reqParams, ...sortParams }
      reqParams.page = 1
      list.value = []
      finished.value = false
    }
    
</script>

<template>
  <div class="sub-category">
    <!-- 面包屑 -->
    <subBreadVue />
    <!-- 筛选区 -->
    <subFilterVue @filter-change="changeFilter"/>
    <!-- 结果区域 -->
    <div class="goods-list">
      <!-- 排序 -->
      <subSortVue @sort-change="changeSort"/>
      <!-- 列表 -->
      <ul>
        <li v-for="item in list" :key="item.id">
          <goodsItemVue :sub="item" />
        </li>
      </ul>
      <XtxInfiniteLoading :loading="loading" :finished="finished" @infinite="getData" />
    </div>
  </div>
</template>

<style scoped lang='less'>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>