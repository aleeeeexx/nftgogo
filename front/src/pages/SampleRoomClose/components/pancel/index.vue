<template>
  <div class="pancel">
    <div class="left">{{ props.title }}</div>
    <div class="right">
      <span class="content">{{ props.content }}</span>
      <van-icon name="arrow" class="logo" color="#B2B2B2" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  isLink: {
    type: Boolean,
    defalut: true
  }
})
</script>
<style lang="scss" scoped>
.pancel {
  width: 335px;
  margin-left: 20px;
  box-sizing: border-box;
  background-color: #fff;
  height: 54px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .left {
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.85);
  }
  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .content {
      font-size: 14px;
      line-height: 20px;
      color: #5d8aa3;
    }
    .logo {
      margin-left: 6px;
    }
  }
}
</style>
