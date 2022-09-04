<template>
  <div class="detail-basic">
    <div
      v-show="pageType"
      :class="['status', `status-${pageType === 0 ? 'green' : pageType === 1 ? 'blue' : 'grey'}`]"
    >
      {{
        pageType === 0
          ? '可跟进'
          : pageType === 1
          ? `跟进中${referral.locked === 2 ? '-待复核' : ''}`
          : pageType === 3
          ? '已成交'
          : '无意向'
      }}
    </div>
    <div class="card-title flex-row">
      <div class="left">{{ customer.name }}</div>
      <img
        class="icon"
        :src="require('@/assets/coutomer/mobile.svg')"
        v-if="[0, 1].includes(pageType)"
      />
      <div class="middle" v-if="[0, 1].includes(pageType)">
        {{ customer.mobile }}
      </div>
    </div>
    <span class="card-subtitle">
      <img class="location" :src="require('@/assets/coutomer/location.svg')" />
      <span>{{ customer.provinceName }}{{ customer.cityName }}</span>
    </span>
    <div class="card-desc">
      <div class="card-detail flex-row-start">
        <img class="icon" :src="require('@/assets/coutomer/intention.svg')" />
        <span class="label">意向描述：</span>
        <span class="val">{{ referral.intentionDescription }}</span>
      </div>
      <div
        class="card-detail flex-row-start"
        v-if="referral.intentionType || (customer.followFlag === true && referral.locked !== 2)"
      >
        <span class="icon" />
        <span class="label">意向类型：</span>
        <span class="val mr" v-if="referral.intentionType">{{
          intentionTypeList.find(v => v.value === referral.intentionType)?.text
        }}</span>
        <span
          class="btn fold-down"
          v-if="
            (customer.followFlag === true && pageType === 0 && ['MJFZ_ZYKF'].includes(role)) ||
            (customer.followFlag === true &&
              pageType === 1 &&
              !referral.intentionType &&
              referral.locked !== 2)
          "
          @click="openEdit(2)"
        >
          请选择
        </span>
      </div>
      <div class="card-detail">
        <img class="icon" :src="require('@/assets/coutomer/source.svg')" />
        <span class="label">客户来源：</span>
        <span class="val">{{ CustomerSource[referral.customerSource] }}</span>
      </div>
      <div class="card-detail flex-row-start">
        <img class="icon" :src="require('@/assets/coutomer/person.svg')" />
        <span class="label">转 介 人：</span>
        <span class="val">{{ referral.referrerName }} {{ referral.referrerMobile }}</span>
      </div>
      <div class="card-detail flex-row-start">
        <img class="icon" :src="require('@/assets/coutomer/time.svg')" />
        <span class="label">转介时间：</span>
        <span class="val">{{ referral.createdTime }}</span>
      </div>
    </div>
    <div v-if="pageType === 1" class="card-bottom flex-between">
      <span class="flex-row">
        <span
          v-if="referral.intentionLevel"
          :class="['tag', `tag-${referral.intentionLevel?.slice(0, 1)}`]"
        >
          {{ referral.intentionLevel }}
        </span>
        <span v-else class="edit">暂无意向标签，请添加</span>
        <img class="icon" :src="require('@/assets/help.svg')" @click="showDialog = true" />
      </span>
      <span
        class="flex-row"
        @click.stop="openEdit(1)"
        v-if="customer.followFlag === true && referral.locked !== 2"
      >
        <img class="icon" :src="require('@/assets/edit.svg')" />
        <span class="edit">编辑标签</span>
      </span>
    </div>
  </div>
  <van-dialog
    v-model:show="showDialog"
    title="意向标签定义"
    confirmButtonText="我知道了"
    confirmButtonColor="#5D8AA3"
  >
    <div class="dialog-content">
      <p v-for="v in intentionList" :key="v.value">{{ `${v.value}：${v.desc}` }}</p>
    </div>
  </van-dialog>
  <van-popup v-model:show="showTag" round position="bottom">
    <van-picker
      cancel-button-text=""
      title="编辑意向标签"
      :columns="intentionCols"
      @confirm="confirmTag"
    />
  </van-popup>
  <van-popup v-model:show="showType" round position="bottom">
    <van-picker
      cancel-button-text=""
      title="请选择意向类型"
      :columns="intentionTypeList"
      @confirm="confirmType"
    />
  </van-popup>
</template>
<script lang="ts" setup>
import { computed, defineProps, defineEmits, ref } from 'vue'
import type { PropType } from 'vue'
import { Toast } from 'vant'
import { CustomerSource } from '@/constant/customer'
import { saveReferralTag, updateIntentionType } from '@/api/Customer'
interface Item {
  [x: string]: string
}
const props = defineProps({
  customer: { type: Object, required: true },
  referral: { type: Object, required: true },
  pageType: { type: Number, required: true },
  role: { type: String, required: true },
  intentionConfig: { type: Object, required: true },
  intentionList: { type: Array as PropType<Item[]>, required: true }
})
const emit = defineEmits(['showWarn', 'success', 'updateType'])
const intentionCols = computed(() => {
  return props.intentionList.map(v => {
    return {
      text: `${v.text}（${v.desc}）`,
      value: v.value
    }
  })
})
const intentionTypeList = [
  {
    text: '自营',
    value: 1
  },
  {
    text: '美居',
    value: 2
  }
]
const showDialog = ref(false)
const showTag = ref(false)
const showType = ref(false)
const openEdit = (type: number) => {
  if (props.referral.status === 1 && props.referral.locked === 1) {
    emit('showWarn')
  } else {
    type === 1 ? (showTag.value = true) : (showType.value = true)
  }
}
const confirmTag = async (option: Item) => {
  console.log(option)
  await saveReferralTag({
    markValueArray: [option.value],
    businessId: props.referral.id,
    ...props.intentionConfig
  })
  emit('success')
  Toast.success('操作成功')
  showTag.value = false
}
const confirmType = async (option: Item) => {
  await updateIntentionType({
    id: props.referral.id,
    intentionType: option.value
  })
  emit('updateType', option.value)
  Toast.success('操作成功')
  showType.value = false
}
</script>
<style lang="scss" scoped>
@import './detailBasic.scss';
</style>
