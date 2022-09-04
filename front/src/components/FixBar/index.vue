<template>
  <div class="handler save-area" :style="`background: ${bgColor};height: ${height}`"></div>
  <div class="bar save-area" :style="`height: ${height}`">
    <slot name="content"></slot>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
defineProps({
  bgColor: {
    type: String,
    default: '#f9f9f9'
  },
  height: {
    type: String,
    default: '19vw'
  }
})
</script>

<style lang="scss" scoped>
// .handler {
//   // height: 72px;
// }
.bar {
  // height: 72px;
  width: 100vw;
  position: fixed;
  bottom: 0;
  background-color: #fff;
}
</style>
