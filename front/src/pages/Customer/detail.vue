<template>
  <detail-basic
    :customer="customerInfo"
    :referral="referralInfo"
    :pageType="pageType"
    :intentionConfig="intentionConfig"
    :intentionList="intentionList"
    :role="store.state.user.role"
    @showWarn="showWarn = true"
    @success="loadCustomerReferral"
    @updateType="updateType"
  />
  <div class="tabs">
    <div
      :class="['tab', { active: activeTab === v.value }]"
      :style="`width: ${pageType === 1 ? '33%' : '50%'}`"
      v-for="v in tabs"
      :key="v.value"
      :value="v.value"
      @click="activeTab = v.value"
    >
      {{ v.text }}
    </div>
  </div>
  <detail-house
    v-show="activeTab === 'house'"
    :pageType="pageType"
    :list="houseInfoList"
    :role="store.state.user.role"
    :followFlag="customerInfo.followFlag"
    :customerId="String(route.query.id)"
    :referral="referralInfo"
    :loadData="loadData"
    @showWarn="showWarn = true"
  />
  <detail-follow
    v-show="activeTab === 'follow'"
    :pageType="pageType"
    :records="records"
    :followConfig="followConfig"
    :followList="followList"
    :role="store.state.user.role"
    :followFlag="customerInfo.followFlag"
    :customerId="String(route.query.id)"
    :referral="referralInfo"
    @showWarn="showWarn = true"
    @success="loadReferralFollowRecord"
  />
  <detail-order
    v-show="activeTab === 'order'"
    :customerId="pageType === 1 ? String(route.query.id) : ''"
    :customer="customerInfo"
    :referral="referralInfo"
    :showRelate="
      referralInfo.currentFollowerFlag &&
      !(referralInfo?.status === 1 && referralInfo?.locked === 1)
    "
  />
  <detail-bar
    :pageType="pageType"
    :referral="referralInfo"
    :role="store.state.user.role"
    :houseInfoList="houseInfoList"
    :customerId="String(route.query.id)"
    :customer="customerInfo"
    :loadData="loadData"
    :changeActiveTab="changeActiveTab"
  />
  <van-dialog
    v-model:show="showWarn"
    title="提示"
    confirmButtonText="我知道了"
    confirmButtonColor="#5D8AA3"
  >
    <div class="dialog-content">请先确认是否同意跟进</div>
  </van-dialog>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import {
  HouseInfoType,
  CustomerReferralType,
  CustomerDetailType,
  FollowRecordType,
  getCustomerDetail,
  getCustomerReferral,
  getReferralFollowRecord,
  getIntentionList,
  saveFollowLabel
} from '@/api/Customer'
import DetailBasic from './detail/detailBasic.vue'
import DetailHouse from './detail/detailHouse.vue'
import DetailFollow from './detail/detailFollow.vue'
import DetailOrder from './detail/detailOrder.vue'
import DetailBar from './detail/detailBar.vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
const router = useRouter()
const route = useRoute()
const store = useStore()
const pageType = ref(Number(route.query.pageType as string))
const tabOptions = [
  { text: '房屋信息', value: 'house' },
  { text: '跟进记录', value: 'follow' }
]
const tabs = ref(tabOptions)
const activeTab = ref('house')
const customerInfo = ref<CustomerDetailType>({
  id: '',
  userId: '',
  mobile: '',
  name: '',
  cityCode: '',
  customerTag: [],
  customerHouse: [],
  status: 9,
  followFlag: undefined
})
const houseInfoList = ref<HouseInfoType[]>([])
const loadCustomerDetail = async () => {
  try {
    const res = await getCustomerDetail(route.query.id as string, route.query.flag as string)
    customerInfo.value = res
    houseInfoList.value = res?.customerHouse
  } catch (error) {
    setTimeout(() => {
      router.go(-1)
    }, 2000)
  }
}
const referralHistoryList = ref<CustomerReferralType[]>([])
const referralInfo = ref({
  createdTime: '',
  customerSource: 999,
  intentionDescription: '',
  intentionType: '',
  id: '',
  currentFollowerFlag: true,
  locked: 999,
  status: 999
})
const loadCustomerReferral = async () => {
  const res = await getCustomerReferral(route.query.id as string)
  referralHistoryList.value = res // 所有历史转介
  referralInfo.value = res[0]
  // 在详情页操作后更新按钮状态
  pageType.value =
    referralInfo.value?.status === 1 && referralInfo.value?.locked === 0
      ? 0 // 公池
      : (referralInfo.value?.status === 1 && referralInfo.value?.locked === 1) ||
        referralInfo.value?.status === 2
      ? 1 // 私域
      : referralInfo.value?.status === 4
      ? 3 // 已成交
      : 2 // 无意向
  tabs.value =
    pageType.value === 1 ? [...tabOptions, { text: '成交信息', value: 'order' }] : tabOptions
  changeFollowList(`followUpTag${referralInfo.value.intentionType || ''}`)
}
const records = ref<FollowRecordType[]>([])

interface Item {
  [k: string]: string
}
const intentionConfig = ref({})
const intentionList = ref<Item[]>([])
const followConfig = ref({})
const followList = ref<Item[]>([])
const allIntentionList = ref()
// 意向等级、标签
const loadIntentionList = async () => {
  const res = await getIntentionList()
  allIntentionList.value = res
  const intention = res.find((v: Item) => v.configCode === 'intentionLevel')
  if (intention) {
    intentionConfig.value = {
      configId: intention.configId,
      businessType: 2
    }
    intentionList.value = intention.commonConfigOptionVoList.map((v: Item) => {
      return {
        text: v.optionValue,
        value: v.optionValue,
        desc: v.optionDesc
      }
    })
  }
}
// 跟进标签
const changeFollowList = (configCode: string) => {
  const follow = allIntentionList.value.find((v: Item) => v.configCode === configCode)
  if (follow) {
    followConfig.value = {
      configId: follow.configId,
      businessType: 2
    }
    followList.value = follow.commonConfigOptionVoList.map((v: Item) => {
      return {
        text: v.optionValue,
        value: v.optionValue
      }
    })
  }
}
const loadReferralFollowRecord = async () => {
  const res = await getReferralFollowRecord(route.query.id as string)
  records.value = res
  records.value.forEach(item => {
    item.fold = false
  })
}
const loadData = async () => {
  // 客户详情
  await loadCustomerDetail()
  // 客户转介信息
  loadCustomerReferral()
  // 跟进记录
  loadReferralFollowRecord()
}
loadIntentionList()
loadData()

const updateType = async (intentionType: string) => {
  changeFollowList(`followUpTag${intentionType || ''}`)
  loadCustomerReferral()
  const markValueArray = records.value[0].followUpTagArray.filter(item =>
    followList.value.find(v => v.value === item)
  )
  if (markValueArray.length === records.value[0].followUpTagArray.length) return
  await saveFollowLabel({
    markValueArray,
    businessId: referralInfo.value.id,
    ...followConfig.value
  })
  loadReferralFollowRecord()
}
const changeActiveTab = (val: string) => {
  activeTab.value = val
}

watch(
  () => route.params.change,
  val => {
    if (val) {
      activeTab.value = val as string
    }
  },
  {
    deep: true,
    immediate: true
  }
)
const showWarn = ref(false)

console.log('当前地址', window.location.href)
</script>
<style lang="scss" scoped>
@import './detail/detail.scss';
</style>
