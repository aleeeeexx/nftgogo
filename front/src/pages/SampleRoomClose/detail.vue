<template>
  <div style="padding: 1px 0px">
    <div class="card">
      <div class="header">样板间验房</div>
      <div
        class="content van-hairline--top"
        v-for="(item, index) in record.spaceVoList"
        :key="index"
      >
        <div class="question check">
          <div class="left">
            <div class="title">{{ item.project }}/{{ item.item }}</div>
            <div class="name" :style="item.status || item.result?.status ? '' : 'color:#1aa218'">
              {{ item.status ? '验收无问题' : item.description }}
            </div>
          </div>
          <div class="image" @click="showImage(item.imageUrlArray)">
            <div class="number">
              {{ (item.imageUrlArray?.length || 0) > 1 ? `+${item.imageUrlArray?.length}` : '' }}
            </div>
            <van-image :src="item.imageUrlArray[0]" v-if="item.imageUrlArray?.length" class="src" />
          </div>
        </div>
        <div class="result" v-if="item.result?.status">
          <div class="left">
            <div class="title">跟进处理结果</div>
            <div class="name">{{ item?.result?.description }}</div>
          </div>
          <div class="image" @click="showImage(item?.result?.imageUrlArray)">
            <div class="number">
              {{
                (item.result?.imageUrlArray?.length || 0) > 1
                  ? `+${item.imageUrlArray?.length}`
                  : ''
              }}
            </div>
            <van-image
              v-if="item.result?.imageUrlArray?.length"
              :src="item.result?.imageUrlArray[0]"
              class="src"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="header">归还物品</div>
      <div
        class="content van-hairline--top"
        v-for="(item, index) in record.thingVoList"
        :key="index"
      >
        <div class="question">
          <div class="title">{{ item.project }}</div>
          <div class="name" :style="item.status ? '' : 'color:#1aa218'">
            数量x{{ item.num }},{{ item.status === 0 ? '未还' : '已还' }}
          </div>
        </div>
      </div>
      <div v-if="!record.thingVoList?.length" class="empty">暂无归还物品</div>
    </div>
    <div class="card">
      <div class="header">水电读数</div>
      <div
        class="content van-hairline--top"
        v-for="(item, index) in record.costVoList"
        :key="index"
      >
        <div class="question">
          <div class="title">
            {{ item.project
            }}<span class="des">{{ item.project === '水费' ? ' (吨)' : ' (度)' }}</span>
          </div>
          <div class="name">{{ item.degree }}</div>
        </div>
      </div>
    </div>
    <div class="info">
      <div class="content" v-if="record.initiator">
        <span class="left">发起人</span>
        <span class="right">{{ record.initiator }}</span>
      </div>
      <div class="content" v-if="record.createdTime">
        <span class="left">提交撤场时间</span>
        <span class="right">{{ record.createdTime }}</span>
      </div>
      <div class="content" v-if="record.finalCheckTime">
        <span class="left">确认撤场时间</span>
        <span class="right">{{ record.finalCheckTime }}</span>
      </div>
    </div>
  </div>
  <FixBar v-if="isShowFoot">
    <template #content>
      <div class="foot">
        <van-button type="primary" block color="#7AB439" :disabled="!isCanSave" @click="save">
          {{ !isCanSave ? '待问题点整改完确认撤场验收' : '确认撤场验收' }}
        </van-button>
      </div>
    </template>
  </FixBar>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { getRecord, IRecord, agree } from '@/api/SampleRoomClose'
import FixBar from '@/components/FixBar/index.vue'
import { ImagePreview, Toast, Dialog } from 'vant'
import { useRoute } from 'vue-router'
import wx from 'jweixin-1.6.0'
const route = useRoute()
const id = route.query.id as string
const isCustomer = route.query.isCustomer as string
const isShowFoot = computed(() => {
  return isCustomer && record.value.status !== 2
})
// '0': '待撤场',
// '1': '撤场中',
// '2': '已撤场',
const record = ref<IRecord>({
  accepter: '',
  createdTime: '',
  finalCheckTime: '',
  initiator: '',
  costVoList: [],
  spaceVoList: [],
  thingVoList: [],
  status: 0
})

const getDeail = async () => {
  const res = await getRecord(+id)
  record.value = res
}
const isCanSave = computed(() => {
  // 只要存在问题就不能点击
  return (
    record.value.spaceVoList.every(item => item.status === 1 || item.result?.status === 1) &&
    record.value.thingVoList.every(item => item.status === 1)
  )
})
getDeail()
const showImage = (imgs: string[] | undefined) => {
  imgs && ImagePreview(imgs)
}
const loading = ref(false)
const save = async () => {
  Dialog.confirm({
    message: '验收后不可取消，是否确认现场已没有任何问题？',
    confirmButtonColor: '#5D8AA3'
  }).then(async () => {
    loading.value = true
    try {
      await agree(+id)
      Toast.success('提交成功')
      loading.value = false
      wx.miniProgram.navigateBack()
    } catch {
      loading.value = false
    }
  })
  // loading.value = true
  // try {
  //   await agree(+id)
  //   Toast.success('提交成功')
  //   loading.value = false
  //   wx.miniProgram.navigateBack()
  // } catch {
  //   loading.value = false
  // }
}
</script>
<style lang="scss" scoped>
@import './style/index.scss';
.des {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.3);
}
.empty {
  font-weight: 500;
  font-size: 16px;
  height: 64px;
  line-height: 64px;
  color: rgba(0, 0, 0, 0.3);
  padding-left: 20px;
}
.card {
  .content {
    .result,
    .question.check {
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
</style>
