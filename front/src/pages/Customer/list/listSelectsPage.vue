<template>
  <div class="selects-page">
    <div class="header">
      <img :src="require('@/assets/close.svg')" @click="confirm()" />
      <span>全部条件</span>
    </div>
    <div class="content">
      <div>
        <div class="tag-title">客户类型</div>
        <div class="tag-group">
          <div
            v-for="v in customerTypeList"
            :class="['tag-value', { 'tag-active': v.value === filterList.type }]"
            :key="v.value"
            @click="changeSelect('type', v.value)"
          >
            {{ v.text }}
          </div>
        </div>
      </div>
      <div v-if="filterList.type !== '0'">
        <div class="tag-title">数据范围</div>
        <div class="tag-group">
          <div
            :class="['tag-value', { 'tag-active': filterList.onlyLookSelfNew === '' }]"
            @click="changeSelect('onlyLookSelfNew', '')"
          >
            全部
          </div>
          <div
            v-for="v in selfList.slice(1)"
            :class="['tag-value', { 'tag-active': filterList.onlyLookSelfNew.includes(v.value) }]"
            :key="v.value"
            @click="changeSelect('onlyLookSelfNew', v.value)"
          >
            {{ v.text }}
          </div>
        </div>
      </div>
      <div>
        <div class="tag-title">来源</div>
        <div class="tag-group">
          <div
            :class="['tag-value', { 'tag-active': filterList.customerSource === '' }]"
            @click="changeSelect('customerSource', '')"
          >
            全部
          </div>
          <div
            v-for="v in sourceList.slice(1)"
            :class="['tag-value', { 'tag-active': filterList.customerSource.includes(v.value) }]"
            :key="v.value"
            @click="changeSelect('customerSource', v.value)"
          >
            {{ v.text }}
          </div>
        </div>
      </div>
      <div>
        <div class="tag-title">
          <span class="tag-title">意向类型</span>
        </div>
        <div class="tag-group">
          <div
            :class="['tag-value', { 'tag-active': filterList.intentionType === '' }]"
            @click="changeSelect('intentionType', '')"
          >
            全部
          </div>
          <div
            v-for="v in intentionTypeList.slice(1)"
            :class="['tag-value', { 'tag-active': filterList.intentionType.includes(v.value) }]"
            :key="v.value"
            @click="changeSelect('intentionType', v.value)"
          >
            {{ v.text }}
          </div>
        </div>
      </div>
      <div v-if="filterList.type === '1'">
        <div class="tag-title">
          <span class="tag-title">意向标签</span>
        </div>
        <div class="tag-group">
          <div
            :class="['tag-value', { 'tag-active': !filterList.intentionLevel }]"
            @click="changeSelect('intentionLevel', '')"
          >
            全部
          </div>
          <div
            v-for="v in intentionList.slice(1)"
            :class="['tag-value', { 'tag-active': filterList.intentionLevel.includes(v.value) }]"
            :key="v.value"
            @click="changeSelect('intentionLevel', v.value)"
          >
            {{ v.text }}
          </div>
        </div>
      </div>
      <div v-if="filterList.type === '1'">
        <div class="tag-title">
          <span class="tag-title">关键动作</span>
        </div>
        <div class="tag-group">
          <div
            :class="['tag-value', { 'tag-active': filterList.followLabels === '' }]"
            @click="changeSelect('followLabels', '')"
          >
            全部
          </div>
          <div
            v-for="v in followList.slice(1)"
            :class="['tag-value', { 'tag-active': filterList.followLabels.includes(v.value) }]"
            :key="v.value"
            @click="changeSelect('followLabels', v.value)"
          >
            {{ v.text }}
          </div>
        </div>
      </div>
      <div>
        <div class="tag-title">
          <span class="tag-title">城市</span>
        </div>
        <div class="tag-group">
          <div
            :class="['tag-value', { 'tag-active': !filterList.cityCode }]"
            @click="changeSelect('cityCode', '')"
          >
            全部
          </div>
          <div
            :class="[
              'tag-value',
              { 'tag-active': filterList.cityCode && filterList.cityCode.split(',').length }
            ]"
            @click="toggleCity()"
          >
            其他({{ filterList.cityCode ? filterList.cityCode.split(',').length : 0 }})
            <img
              v-if="filterList.cityCode"
              :src="require('@/assets/dropdown_active.svg')"
              alt=""
              class="other"
            />
            <img v-else :src="require('@/assets/dropdown_black.svg')" alt="" />
          </div>
        </div>
      </div>
    </div>
    <select-footer isBottom @reset="changeSelect('all', '')" @confirm="confirm()" />
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import type { PropType } from 'vue'
import SelectFooter from './selectFooter.vue'
interface Item {
  [x: string]: string
}
const props = defineProps({
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
  sourceList: {
    type: Array as PropType<Item[]>,
    default: () => []
  },
  intentionTypeList: {
    type: Array as PropType<Item[]>,
    default: () => []
  },
  intentionList: {
    type: Array as PropType<Item[]>,
    default: () => []
  },
  followList: {
    type: Array as PropType<Item[]>,
    default: () => []
  },
  changeSelect: {
    type: Function,
    default: () => {}
  },
  onRefresh: {
    type: Function,
    default: () => {}
  },
  close: {
    type: Function,
    default: () => {}
  },
  toggleCity: {
    type: Function,
    default: () => {}
  }
})
const confirm = () => {
  props.onRefresh(true)
  props.close()
}
</script>
<style lang="scss" scoped>
@import './listSelectsPage.scss';
@import './tag.scss';
</style>
