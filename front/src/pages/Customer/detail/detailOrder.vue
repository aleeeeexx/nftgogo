<template>
  <div class="detail-order">
    <div v-if="showRelate" class="relate">
      <div class="content">
        <span class="text">更多订单可手动进行关联</span>
        <span class="btn" @click="toRelate()"> + 关联订单 </span>
      </div>
    </div>
    <div class="order-container" v-if="list.length">
      <order-card
        v-for="(item, index) in list"
        :key="item.orderCode"
        :item="item"
        v-show="!canFold || showMore || index === 0"
      >
        <template #default>
          <mj-button @click="toOrder(item.orderCode)" />
        </template>
      </order-card>
      <div
        class="show-btn save-area"
        v-if="canFold && list.length > 1"
        @click="showMore = !showMore"
      >
        <span :class="[showMore ? 'fold-up' : 'fold-down']">
          {{ `${showMore ? '收起' : '查看'}更多` }}
        </span>
      </div>
    </div>
    <Empty v-else text="暂无成交信息" />
  </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getCustomerOrder, getCustomerReferralOrder } from '@/api/Customer'
import OrderCard from './orderCard.vue'
import Empty from '@/components/Empty/index.vue'
import wx from 'jweixin-1.6.0'
const props = defineProps({
  mobile: String,
  customerId: String,
  customer: { type: Object },
  referral: { type: Object },
  canFold: { type: Boolean, default: false }, // 是否有查看更多
  showRelate: { type: Boolean, default: false } // 是否有查看更多
})
const emit = defineEmits(['updateOrder'])
interface Item {
  [x: string]: string | number | string[] | Item | Item[]
  orderCode: string
  categoryList: Item[]
  orderItemVoList: Item[]
  categoryName: string
  orderCategoryVo: Item
}
const router = useRouter()
const list = ref<Item[]>([])
watch(
  () => props.mobile,
  async val => {
    console.log('order mobile', val)
    if (!val || val.includes('*')) return
    const res = await getCustomerOrder({ mobile: val, pageSize: 100, page: 1 })
    list.value = res.records.map((v: Item) => {
      return {
        ...v,
        category: Array.from(new Set(v.categoryList.map((v: Item) => v.categoryName))).join(',')
      }
    })
    // console.log('order', list.value)
    emit('updateOrder', list.value.length)
  }
)
watch(
  () => props.customerId,
  async val => {
    console.log('order customerId', val)
    if (!val) return
    const res = await getCustomerReferralOrder(val)
    list.value = res.records.map((v: Item) => {
      return {
        ...v,
        orderCode: v.code,
        category: Array.from(
          new Set(v.orderItemVoList.map((v: Item) => v.orderCategoryVo.categoryName))
        ).join(',')
      }
    })
    // list.value = [
    //   ...res.records,
    //   {
    //     orderCode: 123,
    //     supplierName: 'xx',
    //     totalAmount: 12,
    //     category: 'cccc',
    //     orderStatus: 5,
    //     createdTime: '1212121-2312'
    //   },
    //   {
    //     orderCode: 12,
    //     supplierName: 'xx',
    //     totalAmount: 12,
    //     category: 'cccc',
    //     orderStatus: 3,
    //     createdTime: '1212121-2312'
    //   }
    // ]
  }
)
const showMore = ref(false)
const toRelate = () => {
  router.push({
    path: '/relateOrderList',
    query: {
      referralId: props.referral?.id,
      mobile: props.customer?.mobile,
      source: props.customer?.customerSource
    }
  })
}
const toOrder = (id: string) => {
  console.log(id)
  wx.miniProgram.navigateTo({ url: `/pages/OrderDetail/index?id=${id}&isOrder=1&status=1` })
}
</script>
<style lang="scss" scoped>
.relate {
  background: #fff;
  padding: 16px 12px 0 12px;
  .content {
    background: #fcfcfc;
    border: 1px solid #eaeaea;
    border-radius: 4px;
    padding: 18px 16px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    .text {
      color: var(--font-color-6);
    }
    .btn {
      color: var(--theme-color-2);
    }
  }
}
.order-container {
  background: #fff;
  padding: 16px 12px;
}

@mixin fold {
  content: '';
  position: absolute;
  width: 5px;
  height: 5px;
  border-left: 1px solid var(--font-color-6);
  border-bottom: 1px solid var(--font-color-6);
  margin-left: 8px;
}
.show-btn {
  position: relative;
  text-align: center;
  font-size: 12px;
  color: var(--font-color-6);
  padding-bottom: 16px;
  // margin-top: -16px;
  span {
    &.fold-up::after {
      @include fold();
      transform: rotate(135deg);
      top: 7px;
    }
    &.fold-down::after {
      @include fold();
      transform: rotate(-45deg);
      top: 4px;
    }
  }
}
</style>
