//提供一个能够显示xtx-message组件的函数
//这个函数将来导入直接使用也可以挂载在vue原型上
//import Message from 'Message.js' 使用Message({type:'error',text:'提示文字'})
//this.$message({type:"error",text:"提示文字"})

import { createVNode } from 'vue-demi'
import { render } from 'vue'
import  XtxMessage from './xtx-message.vue'

//Dom容器
const div = document.createElement('div')
div.setAttribute('class' , 'xtx-message-container')
document.body.appendChild(div)

//定时器标识
let timer = null

export default ( {type , text}) => {
  //渲染组件
  //1,导入消息展示组件
  //2,将导入展示组件编译为虚拟节点
  //createVNode(组件,属性对象(props))
  const vnode = createVNode(XtxMessage , { type , text })
  //3,准备一个装载组件的容器
  //4,将虚拟节点渲染在节点容器中
  //render(虚拟节点 ， Dom容器)
  render(vnode , div)

  //3s后销毁组件
  clearTimeout(timer)
  timer = setTimeout(() => {
    render(null,div)
  },3000)
}