<template>
  <div @click="toDetail(item.id, index)">
    <div class="list-title flex-row">
      <div class="left">{{ item.name }}</div>
      <img
        class="icon"
        v-if="['0', '1'].includes(filterList.type)"
        :src="require('@/assets/coutomer/mobile.svg')"
      />
      <div class="middle" v-if="['0', '1'].includes(filterList.type)">
        {{ item.mobile }}
      </div>
    </div>
    <span
      v-if="filterList.type === '1' && item.intentionLevel"
      :class="['tag', `tag-${item.intentionLevel?.slice(0, 1)}`]"
    >
      {{ item.intentionLevel }}
    </span>
    <div class="list-desc van-hairline--bottom">
      <div class="list-detail flex-row-start">
        <img class="icon" :src="require('@/assets/coutomer/project.svg')" />
        <span class="label">所属项目：</span>
        <span class="val">{{ item.belongProject }}</span>
      </div>
      <div class="list-detail flex-row-start" v-if="['0', '1'].includes(filterList.type)">
        <img class="icon" :src="require('@/assets/coutomer/intention.svg')" />
        <span class="label">意向描述：</span>
        <span class="val ellipsis">{{ item.intentionDescription }}</span>
      </div>
      <div class="list-detail">
        <img class="icon" :src="require('@/assets/coutomer/source.svg')" />
        <span class="label">客户来源：</span>
        <span class="val">{{ CustomerSource[item.customerSource] }}</span>
      </div>
    </div>
    <div class="list-bottom">
      <mj-button
        text="指派给他人"
        v-if="
          item.referralStatus === 1 &&
          item.locked === 0 &&
          ((item.customerSource === 1 && ['MJFZ_XMFZR'].includes(role)) ||
            (item.customerSource !== 1 && ['MJFZ_ZYKF'].includes(role)))
        "
        @click.stop="router.push(`/staffList?customerId=${item.id}`)"
      />
      <mj-button
        text="指派给自己"
        color="green"
        v-if="
          item.referralStatus === 1 &&
          item.locked === 0 &&
          item.customerSource !== 1 &&
          ['MJFZ_ZYKF'].includes(role)
        "
        @click.stop="clickAssignSelf(item.id)"
      />
      <!-- <div
        v-else-if="
          item.referralStatus === 1 &&
          item.locked === 0 &&
          item.customerSource !== 1 &&
          ['MJFZ_ZYKF'].includes(role)
        "
        class="multiple"
      >
        <mj-button
          text="指派给他人"
          @click.stop="router.push(`/staffList?customerId=${item.id}`)"
        />
        <mj-button text="指派给自己" color="green" @click.stop="clickAssignSelf(item.id)" />
      </div> -->
      <div
        v-else-if="
          ['MJFZ_RZGW', 'MJFZ_ZYKF', 'ZYZX_SJS'].includes(role) &&
          item.referralStatus === 1 &&
          item.locked === 1 &&
          item.currentFollowerFlag
        "
        class="multiple"
      >
        <mj-button text="暂不跟进" @click.stop="onAgreeFollow(0, item.id, item.referralId)" />
        <mj-button
          text="同意跟进"
          color="green"
          @click.stop="onAgreeFollow(1, item.id, item.referralId)"
        />
      </div>
      <mj-button v-else @click.stop="toDetail(item.id, index)" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { Toast, Dialog } from 'vant'
import { AssignOrReassign, AgreeFollow } from '@/api/Customer'
import { getUserInfo } from '@/api/user'
import { CustomerSource } from '@/constant/customer'
const router = useRouter()
const props = defineProps({
  item: {
    type: Object,
    required: true,
    default: () => {}
  },
  index: Number,
  filterList: {
    type: Object,
    required: true,
    default: () => {}
  },
  role: { type: String, required: true },
  toDetail: {
    type: Function,
    required: true
  },
  loadData: {
    type: Function,
    required: true
  }
})
const clickAssignSelf = async (id: number) => {
  Dialog.confirm({
    message: '是否指派给自己?',
    confirmButtonText: '确定',
    closeOnClickOverlay: true,
    className: 'del-confirm-dialog'
  })
    .then(async () => {
      const info = await getUserInfo()
      await AssignOrReassign({
        type: 0,
        customerIdList: [id],
        followerMobile: info.mobile,
        followerId: info.id,
        followerName: info.nickname
      })
      Toast.success({
        message: '指派成功',
        duration: 2000
      })
      props.loadData(false, true)
    })
    .catch(() => {})
}
const onAgreeFollow = async (locked: number, customerId: number, id: number) => {
  Dialog.confirm({
    message: `是否${locked ? '' : '暂不'}跟进该客户?`,
    confirmButtonText: '确定',
    closeOnClickOverlay: true,
    className: 'del-confirm-dialog'
  })
    .then(async () => {
      await AgreeFollow({
        locked,
        id
      })
      Toast.success({
        message: `${locked ? '跟进' : '操作'}成功`,
        duration: 1200
      })
      props.loadData(false, true)
    })
    .catch(() => {})
}
</script>
<style lang="scss" scoped>
@import './listCard.scss';
</style>
