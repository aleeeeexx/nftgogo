<template>
  <detail-house :pageType="0" :list="houseInfoList" :role="store.state.user.role" />
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import DetailHouse from '../detail/detailHouse.vue'
const store = useStore()
const houseInfoList = ref(JSON.parse(sessionStorage.getItem('houseInfoList') as string))
</script>
