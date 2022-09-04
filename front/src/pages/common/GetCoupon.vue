<template>
  <div style="background-color: #f2ffd7; height: 100vh">
    <div class="img">
      <div class="title">
        <span style="font-size: 30px">￥</span>
        <span>{{ money }}</span>
      </div>
      <div class="des">
        <span>*限指定商品</span>
      </div>
      <!-- <div class="time">有效期至{{ time }}</div> -->
      <div class="btn" @click="getCoupon">立即领取</div>
      <img :src="bgUrl" class="bg" />
    </div>
  </div>
  <van-overlay :show="show" @click="show = false">
    <div class="overlay" @click="clickModal">
      <div class="modal">
        <div class="title">您已成功领取优惠券</div>
        <div class="des">请联系美居小助手使用</div>
        <img :src="couponImg" class="qr" />
        <div class="des" v-if="isWechat">长按识别，加微咨询</div>
        <div class="des" v-else>截图保存此二维码，进入微信识别</div>
      </div>
    </div>
  </van-overlay>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { Overlay as VanOverlay } from 'vant'
import { ref, computed } from 'vue'
import { coupon, couponInfo } from '@/api/coupon'

const route = useRoute()
console.log('query参数', route.query)
const show = ref(false)
const getCoupon = async () => {
  await coupon(route.query.beianNo as string)
  show.value = true
}
const clickModal = (e: Event) => {
  e.stopPropagation()
}
const isWechat = computed(() => {
  const ua = navigator.userAgent.toLowerCase()
  return ua.indexOf('micromessenger') !== -1
})
const money = ref(0)
const time = ref('')
const getInfo = async () => {
  const info = await couponInfo()
  money.value = info.result.discount
  time.value = info.result.endTime
}
getInfo()
const couponImg =
  'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/01/13/1dc4f2ca-168d-4f45-ba86-260b02ca44f9.png'

const bgUrl =
  'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2021/12/09/6b3395c8-e91b-4e46-af62-46bad89f8ca8.png?x-oss-process=image/quality,q_80/format,jpg'
</script>
<style lang="scss">
.img {
  position: relative;

  .bg {
    width: 100vw;
  }
  .title {
    position: absolute;
    font-size: 80px;
    font-weight: 500;
    right: 60px;
    top: 185px;
  }
  .des {
    position: absolute;
    font-size: 20px;
    right: 65px;
    top: 275px;
  }
  .btn {
    display: inline;
    position: absolute;
    padding: 10px 20px;
    border-radius: 60px;
    background-color: yellow;
    right: 70px;
    font-weight: 500;
    top: 340px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    animation: scaleDrew 2.5s ease-in-out infinite;
  }

  .time {
    right: 50px;
    top: 390px;
    position: absolute;
  }
}
@keyframes scaleDrew {
  /* 定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称 */
  0% {
    transform: scale(1);
  }

  25% {
    transform: scale(1.2);
  }

  50% {
    transform: scale(1);
  }

  75% {
    transform: scale(1.2);
  }
}
.overlay {
  z-index: 100;
  .modal {
    display: flex;
    flex-direction: column;
    width: 325px;
    border-radius: 16px;
    background-color: #fff;
    padding: 16px;
    text-align: center;
    align-items: center;
    box-sizing: border-box;
    margin-top: 210px;
    margin-left: 20px;
    .title {
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
      color: rgba(0, 0, 0, 0.85);
    }
    .des {
      display: flex;
      flex-direction: column;

      line-height: 20px;
      color: rgba(0, 0, 0, 0.6);
      margin-top: 16px;
    }
    .qr {
      margin-top: 16px;
      width: 160px;
      height: 160px;
    }
  }
}
</style>
