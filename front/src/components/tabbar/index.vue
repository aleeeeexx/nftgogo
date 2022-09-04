<template>
  <div class="handler save-area" :style="`background: ${bgColor};height: ${height}`"></div>
  <div class="bar save-area" :style="`height: ${height}`">
    <div class="content">
      <div class="tab-item" active-class="isActive" :style="`height: ${height}`">
        <van-icon name="wap-home-o" size="30" color="#fff" />
        <router-link class="item-wrap" to="/mobile-login"> 主页 </router-link>
      </div>
      <div class="tab-item" active-class="isActive" :style="`height: ${height}`">
        <van-icon name="contact" size="30" color="#fff" />
        <router-link class="item-wrap" to="/personal-center">我的 </router-link>
      </div>
    </div>
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
  width: 100vw;
  position: fixed;
  bottom: 0;
  background-color: rgb(58, 53, 53);
  .content {
    display: flex;
    justify-content: space-evenly;
    .tab-item {
      flex: 1;
      text-align: center;
      display: flex;
      flex-direction: column;
      padding: 10px;
      a {
        color: #eee;
        margin-top: 10px;
      }
    }
  }
}
</style>
