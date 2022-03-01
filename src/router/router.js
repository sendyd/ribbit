import { createRouter, createWebHashHistory , RouterView } from 'vue-router'
import store from '@/store/store'
import Layout from '@/views/Layout.vue'
import Home from '@/views/home/Home.vue'
import TopCategory from '@/views/category/index.vue'
import SubCategory from '@/views/category/sub.vue'
import Goods from '@/views/goods/index.vue'
import Login from '@/views/login/Login.vue'
import Cart from '@/views/cart/index.vue'
import Checkout from '@/views/user/pay/checkout.vue'
import Pay from '@/views/user/pay/index.vue'
import ResultPay from '@/views/user/pay/result.vue'
import UserLayout from '@/views/user/Layout.vue'
import UserHome from '@/views/user/userhome/index.vue'
import Order  from '@/views/user/order/index.vue'
import Orderdetail  from '@/views/user/order/detail.vue'
import { h  } from 'vue'

// console.log(SubCategory);
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Home
      },
      {
        path: '/category/:id',
        component: TopCategory
      },
      {
        path: '/category/sub/:id',
        component: SubCategory
      },
      {
        path: '/product/:id',
        component: Goods
      },
      {
        path: '/cart',
        component: Cart
      },
      {
        path: '/member/checkout',
        component:Checkout
      },
      {
        path: '/member/pay',
        component:Pay
      },
      {
        path: '/member/callback',
        component:ResultPay
      },
      {
        path: '/member',
        component:UserLayout,
        children:[
          {
            path: '/member',
            component:UserHome,
          },
          {
            path:'/member/order',
            component: { render: () => h(RouterView) },
            children: [
              {
                path: '',
                component:Order
              },
              {
                path: ':id',
                component:Orderdetail
              },
            ]
          }
        ]
      },
     
    ]
  },
  {
    path: '/login',
    component: Login
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  //每次切换路由的时候滚动到顶部
  scrollBehavior() {
    //vue3写法
    return { x: 0, top: 0 }
  }
})

//前置导航守卫
router.beforeEach((to,from,next) => {
  //需要登录的路由。地址是以/member开头
  const { profile } = store.state.user
  if (!profile.token && to.path.startsWith('/member')) {
    return next('/login?redirectUrl=' + to.fullPath)
  }
  next()
})

export default router