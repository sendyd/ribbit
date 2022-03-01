//分类
import { topCategory } from '@/api/constlist'
import { findAllCategory } from '@/api/categoryApi'

export default {
  namespaced:true,
  state() {
    return{
      //分类信息,依赖topcategory重新设置，保证初始化就要数据，不至于白屏
      list:topCategory.map(item => ({ name: item }))
    }
  },
  //修改分类函数
  mutations:{
    //所有分类集合
    setList ( state , payload ) {
      state.list = payload
    },
    //显示函数show 隐藏函数hide 控制二级分类显示与隐藏
    show ( state , id) {
      //获取当前分类
      const currCategory = state.list.find(item => item.id === id)
      currCategory.open = true
    },
    hide ( state , id ) {
      const currCategory = state.list.find(item => item.id === id)
      currCategory.open = false
    }
  },
  //获取分类函数
  actions:{
    async getList ( {commit} ) {
      //获取分类数据
      const data = await findAllCategory()
      //给每个分类加上控制一级分类显示隐藏的数据
      data.result.forEach(top => {
        top.open = false
      })
      //调用修改分类函数修改分类数据
      commit( 'setList' , data.result )
    }
  }
}