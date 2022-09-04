<template>
  <FixBar
    v-if="customer.followFlag !== undefined"
    :height="
      referral.status === 2 && referral.locked === 2 && ['MJFZ_ZYKF', 'MJFZ_XMFZR'].includes(role)
        ? '38vw'
        : '19vw'
    "
  >
    <template #content v-if="customer.followFlag === true">
      <div
        class="tip"
        v-if="
          referral.status === 2 &&
          referral.locked === 2 &&
          ['MJFZ_ZYKF', 'MJFZ_XMFZR'].includes(role)
        "
      >
        <img :src="require('@/assets/coutomer/bar_tip.svg')" alt="" />
        <span>
          员工已提交结束跟进申请，请致电核实客户意向，若客户无意向，则通过复核线索关闭。
        </span>
      </div>
      <div class="operate-bar" v-if="pageType === 0">
        <div class="operate-icons">
          <div class="icon-item mr" @click="showShare = true">
            <img class="icon" :src="require('@/assets/coutomer/share.svg')" />
            <span>转发线索</span>
          </div>
          <div
            v-if="referral.customerSource === 1 || ['MJFZ_ZYKF'].includes(role)"
            class="icon-item btn white"
            @click="clickAssignOther()"
          >
            指派给他人
          </div>
          <div
            v-if="referral.customerSource !== 1 && ['MJFZ_ZYKF'].includes(role)"
            class="icon-item btn green"
            @click="clickAssignSelf()"
          >
            指派给自己
          </div>
        </div>
      </div>
      <div class="operate-bar" v-if="pageType === 1">
        <div
          class="operate-icons"
          v-if="referral.status === 1 && referral.locked === 1 && referral.currentFollowerFlag"
        >
          <div class="icon-item btn white" @click="onAgreeFollow(0)">暂不跟进</div>
          <div class="icon-item btn green" @click="onAgreeFollow(1)">同意跟进</div>
        </div>
        <div
          class="operate-icons"
          v-else-if="
            referral.status === 2 &&
            referral.locked === 2 &&
            ['MJFZ_ZYKF', 'MJFZ_XMFZR'].includes(role)
          "
        >
          <div class="icon-item btn white" @click="openApprove(0)">复核不通过</div>
          <div class="icon-item btn green" @click="openApprove(1)">复核通过</div>
        </div>
        <div
          class="operate-icons"
          v-else-if="
            referral.status === 2 &&
            referral.locked === 2 &&
            !['MJFZ_ZYKF', 'MJFZ_XMFZR'].includes(role)
          "
        >
          <div class="icon-item grey">
            <img class="icon" :src="require('@/assets/coutomer/bar_close_grey.svg')" />
            <span>结束跟进</span>
          </div>
          <div class="icon-item grey">
            <img class="icon" :src="require('@/assets/coutomer/add_house_grey.svg')" />
            <span>新增房屋</span>
          </div>
          <div class="icon-item grey">
            <img class="icon" :src="require('@/assets/coutomer/bar_quotation_grey.svg')" />
            <span>下意向单</span>
          </div>
          <div class="icon-item grey">
            <img class="icon" :src="require('@/assets/coutomer/bar_forward_grey.svg')" />
            <span>添加跟进</span>
          </div>
        </div>
        <div
          class="icon-item btn green"
          v-else-if="['MJFZ_ZYKF', 'MJFZ_XMFZR'].includes(role) && !referral.currentFollowerFlag"
          @click="clickAssignOther(true)"
        >
          改派
        </div>
        <div class="operate-icons" v-else>
          <div
            class="icon-item"
            v-if="['MJFZ_ZYKF'].includes(role)"
            @click="clickAssignOther(true)"
          >
            <img class="icon" :src="require('@/assets/coutomer/bar_reassign.svg')" />
            <span>改派</span>
          </div>
          <div class="icon-item" @click="clickRecord('closeForwardRecord')">
            <img class="icon" :src="require('@/assets/coutomer/bar_close.svg')" />
            <span>结束跟进</span>
          </div>
          <div class="icon-item" @click="clickHouse()">
            <img class="icon" :src="require('@/assets/coutomer/add_house.svg')" />
            <span>新增房屋</span>
          </div>
          <div class="icon-item" @click="clickQuotation()">
            <img class="icon" :src="require('@/assets/coutomer/bar_quotation.svg')" />
            <span>下意向单</span>
          </div>
          <div class="icon-item" @click="clickRecord('addForwardRecord')">
            <img class="icon" :src="require('@/assets/coutomer/bar_forward.svg')" />
            <span>添加跟进</span>
          </div>
        </div>
      </div>
    </template>
    <template #content v-else>
      <div class="operate-bar">
        <div class="icon-item btn green" @click="showShare = true">转发线索</div>
      </div>
    </template>
  </FixBar>
  <van-dialog v-model:show="showApprove" :showConfirmButton="false">
    <div class="approve">
      <div class="content">
        <div class="title">{{ `复核${approveType ? '' : '不'}通过` }}</div>
        <div class="subtitle">
          {{
            approveType
              ? '客户无购买意向，确认关闭线索，不再跟进'
              : '客户有购买意向，请将此线索改派给其他员工跟进'
          }}
        </div>
        <van-field
          v-model.trim="approveDesc"
          label=""
          placeholder="请输入复核意见"
          rows="2"
          autosize
          type="textarea"
          maxlength="100"
          show-word-limit
        />
      </div>
      <div class="btns">
        <div class="btn cancel" @click="showApprove = false">取消</div>
        <div
          class="btn confirm"
          @click="approve"
          :style="`color: rgba(0, 0, 0, ${!approveType && !approveDesc ? '0.3' : '0.85'})`"
        >
          {{ `确定${approveType ? '' : '复核不'}通过` }}
        </div>
      </div>
    </div>
  </van-dialog>
  <van-dialog v-model:show="showAssign" :showConfirmButton="false">
    <div class="approve">
      <div class="content">
        <div class="title">提交成功</div>
        <div class="subtitle center">是否将线索改派给其他人跟进？</div>
      </div>
      <div class="btns">
        <div class="btn cancel" @click="showAssign = false">暂不</div>
        <div class="btn confirm" @click="clickAssignOther(true)">立即改派</div>
      </div>
    </div>
  </van-dialog>
  <div class="share" v-show="showShare">
    <img
      src="https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/06/30/2e265593-2c6c-4540-9f15-d871d26b79b2.png"
      alt=""
      @click="showShare = false"
    />
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { Toast, Dialog } from 'vant'
import FixBar from '@/components/FixBar/index.vue'
import type { PropType } from 'vue'
import type { HouseInfoType } from '@/api/Customer'
import { AgreeFollow, AssignOrReassign, approveTerminate } from '@/api/Customer'
import { getUserInfo } from '@/api/user'
import { useRouter } from 'vue-router'
import wx from 'jweixin-1.6.0'
const router = useRouter()
const props = defineProps({
  pageType: Number,
  referral: { type: Object, required: true },
  role: { type: String, required: true },
  houseInfoList: { type: Array as PropType<HouseInfoType[]>, required: true },
  customerId: { type: String, required: true },
  customer: { type: Object, required: true },
  loadData: { type: Function, required: true },
  changeActiveTab: { type: Function, required: true }
})
const clickAssignSelf = async () => {
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
        customerIdList: [Number(props.customerId)],
        followerMobile: info.mobile,
        followerId: info.id,
        followerName: info.nickname
      })
      Toast.success({
        message: '指派成功',
        duration: 2000
      })
      props.loadData()
    })
    .catch(() => {})
}
const onAgreeFollow = async (locked: number) => {
  Dialog.confirm({
    message: `是否${locked ? '' : '暂不'}跟进该客户?`,
    confirmButtonText: '确定',
    closeOnClickOverlay: true,
    className: 'del-confirm-dialog'
  })
    .then(async () => {
      await AgreeFollow({
        locked,
        id: props.referral.id
      })
      Toast.success({
        message: `${locked ? '跟进' : '操作'}成功`,
        duration: 1200
      })
      props.loadData()
    })
    .catch(() => {})
}
const showApprove = ref(false)
const approveType = ref(0)
const approveDesc = ref('')
const openApprove = (type: number) => {
  console.log(props)
  showApprove.value = true
  approveType.value = type
  approveDesc.value = ''
}
const approve = async () => {
  if (!approveType.value && !approveDesc.value) return
  await approveTerminate({
    referralId: props.referral.id,
    description: approveDesc.value,
    dealResult: approveType.value // 0：不同意 1：同意
  })
  Toast.success({
    message: `提交成功`,
    duration: 1200
  })
  props.loadData()
  props.changeActiveTab('follow')
  showApprove.value = false
  if (approveType.value === 0) showAssign.value = true
}
const showAssign = ref(false)
const clickQuotation = () => {
  console.log('toQuotation')
  wx.miniProgram.navigateTo({ url: '/pages/EditAddress/index?isCreate=1' })
}
const clickHouse = () => {
  const { cityCode, cityName, provinceCode, provinceName } = props.customer
  const houseIndex = props.houseInfoList.length
  console.log(props.houseInfoList, houseIndex)
  let list = houseIndex
    ? [
        ...props.houseInfoList,
        {
          provinceCode: props.houseInfoList[houseIndex - 1].provinceCode,
          provinceName: props.houseInfoList[houseIndex - 1].provinceName,
          cityCode: props.houseInfoList[houseIndex - 1].cityCode,
          cityName: props.houseInfoList[houseIndex - 1].cityName,
          customerRole: 0
        }
      ]
    : [
        {
          provinceCode,
          provinceName,
          cityCode,
          cityName,
          customerRole: 0
        }
      ]
  sessionStorage.setItem('houseInfoList', JSON.stringify(list))
  router.push({
    path: '/customerEditHouse',
    query: {
      pageType: 'add',
      customerId: props.customerId,
      houseIndex
    }
  })
}
const clickRecord = (type: string) => {
  router.push({
    path: '/customerFormSubmit',
    query: {
      pageType: type,
      customerId: props.customerId,
      referralId: props.referral.id
    }
  })
}
const clickAssignOther = (isReassign: boolean = false) => {
  router.push({
    path: '/staffList',
    query: {
      customerId: props.customerId,
      type: isReassign ? 1 : undefined,
      followerId: isReassign ? props.referral.currentFollowerId : undefined
    }
  })
}
const showShare = ref(false)
</script>
<style lang="scss" scoped>
@import './detailBar.scss';
@import '@/style/operateBar.scss';
</style>
