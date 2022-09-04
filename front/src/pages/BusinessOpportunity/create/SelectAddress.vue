<template>
  <div class="title">请填写客户置办的房屋所在地址</div>
  <div class="input-box van-hairline--bottom" @click="selectCommunityShow">
    <text class="select">选择</text>
    <div class="label">所在省、市</div>
    <van-field v-model="community" readonly label="" placeholder="请选择" style="width: 90%" />
  </div>
  <div class="input-box van-hairline--bottom" @click="selectProjectSow">
    <text class="select">选择</text>
    <div class="label">所在小区</div>
    <van-field
      v-model="project.name"
      label=""
      :maxlength="15"
      placeholder="请选择"
      readonly
      style="width: 90%"
    />
  </div>
  <div class="input-box">
    <text class="select" @click="selectHouseShow" v-if="project.code" style="z-index: 1">选择</text>
    <div class="label">楼栋、房号<span class="des">(选填)</span></div>
    <van-field v-model="home" label="" placeholder="请输入" @input="inputHouse" />
  </div>

  <AreaPicker
    v-model:visible="show"
    :values="titles"
    @change="change"
    @select="select"
  ></AreaPicker>
  <AreaPicker
    v-model:visible="showHouse"
    :values="houseList"
    @change="change"
    @select="selectHouse"
  ></AreaPicker>
  <SearchPopup
    v-model:visible="showProjectSearch"
    :list-data="projectData"
    @selectCallback="selectCallback"
    :inSelect="project"
  ></SearchPopup>
</template>

<script lang="ts" setup>
import { ref, defineExpose } from 'vue'
import { Toast } from 'vant'
import SearchPopup, { ListItem } from '@/components/SearchPopup/index.vue'
import AreaPicker, { PickerItem, Values } from '@/components/AreaPicker/index.vue'
import { getProvince, getCity, getProject, getHouse, getHome } from '@/api/resources'

const project = ref({} as ListItem)
const community = ref('')
const home = ref('')
const show = ref(false)
const showHouse = ref(false)

const change = (index: number, value: Values[]) => {
  //只保留index个项目
  value.splice(index + 1)
}
// 楼栋房屋级联选择
const houseList = ref<Values[]>([])
const houseData = ref([])
const getHouseFun = async (project: string) => {
  const res = await getHouse(project)
  houseData.value = res.result
}
const selectHouseShow = () => {
  if (project.value.name) {
    showHouse.value = true
  } else {
    Toast.fail('请先选择小区')
  }
}
const selectProjectSow = () => {
  if (!community.value) {
    Toast.fail('请先选择城市')
    return
  }
  showProjectSearch.value = true
}

const isInputHouse = ref(false)
const inputHouse = (event: Event) => {
  const ele = event.target as HTMLInputElement
  ele.value && (isInputHouse.value = true)
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
// 省市区级联选择
const titles = ref<Values[]>([])
const provinces = ref<PickerItem[]>([])

const getProvinceFun = async () => {
  const res = await getProvince()
  provinces.value = res.result.regions
}
getProvinceFun()
const selectCommunityShow = () => {
  show.value = true
  if (!titles.value.length) {
    titles.value.push({
      name: '请选择省份',
      code: '-1',
      content: provinces.value
    })
  }
}
const projectData = ref<PickerItem[]>([])
const showProjectSearch = ref(false)
// 小区选择回调
const selectCallback = async (item: ListItem) => {
  if (project.value.code !== item.code || !item.code) {
    project.value.name = item.name
    project.value.code = item.code
    if (project.value.code) {
      project.value.code && (await getHouseFun(item.code))
    } else {
      houseData.value = []
    }
    reset(2)
  }
}

const select = async (item: { name: string; code: string }) => {
  // 修改最后一项 添加新的一项
  const last = titles.value.length - 1
  titles.value[last].name = item.name
  titles.value[last].code = item.code
  if (last === 0) {
    const res = await getCity(item.code)
    titles.value.push({
      name: '请选择城市',
      code: '-1',
      content: res.result?.regions
    })
  }
  if (last === 1) {
    show.value = false
    community.value = titles.value[0].name + titles.value[1].name
    const res = await getProject(item.code)
    projectData.value = res.result
    reset(1)
    // 目前不直接弹出选小区
    // selectProjectSow()
  }
}
const reset = (type = 2) => {
  if (type === 1) {
    project.value.name = ''
    project.value.code = ''
  }
  home.value = ''
  houseList.value = [
    {
      name: '请选择楼栋',
      code: '-1',
      content: houseData.value
    }
  ]
}

interface ILIST {
  code: string
  name: string
}
export interface IADDRESS {
  project: {
    name: string
    code: string
  }
  titles: ILIST[]
  isInputHouse: string
  houseList: ILIST[]
  community: string
  home: string
}
defineExpose({
  project,
  titles,
  isInputHouse,
  houseList,
  community,
  home
})
</script>
<style lang="scss" scoped>
@import './create.scss';
</style>
