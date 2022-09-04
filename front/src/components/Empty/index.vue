<template>
  <div class="empty" :style="`background: ${background}`">
    <img :src="require('@/assets/empty.png')" />
    <p>{{ text }}</p>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
defineProps({
  text: {
    type: String,
    default: '暂无记录'
  },
  background: {
    type: String,
    default: '#fff'
  }
})
</script>
<style lang="scss" scoped>
.empty {
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--font-color-3);
  img {
    width: 190px;
    margin-bottom: 20px;
  }
}
</style>
