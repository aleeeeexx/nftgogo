<template>
  <div class="info-show-title" v-if="pageType === 'edit'">
    <span class="left">客户信息</span>
  </div>
  <div class="info-form-select-container">
    <div class="info-form-select">
      <div class="label">
        <span>姓名</span>
        <span class="error">{{ error.name }}</span>
      </div>
      <div class="item">
        <van-field
          v-model.trim="formData.name"
          maxlength="5"
          placeholder="请输入"
          @update:model-value="checkName(formData.name)"
        />
      </div>
    </div>
    <div class="info-form-select">
      <div class="label">
        <span>手机号</span>
        <span class="error">{{ error.mobile }}</span>
      </div>
      <div class="item">
        <van-field
          v-model.trim="formData.mobile"
          type="number"
          maxlength="11"
          placeholder="请输入"
          @update:model-value="checkMobile(formData.mobile)"
        />
      </div>
    </div>

    <div class="info-form-select" @click="showIdentityPicker = true">
      <div class="label">身份</div>
      <div class="item">
        <span
          class="val"
          :class="{
            noSelect: !formData.customerRole && formData.customerRole !== 0
          }"
          >{{
            formData.customerRole || formData.customerRole === 0
              ? CustomerRoleList[formData.customerRole]
              : '请选择'
          }}</span
        >
        <span class="select">选择</span>
      </div>
    </div>
  </div>

  <FixBar>
    <template #content>
      <div class="operate-bottom">
        <van-button class="operate-button" @click="onSubmit()" :disabled="!isCanSubmint">
          提交
        </van-button>
      </div>
    </template>
  </FixBar>

  <van-popup v-model:show="showIdentityPicker" round position="bottom">
    <van-picker
      cancel-button-text=""
      title="请选择身份"
      :columns="identityColumns"
      @confirm="identityOnConfirm"
    />
  </van-popup>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { Toast, Dialog } from 'vant'
import { CustomerRoleList } from '@/constant/customer'
import { saveHouseMember, checkCustomerExist } from '@/api/Customer'
import FixBar from '@/components/FixBar/index.vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const pageType = route.query.pageType as string
document.title = { add: '添加成员', edit: '编辑成员' }[pageType] as string

const error = reactive({
  name: '',
  mobile: ''
})
const formData = reactive({
  name: '',
  mobile: '',
  customerRole: 99
})
const checkName = (val: string) => {
  if (val.includes('先生') || val.includes('女士')) {
    error.name = '请填写客户的实名信息'
    return false
  }
  error.name = ''
  return true
}
const checkMobile = (val: string) => {
  if (!/^1[3-9]\d{9}$/.test(val)) {
    error.mobile = '请输入正确的手机号'
    return false
  }
  error.mobile = ''
  return true
}
const houseCode = route.query.houseCode
const onSubmit = async () => {
  const data = { ...formData, houseCode }
  await console.log('ssss', data)
  const result = await checkCustomerExist(data)
  if (result) {
    Dialog.confirm({
      message: `检测到系统存在此客户(${result.name || ''} ${
        result.mobile || ''
      })，是否将客户关联当前房屋？`,
      confirmButtonText: '确定关联',
      cancelButtonText: '暂不关联',
      closeOnClickOverlay: true,
      className: 'del-confirm-dialog'
    })
      .then(async () => {
        await saveHouseMember(data)
        Toast.success('保存成功')
        setTimeout(() => {
          router.go(-1)
        }, 2000)
      })
      .catch(() => {})
  } else {
    Toast.success('保存成功')
    setTimeout(() => {
      router.go(-1)
    }, 2000)
  }
}
const isCanSubmint = computed(() => {
  return (
    formData.name &&
    formData.mobile &&
    checkName(formData.name) &&
    checkMobile(formData.mobile) &&
    formData.customerRole !== 99
  )
})

const showIdentityPicker = ref(false)
let identityColumns = ref<string[]>([])
Object.keys(CustomerRoleList).forEach(key => {
  identityColumns.value.push(CustomerRoleList[key])
})
const identityOnConfirm = (value: string, index: number) => {
  showIdentityPicker.value = false
  formData.customerRole = index
}
</script>

<style lang="scss" scoped>
.input-box {
  box-sizing: border-box;
  height: 67px;
  padding: 0 20px;
  position: relative;
  background: #fff;
  margin-bottom: 10px;
  .select {
    position: absolute;
    right: 0;
    line-height: 20px;
    font-weight: 500;
    font-size: 14px;
    color: #5d8aa3;
    bottom: 14px;
    right: 20px;
    z-index: 1;
  }
  .label {
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    color: #666666;
  }
  .van-cell {
    line-height: 24px;
    padding-top: 0px;
    font-size: 17px;
    padding-left: 0;
    padding-right: 38px;
  }
}
.info-form-select {
  .label {
    display: flex;
    justify-content: space-between;
  }
  .error {
    color: #ff4d4f;
  }
}
</style>
