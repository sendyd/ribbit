<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="profile.token">
          <li>
            <router-link to="/member">
              <i class="iconfont icon-user"></i>
              {{ profile.account }}
            </router-link>
          </li>
          <li>
            <a @click="loginOut" href="javascript:;">退出登录</a>
          </li>
        </template>
        <template v-else>
          <li>
            <router-link to="/login">请先登录</router-link>
          </li>
          <li>
            <a href="javascript:;">免费注册</a>
          </li>
        </template>
        <li>
          <a href="javascript:;">我的订单</a>
        </li>
        <li>
          <a href="javascript:;">会员中心</a>
        </li>
        <li>
          <a href="javascript:;">帮助中心</a>
        </li>
        <li>
          <a href="javascript:;">关于我们</a>
        </li>
        <li>
          <a href="javascript:;">
            <i class="iconfont icon-phone"></i>手机版
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
//获取状态管理
import { useStore } from 'vuex'
import Message from './library/Message'
const store = useStore()
//获取用户信息
const profile = computed(() => {
  return store.state.user.profile
})

//退出登录
// 清空本地存储的vuex信息
// 跳转登录页
const router = useRouter()
const loginOut = () => {
  store.commit('user/setUser', {})
  // 清空购物车
  store.commit('cart/setCartList', [])
  Message({ type: 'success', text: '退出登录成功' })
  router.push('/login')
}
</script>
<style scoped lang="less">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    margin-right: 100px;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: var(--font-size);
          margin-right: 2px;
        }
        &:hover {
          color: var(--color-high-text);
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
//~选择器选择除第一个元素选择器以外所有选择器
</style>