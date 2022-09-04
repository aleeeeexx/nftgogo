<template>
  <div style="padding: 1px 0px">
    <div class="card" v-for="(item, index) in spaceList" :key="index">
      <div class="content">
        <div class="question">
          <div class="left">
            <div class="title">{{ item.project }}/{{ item.item }}</div>
            <div class="name">{{ item.description }}</div>
          </div>
          <div class="image" @click="showImage(item.imageUrlArray)">
            <div class="number">
              {{ (item.imageUrlArray?.length || 0) > 1 ? `+${item.imageUrlArray?.length}` : '' }}
            </div>
            <van-image class="src" v-if="item.imageUrlArray?.length" :src="item.imageUrlArray[0]" />
          </div>
        </div>
        <div class="pancel van-hairline--top">
          <div class="left">已经完成整改</div>
          <div class="right">
            <Checkbox
              :disabled="item.disable"
              name="b"
              v-model="item.isDone"
              checked-color="#5D8AA3"
              shape="square"
            ></Checkbox>
          </div>
        </div>
        <div class="infoT" v-if="item.isDone">
          <div class="label">整改记录<span class="des"></span></div>
          <van-cell-group inset style="margin-left: -1px">
            <van-field
              :disabled="item.disable"
              rows="1"
              autosize
              type="textarea"
              maxlength="100"
              placeholder="请输入"
              show-word-limit
              v-model="item.result"
            />
          </van-cell-group>
        </div>
        <div class="album" v-if="item.isDone">
          <div class="label">整改后图片</div>
          <div class="">
            <UploadImages v-model="item.resultImg" :disabled="item.disable"></UploadImages>
          </div>
        </div>
      </div>
    </div>
    <div class="card" v-for="(item, index) in returnList" :key="index">
      <div class="content">
        <div class="question">
          <div class="title">{{ item.project }}</div>
          <div class="name">数量x{{ item.num }}</div>
        </div>
      </div>
      <div class="pancel van-hairline--top">
        <div class="left">当前状态</div>
        <div class="right">
          <van-radio-group direction="horizontal" v-model="item.isDone">
            <van-radio :name="1" checked-color="#5D8AA3"
              >已还<template #icon="props">
                <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" /> </template
            ></van-radio>
            <van-radio :name="0" checked-color="#5D8AA3"
              >待还<template #icon="props">
                <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" /> </template
            ></van-radio>
          </van-radio-group>
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
          >提交</van-button
        >
      </div>
    </template>
  </FixBar>
</template>
<script lang="ts" setup>
import FixBar from '@/components/FixBar/index.vue'
import { ImagePreview, Toast } from 'vant'
import { Checkbox } from 'vant'
import UploadImages from '@/components/UploadImages/index.vue'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { IMoney, IThingVoList, editProblem } from '@/api/SampleRoomClose'
import { useRoute, useRouter } from 'vue-router'
// import activeIcon from '@/assets/radio-iconchecked.svg'
// import inactiveIcon from '@/assets/radio-iconunchecked.svg'
const activeIcon = require('@/assets/radio-iconchecked.svg')
const inactiveIcon = require('@/assets/radio-iconunchecked.svg')
const router = useRouter()
const route = useRoute()
const id = route.query.id as string
const canSave = computed(() => {
  const space = spaceList.value.filter(item => item.isDone)
  console.log(space)
  return space.every(item => item.description && item.resultImg.length)
})
const showImage = (list: string[] | undefined) => {
  list && ImagePreview(list)
}
const store = useStore()
interface HandleSapce extends IMoney {
  disable?: boolean
  isDone: 0 | 1
  result: string
  resultImg: string[]
}
interface HandleIThingVoList extends IThingVoList {
  isDone: 0 | 1
}
interface IResult extends IMoney {
  result?: IMoney
}
const returnList = ref<HandleIThingVoList[]>([])
const spaceList = ref<HandleSapce[]>([])
const problem = computed(() => store.state.SampleRoomClose.problemVoList)
returnList.value = problem.value
  .filter((item: IMoney) => item.type === 2)
  .map((item: IResult) => {
    return {
      ...item,
      isDone: item.result?.status ?? 0
    }
  })
spaceList.value = problem.value
  .filter((item: IMoney) => item.type === 1)
  .map((item: IResult) => {
    return {
      ...item,
      result: item.result?.description ?? '',
      isDone: item.result?.status ?? 0,
      resultImg: item.result?.imageUrlArray ?? [],
      disable: !!item.result?.status
    }
  })
console.log(returnList.value, spaceList.value)
const loading = ref(false)
const save = async () => {
  const spaceData = spaceList.value.map(item => {
    return {
      type: item.type,
      recordId: item.id,
      sampleRoomId: +id,
      description: item.result,
      status: item.isDone ? 1 : 0,
      imageUrlArray: item.resultImg
    }
  })
  const returnData: IMoney[] = returnList.value.map(item => {
    return {
      type: 2,
      recordId: item.id,
      sampleRoomId: +id,
      status: item.isDone
    }
  })
  const data: IMoney[] = [...spaceData, ...returnData]
  try {
    loading.value = true
    await editProblem(data)
    Toast.success('提交成功')
    loading.value = false
    router.back()
  } catch {
    loading.value = false
  }
}
</script>
<style lang="scss" scoped>
@import './style/index.scss';
.card {
  .content {
    margin-left: 0;
    .question {
      padding-left: 20px;
      height: auto;
      display: flex;
      justify-content: space-between;
      padding-right: 20px;
      .left {
        flex: 1;
        .name {
          text-align: justify;
        }
      }
      .image {
        margin-left: 28px;
        position: relative;
        .number {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 20px;
          color: #fff;
          font-weight: 500;
        }
      }
      .src {
        position: static;
      }
    }
  }
}
.pancel {
  margin-left: 20px;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
  }
  .right {
    margin-right: 20px;
  }
}
.album {
  margin-left: 20px;
  .label {
    margin-bottom: 8px;
    color: rgba(0, 0, 0, 0.6);
    font-size: 14px;
    line-height: 20px;
  }
}
.infoT {
  // height: 120px;
  box-sizing: border-box;
  margin-top: 0px;
  padding: 10px 20px;
  .label {
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    color: #666666;
    margin-bottom: 8px;
    padding-top: 12px;
    .des {
      color: rgba(0, 0, 0, 0.3);
    }
  }
  .van-cell {
    background-color: #f6f7f7;
  }
}
</style>
