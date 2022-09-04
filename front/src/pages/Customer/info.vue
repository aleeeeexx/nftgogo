<template>
  <InfoBasic
    @updateForm="updateForm"
    @updateExternalUser="updateExternalUser"
    :list="houseInfoList"
  />
  <InfoClues :mobile="formData.mobile" />
  <div class="info-order">
    <div class="title">
      <span>成交信息 ({{ orderCount }})</span>
    </div>
    <div class="detail">
      <div class="info" v-show="!orderCount">暂无成交信息</div>
      <div class="cards" v-show="!!orderCount">
        <detail-order :canFold="true" :mobile="formData.mobile" @updateOrder="updateOrder" />
      </div>
    </div>
  </div>
  <FixBar>
    <template #content>
      <div class="operate-bar">
        <div class="operate-icons">
          <div class="icon-item" @click="toHistory()">
            <img class="icon" :src="require('@/assets/coutomer/bar_forward.svg')" />
            <span>历史转介</span>
          </div>
          <div class="icon-item" @click="gotoPoster()">
            <img class="icon" :src="require('@/assets/coutomer/bar_invite.svg')" />
            <span>邀请留资</span>
          </div>
          <div class="icon-item" @click="submitClue()">
            <img class="icon" :src="require('@/assets/coutomer/bar_quotation.svg')" />
            <span>提报线索</span>
          </div>
        </div>
      </div>
    </template>
  </FixBar>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useDebounceFn } from '@vueuse/core'
import { HouseInfoType, getHouseByMobile } from '@/api/Customer'
import InfoBasic from './info/infoBasic.vue'
import InfoClues from './info/infoClues.vue'
import DetailOrder from './detail/detailOrder.vue'
import FixBar from '@/components/FixBar/index.vue'
import wx from 'jweixin-1.6.0'
const formData = reactive({
  name: '',
  mobile: '',
  avatar: '',
  nickname: ''
})
const houseInfoList = ref<HouseInfoType[]>([])
const externalUser = reactive({
  avatar: '',
  nickname: ''
})
interface Item {
  [x: string]: string
}
const updateExternalUser = (val: Item) => {
  externalUser.avatar = val.avatar
  externalUser.nickname = val.nickname
}
const updateForm = (val: Item) => {
  formData.name = val.name
  formData.mobile = val.mobile
  formData.avatar = val.avatar
  formData.nickname = val.nickname
  getHouseByMobile(val.mobile).then(res => {
    houseInfoList.value = res
  })
}
const orderCount = ref(0)
const updateOrder = (length: number) => {
  orderCount.value = length
}
const router = useRouter()
const route = useRoute()
const submitClue = useDebounceFn(() => {
  sessionStorage.setItem(
    'externalUser',
    JSON.stringify({
      externalUserId: route.query.externalUserId as string,
      name: formData.name,
      mobile: formData.mobile,
      avatar: externalUser.avatar || formData.avatar,
      nickname: externalUser.nickname || formData.nickname
    })
  )
  router.push({
    path: '/businessCreate',
    query: {
      fromVisitor: 1,
      t: Date.now()
    }
  })
}, 500)
const toHistory = useDebounceFn(() => {
  router.push('/business')
}, 500)
const store = useStore()
const gotoPoster = useDebounceFn(() => {
  console.log('store', store.state.user)
  const referrerId = store.state.user.userId
  const role = store.state.user.role
  const url = `/distribution/invitationPoster/index?referrerId=${referrerId}&role=${role}`
  console.log(url)
  wx.miniProgram.navigateTo({ url })
}, 500)
</script>
<style lang="scss" scoped>
@import './info/info.scss';
@import '@/style/operateBar.scss';
</style>
