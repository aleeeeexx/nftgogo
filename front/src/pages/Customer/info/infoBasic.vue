<template>
  <div class="info">
    <div class="external-user">
      <div class="left">
        <img
          :src="externalUser.avatar || formData.avatar || require('@/assets/default_avatar.svg')"
        />
        <div class="left-text">
          <div class="name">
            {{
              externalUser.nickname ||
              formData.nickname ||
              `客户${externalUserId ? externalUserId.slice(-4) : ''}`
            }}
          </div>
        </div>
      </div>
      <div class="right">
        <span class="btn" v-show="readonly" @click="edit">修改</span>
        <span class="btn" v-show="formData.mobile.length === 11 && !readonly" @click="save">
          保存
        </span>
      </div>
    </div>
    <div class="fields">
      <van-field
        ref="name"
        v-model="formData.name"
        label="姓名"
        placeholder="点击修改添加"
        maxlength="20"
        :readonly="readonly"
      />
      <van-field
        v-model="formData.mobile"
        label="手机号"
        placeholder="点击修改绑定"
        maxlength="11"
        type="tel"
        :readonly="readonly"
      />
      <div class="house-section" v-show="showHouse">
        <span class="van-field__label">房屋信息</span>
        <div v-if="list?.length && list[0]" class="field-value">
          <div class="value-btn">
            <span class="value">{{
              list[0].houseCode
                ? list[0].houseName
                : list[0].provinceName +
                  list[0].cityName +
                  list[0].projectName +
                  (list[0].houseName ?? '')
            }}</span>
            <span class="btn" @click="toHouseList">更多</span>
          </div>
          <div class="tag-group">
            <span class="tag" v-show="list[0].houseType">{{ list[0].houseType }}</span>
            <span class="tag" v-show="!!list[0].customerRole">{{
              CustomerRoleList[list[0].customerRole]
            }}</span>
          </div>
        </div>
        <div v-else class="field-value">无</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref, reactive, defineEmits, nextTick } from 'vue'
import type { PropType } from 'vue'
import { useRoute } from 'vue-router'
import { HouseInfoType, getExternalUser, getVisitor, saveVisitor } from '@/api/Customer'
import { CustomerRoleList } from '@/constant/customer'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
const props = defineProps({
  list: Array as PropType<HouseInfoType[]>
})
const router = useRouter()
const toHouseList = () => {
  sessionStorage.setItem('houseInfoList', JSON.stringify(props.list))
  router.push({
    path: '/customerInfoHouse'
  })
}
const route = useRoute()
const externalUserId = route.query.externalUserId as string
console.log('企微userId', externalUserId)
const externalUser = reactive({
  avatar: '',
  nickname: ''
})
const readonly = ref(false)
const showHouse = ref(false)
const formData = reactive({
  name: '',
  mobile: '',
  avatar: '',
  nickname: ''
})
const emit = defineEmits(['updateExternalUser', 'updateForm'])
const getUser = () => {
  getExternalUser(externalUserId).then(res => {
    if (!res?.external_contact) return
    // const { avatar, name } = res?.external_contact?.
    externalUser.avatar = res?.external_contact?.avatar
    externalUser.nickname = res?.external_contact?.name
    console.log('企微user', externalUser)
    emit('updateExternalUser', externalUser)
  })
  getVisitor(externalUserId).then(res => {
    if (!res) return
    if (res.mobile) {
      emit('updateForm', res)
      formData.name = res.name
      formData.mobile = res.mobile
      formData.avatar = res.avatar
      formData.nickname = res.nickname
      readonly.value = true
      showHouse.value = true
    }
  })
}
if (externalUserId) getUser()
const name = ref()
const edit = () => {
  readonly.value = false
  nextTick(() => {
    name.value.focus()
  })
}
const save = async () => {
  if (!/^1[3-9]\d{9}$/.test(formData.mobile)) {
    Toast.fail('请输入正确手机号')
    return
  }
  const pattern =
    /[`~!@#$%^&*()_\-+=<>?:"{}|,.\\/;'\\[\]~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/im
  if (pattern.test(formData.name)) {
    Toast.fail('姓名不可输入特殊字符')
    return
  }
  const { name, mobile, avatar, nickname } = formData
  await saveVisitor({
    externalUserId: externalUserId,
    name,
    mobile,
    avatar: externalUser.avatar || avatar,
    nickname: externalUser.nickname || nickname
  })
  Toast.success('保存成功')
  readonly.value = true
  showHouse.value = true
  emit('updateForm', formData)
}
</script>
<style lang="scss" scoped>
@import './infoBasic.scss';
</style>
