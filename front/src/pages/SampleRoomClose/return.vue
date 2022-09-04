<template>
  <div style="padding-top: 1px">
    <div class="title">
      <span>请填写归还物品</span>
      <span style="color: #5d8aa3; font-size: 14px" @click="showAdd">添加</span>
    </div>
    <div class="room-item" v-for="(item, index) in list" :key="index">
      <div class="pancel">
        <div class="left">{{ item.project }}</div>
        <div class="right">
          <div
            class="Symbol"
            @click="minItem(item, index)"
            v-if="!viewFlag || (!item.id && item.num > 0)"
          >
            <van-icon name="minus" />
          </div>
          <div class="num" v-if="item.num > 0">{{ item.num }}</div>
          <div class="Symbol" v-if="!viewFlag || !item.id">
            <van-icon name="plus" @click="addItem(item)" />
          </div>
        </div>
      </div>
      <div class="status van-hairline--top" v-if="item.num > 0">
        <div class="left">当前状态</div>
        <div class="right">
          <van-radio-group
            v-model="item.status"
            direction="horizontal"
            :disabled="item.id && viewFlag"
          >
            <van-radio :name="0" checked-color="#5D8AA3"
              >未还
              <template #icon="props">
                <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
              </template>
            </van-radio>
            <van-radio :name="1" checked-color="#5D8AA3"
              >已还
              <template #icon="props">
                <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
              </template>
            </van-radio>
          </van-radio-group>
        </div>
      </div>
    </div>
  </div>

  <FixBar>
    <template #content>
      <div class="foot">
        <van-button type="primary" block color="#7AB439" :loading="loading" @click="save"
          >保存</van-button
        >
      </div>
    </template>
  </FixBar>
  <VanDialog
    :show="isShowAdd"
    show-cancel-button
    @confirm="confirm"
    @cancel="isShowAdd = false"
    :confirmButtonColor="DialogConfirmColor"
  >
    <div class="VanDialog">
      <div class="input">
        <van-field v-model="name" label="" placeholder="请输入添加物品名称" />
        <div class="right">
          <div class="Symbol" @click="minQuantity">
            <van-icon name="minus" />
          </div>
          <div class="num">{{ quantity }}</div>
          <div class="Symbol" @click="addQuantity">
            <van-icon name="plus" />
          </div>
        </div>
      </div>
      <div class="status">
        <div class="left">当前状态</div>
        <div class="right">
          <van-radio-group v-model="isReturn" direction="horizontal">
            <van-radio :name="0" checked-color="#5D8AA3"
              >未还<template #icon="props">
                <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" /> </template
            ></van-radio>
            <van-radio :name="1" checked-color="#5D8AA3"
              >已还<template #icon="props">
                <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" /> </template
            ></van-radio>
          </van-radio-group>
        </div>
      </div>
    </div>
  </VanDialog>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import FixBar from '@/components/FixBar/index.vue'
import { Dialog } from 'vant'
import { useRoute, useRouter } from 'vue-router'
import { saveMoney, IMoney, IThingVoList } from '@/api/SampleRoomClose'
import { Toast } from 'vant'
import { useStore } from 'vuex'
const activeIcon = require('@/assets/radio-iconchecked.svg')
const inactiveIcon = require('@/assets/radio-iconunchecked.svg')
const route = useRoute()
const router = useRouter()
const store = useStore()
const id = route.query.id as string
const VanDialog = Dialog.Component
const list = ref<IThingVoList[]>([])
const defaultList = computed(() => store.state.SampleRoomClose.thingVoList as IThingVoList[])
const viewFlag = computed<0 | 1>(() => store.state.SampleRoomClose.viewFlag)
list.value = defaultList.value
// 设置默认值
if (!list.value.length) {
  list.value.push({
    project: '钥匙',
    num: 1,
    status: 0
  })
}
const isShowAdd = ref(false)
const showAdd = () => {
  console.log(111)
  name.value = ''
  isShowAdd.value = true
}
const DialogConfirmColor = computed(() => {
  return name.value ? '#5D8AA3' : '#eaeaea'
})
const confirm = () => {
  if (!name.value) {
    return false
  }
  if (list.value.some(item => item.project === name.value)) {
    Toast.fail('名称不能重复')
    return false
  }
  isShowAdd.value = false
  list.value.push({
    project: name.value,
    num: quantity.value,
    status: isReturn.value
  })
}
const quantity = ref<number>(1)
const name = ref('')
const isReturn = ref<0 | 1>(1)
const addQuantity = () => {
  quantity.value++
  console.log(quantity.value)
}
const minQuantity = () => {
  if (quantity.value === 0) {
    return
  }
  quantity.value--
}
const addItem = (item: IThingVoList) => {
  item.num++
}
const minItem = (item: IThingVoList, index: number) => {
  if (item.num === 0) {
    return
  }

  if (item.num === 1) {
    Dialog.confirm({
      message: '是否删除此归还物品的验收内容',
      confirmButtonColor: '#5D8AA3'
    }).then(() => {
      if (item.project === '钥匙') {
        item.num--
        item.status = 1
      } else {
        list.value.splice(index, 1)
      }
    })
  } else {
    item.num--
  }
}
const loading = ref(false)
const save = async () => {
  const data: IMoney[] = list.value.map(item => {
    return {
      ...item,
      sampleRoomId: +id,
      type: 2
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
</script>
<style lang="scss" scoped>
@import './style/return.scss';
</style>
