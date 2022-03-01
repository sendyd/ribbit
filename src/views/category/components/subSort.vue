<script setup>
import { syncRef } from '@vueuse/shared'
import { reactive, ref , defineEmits} from 'vue'

const isAllChecked = ref(false)
//明确交互数据
const sortParams = reactive({
  inventory: false,
  onlyDiscount: false,
  sortField: null,
  sortMethod: null
})
//提供点击事件切换排序方式
const changeSort = (sortField) => {
  if(sortField === 'price') {
    sortParams.sortField = sortField
    //处理排序
    if(sortParams.sortMethod === null) {
      sortParams.sortMethod = 'desc'
    } else {
      sortParams.sortMethod = sortParams.sortMethod === 'desc' ? 'asc' : 'desc'

    }
  } else {
    //如果已经选中，阻止排序
    if (sortParams.sortField === sortField ) return
    sortParams.sortField = sortField
    sortParams.sortMethod = null
  }
  //触发sort-change
  emit('sort-change' , sortParams)
}
const changeCheck = () => {
   emit('sort-change' , sortParams)
}
const emit = defineEmits(['sort-change'])
</script>

<template>
  <div class='sub-sort'>
    <div class="sort">
      <a :class="{active:sortParams.sortField === null}" @click="changeSort(null)" href="javascript:;">默认排序</a>  
      <a  :class="{active:sortParams.sortField === 'publishTime'}" @click="changeSort('publishTime')" href="javascript:;">最新商品</a>
      <a  :class="{active:sortParams.sortField === 'orderNum'}" @click="changeSort('orderNum')" href="javascript:;">最高人气</a>
      <a  :class="{active:sortParams.sortField === 'evaluateNum'}" @click="changeSort('evaluateNum')" href="javascript:;">评论最多</a>
      <a  @click="changeSort('price')" href="javascript:;">
        价格排序
        <i class="arrow up" :class="{active:sortParams.sortField === 'price' && sortParams.sortMethod === 'asc'}" />
        <i class="arrow down" :class="{active:sortParams.sortField === 'price' && sortParams.sortMethod === 'desc'}" />
      </a>
    </div>
    <div class="check">
      <XtxCheckbox @change="changeCheck" v-model="sortParams.inventory">仅显示有货商品</XtxCheckbox>
      <XtxCheckbox @change="changeCheck"  v-model="sortParams.onlyDiscount">仅显示特惠商品</XtxCheckbox>
    </div>
  </div>
</template>

<style scoped lang='less'>
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all .3s;
      &.active {
        background:var(--color-high-text);
        border-color:var(--color-high-text);
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
            &.active {
            border-bottom-color:var(--color-high-text);
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color:var(--color-high-text);
          }
        }
      }
    }
  }
  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>