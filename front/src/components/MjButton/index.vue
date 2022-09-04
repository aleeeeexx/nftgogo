<template>
  <div :class="['btn', color]">{{ text }}</div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
defineProps({
  text: {
    type: String,
    default: '查看'
  },
  color: {
    type: String,
    default: 'white'
  }
})
</script>
<style lang="scss" scoped>
.btn {
  width: 78px;
  padding: 5px 0;
  text-align: center;
  border-radius: 14px;
  font-size: 12px;
  font-weight: 600;
  &.green {
    color: var(--theme-color);
    border: 1px solid var(--theme-color);
  }
  &.white {
    color: var(--font-color-6);
    border: 1px solid var(--font-color-3);
  }
  &.grey {
    color: var(--font-color-3);
    background: #e5e5ea;
  }
}
</style>
