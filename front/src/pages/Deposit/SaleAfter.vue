<template>
  <div class="info">
    <div class="label">申请原因<span class="des"></span></div>
    <van-cell-group inset>
      <van-field
        v-model="message"
        rows="1"
        autosize
        type="textarea"
        maxlength="30"
        placeholder="请输入"
        show-word-limit
      />
    </van-cell-group>
  </div>
  <div class="money">
    <div class="name">申请金额</div>
    <div class="price">￥{{ money }}</div>
  </div>
  <div class="foot">
    <van-button
      type="primary"
      block
      color="#7AB439"
      :disabled="!canSubmit"
      @click="submit"
      :loading="loading"
      >提交</van-button
    >
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { setDepositReturn } from '@/api/deposit'
import { Toast } from 'vant'
import wx from 'jweixin-1.6.0'

const route = useRoute()
const router = useRouter()
const id = route.query.id as string
const message = ref('')
const money = route.query.money as string
const loading = ref(false)
const canSubmit = computed(() => id && message.value && money)
const submit = async () => {
  const data = {
    orderId: +id,
    reason: message.value,
    returnAmount: +money
  }

  try {
    await setDepositReturn(data)
    Toast.success('提交成功')
    loading.value = false
    setTimeout(() => {
      wx.miniProgram.getEnv(res => {
        console.log(res.miniprogram)
        if (res.miniprogram) {
          wx.miniProgram.navigateBack()
        } else {
          router.back()
        }
      })
    }, 1000)
  } catch {
    loading.value = false
  }
}
</script>
<style lang="scss">
.money {
  height: 72px;
  box-sizing: border-box;
  padding: 12px 20px;
  background-color: #fff;
  .name {
    font-size: 14px;
    line-height: 20px;
    color: rgba(0, 0, 0, 0.6);
  }
  .price {
    font-weight: 500;
    font-size: 17px;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.85);
    margin-top: 4px;
  }
}
.info {
  margin-top: 10px;
  background-color: #fff;
  padding: 12px 0;
  .label {
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    color: #666666;
    margin-bottom: 8px;
    margin-left: 20px;
    .des {
      color: rgba(0, 0, 0, 0.3);
    }
  }
  .van-cell {
    background-color: #f6f7f7;
  }
}
.foot {
  width: 335px;
  margin-left: 20px;
  margin-top: 30px;
  .van-button {
    border-radius: 22px;
  }
}
</style>
