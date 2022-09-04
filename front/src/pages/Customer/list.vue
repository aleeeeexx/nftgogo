<template>
  <div class="fixed-top" style="z-index: 5">
    <list-dashboard />
    <!-- 搜索 -->
    <van-search
      v-model.trim="searchValue"
      :placeholder="filterList.type === '1' ? '通过客户姓名、手机号搜索' : '通过客户姓名搜索'"
      @update:model-value="onSearch"
    />
    <!-- 下拉筛选 -->
    <van-dropdown-menu v-show="showTop">
      <van-dropdown-item title="客户类型" ref="typeRef">
        <div class="tag-group">
          <div
            v-for="v in customerTypeList"
            :class="['tag-value', { 'tag-active': v.value === filterList.type }]"
            :key="v.value"
            @click="changeSelect('type', v.value)"
          >
            {{ v.text }}
          </div>
        </div>
        <select-footer @reset="changeSelect('type', '0')" @confirm="confirmType()" />
      </van-dropdown-item>
      <van-dropdown-item title="数据范围" ref="selfRef" v-if="filterList.type !== '0'">
        <div class="tag-group">
          <div
            :class="['tag-value', { 'tag-active': filterList.onlyLookSelfNew === '' }]"
            @click="changeSelect('onlyLookSelfNew', '')"
          >
            全部
          </div>
          <div
            v-for="v in selfList.slice(1)"
            :class="['tag-value', { 'tag-active': filterList.onlyLookSelfNew.includes(v.value) }]"
            :key="v.value"
            @click="changeSelect('onlyLookSelfNew', v.value)"
          >
            {{ v.text }}
          </div>
        </div>
        <select-footer @reset="changeSelect('onlyLookSelfNew', '1')" @confirm="confirmSelf()" />
      </van-dropdown-item>
      <van-dropdown-item title="更多筛选" @open="openMore()" />
    </van-dropdown-menu>
  </div>
  <list-selects
    :filterList="filterList"
    :customerTypeList="customerTypeList"
    :selfList="selfList"
    :changeSelect="changeSelect"
  >
    <van-dropdown-menu>
      <van-dropdown-item title="更多筛选" @open="openMore()" />
    </van-dropdown-menu>
  </list-selects>
  <van-popup v-model:show="showPop" round position="bottom">
    <list-selects-page
      v-show="moreSelects"
      :filterList="filterList"
      :customerTypeList="customerTypeList"
      :selfList="selfList"
      :sourceList="sourceList"
      :intentionTypeList="intentionTypeList"
      :intentionList="intentionList"
      :followList="followList"
      :changeSelect="changeSelect"
      :onRefresh="onRefresh"
      :close="closeMore"
      :toggleCity="toggleCity"
    />
    <city-province
      v-show="showCity"
      :cityList="cityList"
      :cityCode="filterList.cityCode"
      :changeSelect="changeSelect"
      :close="closeMore"
      :toggleCity="toggleCity"
    />
  </van-popup>
  <!-- 列表 -->
  <van-pull-refresh
    v-model="pullLoad"
    @refresh="onRefresh"
    success-text="加载成功"
    class="list-container"
  >
    <van-list
      :immediate-check="false"
      v-model:loading="listLoading"
      :finished="listFinished"
      @load="onListLoad"
    >
      <div
        class="page-list-item van-hairline--bottom"
        v-for="(item, index) in listData"
        :key="item.referralId"
      >
        <list-card
          :item="item"
          :index="index"
          :filterList="filterList"
          :role="store.state.user.role"
          :toDetail="clickToDetail"
          :loadData="loadData"
        />
      </div>
      <template #finished>
        <span v-if="listData.length">没有更多了</span>
        <empty v-else text="暂无客户" background="transparent" />
      </template>
    </van-list>
  </van-pull-refresh>
</template>
<script lang="ts" setup>
import { ref, reactive, onActivated, onUnmounted } from 'vue'
import {
  getCustomerCityProvince,
  getIntentionList,
  getCustomerPublicPage,
  CustomerlHistory,
  CityList
} from '@/api/Customer'
import { useRoute } from 'vue-router'
// import { useRouter, useRoute } from 'vue-router'
import { useDebounceFn } from '@vueuse/core'
import { useStore } from 'vuex'
import ListDashboard from './list/listDashboard.vue'
import ListCard from './list/listCard.vue'
import ListSelects from './list/listSelects.vue'
import ListSelectsPage from './list/listSelectsPage.vue'
import SelectFooter from './list/selectFooter.vue'
import CityProvince from './list/cityProvince.vue'
import Empty from '@/components/Empty/index.vue'
import wx from 'jweixin-1.6.0'
const ratio = window.innerWidth / 375
console.log('width', window.innerWidth, ratio)
const topList = [30, 70, 70, 70].map(v => Math.floor(v * ratio)) // 110
const onScroll = () => {
  const max = topList[Number(filterList.type)]
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
  // console.log(max, document.documentElement.scrollTop, document.body.scrollTop, window.pageYOffset)
  if (scrollTop >= max && !showTop.value) showTop.value = true
  if (scrollTop < max && showTop.value) showTop.value = false
}
window.addEventListener('scroll', onScroll)
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
const store = useStore()
// const router = useRouter()
const route = useRoute()
console.log('route', route)
const searchValue = ref('')
const onSearch = useDebounceFn(() => {
  onRefresh(true)
}, 300)
const showTop = ref(false)
interface Item {
  [k: string]: string
}
const customerTypeList: Item[] = ['MJFZ_RZGW', 'MJFZ_XMFZR', 'MJFZ_ZYKF', 'ZYZX_SJS'].includes(
  store.state.user.role
)
  ? [
      { text: '公池客户', value: '0' },
      { text: '私域客户', value: '1' },
      { text: '无意向客户', value: '2' },
      { text: '已成交客户', value: '3' }
    ]
  : [
      { text: '公池客户', value: '0' },
      { text: '无意向客户', value: '2' },
      { text: '已成交客户', value: '3' }
    ]
const selfList1: Item[] = [
  { text: '数据范围', value: '' },
  { text: '我跟进的', value: '1' },
  { text: '待我复核的', value: '2' }
]
const selfList2: Item[] = [
  { text: '数据范围', value: '' },
  { text: '我跟进的', value: '1' }
]
const selfList = ref<Item[]>(selfList1)
const sourceList: Item[] = [
  { text: '来源', value: '' },
  { text: '个人转介', value: '0' },
  { text: '新交付', value: '1' },
  { text: '客户留资', value: '2' }
]
const intentionTypeList: Item[] = [
  { text: '类型', value: '' },
  { text: '自营', value: '1' },
  { text: '美居', value: '2' },
  { text: '其他', value: '0' }
]
const showPop = ref(false)
const moreSelects = ref(false)
const openMore = () => {
  showPop.value = true
  moreSelects.value = true
  showCity.value = false
}
const closeMore = () => {
  showPop.value = false
  moreSelects.value = false
  showCity.value = false
}
const showCity = ref(false)
const toggleCity = () => {
  showCity.value = !showCity.value
  moreSelects.value = !moreSelects.value
}
const filterList = reactive<Item>({
  currentDeliveryPlanId: route.query.delivery as string,
  type: '0',
  onlyLookSelfNew: '',
  intentionType: '',
  intentionLevel: '',
  followLabels: '',
  customerSource: '',
  cityCode: ''
})
const pullLoad = ref(false)
const listFinished = ref(false)
const listLoading = ref(false)
const operatePage = ref<number>(1) //当前操作对象的页数，返回后需要刷新该页
const pageInfo = ref({
  page: 1,
  size: 10
})
const listData = ref<CustomerlHistory[]>([])
const changeSelect = (key: string, val: string, refresh: boolean = false) => {
  // console.log('changeSelect', key, filterList[key], val)
  if (key === 'all') {
    filterList.type = '0'
    filterList.onlyLookSelfNew = ''
    filterList.intentionType = ''
    filterList.intentionLevel = ''
    filterList.followLabels = ''
    filterList.customerSource = ''
    filterList.cityCode = ''
  } else if (['type', 'onlyLookSelfNew'].includes(key) || val === '') {
    if (filterList[key] === val) return
    filterList[key] = val
    if (key === 'type') {
      filterList.onlyLookSelfNew = val === '0' ? '' : '1'
      selfList.value = val === '1' ? selfList1 : selfList2
    }
  } else {
    // 多选
    const arr = filterList[key].split(',')
    const i = arr.indexOf(val)
    console.log(arr, i, val)
    filterList[key] =
      i > -1
        ? [...arr.slice(0, i), ...arr.slice(i + 1)].join(',')
        : filterList[key]
        ? [filterList[key], val].join(',')
        : val
    console.log(filterList[key])
  }
  if (refresh) onRefresh(true)
}
const typeRef = ref()
const selfRef = ref()
const confirmType = () => {
  typeRef.value.toggle()
  onRefresh(true)
}
const confirmSelf = () => {
  onRefresh(true)
  selfRef.value.toggle()
}
const onRefresh = (reFresh?: boolean) => {
  //重置
  pageInfo.value.page = 1
  listFinished.value = false
  //inPull表示是否需要上拉刷新，筛选条件不上拉刷新
  loadData(reFresh)
}
const onListLoad = () => {
  pageInfo.value.page++
  loadData()
}
// 跳转详情
const clickToDetail = (id: number, index: number) => {
  operatePage.value = parseInt(String(index / 10)) + 1
  const role = store.state.user.role
  const orgCode = store.state.user.orgCode
  const token = localStorage.getItem('access_token')
  const url = `${window.location.origin}/hasaki/#/customerDetail?id=${id}&access_token=${token}&orgCode=${orgCode}&role=${role}`
  console.log(url)
  wx.miniProgram.navigateTo({ url: `/pages/WebView/index?url=${encodeURIComponent(url)}` }) // h5分享
  // router.push({
  //   path: '/customerDetail',
  //   query: {
  //     id,
  //     pageType: filterList.type
  //   }
  // })
}
// 获取客户城市列表
const cityList = ref<CityList[]>([])
const loadCustomerCityList = async () => {
  const res = await getCustomerCityProvince()
  cityList.value = res
}
const loadData = async (reFresh = false, keepPage = false) => {
  console.log('选项', filterList)
  try {
    listLoading.value = true
    const res = await getCustomerPublicPage({
      ...pageInfo.value,
      page: keepPage ? operatePage.value : pageInfo.value.page,
      ...filterList,
      keywords: searchValue.value
    })
    // 默认不重置，在上拉刷新或者筛选才重置
    if (pullLoad.value || reFresh) {
      listData.value = []
      pullLoad.value = false
    }
    // keepPage，是否需要替换当前页
    if (!keepPage) {
      listData.value = [...listData.value, ...res?.records]
    } else {
      if (listData.value.length <= 10) {
        // 只有一页直接替换掉
        listData.value = res?.records
      } else {
        listData.value.splice((operatePage.value - 1) * 10, res?.records.length, ...res?.records)
        // 根据id去重
        const list = new Map()
        listData.value = listData.value.filter(item => !list.has(item.id) && list.set(item.id, 1))
      }
    }
    listLoading.value = false
    if (res?.current === res?.pages || res?.records.length <= 0) {
      listFinished.value = true
    }
  } catch {
    listLoading.value = false
    listFinished.value = true
  }
}
const intentionList = ref<Item[]>([])
const followList = ref<Item[]>([])
const loadIntentionList = () => {
  getIntentionList().then(res => {
    const intention = res.find((v: Item) => v.configCode.includes('intention'))
    if (intention) {
      intentionList.value = [
        { text: '标签', value: '' },
        ...intention.commonConfigOptionVoList.map((v: Item) => {
          return {
            text: v.optionValue,
            value: v.optionValue,
            desc: v.optionDesc
          }
        })
      ]
    }
    const follow = res.find((v: Item) => v.configCode.includes('followUpTagAll'))
    if (follow) {
      followList.value = [
        { text: '跟进动作', value: '' },
        ...follow.commonConfigOptionVoList.map((v: Item) => {
          return {
            text: v.optionValue,
            value: v.optionValue,
            desc: v.optionDesc
          }
        })
      ]
    }
  })
}
onActivated(() => {
  loadData(false, true)
})
loadCustomerCityList()
loadIntentionList()
</script>
<style lang="scss" scoped>
@import './list/list.scss';
@import './list/tag.scss';
</style>
