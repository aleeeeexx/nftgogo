<template>
  <div style="padding-top: 1px">
    <div class="title">验收空间</div>
    <div
      class="pancel"
      @click="goRoom(room, defaultList.includes(room.project))"
      v-for="(room, index) in list"
      :key="index"
    >
      <div class="left">{{ room.project }}</div>
      <div class="right">
        <van-icon
          name="arrow"
          class="logo"
          color="#B2B2B2"
          v-if="!defaultList.includes(room.project)"
        />
        <Checkbox name="a" checked-color="#7AB439" :modelValue="checked" v-else></Checkbox>
      </div>
    </div>
  </div>
  <FixBar>
    <template #content>
      <div class="foot">
        <van-button type="primary" block color="#7AB439" @click="goReturn"
          >下一步 填写归还物品</van-button
        >
      </div>
    </template>
  </FixBar>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import FixBar from '@/components/FixBar/index.vue'
import { Checkbox } from 'vant'
import { useRouter, useRoute } from 'vue-router'
import { getRoom, getDetail, IRoom } from '@/api/SampleRoomClose'
import { useStore } from 'vuex'

const checked = ref(true)
const router = useRouter()
const route = useRoute()
const store = useStore()
const id = route.query.id as string
const list = ref<IRoom[]>([])
const getList = async () => {
  const res = await getRoom(+id)
  list.value = res
}

const defaultList = ref<string[]>([])

getList()
const getNewInfo = async () => {
  const res = await getDetail(+id)
  defaultList.value = res.spaceVoList.map(item => item.project)
  store.commit('setSampleInfo', res)
}
getNewInfo()
const goRoom = (item: IRoom, isCreate: boolean) => {
  // 设置该空间下的家具信息
  console.log(item)
  store.commit('setSampleItem', item)
  // 是否第一次创建过 创建了去vux数据 否则遍历初始数据
  console.log(isCreate)
  router.push({ path: '/SampleRoomCloseRoom', query: { ...route.query, isCreate: `${isCreate}` } })
}
const goReturn = () => {
  router.replace({ path: '/SampleRoomCloseReturn', query: route.query })
}
</script>
<style lang="scss" scoped>
.title {
  height: 43px;
  font-size: 12px;
  padding-left: 20px;
  line-height: 43px;
  color: #666;
}
.pancel {
  width: 335px;
  margin-bottom: 10px;
  margin-left: 20px;
  box-sizing: border-box;
  background-color: #fff;
  height: 64px;
  border-radius: 8px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
  }
}
.foot {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  height: 72px;
}
</style>
