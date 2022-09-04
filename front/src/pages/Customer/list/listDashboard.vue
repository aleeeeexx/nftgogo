<template>
  <div class="dashboard-container">
    <div class="dashboard-item">
      <img class="icon" :src="require('@/assets/coutomer/dashboard_left.svg')" />
      <div class="item-name">
        <span>可跟进客户</span>
        <img
          class="tips-icon"
          @click="onShowTips(1)"
          :src="require('@/assets/coutomer/dashboard_tips.svg')"
        />
      </div>
      <div class="item-count">{{ canFollowInfo?.totalCounts }}</div>
    </div>
    <div class="dashboard-item right-item">
      <img class="icon" :src="require('@/assets/coutomer/dashboard_right.svg')" />
      <div class="item-name">
        <span>跟进中客户</span>
        <img
          class="tips-icon"
          @click="onShowTips(2)"
          :src="require('@/assets/coutomer/dashboard_tips.svg')"
        />
      </div>
      <div class="item-count">{{ followingInfo?.totalCounts }}</div>
    </div>
  </div>

  <van-dialog
    v-model:show="showDashboardTips"
    title="提示"
    confirmButtonText="我知道了"
    confirmButtonColor="#5D8AA3"
    :closeOnClickOverlay="true"
  >
    <div class="dialog-content">{{ dashboardTips }}</div>
  </van-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import type { IDASHBOARD } from '@/api/Customer'
import { canFollowCounts, followingCounts } from '@/api/Customer'
const showDashboardTips = ref(false)
const dashboardTips = ref('')
const onShowTips = (type: number) => {
  dashboardTips.value = type === 1 ? '已提交的客户线索数量' : '跟进中的客户线索数量'
  showDashboardTips.value = true
}
const canFollowInfo = ref<IDASHBOARD>()
const followingInfo = ref<IDASHBOARD>()
const route = useRoute()
const loadDashboardData = async () => {
  canFollowInfo.value = await canFollowCounts(route.query.delivery as string)
  followingInfo.value = await followingCounts(route.query.delivery as string)
}
loadDashboardData()
</script>
<style lang="scss" scoped>
.dashboard-container {
  padding: 12px;
  background: #ffffff;
  display: flex;
  flex-direction: row;
  width: 100%;
  .dashboard-item {
    position: relative;
    width: calc((100% - 36px) / 2);
    height: 70px;
    padding: 14px;
    box-sizing: border-box;
    border-radius: 4px;
    background: linear-gradient(
        180deg,
        #52c41a 0%,
        rgba(82, 196, 26, 0.6) 100%,
        rgba(82, 196, 26, 0.7) 100%
      ),
      #ffffff;
    color: #fff;
    .icon {
      position: absolute;
      bottom: 2px;
      right: 10px;
    }
    .item-name {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 14px;
      line-height: 14px;
      .tips-icon {
        margin-left: 4px;
      }
    }
    .item-count {
      font-weight: 500;
      font-size: 20px;
      line-height: 23px;
      margin-top: 8px;
    }
  }

  .right-item {
    margin-left: 12px;
    background: linear-gradient(180deg, #1890ff 0%, rgba(24, 144, 255, 0.7) 100%), #ffffff;
  }
}
</style>
