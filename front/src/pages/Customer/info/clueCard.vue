<template>
  <div
    v-for="(item, index) in clues"
    :key="item.id"
    v-show="showMore || index === 0"
    class="clue-card"
    @click="toDetail(item.customerId)"
  >
    <div
      v-if="[1, 2, 4, 5].includes(item.status)"
      :class="['status', `status-${statusColors[item.status]}`]"
    >
      {{ statusLabels[item.status] }}
    </div>
    <span class="card-subtitle">
      <img class="location" :src="require('@/assets/coutomer/location.svg')" />
      <span>{{ item.provinceName }}{{ item.cityName }}</span>
    </span>
    <div class="card-desc">
      <div class="card-detail flex-row-start">
        <img class="icon" :src="require('@/assets/coutomer/intention.svg')" />
        <span class="label">意向描述：</span>
        <span class="val ellipsis">{{ item.intentionDescription }}</span>
      </div>
      <div class="card-detail flex-row-start">
        <span class="icon" />
        <span class="label">意向类型：</span>
        <span class="val">{{
          item.intentionType === 1 ? '自营' : item.intentionType === 2 ? '美居' : ''
        }}</span>
      </div>
    </div>
    <div class="card-bottom">
      <mj-button @click.stop="toDetail(item.customerId)" />
    </div>
  </div>

  <div class="show-btn" v-if="clues.length > 1" @click="showMore = !showMore">
    <span :class="[showMore ? 'fold-up' : 'fold-down']">
      {{ `${showMore ? '收起' : '查看'}更多` }}
    </span>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import type { PropType } from 'vue'
import { useRouter } from 'vue-router'
interface Item {
  [x: string]: string | number
  customerId: number
  status: number
}
defineProps({
  clues: {
    type: Array as PropType<Item[]>,
    required: true,
    default: () => []
  },
  index: Number
})
interface Status {
  [x: number]: string
}
const statusLabels: Status = {
  1: '可跟进',
  2: '跟进中',
  4: '已成交',
  5: '未成交'
}
const statusColors: Status = {
  1: 'green',
  2: 'blue',
  4: 'orange',
  5: 'grey'
}
const showMore = ref(false)
const router = useRouter()
const toDetail = (id: number) => {
  router.push({
    path: '/customerDetail',
    query: {
      id,
      pageType: 0,
      flag: 1
    }
  })
}
</script>
<style lang="scss" scoped>
@import './clueCard.scss';
</style>
