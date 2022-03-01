<script setup>
import { ref, reactive, onBeforeMount, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const list = computed(() => {
  return store.state.category.list
})
//跳转过后不会自动关闭弹窗，需要通过数据控制
//vuex每一个分类加上open数据
//vuex提供显示隐藏函数，修改open数据
//组件中使用vuex中的函数 ,使用事件绑定,提供一个类名显示隐藏的类名
const show = (id) => {
  store.commit('category/show', id)
}

const hide = (id , index) => {
  store.commit('category/hide', id)
  
}

</script>
<template>
  <ul class="app-nav">
    <li class="home">
      <RouterLink to="/">首页</RouterLink>
    </li>
    <li
      v-for="(item , index) in list "
      @mousemove="show(item.id)"
      @mouseleave="hide(item.id)"
      @click="hide(item.id)"
      :key="item.id"
      
    >
      <router-link :to="`/category/${item.id}`">{{ item.name }}</router-link>
      <div class="layer" :class="{ open: item.open }">
        <ul>
          <li v-for="item1  in item.children" :key="item1.id">
            <router-link @click="hide(item.id)" :to="`/category/sub/${item1.id}`">
              <img v-lazy="item1.picture" alt />
              <p>{{ item1.name }}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>
<style scoped lang='less'>
.app-nav {
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  position: relative;
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
   
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
      color: #000;
    }
    &:hover
     {
      > a {
        color: var(--color-high-text);
        border-bottom: 1px solid var(--color-high-text);
      }
     
      //     > .layer {
      //   height: 132px;
      //   opacity: 1;
      // }
    }
  }
}
.layer {
  &.open {
    height: 132px;
    opacity: 1;
  }
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all 0.2s 0.1s;
  z-index: 100;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: var(--color-high-text);
        }
      }
    }
  }
}
</style>