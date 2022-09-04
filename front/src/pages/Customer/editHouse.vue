<template>
  <div class="info-show-title" v-if="pageType === 'edit'">
    <span class="left">房屋信息</span>
    <span class="operate" @click="clickDelHouse" v-if="houseInfoList.length > 1">删除房屋</span>
  </div>
  <div class="info-form-select-container">
    <div class="info-form-select">
      <div class="label">所在省、市</div>
      <div class="item">
        <span class="val"
          >{{ houseInfoList[houseIndex].provinceName
          }}{{ houseInfoList[houseIndex].cityName }}</span
        >
      </div>
    </div>
  </div>

  <div class="info-form-select-container" @click="clickSelectProject">
    <div class="info-form-select">
      <div class="label">所在小区</div>
      <div class="item">
        <span class="val" :class="{ noSelect: !houseInfoList[houseIndex].projectName }">{{
          houseInfoList[houseIndex].projectName ? houseInfoList[houseIndex].projectName : '请选择'
        }}</span>
        <span class="select">选择</span>
      </div>
    </div>
  </div>

  <div class="input-box">
    <text class="select" @click="selectHouseShow" v-if="houseInfoList[houseIndex].projectCode"
      >选择</text
    >
    <div class="label">楼栋、房号<span class="des">(选填)</span></div>
    <van-field v-model.trim="home" label="" placeholder="请输入" @input="inputHouse" />
  </div>

  <div class="info-form-select-container">
    <div class="info-form-select">
      <div class="label">户型</div>
      <div class="item">
        <van-field v-model.trim="houseInfoList[houseIndex].houseType" placeholder="请输入" />
      </div>
    </div>
    <div class="info-form-select" @click="showIdentityPicker = true">
      <div class="label">身份</div>
      <div class="item">
        <span
          class="val"
          :class="{
            noSelect:
              !houseInfoList[houseIndex].customerRole &&
              houseInfoList[houseIndex].customerRole !== 0
          }"
          >{{
            houseInfoList[houseIndex].customerRole || houseInfoList[houseIndex].customerRole === 0
              ? CustomerRoleList[houseInfoList[houseIndex].customerRole]
              : '请选择'
          }}</span
        >
        <span class="select">选择</span>
      </div>
    </div>
  </div>

  <!-- 操作 -->
  <FixBar>
    <template #content>
      <!-- 添加 -->
      <div class="operate-bottom">
        <van-button class="operate-button" @click="onSubmit()" :disabled="!isCanSubmint"
          >保存</van-button
        >
      </div>
    </template>
  </FixBar>

  <van-popup v-model:show="showIdentityPicker" round position="bottom">
    <van-picker
      cancel-button-text=""
      title="请选择身份"
      :columns="identityColumns"
      @confirm="identityOnConfirm"
    />
  </van-popup>

  <SearchPopup
    v-model:visible="showProjectSearch"
    :list-data="projectData"
    @selectCallback="selectCallback"
    :inSelect="{
      name: houseInfoList[houseIndex].projectName,
      code: houseInfoList[houseIndex].projectCode
    }"
  ></SearchPopup>
  <AreaPicker
    v-model:visible="showHouse"
    :values="houseList"
    @change="change"
    @select="selectHouse"
  ></AreaPicker>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { HouseInfoType, updateCustomerDetail } from '@/api/Customer'
import { CustomerRoleList } from '@/constant/customer'
import { getProject, getHouse, getHome } from '@/api/resources'
import SearchPopup, { ListItem } from '@/components/SearchPopup/index.vue'
import { Dialog, Toast } from 'vant'
import AreaPicker, { PickerItem, Values } from '@/components/AreaPicker/index.vue'
import FixBar from '@/components/FixBar/index.vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const change = (index: number, value: Values[]) => {
  //只保留index个项目
  value.splice(index + 1)
}

// 点击删除房屋
const clickDelHouse = () => {
  Dialog.confirm({
    message: '是否删除此房屋?',
    confirmButtonText: '删除',
    closeOnClickOverlay: true,
    className: 'del-confirm-dialog'
  })
    .then(async () => {
      // on confirm
      houseInfoList.value = houseInfoList.value.filter((item, index) => index !== houseIndex)
      await updateCustomerDetail({
        houseList: houseInfoList.value,
        customerId: customerId
      })
      Toast.success('删除成功')
      setTimeout(() => {
        router.go(-1)
      }, 2000)
    })
    .catch(() => {
      // on cancel
    })
}

// 省市区级联选择
const projectData = ref<PickerItem[]>([])
const showProjectSearch = ref(false)
// 选择小区
const clickSelectProject = () => {
  showProjectSearch.value = true
}
// 小区选择回调
const selectCallback = async (item: ListItem) => {
  if (houseInfoList.value[houseIndex].projectCode !== item.code || !item.code) {
    houseInfoList.value[houseIndex].projectName = item.name
    houseInfoList.value[houseIndex].projectCode = item.code
    if (houseInfoList.value[houseIndex].projectCode) {
      houseInfoList.value[houseIndex].projectCode && (await loadHouseList(item.code))
    } else {
      houseData.value = []
    }
    reset()
  }
}
// 选择楼栋、房屋
const home = ref('')
const houseList = ref<Values[]>([])
const houseData = ref([])
const showHouse = ref(false)
const isInputHouse = ref(false)
const inputHouse = (event: Event) => {
  const ele = event.target as HTMLInputElement
  ele.value && (isInputHouse.value = true)
}
// 点击选择楼栋
const selectHouseShow = () => {
  if (houseInfoList.value[houseIndex].projectName && houseList.value.length > 0) {
    showHouse.value = true
  } else if (houseList.value.length <= 0) {
    Toast.fail('请重新选择小区')
  } else {
    Toast.fail('请先选择小区')
  }
}

const selectHouse = async (item: { name: string; code: string }) => {
  // 修改最后一项 添加新的一项
  const last = houseList.value.length - 1
  houseList.value[last].name = item.name
  houseList.value[last].code = item.code
  if (last === 0) {
    const res = await getHome(item.code)
    houseList.value.push({
      name: '请选择房屋',
      code: '-1',
      content: res.result
    })
  }
  if (last === 1) {
    home.value = houseList.value[last].name
    isInputHouse.value = false
    showHouse.value = false
  }
}

const reset = () => {
  home.value = ''
  houseInfoList.value[houseIndex].buildingName = ''
  houseInfoList.value[houseIndex].buildingCode = ''
  houseList.value = [
    {
      name: '请选择楼栋',
      code: '-1',
      content: houseData.value
    }
  ]
}

// 身份
const showIdentityPicker = ref(false)
let identityColumns = ref<string[]>([])
Object.keys(CustomerRoleList).forEach(key => {
  identityColumns.value.push(CustomerRoleList[key])
})

const identityOnConfirm = (value: string, index: number) => {
  showIdentityPicker.value = false
  houseInfoList.value[houseIndex].customerRole = index
}

const onSubmit = async () => {
  const data = {
    ...houseInfoList.value[houseIndex],
    buildingCode: isInputHouse.value
      ? ''
      : houseList.value[0]?.code === '-1'
      ? ''
      : houseList.value[0]?.code,
    buildingName: isInputHouse.value
      ? ''
      : houseList.value[0]?.code === '-1'
      ? ''
      : houseList.value[0]?.name,
    houseCode: isInputHouse.value ? '' : houseList.value[1]?.code,
    houseName: isInputHouse.value ? home.value : houseList.value[1]?.name
  }
  let list = JSON.parse(JSON.stringify(houseInfoList.value))
  list[houseIndex] = data
  await updateCustomerDetail({
    houseList: list,
    customerId: customerId
  })
  Toast.success('保存成功')
  setTimeout(() => {
    router.go(-1)
  }, 2000)
}

// 根据页面类型设置title
const pageType = route.query.pageType as string
document.title = { add: '添加房屋', edit: '编辑房屋' }[pageType] as string

// 获取小区列表
const loadProjectList = async () => {
  const res = await getProject(houseInfoList.value[houseIndex].cityCode)
  projectData.value = res.result
}

const loadHouseList = async (project: string) => {
  const res = await getHouse(project)
  houseData.value = res.result
}

const houseInfoList = ref<HouseInfoType[]>(
  // JSON.parse(route.query.houseInfoList as string) as HouseInfoType[]
  JSON.parse(sessionStorage.getItem('houseInfoList') as string) as HouseInfoType[]
)

// 当前编辑的下标
const houseIndex = Number(JSON.parse(route.query.houseIndex as string))
const customerId = JSON.parse(route.query.customerId as string)

const setHouse = async () => {
  // 只选了小区，没有选房屋，楼栋，或者手写了楼栋
  if (
    houseInfoList.value[houseIndex].projectCode &&
    !houseInfoList.value[houseIndex].houseCode &&
    !houseInfoList.value[houseIndex].buildingCode &&
    !houseInfoList.value[houseIndex].buildingName
  ) {
    const res = await getHouse(houseInfoList.value[houseIndex].projectCode)
    houseData.value = res.result
    houseList.value = [
      {
        name: '请选择楼栋',
        code: '-1',
        content: res.result
      }
    ]
  }
  //选了小区，也选了房屋楼栋
  if (
    houseInfoList.value[houseIndex].projectCode &&
    houseInfoList.value[houseIndex].houseCode &&
    houseInfoList.value[houseIndex].houseName &&
    houseInfoList.value[houseIndex].buildingCode &&
    houseInfoList.value[houseIndex].buildingName
  ) {
    const res = await getHouse(houseInfoList.value[houseIndex].projectCode)
    houseData.value = res.result
    houseList.value = [
      {
        name: houseInfoList.value[houseIndex].buildingName,
        code: houseInfoList.value[houseIndex].buildingCode,
        content: res.result
      }
    ]

    const ress = await getHome(houseInfoList.value[houseIndex].buildingCode)
    houseList.value.push({
      name: houseInfoList.value[houseIndex].houseName,
      code: houseInfoList.value[houseIndex].houseCode,
      content: ress.result
    })
  }
  // 如果有房屋名称，赋值给home
  if (houseInfoList.value[houseIndex].houseName) {
    home.value = houseInfoList.value[houseIndex].houseName
  }
}

const isCanSubmint = computed(() => {
  return houseInfoList.value[houseIndex].projectName
})

loadProjectList()
//设置房屋
route.query.pageType === 'edit' && setHouse()
</script>

<style lang="scss" scoped>
.input-box {
  box-sizing: border-box;
  height: 67px;
  padding: 0 20px;
  position: relative;
  background: #fff;
  margin-bottom: 10px;
  .select {
    position: absolute;
    right: 0;
    line-height: 20px;
    font-weight: 500;
    font-size: 14px;
    color: #5d8aa3;
    bottom: 14px;
    right: 20px;
    z-index: 1;
  }
  .label {
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    color: #666666;
  }
  .van-cell {
    line-height: 24px;
    padding-top: 0px;
    font-size: 17px;
    padding-left: 0;
    padding-right: 38px;
  }
}
</style>
