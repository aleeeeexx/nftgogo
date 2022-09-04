<template>
  <!-- <div class="login" style="padding-top: 1px">
    <div class="login-container">
      <p>美居H5</p>
      <van-button @click="login" type="primary">登录</van-button>
      <van-button @click="clickSelectRole" type="primary">选择角色</van-button>
    </div>
  </div>

  <van-popup v-model:show="selectRoleShow" round position="bottom">
    <van-cascader
      v-model="selectRole"
      title="选择角色"
      :options="roleOptions"
      @close="selectRoleShow = false"
      @finish="onFinish"
    />
  </van-popup> -->
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="phone"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
      />
      <van-field
        v-model="catpacha"
        type="password"
        name="验证码"
        label="验证码"
        placeholder="验证码"
        :rules="[{ required: true, message: '请输入验证码' }]"
      >
        <template #button>
          <van-button size="small" type="primary" :disabled="timer > 0" @click="sendCode"
            >timer</van-button
          >
        </template></van-field
      >
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit"> 提交 </van-button>
    </div>
  </van-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// import store from '@/store/index'
// import { getUserInfo } from '@/api/user'
// import * as url from '@/api/url'
let timer = ref(0)
// let counter = null
// const timer = computed(() => {
// })
// 登录逻辑
const phone = ref('')
const catpacha = ref('')
const onSubmit = values => {
  console.log('submit', values)
}
const sendCode = () => {
  timer.value = 60
  // counter = setInterval(() => timer.value--, 1000)
}
</script>

<style lang="scss" scoped></style>
