<script>
import { useVModel } from '@vueuse/core'
import { provide } from 'vue'
export default {
  name: 'XtxTabs',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const activeName = useVModel(props, 'modelValue', emit)
    // 给xtx-tabs-panel传值
    provide('activeName', activeName)
    // 点击选项卡对应的处理函数
    const tabClick = (name, index) => {
      activeName.value = name
      // 触发一个点击自定义时间
      emit('tab-click', { name, index })
    }
    return { activeName, tabClick }
  },
  
}
</script>
<style scoped lang="less">
.xtx-tabs {
  background: #fff;
  > nav {
    height: 60px;
    line-height: 60px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    > a {
      width: 110px;
      border-right: 1px solid #f5f5f5;
      text-align: center;
      font-size: 16px;
      &.active {
        border-top: 2px solid var(--color-high-text);
        height: 60px;
        background: #fff;
        line-height: 56px;
      }
    }
  }
}
</style>