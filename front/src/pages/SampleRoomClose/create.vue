<template>
  <div style="padding-top: 1px" v-if="detail.viewFlag">
    <div class="card-title" v-if="detail.problemVoList.length">
      <span>问题跟进 {{ doneProblemCount }}/{{ detail.problemVoList.length }}</span>
    </div>
    <div @click="goHandle" v-if="detail.problemVoList.length">
      <Pancel title="验房遗留问题跟进" content="记录" />
    </div>
    <div class="card-title">
      <span>样板间撤场验收记录</span>
    </div>
    <div @click="goSpace">
      <Pancel title="样板间验房" content="修改" />
    </div>
    <div class="card" @click="goReturn">
      <div class="header header-text headerEdit">
        <span>归还物品</span>
        <div class="link">
          <span class="content">修改</span>
          <van-icon name="arrow" class="logo" color="#B2B2B2" />
        </div>
      </div>

      <div v-if="thingVoList.length">
        <div class="content" v-for="(item, index) in thingVoList" :key="index">
          <div class="result">
            <div class="title">{{ item.project }}</div>
            <div class="name">数量x{{ item.num }}, {{ item.status === 0 ? '待还' : '已还' }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="card1">
      <div class="header">水电读数</div>
      <div class="body">
        <div class="input-box" v-for="(item, index) in detail.costVoList" :key="index">
          <div class="label">
            {{ item.project }}<span class="des">({{ item.project === '水费' ? '吨' : '度' }})</span>
          </div>
          <van-field
            v-model="item.degree"
            label=""
            type="number"
            placeholder="请输入当前读数"
            :ref="`input${index}`"
          />
          <div class="right">
            <span class="fix" @click="focusInput(index)">修改</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div style="padding-top: 1px" v-if="!detail.viewFlag">
    <div class="card1" @click="goSpace">
      <div class="content">
        <div class="question">
          <div class="title">样板间验房</div>
          <div class="name">选择需要验收的空间部位，并记录验收结果</div>
          <van-icon name="arrow" class="logo" color="#B2B2B2" />
        </div>
      </div>
    </div>
    <div class="card1" @click="goReturn">
      <div class="content">
        <div class="question">
          <div class="title">归还物品</div>
          <div class="name">点击输入需要在撤场前归还的物品</div>
          <van-icon name="arrow" class="logo" color="#B2B2B2" />
        </div>
      </div>
    </div>
    <div class="card1">
      <div class="header">水电读数</div>
      <div class="body">
        <div class="input-box" v-for="(item, index) in detail.costVoList" :key="index">
          <div class="label" :class="index !== 0 ? 'van-hairline--top' : ''">
            {{ item.project }}<span class="des">({{ item.project === '水费' ? '吨' : '度' }})</span>
          </div>
          <van-field v-model="item.degree" label="" type="number" placeholder="请输入当前读数" />
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
          :disabled="!isCanSubmit"
          @click="save"
          :loading="loading"
          >同步业主查看</van-button
        >
      </div>
    </template>
  </FixBar>
</template>
<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import FixBar from '@/components/FixBar/index.vue'
import { useRouter, useRoute } from 'vue-router'
import { getDetail, IDetail, saveMoney, IMoney } from '@/api/SampleRoomClose'
import { Toast } from 'vant'
import { useStore } from 'vuex'
import wx from 'jweixin-1.6.0'
import Pancel from './components/pancel/index.vue'
const router = useRouter()
const route = useRoute()
const store = useStore()
const id = route.query.id as string
let detail = reactive<IDetail>({
  costVoList: [],
  problemVoList: [],
  spaceVoList: [],
  thingVoList: [],
  viewFlag: 0 //是否已经同步过
})
const thingVoList = computed(() => detail.thingVoList.filter(item => item.num > 0))
const getInfo = async () => {
  const res = await getDetail(+id)
  detail.costVoList = res.costVoList
  detail.spaceVoList = res.spaceVoList
  detail.problemVoList = res.problemVoList
  detail.thingVoList = res.thingVoList
  detail.viewFlag = res.viewFlag
  store.commit('setSampleInfo', res)
  init()
}
const init = () => {
  // 初始化水费电费
  console.log(detail)
  if (!detail.costVoList.length) {
    detail.costVoList = [
      {
        degree: '',
        project: '水费'
      },
      {
        degree: '',
        project: '电费'
      }
    ]
  }
}
const input0 = ref<HTMLElement | null>(null)
const input1 = ref<HTMLElement | null>(null)
const focusInput = (index: number) => {
  index === 0 && input0.value?.focus()
  index === 1 && input1.value?.focus()
}
getInfo()
const goSpace = () => {
  router.push({ path: '/SampleRoomCloseSpace', query: route.query })
}
const goHandle = () => {
  router.push({ path: '/SampleRoomCloseHandle', query: route.query })
}
const goReturn = () => {
  router.push({ path: '/SampleRoomCloseReturn', query: route.query })
}
const isCanSubmit = computed(() => {
  return detail.costVoList.every(item => item.degree)
})
const doneProblemCount = computed(() => {
  return detail.problemVoList.filter(item => item.result && item.result.status).length
})
const loading = ref(false)
const save = async () => {
  const data: IMoney[] = detail.costVoList.map(item => {
    return {
      ...item,
      sampleRoomId: +id,
      type: 3
    }
  })
  loading.value = true
  try {
    await saveMoney(data)
    loading.value = false
    Toast.success('提交成功')
    wx.miniProgram.navigateBack()
  } catch {
    loading.value = false
  }
}
</script>
<style lang="scss" scoped>
@import './style/index.scss';
.van-cell {
  padding-left: 20px;
}
.headerEdit {
  display: flex;
  justify-content: space-between;
  .link {
    margin-right: 20px;
    .logo {
      margin-left: 6px;
      font-size: 16px;
    }
  }
  :last-child {
    font-size: 14px;
    line-height: 20px;
    color: #5d8aa3;
    font-weight: normal;
  }
}
.header-text {
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.85) !important;
}
.card1 {
  width: 335px;
  margin: 10px auto;
  background: #fff;
  border-radius: 8px;
  .header {
    height: 56px;
    box-sizing: border-box;
    padding-left: 17px;
    padding-top: 25px;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.85);
  }
  .pancel {
    height: 97px;
  }
  .content {
    height: 97px;
    .question {
      height: 97px;
      padding-left: 20px;
      position: relative;
      box-sizing: border-box;
      padding-top: 28px;
      padding-bottom: 28px;
      .title {
        @include title-text();
      }
      .name {
        margin-top: 2px;
        @include name-text();
      }
      .logo {
        right: 20px;
        position: absolute;
        top: 40px;
      }
    }
  }
  .body {
    .input-box {
      box-sizing: border-box;
      height: 72px;
      position: relative;
      .label {
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        margin-left: 20px;
        color: #666666;
      }
      .right {
        position: absolute;
        right: 20px;
        top: 44px;
        display: flex;

        align-items: center;
        .fix {
          font-size: 14px;
          line-height: 20px;
          color: #5d8aa3;
        }
        .logo {
          margin-left: 6px;
        }
      }
      .des {
        color: rgba(0, 0, 0, 0.3);
      }
    }
  }
}
</style>
