<template>
  <router-view v-slot="{ Component }" v-if="isRouterAlive">
    <!-- <keep-alive>
      <component :is="Component" v-if="$route.meta.keepAlive" :key="$route.fullPath" />
    </keep-alive> -->
    <component :is="Component" v-if="!$route.meta.keepAlive" :key="$route.fullPath" />
    <TabBar></TabBar>
  </router-view>
</template>
<script lang="ts" setup>
import { ref, nextTick, provide } from 'vue'
import { useRouter } from 'vue-router'

import TabBar from '@/components/tabbar/index.vue'

const router = useRouter()
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
