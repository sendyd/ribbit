//扩展vue原有的功能: 全局组件 自定义指令 挂载原型方法

// import XtxSkeleton from './xtx-skeleton.vue'
// import XtxCarousel from './xtx-carousel.vue'
// import XtxMore from './xtx-more.vue'
// import XtxBread from './xtx-bread.vue'
// import XtxBreadItem from './xtx-bread-item.vue'
import defaultImg from '@/assets/img/music.jpg'

// 使用 require 提供的函数 context 加载某一个目录下的所有 .vue 后缀的文件。
// 然后 context 函数会返回一个导入函数 importFn
// 它又一个属性 keys() 获取所有的文件路径
// 通过文件路径数组，通过遍历数组，再使用 importFn 根据路径导入组件对象
// 遍历的同时进行全局注册即可
//参数 1 目录路径 2 是否加载路径 3 正则匹配
import Message from './Message'
const importFn = import.meta.globEager('./*.vue')
// console.log(Object.keys(importFn));

export default {
  install (app) {
    //在app上进行挂载扩展 。 app提供 component directive 函数
    //如果挂载原型 app.config.globalProperties.$http
    // app.component(XtxSkeleton.name , XtxSkeleton)
    // app.component(XtxCarousel.name , XtxCarousel)
    // app.component(XtxMore.name , XtxMore)
    // app.component(XtxBread.name , XtxBread)
    // app.component(XtxBreadItem.name , XtxBreadItem)

    //根据importFn 批量注册
    Object.keys(importFn).forEach((c) => {

      const component = importFn[c]?.default
      // console.log(importFn[c]);
      // 挂载全局控件
      app.component(component.name, component)
  })

  
    //定义指令
    defineDirective(app)

  }
}

//定义指令
const defineDirective = (app) => {
  //图片懒加载指令 v-lazy
  //原理： 先存储图片地址不能放在src上 ， 当图片进入可视区，将存储的图片地址设置给图片元素
  app.directive('lazy', {
    //vue2.0 监听使用指令DOM是否创建 ， 钩子函数 inserted
    // vue3.0 d的指令钩子函数和组件一样 使用指令的DOM是否创建好，钩子函数 mounted
    mounted( el , binding ) {
      // console.log('mounted')
      // 创建一个调查对象 来观察当前使用指令的元素
      const observe = new IntersectionObserver(([{ isIntersecting }]) => {
        if( isIntersecting ) {
          //停止观察
          observe.unobserve(el)
          // console.log('进入可视区' , el);
          //把指令的值设置给el的src属性 binding.value 就是指令的值
          //处理图片加载失败
          el.onerror = ( ) => {
            //加载失败 设置默认图片
            el.src = defaultImg
          }
          el.src = binding.value

        }
      },{
        threshold:0
      })
      observe.observe(el)
    }

  })
}
