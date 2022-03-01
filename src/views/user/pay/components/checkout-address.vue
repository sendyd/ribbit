<template>
  <div class="checkout-address">
    <div class="text">
      <div v-if="!showAddress" class="none">您需要先添加收货地址才可提交订单。</div>
      <ul v-if="showAddress">
        <li>
          <span>
            收
            <i />货
            <i />人：
          </span>
          {{ showAddress.receiver }}
        </li>
        <li>
          <span>联系方式：</span>
          {{ showAddress.contact.replace(/^(\d{3})\d{4}(\d{4})/, '$1****$2') }}
        </li>
        <li>
          <span>收货地址：</span>
          {{ showAddress.fullLocation.replace(/ /g, '') + showAddress.address }}
        </li>
      </ul>
      <a @click="openAddressEdit(showAddress)" v-if="showAddress" href="javascript:;" >修改地址</a>
    </div>
    <div class="action">
      <XtxButton @click="open" class="btn">切换地址</XtxButton>
      <XtxButton @click="openAddressEdit()" @on-success="successHandler" class="btn">添加地址</XtxButton>
    </div>
    <XtxDialog title="切换收货地址" v-model:visible="dialogVisible">
      <div
        @click="selectedAddress = item"
        :class="{ active: selectedAddress && selectedAddress.id === item.id }"
        class="text item"
        v-for="item in list"
        :key="item.id"
      >
        <ul>
          <li>
            <span>
              收
              <i />货
              <i />人：
            </span>
            {{ item.receiver }}
          </li>
          <li>
            <span>联系方式：</span>
            {{ item.contact.replace(/^(\d{3})\d{4}(\d{4})/, '$1****$2') }}
          </li>
          <li>
            <span>收货地址：</span>
            {{ item.fullLocation.replace(/ /g, '') + item.address }}
          </li>
        </ul>
      </div>
      <!-- vue3.0 仅支持v-slot+template写法 -->
      <template #footer>
        <XtxButton @click="dialogVisible = false" type="gray" style="margin-right:20px">取消</XtxButton>
        <XtxButton @click="confirmSet" type="primary">确认</XtxButton>
      </template>
    </XtxDialog>
    <addressEditVue ref="target" />
  </div>
</template>
<script setup>
import { defineProps, ref, defineEmits, getCurrentInstance , defineExpose } from 'vue';
import addressEditVue from './address-edit.vue';
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})
// 添加收货地址组件
// 显示的地址
const showAddress = ref(null)
const target = ref(null)
const openAddressEdit = (address) => {

  //添加{} 修改 {obj}
 
    target.value.open(address)

}
// 成功
const successHandler = (formData) => {
  const json = JSON.stringify(formData)  // 需要克隆下，不然使用的是对象的引用
  // eslint-disable-next-line vue/no-mutating-props
  props.list.unshift(JSON.parse(json))
}
if (props.list.length) {
  const defaultAddress = props.list.find(item => item.isDefault === 1)
  if (defaultAddress) {
    showAddress.value = defaultAddress
  } else {
    // eslint-disable-next-line vue/no-setup-props-destructure
    showAddress.value = props.list[0]
  }
}

const emits = defineEmits(['change'])
// 对话框显示隐藏
const dialogVisible = ref(false)
//记录当前选中地址
const selectedAddress = ref(null)

// 默认通知一个地址ID给父
emits('change', showAddress.value?.id)
// console.log(showAddress.value?.id);
// console.log(emits);
const open = () => {
  //数据置空
  selectedAddress.value = null
  dialogVisible.value = true
}
const confirmSet = () => {
  //显示地址换成选中的地址
  showAddress.value = selectedAddress.value
  //把选中的地址ID通知结算组件
  emits('change', showAddress.value?.id)


  dialogVisible.value = false
}

defineExpose({
  openAddressEdit
})
</script>
<style scoped lang="less">
.xtx-dialog {
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    &.item {
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;
      &.active,
      &:hover {
        border-color: var(--color-high-text);
        background: lighten(green, 50%);
      }
      > ul {
        padding: 10px;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
}
.checkout-address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: var(--color-high-text);
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>