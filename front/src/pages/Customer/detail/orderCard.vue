<template>
  <div class="order-card">
    <div class="card-title">
      <span>
        <img :src="require('@/assets/coutomer/supplier.svg')" />
        <span class="name">
          {{ item.supplierName }}
        </span>
      </span>
      <span class="price">{{ `￥${item.totalAmount || ''}` }}</span>
    </div>
    <div class="card-detail">
      <div class="detail-item">
        <span class="item-label">商品类目：</span>
        <span class="item-val">{{ item.category }}</span>
      </div>
      <div class="detail-item">
        <span class="item-label">订单状态：</span>
        <span class="item-val">{{ OrderStatus[+item.orderStatus] }}</span>
      </div>
      <div class="detail-item">
        <span class="item-label">下单时间：</span>
        <span class="item-val">{{ item.createdTime }}</span>
      </div>
    </div>
    <div class="card-btns">
      <slot />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import type { PropType } from 'vue'
import { OrderStatus } from '@/constant/customer'
interface Item {
  [x: string]: string | number | string[] | Item | Item[] | boolean
  orderCode: string
  categoryList: Item[]
  orderItemVoList: Item[]
  categoryName: string
  orderCategoryVo: Item
}
defineProps({
  item: { type: Object as PropType<Item>, required: true }
})
</script>
<style lang="scss" scoped>
.order-card {
  background: #fcfcfc;
  border: 1px solid #eaeaea;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
  .card-title {
    font-size: 16px;
    font-weight: 500;
    color: var(--theme-color-8);
    padding-bottom: 16px;
    border-bottom: 1px solid #eaeaea;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .name {
      width: 195px;
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .price {
      color: #eb5b58;
    }
    img {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }
    img,
    span {
      vertical-align: middle;
    }
  }
  .card-detail {
    padding-top: 16px;
    font-size: 14px;
    .detail-item {
      margin-bottom: 12px;
      display: flex;
      align-items: baseline;
      .item-label {
        color: rgba(0, 0, 0, 0.3);
        width: 70px;
      }
      .item-val {
        color: rgba(0, 0, 0, 0.6);
        width: 220px;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .card-btns {
    border-top: 1px solid #eaeaea;
    display: flex;
    justify-content: flex-end;
    padding-top: 16px;
  }
}
</style>
