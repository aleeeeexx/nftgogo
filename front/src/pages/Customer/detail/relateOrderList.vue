<template>
  <div class="order-list">
    <div class="top-fix">
      <van-search
        v-model.trim="mobile"
        maxlength="11"
        type="number"
        placeholder="通过客户手机号搜索"
        @update:model-value="onSearch"
      />
    </div>
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
      v-if="listData.length"
    >
      <order-card v-for="item in listData" :key="item.orderCode" :item="item">
        <template #default>
          <div v-if="item.bindedReferral" class="warn">
            <span>该订单已被线索关联</span>
            <mj-button text="去关联" color="grey" />
          </div>
          <mj-button
            v-else-if="item.orderStatus !== 8"
            text="去关联"
            color="green"
            @click="bind(item, item.orderCode)"
          />
          <mj-button v-else text="去关联" color="grey" />
        </template>
      </order-card>
    </van-list>
    <Empty v-else text="暂无订单" background="#f8f8f8" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { Toast, Dialog } from 'vant'
import Empty from '@/components/Empty/index.vue'
import { useDebounceFn } from '@vueuse/core'
import { getBindOrderList, referralBindOrder } from '@/api/Customer'
import OrderCard from './orderCard.vue'
interface Item {
  [x: string]: string | number | string[] | Item | Item[] | boolean
  orderCode: string
  categoryList: Item[]
  orderItemVoList: Item[]
  categoryName: string
  orderCategoryVo: Item
}
const listData = ref<Item[]>([])
const finished = ref(false)
const loading = ref(false)
const mobile = ref('')
const route = useRoute()
const referralId = route.query.referralId as string
console.log(referralId)
const page = ref(1)
const getOrderList = async () => {
  loading.value = true
  const res = await getBindOrderList({
    referralId,
    mobile: mobile.value,
    page: page.value,
    pageSize: 10
  })
  const records = res.records.map((v: Item) => {
    return {
      ...v,
      category: Array.from(new Set(v.categoryList.map((v: Item) => v.categoryName))).join(',')
    }
  })
  listData.value = page.value === 1 ? records : [...listData.value, ...records]
  // listData.value = [
  //   ...records,
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
  loading.value = false
  finished.value = page.value < res.pages ? false : true
}
const onLoad = () => {
  page.value++
  getOrderList()
}
const onSearch = useDebounceFn(() => {
  if (!mobile.value.length) listData.value = []
  if (mobile.value.length === 11) {
    page.value = 1
    getOrderList()
  }
}, 300)
mobile.value = route.query.mobile as string
if (mobile.value) onSearch()
const source = route.query.source as string
const bind = async (item: Item, orderNo: string) => {
  Dialog.confirm({
    message: `是否关联订单到当前客户？${
      source === '1' ? '' : '关联后，线索将在24小时后关闭，不可跟进。'
    }`,
    confirmButtonText: '确定',
    closeOnClickOverlay: true,
    className: 'del-confirm-dialog'
  })
    .then(async () => {
      await referralBindOrder({ orderNo, referralId })
      item.bindedReferral = true
      Toast.success({
        message: '关联成功',
        duration: 2000
      })
    })
    .catch(() => {})
}
</script>
<style lang="scss" scoped>
.order-list {
  padding: 56px 12px 16px;
}
.top-fix {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.van-search {
  padding: 6px 12px;
}
.warn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 12px;
    color: #ff4d4f;
  }
}
</style>
