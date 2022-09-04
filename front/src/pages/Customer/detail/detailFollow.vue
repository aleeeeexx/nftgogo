<template>
  <div class="detail-follow">
    <div v-if="(records.length === 1 && records[0].recordList.length > 0) || records.length > 1">
      <div
        v-for="(item, index) in records"
        :key="item.id"
        class="follow-card"
        v-show="showMore || index === 0"
      >
        <div
          class="follow-title"
          :class="{ 'fold-up': !item.fold, 'fold-down': item.fold }"
          @click="item.fold = !item.fold"
          v-if="index === 0 && item.recordList.length > 0 && pageType === 1"
        >
          <img :src="require('@/assets/coutomer/follow.svg')" />
          <span>当前跟进单</span>
        </div>
        <div
          class="follow-title"
          :class="{ 'fold-up': !item.fold, 'fold-down': item.fold }"
          @click="item.fold = !item.fold"
          v-if="
            (index !== 0 && item.recordList.length > 0) ||
            (pageType !== 1 && item.recordList.length > 0)
          "
        >
          <img :src="require('@/assets/coutomer/follow_history.svg')" />
          <span>历史跟进：{{ item.followerName }} {{ item.followerMobile }}</span>
        </div>
        <div class="follow-tag" v-show="!item.fold">
          <div class="follow-tag-edit">
            <div>
              <span class="text-label">跟进标签：</span>
              <span v-if="!item.followUpTagArray || !item.followUpTagArray.length">暂无</span>
            </div>
            <span
              v-if="pageType === 1 && index === 0 && followFlag === true && referral.locked !== 2"
              class="btn"
              @click="openEdit(item.id, item.followUpTagArray)"
            >
              编辑
            </span>
          </div>
          <div v-if="item.followUpTagArray && item.followUpTagArray.length">
            <span class="tag" v-for="v in item.followUpTagArray" :key="v">{{ v }}</span>
          </div>
        </div>
        <div class="steps-container" v-show="!item.fold">
          <span class="text-label">跟进详情</span>
          <template v-for="(v, i) in item.recordList" :key="v.recordId">
            <div
              class="steps-item normal info-form-label-val"
              :class="{ active: index === 0 && i === 0 && pageType === 1 }"
              v-if="v.orderInfo"
            >
              <div class="title">客户订单完成</div>
              <div class="level-black-1">
                <span class="label">订单编号</span>
                <span class="val">{{ v.orderInfo.code }}</span>
              </div>
              <div class="level-black-1">
                <span class="label">商品品类</span>
                <span class="val">{{ v.orderInfo.categoryName }}</span>
              </div>
              <div class="level-black-1">
                <span class="label">付款时间</span>
                <span class="val">{{ v.orderInfo.finishPaidTime }}</span>
              </div>
              <div class="level-black-2">
                <span class="label">{{ v.createdTime }}</span>
              </div>
            </div>
            <div
              class="steps-item normal info-form-label-val"
              :class="{ active: index === 0 && i === 0 && pageType === 1 }"
              v-else
            >
              <div class="title">{{ v.content }}</div>
              <div class="level-grey">{{ v.createdTime }}</div>
            </div>
          </template>
        </div>
      </div>
      <div class="show-btn save-area" v-if="records.length > 1" @click="toggleShow(!showMore)">
        <span :class="[showMore ? 'fold-up' : 'fold-down']">
          {{ `${showMore ? '收起' : '展开'}${pageType === 1 ? '' : '更多'}历史跟进` }}
        </span>
      </div>
    </div>
    <Empty v-else text="暂无跟进记录" />
    <van-popup v-model:show="showEdit" round position="bottom">
      <div class="follow-picker">
        <div class="title">
          编辑跟进标签
          <div class="right" @click="confirmEdit">保存</div>
        </div>
        <div class="content save-area">
          <div class="content-title">跟进标签（可多选）</div>
          <div class="content-tags">
            <span
              :class="['tag', { active: activeTags.includes(v.value) }]"
              v-for="v in followList"
              :key="v.value"
              @click="toggleTag(v.value)"
            >
              {{ v.text }}
            </span>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
import type { PropType } from 'vue'
import type { FollowRecordType } from '@/api/Customer'
import Empty from '@/components/Empty/index.vue'
import { saveFollowLabel } from '@/api/Customer'
const props = defineProps({
  pageType: Number,
  role: String,
  records: { type: Array as PropType<FollowRecordType[]>, required: true },
  followConfig: { type: Object, required: true },
  followList: { type: Array as PropType<Item[]>, required: true },
  customerId: { type: String, required: true },
  followFlag: { type: Boolean, default: false },
  referral: { type: Object, required: true }
})
const emit = defineEmits(['showWarn', 'success'])
interface Item {
  [x: string]: string
}
const showMore = ref(false)
const toggleShow = (val: boolean) => {
  showMore.value = val
}
const showEdit = ref(false)
const businessId = ref(0)
const activeTags = ref<string[]>([])
const openEdit = (id: number, tags: string[]) => {
  if (props.referral.status === 1 && props.referral.locked === 1) {
    emit('showWarn')
  } else {
    showEdit.value = true
    businessId.value = id
    activeTags.value = [...tags] || []
  }
}
const toggleTag = (tag: string) => {
  // console.log(activeTags)
  const index = activeTags.value.indexOf(tag)
  // console.log(tag, index)
  if (index > -1) {
    activeTags.value.splice(index, 1)
  } else {
    activeTags.value.push(tag)
  }
}
const confirmEdit = async () => {
  await saveFollowLabel({
    markValueArray: activeTags.value,
    businessId: businessId.value,
    ...props.followConfig
  })
  emit('success')
  showEdit.value = false
}
</script>
<style lang="scss" scoped>
@import './detailFollow.scss';
</style>
