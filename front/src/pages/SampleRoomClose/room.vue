<template>
  <div style="padding-top: 1px">
    <div class="title">
      <span>验收空间</span>
      <span style="color: #5d8aa3; font-size: 14px" @click="showAddFurniture">添加</span>
    </div>
    <div class="room-item" v-for="(item, index) in list" :key="index">
      <div class="pancel">
        <div class="left">{{ item.item }}</div>
        <div class="right">
          <Checkbox
            name="b"
            :disabled="item.disable && !!viewFlag"
            checked-color="#5D8AA3"
            shape="square"
            :modelValue="item.checkBox"
            @click="changeCheckBox(item, index)"
          ></Checkbox>
        </div>
      </div>
      <div class="status van-hairline--top" v-if="item.checkBox">
        <div class="left"></div>
        <div class="right">
          <van-radio-group
            v-model="item.status"
            direction="horizontal"
            :disabled="item.disable && !!viewFlag"
          >
            <van-radio :name="1" checked-color="#5D8AA3"
              >无问题<template #icon="props">
                <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" /> </template
            ></van-radio>
            <van-radio :name="0" checked-color="#5D8AA3"
              >有问题<template #icon="props">
                <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" /> </template
            ></van-radio>
          </van-radio-group>
        </div>
      </div>
      <div class="info van-hairline--top" v-if="item.checkBox && item.status === 0">
        <div class="label">问题记录<span class="des"></span></div>
        <van-cell-group inset style="margin-left: -1px">
          <van-field
            v-model="item.description"
            rows="1"
            autosize
            type="textarea"
            maxlength="100"
            placeholder="请输入"
            :disabled="item.disable && !!viewFlag"
            show-word-limit
          />
        </van-cell-group>
      </div>
      <div class="album" v-if="item.checkBox && item.status === 0">
        <div class="label">现场图片</div>
        <div class="">
          <UploadImages
            v-model="item.imageUrlArray"
            :disabled="item.disable && !!viewFlag"
          ></UploadImages>
        </div>
      </div>
    </div>
  </div>

  <FixBar>
    <template #content>
      <div class="foot">
        <van-button
          type="primary"
          block
          color="#7AB439"
          :loading="loading"
          @click="save"
          :disabled="!canSave"
          >保存</van-button
        >
      </div>
    </template>
  </FixBar>
  <VanDialog
    :show="isShowAddFurniture"
    show-cancel-button
    @confirm="confirm"
    @cancel="isShowAddFurniture = false"
    :confirmButtonColor="DialogConfirmColor"
  >
    <div class="VanDialog">
      <div class="input">
        <van-field v-model="name" label="" placeholder="请输入添加部位名称" />
      </div>
      <div class="status van-hairline--top">
        <div class="left">当前状态</div>
        <div class="right">
          <van-radio-group v-model="radio" direction="horizontal">
            <van-radio :name="1" checked-color="#5D8AA3"
              >无问题<template #icon="props">
                <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" /> </template
            ></van-radio>
            <van-radio :name="0" checked-color="#5D8AA3"
              >有问题<template #icon="props">
                <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" /> </template
            ></van-radio>
          </van-radio-group>
        </div>
      </div>
    </div>
  </VanDialog>
</template>
<script></script>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import FixBar from '@/components/FixBar/index.vue'
import UploadImages from '@/components/UploadImages/index.vue'
import { Checkbox, Dialog, Toast } from 'vant'
import { useStore } from 'vuex'
import { IMoney, IRoom, saveMoney } from '@/api/SampleRoomClose'
import { useRoute, useRouter } from 'vue-router'
// import activeIcon from '../../assets/radio-iconchecked.svg'
// import inactiveIcon from '../../assets/radio-iconunchecked.svg'
const activeIcon = require('@/assets/radio-iconchecked.svg')
const inactiveIcon = require('@/assets/radio-iconunchecked.svg')
const router = useRouter()
interface Room {
  item: string
  checkBox: 0 | 1
  status: 0 | 1
  description: string
  imageUrlArray: string[]
  disable?: boolean
}
const store = useStore()
const route = useRoute()
const id = route.query.id as string
const list = ref<Room[]>([])
const defaultValue = computed<string[]>(() => store.state.SampleRoomClose?.item)
const viewFlag = computed<0 | 1>(() => store.state.SampleRoomClose.viewFlag)

const defaultList = computed(() => store.state.SampleRoomClose.item).value.map((item: string) => {
  return {
    item,
    checkBox: 0,
    status: 1,
    description: '',
    imageUrlArray: []
  }
})
const project = computed(() => store.state.SampleRoomClose.project)
document.title = project.value
const canSave = computed(() => {
  const checkList = list.value.filter(item => item.checkBox && item.status === 0)
  return checkList.every(item => item.imageUrlArray.length && item.description)
})
const items = computed(() => {
  return store.state.SampleRoomClose.spaceVoList.filter(
    (item: IRoom) => item.project === project.value
  )
})
if (route.query.isCreate === 'false') {
  list.value = defaultList
} else {
  list.value = items.value[0]?.itemVo
  list.value.forEach(item => {
    item.disable = !!item.checkBox
  })
}
const VanDialog = Dialog.Component
const isShowAddFurniture = ref(false)
const showAddFurniture = () => {
  isShowAddFurniture.value = true
}
const DialogConfirmColor = computed(() => {
  return name.value ? '#5D8AA3' : '#eaeaea'
})
const confirm = () => {
  if (!name.value) {
    return false
  }
  if (list.value.some(item => item.item === name.value)) {
    Toast.fail('名称不能重复')
    return false
  }
  isShowAddFurniture.value = false
  list.value.push({
    item: name.value,
    checkBox: 1,
    status: radio.value,
    description: '',
    imageUrlArray: []
  })
}
const radio = ref<0 | 1>(0)
const name = ref('')
const loading = ref(false)
const save = async () => {
  const data: IMoney[] = list.value.map(item => {
    return {
      ...item,
      checkBox: +item.checkBox,
      project: project.value,
      sampleRoomId: +id,
      type: 1
    }
  })
  loading.value = true
  try {
    await saveMoney(data)
    loading.value = false
    Toast.success('提交成功')
    router.back()
  } catch {
    loading.value = false
  }
}
const changeCheckBox = (item: Room, index: number) => {
  // 如果被选中了
  if (item.checkBox) {
    //如果是默认部件 取消只重置数据 否则删除
    Dialog.confirm({
      message: '是否删除对此部位的验收内容',
      confirmButtonColor: '#5D8AA3'
    }).then(() => {
      if (defaultValue.value.includes(item.item)) {
        item.checkBox = 0
        item.status = 0
        item.description = ''
        item.imageUrlArray = []
      } else {
        list.value.splice(index, 1)
      }
    })
  } else {
    item.checkBox = 1
  }
}
</script>
<style lang="scss" scoped>
@import './style/room.scss';
</style>
