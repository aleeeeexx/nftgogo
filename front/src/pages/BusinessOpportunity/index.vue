<template>
  <div style="padding-top: 1px">
    <ListCard
      @click="goDetail(item.id)"
      v-for="item in data"
      :name="item.name"
      :body="item.body"
      :status="item.status"
      :key="item.id"
      >111</ListCard
    >
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import ListCard, { ListItem } from '@/components/ListCard/index.vue'
import { useRouter } from 'vue-router'
import { getReferralHistory } from '@/api/BusinessReport'
import { useStore } from 'vuex'
import { User } from '@/store/user'

const userInfo = useStore().state as { user: User }
const router = useRouter()
const data = ref<ListItem[]>([])
const getData = async () => {
  const res = await getReferralHistory(userInfo.user.info.mobile, { page: 1, size: 10000 })
  console.log(res)
  data.value = res.map(item => {
    return {
      name: item.houseCode ? item.houseName : item.provinceName + item.cityName + item.projectName,
      status: item.feedbackMessage,
      id: item.id,
      body: [
        { label: '客户', value: item.customerName },
        { label: '手机', value: item.customerMobile }
      ]
    }
  })
}
//TODO 需要优化 现在是等获取完用户信息才请求列表的值
userInfo.user.info?.mobile && getData()
watch(
  () => userInfo.user.info?.mobile,
  () => {
    getData()
  }
)
const goDetail = (id: number) => {
  router.push({ path: `/businessDetail`, query: { id } })
}
</script>
