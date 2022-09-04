<template>
  <div style="padding-top: 1px">
    <van-image
      src="https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/07/18/6ae5ffc1-388b-4b93-860b-c595585040a2.png"
      class="top-image"
    >
      <template v-slot:loading>
        <van-loading type="spinner" size="20" />
      </template>
    </van-image>
  </div>
  <div class="info-container">
    <div class="con-item" @click="clickSelectCity">
      <div class="horizontal-start">
        <div class="item-label">房屋城市</div>
        <div class="item-info" v-if="formState.city">{{ formState.city }}</div>
        <div class="item-info grey" v-else>请选择房屋城市</div>
      </div>
      <div class="item-select"></div>
    </div>
    <div class="con-item">
      <div class="horizontal-start">
        <div class="item-label">姓名</div>
        <div class="item-input">
          <van-field :maxlength="4" v-model.trim="formState.customerName" placeholder="请输入" />
        </div>
      </div>
    </div>
    <div class="con-item">
      <div class="horizontal-start">
        <div class="item-label">手机</div>
        <div class="item-input phone-input">
          <van-field
            :maxlength="11"
            type="number"
            v-model.trim="formState.customerMobile"
            placeholder="仅官方可见，请放心填写"
          />
        </div>
      </div>
    </div>
    <div class="submit-btn" @click="onSubmit">立即预约</div>
  </div>

  <van-image
    src="https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/02/22/8ab1dd8b-f019-42b9-8eee-aebffe37a0e9.png"
    lazy-load
    class="bottom-image"
  >
    <template v-slot:loading>
      <van-loading type="spinner" size="20" />
    </template>
  </van-image>

  <!-- <div class="bottom-tips">
    <div class="tip-line left"></div>
    <div class="tip-word">用心到底</div>
    <div class="tip-line right"></div>
  </div> -->
  <div style="height: 40px"></div>
  <AreaPicker
    v-model:visible="selectCityShow"
    :values="titles"
    @change="change"
    @select="select"
  ></AreaPicker>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import AreaPicker from '@/components/AreaPicker/index.vue'
import type { PickerItem, Values } from '@/components/AreaPicker/index.vue'
import { getProvince, getCity } from '@/api/resources'
import { useRouter, useRoute } from 'vue-router'
import { validateMobile } from '@/utils/validate'
import { Toast } from 'vant'
import { saveCustomerData } from '@/api/save-data'
import type { ISAVEDATATYPE } from '@/api/save-data'
const router = useRouter()
const route = useRoute()

console.log('地址：', window.location.href)

const formState = reactive<ISAVEDATATYPE>({
  customerName: '',
  customerMobile: '',
  provinceCode: route.query?.provinceCode as string,
  provinceName: route.query?.provinceName as string,
  cityCode: route.query?.cityCode as string,
  cityName: route.query?.cityName as string,
  city: ((route.query?.provinceName as string) + route.query?.cityName) as string,
  routeType: route.query.routeType as string, // 1:商城首页 2:商品详情页 3:活动详情页
  refferalSource: route.query.routeType === '3' ? 'ACTIVITY' : 'MALL',
  routeId: route.query.routeId as string, // 商详页进入 传spuId
  referrerId: (route.query.referrerId as string) || undefined // 转介人id
})

const selectCityShow = ref(false)
// 省市区级联选择
const titles = ref<Values[]>([])
const provinces = ref<PickerItem[]>([])

const getProvinceFun = async () => {
  const res = await getProvince()
  provinces.value = res.result.regions
}

// 选择城市
const clickSelectCity = () => {
  selectCityShow.value = true
  if (!titles.value.length) {
    titles.value.push({
      name: '请选择省份',
      code: '-1',
      content: provinces.value
    })
  }
}
const change = (index: number, value: Values[]) => {
  //只保留index个项目
  value.splice(index + 1)
}
const select = async (item: { name: string; code: string }) => {
  // 修改最后一项 添加新的一项
  const last = titles.value.length - 1
  titles.value[last].name = item.name
  titles.value[last].code = item.code
  if (last === 0) {
    const res = await getCity(item.code)
    titles.value.push({
      name: '请选择城市',
      code: '-1',
      content: res.result?.regions
    })
  }
  if (last === 1) {
    selectCityShow.value = false
    formState.provinceCode = titles.value[0].code
    formState.provinceName = titles.value[0].name
    formState.cityCode = titles.value[1].code
    formState.cityName = titles.value[1].name
    formState.city = titles.value[0].name + titles.value[1].name
  }
}

const onSubmit = async () => {
  if (!formState.city) {
    Toast.fail('请选择房屋城市')
    return
  }
  if (!formState.customerName) {
    Toast.fail('请输入姓名')
    return
  }
  if (!formState.customerMobile) {
    Toast.fail('请输入手机号')
    return
  }

  try {
    await validateMobile(formState.customerMobile)
  } catch (error) {
    Toast.fail(String(error))
    return
  }

  const customerId = await saveCustomerData(formState)
  Toast.success('预约成功')
  setTimeout(() => {
    router.push({
      path: '/save-data-success',
      query: {
        customerId,
        routeType: formState.routeType
      }
    })
  }, 1500)
}

// 获取省份列表
getProvinceFun()
</script>
<style lang="scss" scoped>
.top-image {
  z-index: 1;
  width: 100%;
  height: 675px;
}
.bottom-image {
  position: absolute;
  left: 13px;
  top: 420px;
  width: 349px;
  height: 280px;
  border-radius: 12px;
  z-index: 100;
}
.info-container {
  position: absolute;
  left: 13px;
  top: 110px;
  width: 349px;
  height: 300px;
  background: #fff;
  border-radius: 16px;
  box-sizing: border-box;
  padding: 0px 20px 28px 20px;
  z-index: 99;
  .con-item {
    height: 66px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 28px;
    position: relative;
    color: var(--font-color-8);
    font-size: 16px;
    font-weight: 500;
    &::after {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      top: -50%;
      right: -50%;
      bottom: -50%;
      left: -50%;
      border-bottom-width: 1px !important;
      border: 0 solid var(--van-border-color);
      transform: scale(0.5);
    }
    .item-label {
      width: 84px;
    }
    .item-info {
      width: 200px;
      &.grey {
        color: var(--van-text-color-3);
        line-height: 24px;
      }
    }
    .item-input {
      width: 200px;
      .van-cell {
        padding: 0px !important;
        font-size: 16px !important;
      }
    }
    .item-select {
      position: absolute;
      right: 4px;
      top: 56%;
      height: 0px;
      width: 0px;
      border-top: 4px solid var(--font-color-8);
      border-right: 4px solid transparent;
      border-left: 4px solid transparent;
    }
    .phone-input {
      width: 200px;
    }
  }
  .submit-btn {
    width: 100%;
    height: 48px;
    background: var(--theme-color);
    border-radius: 8px;
    text-align: center;
    color: #fff;
    margin-top: 28px;
  }
}

// .bottom-tips {
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//   margin: 0 auto;
//   margin-top: 80px;
//   .tip-line {
//     height: 0.5px;
//     width: 128px;
//     background: var(--line-color);
//     &.left {
//       margin-right: 11px;
//     }
//     &.right {
//       margin-left: 11px;
//     }
//   }
//   .tips-word {
//     color: var(--font-color-3);
//     font-size: 12px;
//   }
// }
</style>
