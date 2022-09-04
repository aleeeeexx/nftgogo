<template>
  <div>
    <div class="header">
      <img class="back" :src="require('@/assets/back.svg')" @click="toggleCity()" />
      选择城市({{ cityCode ? cityCode.split(',').length : 0 }})
      <img class="close" :src="require('@/assets/close.svg')" @click="close()" />
    </div>
    <div class="city-province">
      <div class="column">
        <div
          :class="[
            'item',
            'province',
            { count: v.cityList?.filter(e => cityCode.includes(e.code)).length },
            { active: v.code === activeProvince }
          ]"
          v-for="v in cityList"
          :key="v.code"
          @click="changeProvince(v.code)"
        >
          <span class="name"> {{ v.name }} </span>
          <span v-show="!!v.cityList?.filter(e => cityCode.includes(e.code)).length">
            ({{ v.cityList?.filter(e => cityCode.includes(e.code)).length }})
          </span>
        </div>
      </div>
      <div class="column">
        <div
          class="item city"
          v-for="v in cities"
          :key="v.code"
          @click="changeSelect('cityCode', v.code)"
        >
          {{ v.name }}
          <img
            class="checked"
            v-if="cityCode.includes(v.code)"
            :src="require('@/assets/checked.svg')"
            alt=""
          />
          <div class="check" v-else />
        </div>
      </div>
    </div>
    <select-footer isBottom @reset="changeSelect('cityCode', '')" @confirm="toggleCity()" />
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import type { PropType } from 'vue'
import type { CityList } from '@/api/Customer'
import SelectFooter from './selectFooter.vue'
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  cityList: {
    type: Array as PropType<CityList[]>,
    required: true
  },
  cityCode: {
    type: String,
    required: true
  },
  changeSelect: {
    type: Function,
    required: true
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
const activeProvince = ref(props.cityList[0].code)
const cities = ref(props.cityList[0].cityList)
console.log('v', props.cityList)
const changeProvince = (code: string) => {
  activeProvince.value = code
  cities.value = props.cityList.find(v => v.code === code)?.cityList as CityList[]
}
</script>
<style lang="scss" scoped>
.header {
  position: relative;
  margin: 11px 15px;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: #000;
  .back {
    position: absolute;
    left: 0;
    margin-top: 2px;
  }
  .close {
    position: absolute;
    right: 0;
    margin-top: 5px;
  }
}
.city-province {
  display: flex;
  font-size: 12px;
  font-weight: 500;
  .column {
    height: calc(100vh - 210px);
    overflow: scroll;
    &:first-of-type {
      background: #f8f8f8;
    }
  }
  .item {
    color: var(--font-color-8);
    padding: 16px 12px;
    display: flex;
    align-items: center;
  }
  .province {
    background: #f8f8f8;
    width: 115px;
    &.count {
      color: var(--theme-color);
    }
    &.active {
      background: #fff;
    }
    .name {
      width: 90px;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .city {
    justify-content: space-between;
    width: 210px;
    .check {
      border-radius: 2px;
      width: 10px;
      height: 10px;
      background: #ffffff;
      border: 1px solid #d9d9d9;
    }
    .checked {
      border-radius: 2px;
      width: 12px;
      height: 12px;
    }
  }
}
</style>
