<template>
  <div style="padding-top: 1px">
    <van-image :src="banner" lazy-load style="z-index: 1">
      <template v-slot:loading>
        <van-loading type="spinner" size="20" />
      </template>
    </van-image>
  </div>
  <div class="bg">
    <div class="activity">
      <van-image :src="title" lazy-load style="margin-top: 10px; margin-bottom: 10px" />
      <van-image :src="title1" lazy-load class="title" />
      <van-image :src="startChair" lazy-load @click="toGoodsDetail(84015)" />

      <div class="chair">
        <van-image
          :src="item.img"
          @click="toGoodsDetail(item.id)"
          lazy-load
          class="chair-img"
          v-for="item in chairs"
          :key="item.id"
        />
      </div>
      <van-image :src="luNaChair" lazy-load @click="toGoodsDetail(84013)" />
      <van-image :src="title2" lazy-load class="title" />
      <div class="goods">
        <van-image
          :src="item.img"
          @click="toGoodsDetail(item.id)"
          lazy-load
          class="goods-img"
          v-for="item in goods"
          :key="item.id"
        />
      </div>
      <van-image :src="say1" lazy-load />
      <van-image :src="title3" lazy-load class="title" />
      <div class="goods">
        <van-image
          :src="item.img"
          @click="toGoodsDetail(item.id)"
          lazy-load
          class="goods-img"
          v-for="item in goods2"
          :key="item.id"
        />
      </div>
      <van-image :src="say2" lazy-load />
      <van-image :src="rule" lazy-load />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Image as VanImage, Loading as VanLoading } from 'vant'
import wx from 'jweixin-1.6.0'
import { ref, watchEffect } from 'vue'
const banner = ref(
  'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/01/06/f3c60b9a-d179-4067-8c9e-d052812d6f41.png'
)
const title = ref(
  'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/01/06/3db06849-9520-43a8-a653-f52b6282596f.png'
)
const title1 = ref(
  'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/01/06/8e11d91f-3d4e-4fd0-aaf0-1b77bec71553.png'
)
const title3 = ref(
  'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/01/06/38608267-5814-48a5-aac4-f8f85b1b8f55.png'
)
const title2 = ref(
  'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/01/06/f98cb38c-1963-493e-8e0f-68bb6c25ce99.png'
)
const startChair = ref(
  'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/01/06/fdb1bfa0-5ab6-4960-976a-fae19a626dcc.png'
)
const luNaChair = ref(
  'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/01/06/b91f4829-3b0c-46fe-8261-d07d62fd34ca.png'
)
const chairs = ref([
  {
    id: 84011,
    name: '星选椅',
    img: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/01/06/b4491118-a82b-4124-a0ec-2af472c89150.png'
  },
  {
    id: 84014,
    name: '圆环椅',
    img: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/01/06/031e3c40-d493-40ea-a482-7ff8a0dbc12f.png'
  },
  {
    id: 93778,
    name: '电动椅',
    img: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/01/06/8acda11a-6f45-4c40-9a1f-bc782214bd94.png'
  },

  {
    id: 84012,
    name: '办公椅',
    img: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/01/06/52e79957-5e63-47cb-9f13-cf71b176863f.png'
  }
  // {
  //   id: 84013,
  //   name: '挪威',
  //   img: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2021/12/27/d2c9d66d-b0ce-4793-abd5-ff73203f2da2.png'
  // },
  // {
  //   id: 84015,
  //   name: '星星',
  //   img: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2021/12/27/34437606-4c66-4c78-aca0-56360c341718.png'
  // },
])
const goods = ref([
  {
    id: 94631,
    name: '扫地机器人',
    img: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/01/06/817bd395-dea4-4466-9d1b-a8ed70f18e99.png'
  },
  {
    id: 85997,
    name: '净化器',
    img: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/01/06/7f53f66a-57b1-4c97-96d6-dcc473584a8d.png'
  },
  {
    id: 94156,
    name: '煮茶器',
    img: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/01/06/75e80935-674e-4f42-9824-3cf7ad3e311a.png'
  }
])
const goods2 = ref([
  {
    id: 92788,
    name: '榨汁机',
    img: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/01/06/c89e1db3-37bb-4f75-b142-329580856fcd.png'
  },

  {
    id: 91723,
    name: '料理锅',
    img: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/01/06/3434a139-7817-4c5a-a900-ff040586fcb7.png'
  },

  {
    id: 54374,
    name: '按摩器',
    img: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/01/06/46210ff7-810c-4a70-9efe-b8a5a8fb12ce.png'
  }
])
const say1 = ref(
  'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/01/06/753ab003-94db-4b8e-b846-1d2ebf1401cf.png'
)
const say2 = ref(
  'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/01/06/c83be2ef-0db8-4c5c-975b-9d193a2e8bc6.png'
)
const rule = ref(
  'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/01/06/24c11e7d-9070-4ddc-80ab-ac66506e992a.png'
)

const toGoodsDetail = (id: number) => {
  wx.miniProgram.navigateTo({ url: `/pages/NewGoodsDetail/index?scene=${id},2` })
}
const isWebp = ref(true)
const isSupportWebp = function () {
  try {
    return (
      document.createElement('canvas').toDataURL('image/webp', 0.5).indexOf('data:image/webp') === 0
    )
  } catch (err) {
    return false
  }
}
isWebp.value = isSupportWebp()

const changeWebPImage = (url: string) => {
  return url + '?x-oss-process=image/format,webp'
}
watchEffect(() => {
  if (isWebp.value) {
    banner.value = changeWebPImage(banner.value)
    title.value = changeWebPImage(title.value)
    title1.value = changeWebPImage(title1.value)
    title2.value = changeWebPImage(title2.value)
    title3.value = changeWebPImage(title3.value)
    startChair.value = changeWebPImage(startChair.value)
    luNaChair.value = changeWebPImage(luNaChair.value)
    chairs.value.forEach(item => {
      item.img = changeWebPImage(item.img)
    })
    goods.value.forEach(item => {
      item.img = changeWebPImage(item.img)
    })
    goods2.value.forEach(item => {
      item.img = changeWebPImage(item.img)
    })
    say1.value = changeWebPImage(say1.value)
    say2.value = changeWebPImage(say2.value)
    rule.value = changeWebPImage(rule.value)
  }
})
</script>

<style lang="scss">
.bg {
  padding-left: 10px;
  padding-right: 10px;
  background-color: #be1f24;
  margin-top: -40px;
  position: relative;
  z-index: 2;
}
.activity {
  background-color: #ffb992;
  padding: 10px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  z-index: 100;
}
.goods,
.chair {
  display: flex;
  justify-content: center;
  align-items: center;
  .chair-img {
    width: 83px;
  }
  .goods-img {
    width: 111px;
  }
}
.title {
  margin-left: 92.5px;
  width: 150px;
}
</style>
