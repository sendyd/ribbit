<script setup>
import { ref, computed, reactive } from 'vue'
import { useStore } from 'vuex';
import { findBrand } from '@/api/home'
const store = useStore()
//最终使用数据 9个分类 + 1个品牌
//自定义品牌数据
const brand = reactive({
  id: 'brand',
  name: '品牌',
  children: [{ id: 'brand-children', name: '品牌推荐' }],
  //品牌列表
  brands: []
})
const menuList = computed(() => {
  //得到九个分类且每个分类只有两个子类
  const list = store.state.category.list.map(item => {
    return {
      id: item.id,
      name: item.name,

      children: item.children && item.children.slice(0, 2),
      goods: item.goods
    }
  })
  list.push(brand)
  return list
})

//获取弹层数据
const categoryId = ref(null)
const currCategory = computed(() => {
  return menuList.value.find(item => item.id === categoryId.value)
})

// console.log(currCategory);
//获取品牌数据 
findBrand().then(res => {

  brand.brands = res.result
  // console.log(brand.brands);
})
</script>

<template>
  <div class="home-category" @mouseleave="categoryId = ''">
    <ul class="menu">
      <!-- 分类一级标签 -->
      <li :class="{active:categoryId === item.id }" v-for="item  in menuList" :key="item.id" @mousemove="categoryId = item.id">
        <RouterLink :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
      <!-- 分类二级标签 -->
        <template v-if="item.children">
          <RouterLink
            :to="`/category/sub/${item1.id}`"
            v-for="item1 in item.children"
          >{{ item1.name }}</RouterLink>
        </template>
      <!-- 分类二级标签站位 -->
        <template v-else>
            <XtxSkeleton height="18px" bg="rgba(255,255,255,0.2)" style="margin-right:5px" width="60px" />
            <XtxSkeleton  height="18px" bg="rgba(255,255,255,0.2)" width="50px" />
        </template>
      </li>
    </ul>
    <!-- 弹层 -->
    <div class="layer">
      <h4>
        {{currCategory && currCategory.id === 'brand' ? '品牌':'分类'}}推荐
        <small>根据您的购买或浏览记录推荐</small>
      </h4>
      <!-- 商品 -->
      <ul v-if="currCategory && currCategory.goods">
        <li  v-for="item in currCategory.goods" :key="item.id">
          <RouterLink to="/">
            <img v-lazy="item.picture" alt />
            <div class="info">
              <p class="name ellipsis-2">{{ item.name }}</p>
              <p class="desc ellipsis">{{ item.desc }}</p>
              <p class="price">
                <i>¥</i>
                {{ item.price }}
              </p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <!-- 品牌 -->
      <ul v-if="currCategory && currCategory.brands">
        <li class="brand" v-for="item  in currCategory.brands" :key="item.id">
          <RouterLink to="/">
            <img v-lazy="item.picture" alt />
            <div class="info">
              <p class="place">
                <i class="iconfont icon-dingwei"></i>{{item.place}}
              </p>
              <p class="name ellipsis">{{item.nameEn}}</p>
              <p class="desc ellipsis-2">{{item.name}}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>



<style scoped lang='less'>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover,&.active {
        background: var(--color-high-text);
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;

        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: var(--color-price);
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
    // 品牌样式
    li.brand {
      height: 180px;
      a {
        align-items: flex-start;
        img {
          width: 120px;
          height: 160px;
        }
        .info {
          p {
            margin-top: 8px;
          }
          .place {
            color: #999;
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}
</style>