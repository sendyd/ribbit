
<script>
import { h } from 'vue'
export default {
  name: 'XtxBread',

  render() {
    //template 标签去除 ， 单文件组件
    //返回值 就是组件内容
    //vue3的h函数组件导入

    //h 第一个参数 标签名字 第二个参数 标签属性对象 第三个参数 子节点
    //获取默认插槽内容
    //舍弃最后一个i
    //遍历插槽中的item 得到一个动态创建的节点 最后一个iyem不加i标签
    //把动态创建的节点渲染到 xtxbread标签中
    const items = this.$slots.default()
    // console.log(items);
    const newItems = []
    items.forEach((item,i) => {
      newItems.push(item)
      if ( i <  (items.length - 1)){
        newItems.push(h('i' , { class : 'iconfont icon-angle-right'}))
      }
      
    })
    return h('div', { class: 'xtx-bread' }, newItems)
  }
}
</script>

<style  lang='less'>
// 除去scoped 属性， 目的 ：让样式作用到xtx-bread
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: var(--color-high-text);
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>