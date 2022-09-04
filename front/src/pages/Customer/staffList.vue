<template>
  <div class="staff-list">
    <div class="top-fix">
      <van-search
        v-model.trim="keyWord"
        placeholder="通过员工姓名、手机号搜索"
        @update:model-value="onSearch"
      />
    </div>
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
      class="list"
      v-if="listData.length"
    >
      <div class="card" v-for="item in listData" :key="item.workerId">
        <div class="card-top">
          <div class="card-top-left">
            <div class="card-title flex-row">
              <div class="left">{{ item.workerName }}</div>
              <img class="icon" :src="require('@/assets/coutomer/mobile.svg')" />
              <div class="middle">
                {{ item.workerIphone }}
              </div>
            </div>
            <span class="card-subtitle">
              <span>{{ item.role }} {{ item.organizationName }}</span>
            </span>
          </div>
          <div class="card-top-right">
            <mj-button
              v-if="item.currentCount >= 500 || route.query.followerId === String(item.workerId)"
              text="指派给TA"
              color="grey"
            />
            <mj-button v-else text="指派给TA" color="green" @click.stop="assignOther(item)" />
          </div>
        </div>
        <div class="card-bottom">
          <div class="count">
            <div class="count-num">{{ item.historyCount || 0 }}</div>
            <div class="count-text">
              <span> 历史成交 </span>
              <img :src="require('@/assets/help.svg')" @click="showDialog = true" />
            </div>
          </div>
          <div class="count">
            <div>
              <span class="count-num">{{ item.currentCount || 0 }}</span>
              <span class="count-max">/500</span>
            </div>
            <div class="count-text">
              已指派客户 <span class="err" v-if="item.currentCount >= 500">（已满）</span>
            </div>
          </div>
        </div>
      </div>
    </van-list>
    <Empty v-else text="暂无员工" />

    <van-dialog
      v-model:show="showDialog"
      title="意向标签定义"
      confirmButtonText="我知道了"
      confirmButtonColor="#5D8AA3"
    >
      <div class="dialog-content">
        <p>历史成交指此员工跟进过的已成交的客户线索量</p>
      </div>
    </van-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
import { Toast, Dialog } from 'vant'
import Empty from '@/components/Empty/index.vue'
import { useDebounceFn } from '@vueuse/core'
import { getPaList, AssignOrReassign } from '@/api/Customer'
onBeforeRouteLeave(to => {
  to.params.change = 'follow'
})
const route = useRoute()
const router = useRouter()
interface Item {
  [x: string]: string | number
}
const listData = ref<Item[]>([])
const customerId = Number(route.query.customerId as string)
console.log(customerId)
const finished = ref(false)
const loading = ref(false)
const keyWord = ref('')
const page = ref(1)
const getStaffList = async () => {
  loading.value = true
  const res = await getPaList(customerId, { keyWord: keyWord.value, page: page.value })
  listData.value = page.value === 1 ? res.records : [...listData.value, ...res.records]
  loading.value = false
  finished.value = page.value < res.pages ? false : true
}
const onLoad = () => {
  page.value++
  getStaffList()
}
if (customerId) getStaffList()
const onSearch = useDebounceFn(() => {
  page.value = 1
  getStaffList()
}, 300)
const showDialog = ref(false)
const assignOther = async (item: Item) => {
  Dialog.confirm({
    title: `是否指派给${item.workerName}?`,
    message: `每个人最多跟进500个线索，指派后TA将收到企业微信消息提醒`,
    confirmButtonText: '确定',
    closeOnClickOverlay: true,
    className: 'del-confirm-dialog'
  })
    .then(async () => {
      await AssignOrReassign({
        type: route.query.type ? 1 : 0, // 0指派 1：改派
        customerIdList: [customerId],
        followerMobile: String(item.workerIphone),
        followerId: Number(item.workerId),
        followerName: String(item.workerName)
      })
      Toast.success({
        message: `${route.query.type ? '改派' : '指派'}成功`,
        duration: 2000
      })
      router.go(-1)
    })
    .catch(() => {})
}
</script>
<style lang="scss" scoped>
@import './list/staffList.scss';
</style>
