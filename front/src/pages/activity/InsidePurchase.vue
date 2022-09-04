<template>
  <div id="allmap"></div>
  <div class="activity-container">
    <van-image class="top-img" :src="topImg" lazy-load>
      <template v-slot:loading>
        <van-loading type="spinner" size="20" />
      </template>
    </van-image>
    <div class="module1">
      <div class="module1-big-container">
        <van-image
          class="module1-big-img"
          :src="item.url"
          lazy-load
          v-for="item in module1BigImgList"
          :key="item.id"
          @click="toGoodsDetail(item.id)"
        >
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </div>
      <div class="module1-small-container">
        <van-image
          class="module1-small-img"
          :src="item.url"
          lazy-load
          v-for="item in module1SmallImgList"
          :key="item.id"
          @click="toGoodsDetail(item.id)"
        >
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </div>
    </div>
    <div class="module2">
      <div class="module2-container">
        <van-image
          class="module2-img"
          :src="item.url"
          lazy-load
          v-for="item in module2ImgList"
          :key="item.id"
          @click="toGoodsDetail(item.id)"
        >
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </div>
    </div>
    <div class="module3">
      <div class="module3-line1-container">
        <van-image
          class="module3-line1-img"
          :src="item.url"
          lazy-load
          v-for="item in module3Line1ImgList"
          :key="item.id"
          @click="toGoodsDetail(item.id)"
        >
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </div>
      <div class="module3-line2-container">
        <van-image
          class="module3-line2-img"
          :src="item.url"
          lazy-load
          v-for="item in module3Line2ImgList"
          :key="item.id"
          @click="toGoodsDetail(item.id)"
        >
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </div>
    </div>
    <van-image :src="module4" class="module4">
      <template v-slot:loading>
        <van-loading type="spinner" size="20" />
      </template>
    </van-image>
  </div>
</template>
<script lang="ts" setup>
import { Image as VanImage, Loading as VanLoading } from 'vant'
import { ref, watchEffect } from 'vue'
import wx from 'jweixin-1.6.0'

interface IIMGTYPE {
  id: number
  url: string
}

const topImg = ref(
  'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/05/24/310742f6-a1a4-4ed4-82cb-34dd20979000.jpg'
)
// 模块一商品
const module1BigImgList = ref<IIMGTYPE[]>([
  {
    url: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/05/24/37b71486-78c8-4f15-9fbd-5269305505d5.png',
    id: 139340
  },
  {
    url: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/05/24/72049f99-1021-48ad-b154-6293709b20e9.png',
    id: 139341
  },
  {
    url: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/05/24/e8013bba-b0dd-4b4f-8b4f-139018cc1fb9.png',
    id: 139339
  }
])
const module1SmallImgList = ref<IIMGTYPE[]>([
  {
    url: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/05/24/242ba256-b821-4e40-b1b8-c862ff35e1b5.png',
    id: 127807
  },
  {
    url: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/05/24/3d62b8ad-5e68-4889-8a78-7c3e105a49e4.png',
    id: 137155
  },
  {
    url: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/05/24/0b7f7981-0db7-4b2b-8a7f-eb7d4a317225.png',
    id: 137143
  },
  {
    url: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/05/24/f4bb657d-c294-4536-93da-3fef2e0cad7a.png',
    id: 138584
  }
])

const module2ImgList = ref<IIMGTYPE[]>([
  {
    url: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/05/24/ab846e93-2fba-424f-bcd5-a36ac2bd7604.png',
    id: 137908
  },
  {
    url: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/05/24/5f560ae5-f10e-4e5e-8d95-fb2e21afd8fd.png',
    id: 137906
  },
  {
    url: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/05/24/96cf32a2-6ba7-438f-85f2-2a3d6bd1af6a.png',
    id: 137905
  }
])

const module3Line1ImgList = ref<IIMGTYPE[]>([
  {
    url: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/05/25/09abcde0-a42c-4e44-8f7b-45636e5264fc.png',
    id: 123019
  },
  {
    url: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/05/25/f8698de8-32c5-4ba7-b043-956fdffe360c.png',
    id: 128697
  },
  {
    url: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/05/24/86bc48c9-a66f-40f9-8de1-341d9d7aac15.png',
    id: 118865
  }
])

const module3Line2ImgList = ref<IIMGTYPE[]>([
  {
    url: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/05/24/2ad9938d-4ac7-4686-bda1-e2f229df4b80.png',
    id: 69817
  },
  {
    url: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/05/25/15e84f07-ea90-4c26-be58-1c9e975a3453.png',
    id: 123029
  },
  {
    url: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/05/25/f88e570d-f79c-41ba-bdb3-d9d1eec2be6d.png',
    id: 133767
  }
])
const module4 = ref(
  'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/05/25/13b3af5e-2bd1-4ff4-af2b-3d679be0112d.jpg'
)

// 跳转商品详情
// id: number
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
    topImg.value = changeWebPImage(topImg.value)
    module1BigImgList.value.forEach(item => {
      item.url = changeWebPImage(item.url)
    })
    module1SmallImgList.value.forEach(item => {
      item.url = changeWebPImage(item.url)
    })
    module2ImgList.value.forEach(item => {
      item.url = changeWebPImage(item.url)
    })
    module3Line1ImgList.value.forEach(item => {
      item.url = changeWebPImage(item.url)
    })
    module3Line2ImgList.value.forEach(item => {
      item.url = changeWebPImage(item.url)
    })
    module4.value = changeWebPImage(module4.value)
  }
})
</script>

<style lang="scss" scoped>
.activity-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .top-img {
    width: 100%;
  }
  .module1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: url('https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/05/24/3c66de6b-a744-4183-a22b-b2d79b46b3fa.jpg');
    background-size: 100% 100%;
    width: 100%;
    height: 317px;
    .module1-big-container {
      display: flex;
      flex-direction: row;
      margin-top: 50px;
      padding: 0px 25px;
      .module1-big-img {
        width: 103px;
        height: 113px;
        margin-right: 8px;
        &:last-child {
          margin-right: 0px;
        }
      }
    }
    .module1-small-container {
      display: flex;
      flex-direction: row;
      margin-top: 11px;
      padding: 0px 25px;

      .module1-small-img {
        width: 75px;
        height: 119px;
        margin-right: 8px;
        &:last-child {
          margin-right: 0px;
        }
      }
    }
  }
  .module2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: url('https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/05/24/2eab29a4-0526-4517-9f1b-621faa36b45f.jpg');
    background-size: 100% 100%;
    width: 100%;
    height: 192px;
    .module2-container {
      display: flex;
      flex-direction: row;
      margin-top: 51px;
      padding: 0px 25px;

      .module2-img {
        width: 103px;
        height: 113px;
        margin-right: 8px;
        &:last-child {
          margin-right: 0px;
        }
      }
    }
  }
  .module3 {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: url('https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/05/25/1fa122a1-5710-4c1f-b76d-594c58a01634.jpg');
    background-size: 100% 100%;
    width: 100%;
    height: 318px;
    .module3-line1-container {
      display: flex;
      flex-direction: row;
      margin-top: 50px;
      padding: 0px 25px;
      .module3-line1-img {
        width: 103px;
        height: 113px;
        margin-right: 8px;
        &:last-child {
          margin-right: 0px;
        }
      }
    }
    .module3-line2-container {
      display: flex;
      flex-direction: row;
      margin-top: 11px;
      padding: 0px 25px;
      .module3-line2-img {
        width: 103px;
        height: 113px;
        margin-right: 8px;
        &:last-child {
          margin-right: 0px;
        }
      }
    }
  }
  .module4 {
    width: 100%;
  }
}
</style>
