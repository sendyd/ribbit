import { createApp } from 'vue'
import App from './App.vue'

// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import '../src/style/css/base.css'
import './style/css/mixins.less'
import router from './router/router.js'
import store from './store/store.js'
import './mock'
//导入自己的组件
import UI from '@/components/library/index'
const app = createApp(App)
app.use(router)
app.use(store)
app.use(UI)
// app.use(ElementPlus)
app.mount('#app')

