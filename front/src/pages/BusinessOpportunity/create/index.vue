<template>
  <div style="background-color: #fff">
    <div class="title">
      <span>请填写客户姓名与手机号</span>
      <span
        class="oprate"
        @click="showAddContacts = true"
        v-if="!assistContacts.name && !assistContacts.phone"
        >+ 添加辅助联系人</span
      >
    </div>
    <div class="input-box van-hairline--bottom">
      <div class="label">客户姓名</div>
      <van-field v-model.trim="name" label="" placeholder="请输入" :maxlength="10" />
    </div>
    <div class="input-box" :class="{ 'van-hairline--bottom': nickname }">
      <div class="label">手机号</div>
      <van-field v-model.trim="phone" label="" type="tel" placeholder="请输入" :maxlength="11" />
    </div>

    <div class="input-box wechat-container" v-if="nickname">
      <div class="label">企微客户</div>
      <div class="content">
        <div class="flex-row">
          <img class="icon" :src="avatar ? avatar : require('@/assets/default_avatar.svg')" />
          <span class="name">{{ nickname }}</span>
        </div>
        <span
          class="del"
          @click="onDelNickname"
          v-if="queryInfo?.externalUserId && !queryInfo?.mobile && !isBindNickname"
          >清除</span
        >
      </div>

      <div class="wechat-tips">
        <span v-if="isBindNickname">手机号已绑定该客户，若绑定错误，请联系总部运营更改</span>
        <span v-else>提报后，手机号与此客户会绑定，如果提报的不是此客户，请点击“清除”</span>
      </div>
    </div>

    <!-- 辅助联系人 -->
    <div v-if="assistContacts.name || assistContacts.phone">
      <div class="title">
        <span>请填写辅助联系人姓名与手机号</span>
        <span class="oprate" @click="delAssistContact">× 删除</span>
      </div>
      <div class="input-box van-hairline--bottom">
        <div class="label">辅助联系人姓名</div>
        <van-field
          v-model.trim="assistContacts.name"
          label=""
          placeholder="请输入"
          :maxlength="10"
        />
      </div>
      <div class="input-box">
        <div class="label">手机号</div>
        <van-field
          v-model.trim="assistContacts.phone"
          label=""
          type="tel"
          placeholder="请输入"
          :maxlength="11"
        />
      </div>
    </div>
    <!-- 选择地址 -->
    <select-address ref="AddressRef"></select-address>
  </div>

  <div class="intention-type-info">
    <div class="intention-type-container van-hairline--bottom">
      <div class="label">意向类型<span class="des">(选填)</span></div>
      <van-checkbox-group
        direction="horizontal"
        v-model="intentionType"
        class="intention-type"
        checked-color="#5D8AA3"
        @change="onChangeIntention"
      >
        <van-checkbox :name="2">美居</van-checkbox>
        <van-checkbox :name="1">自营</van-checkbox>
      </van-checkbox-group>
    </div>
  </div>

  <div class="info" style="margin-top: 0px">
    <div class="label">意向描述<span class="des">(房屋用途、预算、入住时间、风格)</span></div>
    <van-cell-group inset>
      <van-field
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="100"
        placeholder="请输入"
        show-word-limit
      />
    </van-cell-group>
  </div>

  <div class="recommend-container" style="background-color: #fff">
    <div class="input-box" @click="onSelectRecommend">
      <text class="select">选择</text>
      <div class="label">推荐人<span class="des">(选填)</span></div>
      <van-field
        readonly
        v-model="recommendPerStr"
        label=""
        placeholder="请选择"
        style="width: 90%"
        clearable
      />
    </div>
  </div>

  <FixBar>
    <template #content>
      <div class="foot van-hairline--top">
        <van-button
          type="primary"
          block
          color="#7AB439"
          @click="submit"
          :disabled="!isCanSubmint"
          :loading="loading"
          >提交</van-button
        >
      </div>
    </template>
  </FixBar>

  <van-popup v-model:show="showAddContacts" class="add-contarct-popup-container">
    <div class="addContarct-title-container">
      <span class="addContarct-oprate" @click="showAddContacts = false">取消</span>
      <span class="addContarct-title">添加辅助联系人</span>
      <span class="addContarct-oprate" @click="addAssistContractsConfirm">保存</span>
    </div>
    <div class="tips-container">
      <van-icon name="info" size="16" color="#5D8AA3" class="tips-icon" />
      <span class="tips-det">联系不上客户时，可以联系辅助联系人</span>
    </div>
    <div class="input-box van-hairline--bottom">
      <div class="label">姓名</div>
      <van-field
        v-model.trim="assistContactsForm.name"
        label=""
        placeholder="请输入"
        :maxlength="10"
        autofocus
      />
    </div>
    <div class="input-box van-hairline--bottom">
      <div class="label">手机号</div>
      <van-field
        v-model.trim="assistContactsForm.phone"
        label=""
        type="tel"
        placeholder="请输入"
        :maxlength="11"
      />
    </div>
  </van-popup>
</template>
<script lang="ts" setup>
import SelectAddress from './SelectAddress.vue'
import type { IADDRESS } from './SelectAddress.vue'
import type { ListItem } from '../SelectRecommend.vue'
import { computed, ref, reactive, watch, inject, onActivated } from 'vue'
import FixBar from '@/components/FixBar/index.vue'
import { reportBusiness, getVisitorByMobile } from '@/api/BusinessReport'
import { useStore } from 'vuex'
import { User } from '@/store/user'
import { Toast, Dialog } from 'vant'
import wx from 'jweixin-1.6.0'
import { useRouter, useRoute } from 'vue-router'
import { useLogin } from '@/utils/pulin-login'
import store from '@/store/index'
const router = useRouter()
const route = useRoute()
const reloadPage = inject('onRefresh') as Function

const userInfo = useStore().state as { user: User }

// 是否是朴邻进入
let isPulin = !!route.query.isPulin

const pulinLogin = async () => {
  if (!isPulin) {
    isPulin = await useLogin(
      route.query.accessToken as string,
      route.query.companyCode as string,
      route.path as string
    )
  }
  store.commit('setIsPulin', isPulin)
}
pulinLogin()

const loading = ref(false)
const message = ref('')

// 客服进来的参数，以缓存的形式
interface IQUERYINFO {
  mobile?: string
  nickname?: string
  externalUserId?: string
  avatar?: string
  name?: string
}
const timeStamp = ref(route.query.t as string)
onActivated(() => {
  if (timeStamp.value !== route.query.t) {
    reloadPage()
  }
})

const queryInfo =
  route.query.fromVisitor === '1' && sessionStorage.getItem('externalUser')
    ? (JSON.parse(sessionStorage.getItem('externalUser') as string) as IQUERYINFO)
    : {}

// 企微客户
const name = ref(queryInfo?.name || '')
const phone = ref(queryInfo?.mobile || '') // 手机号
const nickname = ref<undefined | string>(queryInfo?.nickname || undefined)
const externalUserId = ref<undefined | string>(queryInfo?.externalUserId || undefined)
const avatar = ref<undefined | string>(queryInfo?.avatar || undefined)
const isBindNickname = ref(false) // 是否已经绑定了访客信息
if (queryInfo?.mobile && queryInfo?.externalUserId) {
  isBindNickname.value = true
}
// 如果没有名字，有id，拼接
if (!queryInfo?.nickname && queryInfo.externalUserId) {
  nickname.value = `客户${queryInfo?.externalUserId.slice(-4)}`
}
// 意向类型
const intentionType = ref<number[]>([])

const onChangeIntention = (select: number[]) => {
  if (select.length === 2) {
    select.shift()
    intentionType.value = select
  }
}
// 地址ref
const AddressRef = ref<IADDRESS | null>(null)
const isCanSubmint = computed(() => {
  return (
    name.value &&
    phone.value &&
    AddressRef.value?.community &&
    AddressRef.value?.project.name &&
    message.value
  )
})

const submit = async () => {
  if (phone.value.length !== 11) {
    Toast.fail('请输入正确的客户手机号')
    return
  }
  if (assistContacts.phone && assistContacts.phone.length !== 11) {
    Toast.fail('请输入正确的辅助人手机号')
    return
  }
  if (
    (assistContacts.name && !assistContacts.phone) ||
    (!assistContacts.name && assistContacts.phone)
  ) {
    Toast.fail('请完善辅助人信息')
    return
  }
  const data = {
    referrerMobile: isPulin
      ? (localStorage.getItem('mobile') as string)
      : userInfo.user.info?.mobile,
    referrerId: isPulin ? (localStorage.getItem('userId') as string) : userInfo.user.info?.id,
    intentionDescription: message.value,
    customerName: name.value,
    customerMobile: phone.value,
    provinceCode: AddressRef.value?.titles[0].code,
    provinceName: AddressRef.value?.titles[0].name,
    cityCode: AddressRef.value?.titles[1].code,
    cityName: AddressRef.value?.titles[1].name,
    projectCode: AddressRef.value?.project.code,
    projectName: AddressRef.value?.project.name,
    buildingCode: AddressRef.value?.isInputHouse
      ? ''
      : AddressRef.value?.houseList[0]?.code === '-1'
      ? ''
      : AddressRef.value?.houseList[0]?.code,
    buildingName: AddressRef.value?.isInputHouse
      ? ''
      : AddressRef.value?.houseList[0]?.code === '-1'
      ? ''
      : AddressRef.value?.houseList[0]?.name,
    houseCode: AddressRef.value?.isInputHouse ? '' : AddressRef.value?.houseList[1]?.code,
    houseName: AddressRef.value?.isInputHouse
      ? AddressRef.value?.home
      : AddressRef.value?.houseList[1]?.name,
    contractMobile: assistContacts.phone, // 辅助联系人
    contractName: assistContacts.name,
    intentionType: intentionType.value.join(''), //意向类型
    recommonderName: recommendPer.value?.name, // 推荐人姓名
    recommonderMobile: recommendPer.value?.mobile, // 推荐人手机号
    recommonderOganization: recommendPer.value?.organization, // 推荐人手机号
    recommonderRoleCode: recommendPer.value?.positionCode, // 推荐人角色
    externalUserId:
      queryInfo?.externalUserId && !queryInfo?.mobile ? queryInfo?.externalUserId : undefined, // 微信id
    nickname: queryInfo?.externalUserId && !queryInfo?.mobile ? queryInfo?.nickname : undefined, // 微信昵称
    avatar: queryInfo?.externalUserId && !queryInfo?.mobile ? queryInfo?.avatar : undefined, // 微信头像
    referralSource: isPulin ? 'visitorreferral' : 'meiju', // 转介来源: 从朴邻访客提报进来的值为visitorreferral，默认值为meiju
    fromAppId: isPulin ? 1 : 2, // 这里用来区分从哪提交进来的：1.朴邻，2.美居
    companyCode: localStorage.getItem('companyCode') as string, // 城市公司
    token: localStorage.getItem('pulin_token') as string // 朴邻token
  }
  loading.value = true
  try {
    const res = await reportBusiness(data)
    if (res.code === -1 && isPulin)
      return router.replace({
        path: '/mobile-login',
        query: {
          mobile: localStorage.getItem('mobile'),
          redirect: encodeURIComponent(route.path)
        }
      })
    Toast.success('感谢您提报，该客户将会被及时跟进')
    sessionStorage.removeItem('externalUser')
    route.params.submitRecommend = ''
    loading.value = false

    setTimeout(() => {
      Toast.clear()
      if (isPulin) return history.back()
      // 非客服进来，直接退出
      !route.query.fromVisitor &&
        wx.miniProgram.getEnv(res => {
          if (res.miniprogram) {
            wx.miniProgram.navigateBack()
          }
        })
      // 从客服进来刷新页面
      route.query.fromVisitor === '1' && reloadPage()
    }, 1000)
  } catch {
    loading.value = false
  }
}

// 添加辅助联系人弹窗
const showAddContacts = ref(false)
const assistContacts = reactive({
  name: '',
  phone: ''
})
const assistContactsForm = reactive({
  name: '',
  phone: ''
})

// 提交添加辅助联系人
const addAssistContractsConfirm = () => {
  if (assistContactsForm.phone.length < 11) {
    Toast.fail('请输入正确的手机号')
    return
  }
  if (!assistContactsForm.name || !assistContactsForm.phone) {
    Toast.fail('请完善联系人信息')
    return
  }

  assistContacts.name = assistContactsForm.name
  assistContacts.phone = assistContactsForm.phone
  assistContactsForm.name = ''
  assistContactsForm.phone = ''
  Toast.success('添加成功')
  showAddContacts.value = false
}

// 删除辅助联系人
const delAssistContact = () => {
  Dialog.confirm({
    message: '是否删除辅助联系人信息?',
    confirmButtonText: '确定',
    closeOnClickOverlay: true,
    className: 'del-confirm-dialog'
  })
    .then(() => {
      assistContacts.name = ''
      assistContacts.phone = ''
      Toast.success({
        message: '删除成功',
        duration: 2000
      })
    })
    .catch(() => {})
}

// 推荐人信息
const recommendPer = ref<ListItem>()
// 推荐人字段回填
const recommendPerStr = ref('')
// 跳转选择推荐人
const onSelectRecommend = () => {
  router.push({
    path: '/selectRecommend',
    query: {}
  })
}
watch(
  () => route.params.submitRecommend,
  val => {
    if (val && val !== 'null' && val !== 'undefined') {
      recommendPer.value = JSON.parse(String(val)) as ListItem
      recommendPerStr.value = (recommendPer.value?.name + ' ' + recommendPer.value?.mobile)
        .replace('undefined', '')
        .replace('null', '')
    }
  },
  {
    deep: true,
    immediate: true
  }
)

// 输入到11位触发
watch(
  () => phone.value,
  (val: string) => {
    if (val.length === 11) {
      loadVisitorByMobile()
    }
  }
)
// 加载手机信息
const loadVisitorByMobile = async () => {
  if (route.query.fromVisitor === '1') {
    const result = await getVisitorByMobile(phone.value)
    if (result && result?.externalUserId) {
      // 有企微信息
      nickname.value = result?.nickname
      avatar.value = result?.avatar
      externalUserId.value = result?.externalUserId // 仅作展示
      isBindNickname.value = true
      // 如果有id但没有昵称拼接
      if (!result?.nickname && result?.externalUserId) {
        nickname.value = `客户${externalUserId.value.slice(-4)}`
      }
    } else {
      nickname.value = undefined
      avatar.value = undefined
      isBindNickname.value = false
      // 只有昵称，没有手机号，如果没有加载到需要回填
      if (queryInfo?.externalUserId && !queryInfo?.mobile) {
        nickname.value = queryInfo?.nickname
        avatar.value = queryInfo?.avatar
        // 如果连昵称都没有，则拼接
        if (!queryInfo?.nickname) {
          nickname.value = `客户${queryInfo?.externalUserId.slice(-4)}`
        }
      }
    }
  }
}
// 清除企微消息
const onDelNickname = () => {
  // 点击清除，彻底清除缓存
  queryInfo.nickname = ''
  queryInfo.externalUserId = ''
  queryInfo.avatar = ''
  queryInfo.mobile = ''

  nickname.value = undefined
  avatar.value = undefined
  externalUserId.value = undefined

  isBindNickname.value = false
}
if (queryInfo?.mobile && !queryInfo?.nickname) {
  // 有手机号但没昵称，调用获取一下
  loadVisitorByMobile()
}
</script>
<style lang="scss" scoped>
@import './create.scss';
</style>
<style lang="scss">
@import './addContarct.scss';
</style>
