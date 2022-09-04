<template>
  <div class="page-list-item" v-for="item in list" :key="item.id">
    <div class="list-title flex-between van-hairline--bottom">
      <div class="left black">{{ item.createdTime }}</div>
      <div class="right grey">{{ ReferralStatusList[item.status] }}</div>
    </div>
    <div class="list-detail flex-row">
      <span class="label">客户来源</span>
      <span class="val">{{
        item.customerSource === 0 ? '个人转介' : item.customerSource === 1 ? '新交付' : '客户留资'
      }}</span>
    </div>
    <div class="list-detail flex-row-start">
      <span class="label">意向描述</span>
      <span class="val">{{ item.intentionDescription }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { CustomerReferralType } from '@/api/Customer'
import { ReferralStatusList } from '@/constant/customer'
const route = useRoute()
const list = ref<CustomerReferralType[]>([])
list.value = JSON.parse(route.params.list as string) as CustomerReferralType[]
</script>
