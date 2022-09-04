<template>
  <div class="selects">
    <div class="select-container">
      <div class="select-item">
        <div class="select-label-long">客户类型</div>
        <div class="select-vals">
          <div
            v-for="v in customerTypeList"
            :class="['select-value', { 'select-active': v.value === filterList.type }]"
            :key="v.value"
            @click="changeSelect('type', v.value, true)"
          >
            {{ v.text }}
          </div>
        </div>
      </div>
      <div class="select-item" v-if="filterList.type !== '0'">
        <div class="select-label-long">数据范围</div>
        <div class="select-vals">
          <div
            :class="['select-value', { 'select-active': filterList.onlyLookSelfNew === '' }]"
            @click="changeSelect('onlyLookSelfNew', '', true)"
          >
            全部
          </div>
          <div
            v-for="v in selfList.slice(1)"
            :class="[
              'select-value',
              { 'select-active': filterList.onlyLookSelfNew.includes(v.value) }
            ]"
            :key="v.value"
            @click="changeSelect('onlyLookSelfNew', v.value, true)"
          >
            {{ v.text }}
          </div>
        </div>
      </div>
    </div>
    <div class="select-reset">
      <slot />
      <div class="reset-btn" @click="changeSelect('all', '', true)">
        <img :src="require('@/assets/coutomer/reset_select.svg')" />
        <span> 重置选项 </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import type { PropType } from 'vue'
interface Item {
  [x: string]: string
}
defineProps({
  filterList: {
    type: Object,
    default: () => {}
  },
  customerTypeList: {
    type: Array as PropType<Item[]>,
    default: () => []
  },
  selfList: {
    type: Array as PropType<Item[]>,
    default: () => []
  },
  changeSelect: {
    type: Function,
    default: () => {}
  }
})
</script>
<style lang="scss" scoped>
@import './listSelects.scss';
</style>
