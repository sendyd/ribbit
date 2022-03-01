<template>
  <div class="xtx-bread-item">
    <RouterLink v-if="to" :to="to">
      <slot />
    </RouterLink>
    <span v-else>
      <slot />
    </span>
  </div>
</template>
<script setup>
import { defineProps } from 'vue'
const { to } = defineProps({
  to: {
    type: [String, Object],
    default: ''
  }
})


</script>
<script>
export default {
  name:'XtxBreadItem'
}
</script>