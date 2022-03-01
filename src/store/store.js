import {createStore} from 'vuex'
import user from './modules/user.js'
import cart from './modules/cart.js'
import category from './modules/category.js'
import createPersistedstate from 'vuex-persistedstate'
export default createStore({

  modules:{
    user,
    cart,
    category
  }
  ,plugins:[
    createPersistedstate({
      //本地存储名字
      key:'myStore',
      //指定需要储存的模块
      paths:['user' , 'cart']
    })
  ]
})