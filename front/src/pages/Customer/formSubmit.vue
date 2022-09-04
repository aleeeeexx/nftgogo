<template>
  <div class="form-field-grey">
    <p v-if="pageType === 'closeForwardRecord'">
      提交结束跟进原因后，将由中央客服/操盘手复核你提交的的关闭线索
    </p>
    <van-field
      v-model.trim="inputValue"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入"
      show-word-limit
      autofocus
    />
  </div>
  <div
    class="submit-btn success"
    :class="{ success: inputValue, error: !inputValue }"
    @click="onSubmit"
  >
    提交
  </div>
</template>
<script lang="ts" setup>
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { Toast } from 'vant'
import { UpdateFollow } from '@/api/Customer'

const route = useRoute()
const router = useRouter()

const inputValue = ref('')

// 根据页面类型设置title
const pageType = route.query.pageType as string
document.title = {
  addForwardRecord: '添加跟进记录',
  closeForwardRecord: '结束跟进原因',
  valid: '填写无效原因'
}[pageType] as string

const customerId = JSON.parse(route.query.customerId as string)
let showFollow = false //如果是添加跟进记录成功，返回后需要切换tab到跟进记录

const onSubmit = async () => {
  if (inputValue.value) {
    await UpdateFollow({
      type: {
        addForwardRecord: 2,
        closeForwardRecord: 4,
        valid: 1
      }[pageType] as number,
      customerId: customerId,
      content: inputValue.value,
      valid: pageType === 'valid' ? 0 : undefined,
      referralId: route.query.referralId as string
    })
    Toast.success('操作成功')
    if (pageType !== 'valid') {
      showFollow = true
    }
    setTimeout(() => {
      router.go(-1)
    }, 2000)
  }
}

const appBox = document.getElementById('app')
appBox && appBox.setAttribute('style', 'background:#ffffff')
onBeforeRouteLeave(to => {
  appBox && appBox.setAttribute('style', 'background:#f9f9f9')
  to.params.change = showFollow ? 'follow' : 'house'
})
</script>

<style lang="scss" scoped>
.form-field-grey {
  padding-top: 8px;
  p {
    margin: 20px;
    font-size: 14px;
    color: var(--font-color-6);
  }
  .van-cell {
    width: calc(100% - 40px);
    margin: 0 auto;
    background: rgba(155, 158, 163, 0.08);
    border-radius: 8px;
  }
}
</style>
