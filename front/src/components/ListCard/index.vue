<template>
  <div class="list">
    <div class="item">
      <div class="header">
        <text class="no">{{ name }}</text>
        <text class="status">{{ status }}</text>
      </div>
      <div class="body">
        <div class="label" :key="index" v-for="(item, index) in body">
          <text class="name">{{ item.label }}</text>
          <text class="value">{{ item.value }}</text>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from 'vue'
interface Item {
  label: string
  value: string | number
}
export interface ListItem {
  name: string
  status: string
  body: Item[]
  id: number
}
defineProps({
  name: {
    type: String
  },
  status: {
    type: String
  },
  body: {
    type: Array as PropType<Item[]>,
    default() {
      return []
    }
  }
})
</script>

<style lang="scss">
.list {
  .item {
    background-color: #fff;
    padding-left: 20px;
    margin: 10px 0;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 51px;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      border-bottom: 1px solid #eaeaea;
      .no {
        color: rgba(0, 0, 0, 0.85);
      }
      .status {
        margin-right: 20px;
        color: rgba(0, 0, 0, 0.6);
      }
    }
    .body {
      padding: 10px 0;
      box-sizing: border-box;
      .label {
        .name {
          font-size: 14px;
          line-height: 26px;
          color: rgba(0, 0, 0, 0.6);
          display: inline-block;
          width: 50px;
        }
        .value {
          font-size: 14px;
          line-height: 26px;
          color: rgba(0, 0, 0, 0.85);
        }
      }
    }
  }
}
</style>
