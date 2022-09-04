<template>
  <div class="detail-house" v-if="list.length">
    <div class="house-card" v-for="(item, index) in list" :key="item.buildingCode">
      <div class="card-title">
        <img :src="require('@/assets/coutomer/house.svg')" />
        <span>
          {{
            item.houseCode
              ? item.houseName
              : item.provinceName + item.cityName + item.projectName + (item.houseName ?? '')
          }}
        </span>
      </div>
      <div class="card-detail">
        <div class="detail-item">
          <span class="item-label">户型：</span>
          <span class="item-val">{{ item.houseType ? item.houseType : '暂无信息' }}</span>
        </div>
        <div class="detail-item">
          <span class="item-label">身份：</span>
          <span class="item-val">{{ CustomerRoleList[item.customerRole] }}</span>
        </div>
      </div>
      <div class="card-member" v-if="item.memberList && item.memberList.length">
        <div class="title">成员信息({{ item.memberList.length }})</div>
        <div class="member-item" v-for="v in item.memberList" :key="v.customerId">
          <div class="member-name">
            <div class="left">
              <span class="name"> {{ v.customerName }}</span>
              <span class="tag">{{ CustomerRoleList[v.customerRole] }}</span>
            </div>
            <div
              class="right"
              v-if="
                item.houseCode && pageType === 1 && followFlag === true && referral?.locked !== 2
              "
              @click="delMember(v.customerId, item.houseCode)"
            >
              删除
            </div>
          </div>
          <div class="member-mobile">
            <img class="icon" :src="require('@/assets/coutomer/mobile.svg')" />
            <div class="middle">
              {{ v.customerMobile }}
            </div>
          </div>
        </div>
      </div>
      <div class="card-btns" v-if="pageType === 1 && followFlag === true && referral?.locked !== 2">
        <mj-button
          text="添加成员"
          v-if="!!item.houseCode"
          @click="editMember(item.houseCode, 'add')"
        />
        <mj-button text="编辑" @click="clickEditHouse(index)" />
      </div>
    </div>
  </div>
  <Empty v-else text="暂无房屋信息" />
</template>
<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import type { PropType } from 'vue'
import { Toast, Dialog } from 'vant'
import { deleteHouseMember, HouseInfoType } from '@/api/Customer'
import { CustomerRoleList } from '@/constant/customer'
import Empty from '@/components/Empty/index.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  pageType: Number,
  list: { type: Array as PropType<HouseInfoType[]>, required: true },
  role: String,
  customerId: String,
  followFlag: { type: Boolean, default: false },
  referral: { type: Object },
  loadData: { type: Function }
})
const emit = defineEmits(['showWarn'])
const checkWarn = () => {
  if (props.referral && props.referral.status === 1 && props.referral.locked === 1) {
    emit('showWarn')
    return true
  }
  return false
}
const clickEditHouse = (index: number) => {
  if (checkWarn()) return
  sessionStorage.setItem('houseInfoList', JSON.stringify(props.list))
  router.push({
    path: '/customerEditHouse',
    query: {
      pageType: 'edit',
      customerId: props.customerId,
      houseIndex: index
    }
  })
}
const editMember = (houseCode: string, pageType: string) => {
  if (checkWarn()) return
  router.push({
    path: '/customerEditMember',
    query: { houseCode, pageType }
  })
}
const delMember = async (customerId: string, houseCode: string) => {
  console.log(customerId, houseCode)
  Dialog.confirm({
    message: `是否删除该成员?`,
    confirmButtonText: '确定',
    closeOnClickOverlay: true,
    className: 'del-confirm-dialog'
  })
    .then(async () => {
      await deleteHouseMember({
        customerId,
        houseCode
      })
      Toast.success({
        message: `删除成功`,
        duration: 1200
      })
      props.loadData && props.loadData()
    })
    .catch(() => {})
}
</script>
<style lang="scss" scoped>
@import './detailHouse.scss';
</style>
