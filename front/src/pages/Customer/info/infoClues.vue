<template>
  <div class="clues">
    <div class="title">
      <span>已有线索 ({{ clues.length }})</span>
    </div>
    <div class="detail">
      <div class="warn" v-if="!hasMobile">请先绑定手机号，方可查看已有线索</div>
      <div class="info" v-if="hasMobile && !clues.length">暂无线索，请提报</div>
      <div class="cards" v-if="hasMobile && clues.length">
        <ClueCard :clues="clues" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref, watch } from 'vue'
import { getCluesByMobile } from '@/api/Customer'
import ClueCard from './clueCard.vue'
const props = defineProps({
  pageType: Number,
  mobile: String
})
const hasMobile = ref(false)
const clues = ref([])
watch(
  () => props.mobile,
  val => {
    if (!val || val.includes('*')) return
    hasMobile.value = true
    getCluesByMobile(val).then(res => {
      clues.value = res
    })
  }
)
</script>
<style lang="scss" scoped>
@import './infoClues.scss';
</style>
