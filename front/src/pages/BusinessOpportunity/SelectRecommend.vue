<template>
  <div class="fixed-top" style="z-index: 5">
    <van-search
      v-model.trim="searchVal"
      placeholder="输入员工姓名/手机号搜索"
      @update:model-value="onSearch"
      @clear="onClear"
      :maxlength="15"
    >
    </van-search>
    <div class="tip">
      <img :src="require('@/assets/coutomer/bar_tip.svg')" alt="" />
      <span> 推荐人为提供此客户线索的员工，当客户成交后，推荐人会获得佣金 </span>
    </div>
  </div>
  <van-pull-refresh
    v-model="pullLoad"
    @refresh="onRefresh(true)"
    success-text="加载成功"
    class="select-recommend-list-container"
    v-if="listData.length > 0"
  >
    <van-list
      :immediate-check="false"
      v-model:loading="listLoading"
      :finished="listFinished"
      @load="onListLoad"
      finished-text="没有更多了"
    >
      <div
        v-for="(item, index) in listData"
        :key="index"
        class="list-item"
        @click="clickSelect(item)"
      >
        <div class="item-top">{{ item.name }} {{ item.mobile }}</div>
        <div class="item-bottom">{{ item.positionName }} {{ item.organizationName }}</div>
      </div>
    </van-list>
  </van-pull-refresh>
  <div v-if="listData.length <= 0 && searchVal && !listLoading" class="no-data-container">
    <van-image
      src="https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/05/30/9c222ce0-adcb-4916-abff-e7250adbf42e.png"
    >
    </van-image>
    <span> 暂无相关员工信息 </span>
  </div>
  <div style="height: 46px"></div>
</template>

<script lang="ts" setup>
import { loadEmployeeSearch } from '@/api/BusinessReport'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import { useDebounceFn } from '@vueuse/core'
import { ref } from 'vue'
const router = useRouter()

export type ListItem = {
  name: string
  positionCode: string
  positionName: string
  mobile: string
  organization: string
  organizationName: string
}

const firstLoad = ref(true) // 第一次加载，优化首次搜索
const pullLoad = ref(false)
const listFinished = ref(false)
const listLoading = ref(false)
const onRefresh = (reFresh?: boolean) => {
  //重置
  pageInfo.value.pageNo = 1
  listFinished.value = false
  loadData(reFresh)
}
const onListLoad = () => {
  pageInfo.value.pageNo++
  loadData()
}
const pageInfo = ref({
  pageNo: 1,
  pageSize: 20
})
const onSearch = useDebounceFn(() => {
  onRefresh(true)
}, 300)
const listData = ref<ListItem[]>([])
const searchVal = ref('')

const loadData = async (reFresh = false) => {
  if (!searchVal.value) {
    onClear()
    return
  }
  try {
    listLoading.value = true
    const res = await loadEmployeeSearch({
      ...pageInfo.value,
      nameOrMobile: searchVal.value
    })
    firstLoad.value = false

    // 下拉，搜索重置
    if (pullLoad.value || reFresh) {
      listData.value = []
      pullLoad.value = false
    }
    listData.value = [...listData.value, ...res?.records]

    listLoading.value = false
    if (res?.current === res?.pages || res?.records.length <= 0) {
      listFinished.value = true
    }
  } catch {
    listLoading.value = false
    listFinished.value = true
  }
}

const onClear = () => {
  listData.value = []
  pageInfo.value.pageNo = 1
  listFinished.value = false
}

// 当前选中
const currentSelect = ref<ListItem | null>(null)
const clickSelect = (selectItem: ListItem) => {
  currentSelect.value = selectItem
  router.go(-1)
}

onBeforeRouteLeave(to => {
  to.params.submitRecommend = JSON.stringify(currentSelect.value)
})
</script>

<style lang="scss" scoped>
.tip {
  position: relative;
  background: #ecf1f3;
  color: #5d8aa3;
  font-size: 14px;
  padding: 12px 16px 12px 42px;
  img {
    position: absolute;
    left: 16px;
    top: 13px;
  }
  span {
    word-break: break-all;
  }
}
.select-recommend-list-container {
  background: #fff;
  padding-top: 110px;
  z-index: 2;
  .list-item {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 10px 0px 12px 0px;
    margin-left: 20px;
    margin-top: 1px;
    color: var(--font-color-6);
    font-size: 16px;
    line-height: 22px;
    &:not(:nth-last-child(2)):after {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      top: -50%;
      right: -50%;
      bottom: -50%;
      left: -50%;
      border-bottom-width: 1px !important;
      border: 0 solid var(--van-border-color);
      transform: scale(0.5);
    }
  }
  .item-top {
    color: var(--font-color-8);
    font-size: 16px;
    line-height: 16px;
  }
  .item-bottom {
    margin-top: 6px;
    color: var(--font-color-6);
    font-size: 12px;
    line-height: 12px;
  }
}
</style>
