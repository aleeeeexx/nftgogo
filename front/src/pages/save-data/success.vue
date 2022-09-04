<template>
  <div class="success-tips-container">
    <img
      src="https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/02/14/2975bc91-ccff-4037-a61d-e1141b989e2a.png"
      class="tips-icon"
    />
    <div class="tips-title">预约成功</div>
    <div class="tips-tip">5S完善你的装修需求，便于顾问和你沟通</div>
  </div>
  <div class="steps-container submit-steps">
    <div class="steps-item all-item active">
      <div class="title">现在处于什么装修阶段？</div>
      <div class="flex-row select-con">
        <div
          class="select-item"
          :class="{ active: select1 === item, normal: select1 !== item }"
          v-for="(item, index) in FIXTURE_STATUS_LIST"
          :key="index"
          @click="select1 = item"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="steps-item all-item active">
      <div class="title">想咨询什么内容？(多选)</div>
      <div class="flex-row select-con">
        <div
          class="select-item"
          :class="{ active: select2.includes(item), normal: !select2.includes(item) }"
          v-for="(item, index) in CUSTOMER_LIST"
          :key="index"
          @click="addAdviceContent(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
  <div class="form-field-grey">
    <van-field
      v-model.trim="otherInfo"
      rows="2"
      autosize
      type="textarea"
      maxlength="30"
      placeholder="在此输入想要咨询的其它内容"
      show-word-limit
    />
  </div>
  <div style="height: 60px"></div>
  <!-- 操作 -->
  <FixBar bgColor="#fff">
    <template #content>
      <div class="operate-bottom fix-operate">
        <van-button class="operate-button" @click="onSubmit">确认</van-button>
      </div>
    </template>
  </FixBar>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import FixBar from '@/components/FixBar/index.vue'
import { saveAdviceContent } from '@/api/save-data'
import { FIXTURE_STATUS_LIST, CUSTOMER_LIST } from '@/constant/save-data'
import { useRoute } from 'vue-router'
import { Toast } from 'vant'
import wx from 'jweixin-1.6.0'
const route = useRoute()
const select1 = ref('')
const select2 = ref<string[]>([])
const otherInfo = ref('') //其它咨询信息

const onSubmit = async () => {
  await saveAdviceContent({
    fixtureStatus: select1.value,
    customerId: route.query.customerId as string,
    adviceContent: select2.value.join(','),
    otherInfo: otherInfo.value
  })
  Toast.success('提交成功，万物研选顾问将在24h内联系你')
  setTimeout(() => {
    wx.miniProgram.getEnv(res => {
      if (res.miniprogram) {
        if (route.query.routeType === '4') {
          wx.miniProgram.switchTab({
            url: '/pages/new-index/index'
          })
        } else {
          wx.miniProgram.navigateBack()
        }
      }
    })
  }, 1000)
}

const addAdviceContent = (name: string) => {
  let flag = true
  select2.value.forEach(item => {
    if (item === name) {
      flag = false
      return
    }
  })
  if (flag) select2.value.push(name)
  if (!flag) {
    select2.value = select2.value.filter(item => item !== name)
  }
}

const appBox = document.getElementById('app')
appBox && appBox.setAttribute('style', 'background:#ffffff')
onBeforeRouteLeave(() => {
  appBox && appBox.setAttribute('style', 'background:#f9f9f9')
})
</script>
<style lang="scss" scoped>
.success-tips-container {
  width: 100%;
  height: 196px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  .tips-icon {
    width: 40px;
    height: 40px;
    padding-top: 28px;
  }
  .tips-title {
    color: var(--font-color-8);
    font-size: 20px;
    line-height: 20px;
    margin-top: 20px;
  }
  .tips-tip {
    max-width: 335px;
    text-align: center;
    font-size: 14px;
    line-height: 20px;
    color: var(--font-color-6);
    margin-top: 16px;
  }
}

.submit-steps {
  margin-top: 28px;
  overflow: hidden;
  .steps-item {
    border: none !important;
    background: none !important;
    width: 100% !important;
    padding: 14px 6px !important;
    .title {
      margin-top: -2px;
    }
  }
  .select-con {
    margin-top: 20px;
  }
  .select-item {
    padding: 8px 12px;
    box-sizing: border-box;
    border-radius: 18px;
    margin-right: 12px;
    font-size: 12px;
    line-height: 12px;
    &.active {
      background: rgba(122, 180, 57, 0.1);
      border: 1px solid #7ab439;
      color: var(--theme-color);
    }
    &.normal {
      padding: 9px 13px;
      background: #f2f2f7;
      color: var(--font-color-8);
    }
  }
}

.form-field-grey {
  padding-top: 8px;
  .van-cell {
    width: calc(100% - 40px);
    margin: 0 auto;
    background: rgba(155, 158, 163, 0.08);
    border-radius: 8px;
  }
}
.fix-operate {
  box-shadow: none;
}
</style>
