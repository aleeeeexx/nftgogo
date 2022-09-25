<template>
  <router-view v-slot="{ Component }" v-if="isRouterAlive">
    <!-- <keep-alive>
      <component :is="Component" v-if="$route.meta.keepAlive" :key="$route.fullPath" />
    </keep-alive> -->
    <component :is="Component" v-if="!$route.meta.keepAlive" :key="$route.fullPath" />
    <!-- <TabBar v-if="!route.meta.hideTab"></TabBar> -->
    <van-tabbar v-model="active" active-color="#fff" inactive-color="#4f4f4f" :border="false">
      <van-tabbar-item @click="router.replace('/index')">
        <template #icon="props">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-home"></use>
          </svg>
        </template>
        主页
      </van-tabbar-item>
      <van-tabbar-item icon="search">搜索</van-tabbar-item>
      <van-tabbar-item @click="router.replace('/personal-center')">
        <template #icon="props">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-user-filling"></use>
          </svg>
        </template>
        个人
      </van-tabbar-item>
    </van-tabbar>
  </router-view>
</template>
<script lang="ts" setup>
import { ref, nextTick, provide } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const active = ref(0)
// import TabBar from '@/components/tabbar/index.vue'

const router = useRouter()
const route = useRoute()
const isRouterAlive = ref(true)
// 强制刷新页面，但没有刷新的闪动效果
const onRefresh = () => {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
}
provide('onRefresh', onRefresh)

//判断是前进还是返回
//如果是返回后再刷新页面，此时状态仍然是返回，但是此项目是h5，不提供刷新，故不考虑此情况
router.afterEach(to => {
  if (window.history.state && window.history.state.forward) {
    to.meta.isBack = true
  } else {
    to.meta.isBack = false
  }
})
</script>
