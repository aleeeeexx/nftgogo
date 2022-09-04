<template>
  <div class="process">
    <div class="box" v-for="(item, index) in orderReturnTimeVoList" :key="index">
      <div class="line" v-if="index + 1 !== orderReturnTimeVoList.length"></div>
      <div :class="index === 0 ? 'circle' : 'darkCircle'"></div>
      <div class="right">
        <div class="name">{{ item.title }}</div>
        <div class="content" v-if="item.description">{{ item.description }}</div>
        <div class="time">{{ item.createdTime }}</div>
      </div>
    </div>
  </div>
  <FixBar>
    <template #content>
      <div class="foot1">
        <van-button
          type="primary"
          v-if="returnStatus === 1"
          plain
          hairline
          color="#222222"
          :loading="loading"
          @click="cancel"
          >撤销售后</van-button
        >
        <van-button
          type="primary"
          v-if="returnStatus === 3 || returnStatus === 4"
          plain
          hairline
          color="#222222"
          :loading="loading"
          @click="goReturn"
          >申请售后</van-button
        >
      </div>
    </template>
  </FixBar>
</template>
<script lang="ts" setup>
import FixBar from '@/components/FixBar/index.vue'
import { ref } from 'vue'
import { cancelDepositReturn, depositReturnList, OrderReturnTimeVoList } from '@/api/deposit'
import { Toast } from 'vant'
import { useRoute, useRouter } from 'vue-router'

const orderReturnTimeVoList = ref<OrderReturnTimeVoList[]>([])
const returnId = ref('')
const route = useRoute()
const router = useRouter()
const id = route.query.id as string
const returnStatus = ref(0)
const returnAmount = ref(0)
const getList = async () => {
  const res = await depositReturnList(id)
  orderReturnTimeVoList.value = res.orderReturnTimeVoList
  returnId.value = res.returnId
  returnStatus.value = res.returnStatus
  returnAmount.value = res.returnAmount
}
getList()
const cancel = async () => {
  loading.value = true
  try {
    await cancelDepositReturn(returnId.value)
    Toast.success('提交成功')
    await getList()
  } catch {
    Toast.fail('提交失败')
  } finally {
    loading.value = false
  }
}
const loading = ref(false)

const goReturn = () => {
  router.push({ path: `/SaleAfter`, query: { id, money: returnAmount.value } })
}
</script>
<style lang="scss">
.foot1 {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
  height: 72px;
  .van-button {
    width: 162px;
  }
}
.process {
  margin-top: 20px;
}
.box {
  position: relative;
  margin-bottom: 10px;
  .line {
    position: absolute;
    height: calc(100% + 10px);
    width: 2px;
    background-color: #eaeaea;
    top: 19px;
    left: 27px;
  }
  .circle {
    background-color: #e4f0d7;
    &::before {
      background-color: #7ab439;
    }
  }
  .darkCircle {
    background-color: #eaeaea;
    &::before {
      background-color: #c9c9c9;
    }
  }
  .circle,
  .darkCircle {
    position: absolute;
    height: 14px;
    width: 14px;
    border-radius: 50%;

    top: 19px;
    left: 21px;
    z-index: 2;
    &::before {
      position: absolute;
      content: '';
      height: 8px;
      width: 8px;
      border-radius: 50%;
      left: 3px;
      top: 3px;
    }
  }
  .right {
    margin-left: 52px;
    box-sizing: border-box;
    width: 303px;
    padding: 14px 10px 16px 16px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    border-radius: 6px;
    color: rgba(0, 0, 0, 0.85);
    .name {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
    }
    .content {
      margin-top: 6px;
      font-size: 14px;
      line-height: 26px;
      color: rgba(0, 0, 0, 0.6);
    }
    .time {
      margin-top: 6px;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.6);
      line-height: 12px;
    }
  }
}
</style>
