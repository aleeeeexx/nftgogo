<template>
  <van-action-sheet v-model:show="show" @close="close">
    <div class="area-picker-container">
      <div class="titles">
        <div class="title">
          <div
            class="tab"
            :class="{ border: active === index }"
            v-for="(item, index) in values"
            :key="item.code"
            @click="change(index)"
          >
            <span v-if="active >= index">{{ item.name }}</span>
          </div>
        </div>
        <van-icon name="cross" size="24px" @click="close" />
      </div>
      <div class="list-container">
        <div
          class="body"
          @click="select(item)"
          v-for="item in values[active].content"
          :key="item.code"
        >
          <van-cell :title="item.name">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #right-icon v-if="item.code === values[active].code">
              <van-icon name="success" />
            </template>
          </van-cell>
        </div>
      </div>
    </div>
  </van-action-sheet>
</template>
<script lang="ts" setup>
export type PickerItem = { name: string; code: string }
export interface Values extends PickerItem {
  content: PickerItem[]
}
import { ref, defineProps, watchEffect, defineEmits, computed, PropType } from 'vue'
const emit = defineEmits(['update:visible', 'change', 'select'])
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  values: {
    type: Array as PropType<Values[]>,
    default() {
      return []
    }
  }
})
const active = computed(() => props.values?.length - 1)
const show = ref(false)

const close = () => {
  emit('update:visible', false)
}
const change = (index: number) => {
  emit('change', index, props.values)
}
const select = (item: PickerItem) => {
  emit('select', item)
}

watchEffect(() => {
  show.value = props.visible
})
</script>
<style lang="scss">
.border {
  border-bottom: 2px solid #5d8aa3;
}
.area-picker-container {
  height: 50vh;
  overflow-y: auto;
  position: reactive;
}
.titles {
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  top: 0;
  z-index: 1;
  background-color: #fff;
  .title {
    display: flex;
    align-items: center;
    .tab {
      display: inline-block;
      line-height: 44px;
      color: #666666;
      font-size: 14px;
      padding: 0 8px;
      box-sizing: border-box;
      height: 44px;
      &:not(:last-child) {
        // CSS样式
        max-width: 60px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
.list-container {
  margin-top: 44px;
}
</style>
