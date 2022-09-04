<template>
  <div class="title">基本信息</div>
  <div class="body">
    <div class="pancel">
      <div class="left">客户</div>
      <div class="right">{{ data?.customerName }}</div>
    </div>
    <div class="pancel">
      <div class="left">房屋</div>
      <div class="right">{{ houseName }}</div>
    </div>
    <div class="pancel">
      <div class="left">手机</div>
      <div class="right">{{ data?.customerMobile }}</div>
    </div>
    <div class="pancel">
      <div class="left">意向描述</div>
      <div class="right">{{ data?.intentionDescription }}</div>
    </div>
  </div>
  <div class="title">转介进度</div>
  <div class="process">
    <div class="box" v-for="(item, index) in data?.feedbackRecords" :key="index">
      <div class="line" v-if="index + 1 !== data?.feedbackRecords.length"></div>
      <div :class="index === 0 ? 'circle' : 'darkCircle'"></div>
      <div class="right">
        <div class="name">{{ item.title }}</div>
        <div class="content">{{ item.content }}</div>
        <div class="time">{{ item.createdTime }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getReferralFeedbackRecord, FeedbackRecord } from '@/api/BusinessReport'
import { useLogin } from '@/utils/pulin-login'
const data = ref<FeedbackRecord | null>(null)
const route = useRoute()
const houseName = computed(() => {
  if (data.value?.houseCode) {
    return data.value?.houseName
  } else {
    return (
      (data.value?.provinceName ?? '') +
      (data.value?.cityName ?? '') +
      (data.value?.projectName ?? '')
    )
  }
})
const id = route.query.id as string
const getData = async (id: number) => {
  const res = await getReferralFeedbackRecord(id)
  data.value = res
}

const login = async () => {
  await useLogin(
    route.query.accessToken as string,
    route.query.companyCode as string,
    (route.path + '?id=' + id) as string
  )
  getData(+id)
}
login()
</script>
<style lang="scss" scoped>
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
    min-height: 104px;
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
    }
    .time {
      margin-top: 6px;
      font-size: 12px;
      line-height: 12px;
    }
  }
}
.title {
  height: 43px;
  font-size: 12px;
  padding-left: 20px;
  line-height: 43px;
  color: #666;
}
.body {
  background-color: #fff;
  padding-left: 20px;

  .pancel {
    display: flex;
    box-sizing: border-box;
    min-height: 56px;
    border-bottom: 1px solid #eaeaea;
    align-items: flex-start;
    justify-content: space-between;
    padding: 17px 0px;
    &:last-child {
      border: none;
    }
    .left {
      color: #666;
      font-size: 16px;
    }
    .right {
      color: #262626;
      font-weight: 400;
      font-size: 16px;
      display: inline-block;
      text-align: right;
      margin-right: 20px;
      width: 200px;
    }
  }
}
</style>
