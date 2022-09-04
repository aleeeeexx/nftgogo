<template>
  <div :class="{ 'safe-height': isBottom }"></div>
  <div :class="['select-footer', { bottom: isBottom }]">
    <div class="btn reset" @click="onClick('reset')">重置</div>
    <div class="btn confirm" @click="onClick('confirm')">确定</div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
defineProps({
  isBottom: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['reset', 'confirm'])
const onClick = (type: 'reset' | 'confirm') => {
  emit(type)
}
</script>
<style lang="scss" scoped>
.select-footer {
  background: #fff;
  box-shadow: inset 0px 0.5px 0px #ededed;
  display: flex;
  justify-content: space-between;
  padding: 13px 20px;
  width: 100%;
  box-sizing: border-box;
  .btn {
    padding: 10px 0;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    border-radius: 4px;
  }
  .reset {
    color: var(--font-color-6);
    border: 1px solid var(--font-color-6);
    width: 110px;
  }
  .confirm {
    color: #fff;
    background-color: var(--theme-color);
    width: 217px;
  }
}
.bottom {
  position: absolute;
  bottom: 0;
  padding-bottom: calc(13px + constant(safe-area-inset-bottom));
  padding-bottom: calc(13px + env(safe-area-inset-bottom));
}
.safe-height {
  height: calc(66px + constant(safe-area-inset-bottom));
  height: calc(66px + env(safe-area-inset-bottom));
}
</style>
