<template>
  <div id="allmap"></div>
  <div class="activity-container">
    <van-image class="top-img" :src="topImg" lazy-load>
      <template v-slot:loading>
        <van-loading type="spinner" size="20" />
      </template>
    </van-image>
    <van-image class="big-title-img" :src="bigTitleImg" lazy-load
      ><template v-slot:loading>
        <van-loading type="spinner" size="20" />
      </template>
    </van-image>
    <div
      class="module1"
      v-if="module1ImgList.length > 0"
      :style="`background: url('${module1Bg}'); background-size: 100% 100%;`"
    >
      <van-image
        class="module1-img"
        :src="item.url"
        lazy-load
        v-for="item in module1ImgList"
        :key="item.id"
        @click="toGoodsDetail(item.id)"
      >
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
      <van-image @click="toGoodsList(1)" class="module1-bottom-img" :src="module1More" lazy-load
        ><template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
      <div class="bottom-line-1"></div>
    </div>
    <div class="module2">
      <!-- 欧派专属 -->
      <van-image @click="toOuPai" class="moudle2-title-img" :src="moudle2TitleImg" lazy-load
        ><template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
      <div class="module2-list">
        <van-image
          @click="toGoodsDetail(item.id)"
          class="module1-img"
          :src="item.img"
          lazy-load
          v-for="item in module2ImgList"
          :key="item.id"
          ><template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </div>
      <van-image @click="toGoodsList(2)" class="module2-bottom-img" :src="module2More" lazy-load
        ><template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
      <div class="bottom-line-2"></div>
    </div>
    <van-image @click="toModule3" class="module3-img" :src="module3Img" lazy-load
      ><template v-slot:loading>
        <van-loading type="spinner" size="20" />
      </template>
    </van-image>
    <van-image class="module4-img" :src="module4Img" lazy-load
      ><template v-slot:loading>
        <van-loading type="spinner" size="20" />
      </template>
    </van-image>
    <!-- 点我咨询 -->
    <van-image class="consult-img" @click="toConsult" :src="consultImg" lazy-load />
  </div>
</template>
<script lang="ts" setup>
import { Image as VanImage, Loading as VanLoading } from 'vant'
// import { getCity } from '@/utils/get-location'
import wx from 'jweixin-1.6.0'
import { ref, watchEffect, onActivated } from 'vue'
import { Toast, Dialog } from 'vant'
// import { useRouter } from 'vue-router'
// const router = useRouter()
import { getActivityCity, getModuleOneList } from '@/api/save-data'
import type { IOUPAICITYLIST, ICITYLIST, IMODULETYPE } from '@/api/save-data'
import { useThrottleFn } from '@vueuse/core'
// 当前城市
const currentCity = ref('')

const loadCity = () => {
  Toast.loading({
    message: '获取定位中'
  })
  loadModuleOneList()
  // getCity()
  //   .then(res => {
  //     Toast.clear()
  //     currentCity.value = res
  //     Toast.success('当前城市：' + currentCity.value)
  //   })
  //   .catch(() => {
  //     Toast.clear()
  //     Toast.fail('获取定位失败')
  //   })
  //   .finally(() => {
  //     loadModuleOneList()
  //   })
}

// 先展示默认
const module1ImgList = ref<IMODULETYPE[]>([])
// 模块一的背景图
const module1Bg = ref('')
// 获取模块1的数据
const loadModuleOneList = async () => {
  module1ImgList.value = await getModuleOneList(currentCity.value)
  switch (module1ImgList.value.length) {
    case 4:
      module1Bg.value =
        'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/02/14/8470fa2b-df55-457f-bbe9-ccd6f3fe0310.png'
      break
    case 3:
      module1Bg.value =
        'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/02/25/cf336082-dea9-4df9-ad92-92b27283d35e.png'
      break
    case 2:
      module1Bg.value =
        'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/02/25/d18639d5-2d2c-4bf1-8fad-e8c8c2044d68.png'
      break
    case 1:
      module1Bg.value =
        'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/02/25/4474c2e4-90ba-46c7-b2b0-2ead0cc78280.png'
      break
  }
}

// 获取两个模块得更多以及欧派的城市数据
let MODLUE1_CITY_LIST = [] as ICITYLIST[]
let MODLUE2_CITY_LIST = [] as ICITYLIST[]
let OUPAI_CITY_LIST = [] as IOUPAICITYLIST[]
const loadActivityCity = async () => {
  const res = await getActivityCity()
  MODLUE1_CITY_LIST = res.modlue1CityList
  MODLUE2_CITY_LIST = res.modlue2CityList
  OUPAI_CITY_LIST = res.oppeinCityList
}

onActivated(() => {
  !currentCity.value && loadCity()
  loadActivityCity()
})

const consultImg = ref(
  'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/02/14/5cb95039-4502-4ff6-961c-278bf43a2bb3.png'
)
// 顶部图片
const topImg = ref(
  'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/02/14/09b883e0-653f-439d-b543-f7fd17f55c82.png'
)
// 头部大标题
const bigTitleImg = ref(
  'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/02/14/04506256-d57e-4357-842d-f0d0fe2bd6d3.png'
)

const module1More = ref(
  'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/02/14/5e51377c-e028-49f1-acca-77c923dfe8bd.png'
)
// 模块二的大图
const moudle2TitleImg = ref(
  'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/02/14/b683fe4a-fa4e-45f0-923a-f5afd562d8b4.png'
)
//模块二列表图
const module2ImgList = ref([
  {
    id: 109771,
    name: '美的',
    img: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/02/14/5c3ff427-975f-4f0f-b946-bf4fa681e79e.png'
  },
  {
    id: 110044,
    name: '喜临门',
    img: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/02/14/50c1152f-1887-4371-a609-941e52ae9c5c.png'
  },
  {
    id: 104538,
    name: '四季沐歌',
    img: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/02/14/5d19dea6-1e32-479e-97f3-757737c84eb1.png'
  }
])
const module2More = ref(
  'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/02/14/95d2bdd9-97f4-442b-b04f-1b607ad1a2b7.png'
)
const module3Img = ref(
  'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/02/14/8cf80d5e-0e4f-45c0-8e89-04da4e22fcc0.png'
)
// 跳转商品明细
const module4Img = ref(
  'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/02/14/a8b65993-1276-4a2d-8c3f-b34727a17616.png'
)
// 跳转商品详情
const toGoodsDetail = (id: number) => {
  wx.miniProgram.navigateTo({ url: `/pages/NewGoodsDetail/index?id=${id}` })
}
// 跳转商品列表，目前先跳转到南京
const toGoodsList = useThrottleFn((type: number) => {
  const list = type === 1 ? MODLUE1_CITY_LIST : MODLUE2_CITY_LIST
  // 有对应城市跳转商品列表
  let flag = false
  list.forEach(item => {
    if (item.cityName === currentCity.value) {
      flag = true
      wx.miniProgram.navigateTo({
        url: `/pages/NewGoodsList/index?city=${item.cityCode}-${type}`
      })
      return
    }
  })
  if (flag) return
  // 没有城市列表
  // 模块1没有则跳留资
  if ((!flag && type === 1) || !currentCity.value) {
    Dialog.confirm({
      message: '当前城市没有更多套餐选择，定制方案请咨询美居顾问',
      cancelButtonText: '取消',
      confirmButtonText: '去咨询',
      confirmButtonColor: '#5d8aa3',
      closeOnClickOverlay: true,
      className: 'del-confirm-dialog'
    }).then(() => {
      window.location.href =
        'https://mp.weixin.qq.com/s?__biz=Mzg4MDQ1NDI3OA==&mid=2247507880&idx=1&sn=23cf3e0c21ad4d7e1933fc8708e112be&chksm=cf766041f801e957347a4fb7e3d28b4ba9dd7a76036e87bccf6367630cb994570068be38043c&st=9CB41C87C977D6847EBC773D784C1ABB56DDAB68641DE606E6461E7BA16C54DA528E3AF82BAC3BBCDEF5E148B833FD8494BD317FA29E22559472036B7EE949042DA9D0C4E5183C4ECDCA7398F466AE65E86CA8522C3FD15A9960D501FBFD6221F5150895E191791FDB2FF873236CD5E1AF4A67C1F2176AF4C39470332DFD97488B9350B6B1833B7DAD3C5564675E40F633C13174C7CE2912581FA1600A237A3A0A48AA0CAB32031457447CD506CF61FE9C3306BA290F8AFB86ECB332F317C90854B61211193B7872EC00745C0101D7561E2B87B625BF1842833B29BDD84CAC9B&vid=1688851064258365&cst=8DBB1A6D8DD8E28FC1A84C37EAE2137BEAAB2CA3FB12E744D1A8C68C4E5B54D5A66AFB432B36B29BE5185EC46EF523C0&deviceid=8aa427bf-e8aa-4854-9fca-e84b8a84bf32&version=4.0.0.6007&platform=win#rd'
    })
    return
  }

  // 模块2没有则跳网页
  if ((!flag && type === 2) || !currentCity.value) {
    Dialog.confirm({
      message: '当前城市没有更多套餐选择，定制方案请咨询美居顾问',
      cancelButtonText: '取消',
      confirmButtonText: '去咨询',
      confirmButtonColor: '#5d8aa3',
      closeOnClickOverlay: true,
      className: 'del-confirm-dialog'
    }).then(() => {
      window.location.href =
        'https://mp.weixin.qq.com/s?__biz=Mzg4MDQ1NDI3OA==&mid=2247507900&idx=1&sn=8edbe5ded033d22147cc2d28a856d0e1&chksm=cf766055f801e94387719634d1d0b4e0b37213b9c50a63d918b42ae7a70a001f2d2455009256#rd'
    })
    return
  }
}, 1000)

// 跳转欧派
const toOuPai = useThrottleFn(() => {
  let flag = false
  OUPAI_CITY_LIST.forEach(item => {
    if (item.cityName === currentCity.value) {
      flag = true
      wx.miniProgram.navigateTo({ url: `/pages/NewGoodsDetail/index?id=${item.id}` })
      return
    }
  })

  if (!flag || !currentCity.value) {
    window.location.href =
      'https://mp.weixin.qq.com/s?__biz=Mzg4MDQ1NDI3OA==&mid=2247507911&idx=1&sn=eb55598f9ce5a4f270816c07bd9aaf3a&chksm=cf76602ef801e938c1cf899a6093f820f9643d99d02285c5bb96f04abfc77d1ded25bb89d03f&st=B6DA47D4BA9D169EFCEAD71B77EC5EAC49B8F822B736281BC79E5630FC0271F575CC96F9E6F553DE58C3463744C1948B66B19379656A774DF5695C8CB5468B494C92BC5678115791520B1CB71998EB65F3FCF2A94BEC2F2D416BD226DCFCD4358AA6998A47BA415FE62471A201EDA67880EE6656AF30C05F6C01E2FECCE95E8235A52E7DB278FD2D26063788DE9108DF146B103BD9D13C17076F4E8E340EAA036F9CC1CF4E41DF33B96588F252BAA51F9CBAA565BB7D7BAB75DD75F4ACD7A52B6035796171FEA7F1916BAA1BE9EDA8AE3E66EE8279424B599847CA8DC14F7AEE&vid=1688853336237513&cst=D78835DF80E4C12E01F5208D5E8881249EFE8A3C13D4455FBDC8FCFD801EDEA9D11BEF9B3D73D5C4574CA710860731B6&deviceid=1371b4cd-8d99-4b0d-9b3f-ac3ea8530819&version=4.0.0.70098&platform=mac#rd'
  }
}, 1000)

// 模块3跳转
const toModule3 = () => {
  wx.miniProgram.navigateTo({ url: `/pages/GroupPurchase/index?scene=132` })
}

// 点击咨询
const toConsult = useThrottleFn(() => {
  window.location.href =
    'https://mp.weixin.qq.com/s?__biz=Mzg4MDQ1NDI3OA==&mid=2247507900&idx=1&sn=8edbe5ded033d22147cc2d28a856d0e1&chksm=cf766055f801e94387719634d1d0b4e0b37213b9c50a63d918b42ae7a70a001f2d2455009256#rd'
}, 1000)

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
  if (isWebp.value && module1ImgList.value.length > 0) {
    module1ImgList.value.forEach(item => {
      item.url = changeWebPImage(item.url)
    })
  }
})

watchEffect(() => {
  if (isWebp.value) {
    // banner.value = changeWebPImage(banner.value)
    topImg.value = changeWebPImage(topImg.value)
    bigTitleImg.value = changeWebPImage(bigTitleImg.value)
    module1More.value = changeWebPImage(module1More.value)
    moudle2TitleImg.value = changeWebPImage(moudle2TitleImg.value)
    module2ImgList.value.forEach(item => {
      item.img = changeWebPImage(item.img)
    })
    module2More.value = changeWebPImage(module2More.value)
    module3Img.value = changeWebPImage(module3Img.value)
    module4Img.value = changeWebPImage(module4Img.value)
  }
})
</script>

<style lang="scss" scoped>
.activity-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url('https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/02/14/537e9ac8-8601-4931-b05b-479cf08ca5b3.png');
  background-size: 100% 100%;
  .top-img {
    padding: 0px 24px;
  }
  .big-title-img {
    padding: 0px 20px;
  }
  .module1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    padding: 0px 11px 0px 14px;
    .module1-img {
      margin-top: 10px;
      padding: 0px 10px;
      &:first-child {
        margin-top: 48px;
      }
    }
    .module1-bottom-img {
      margin-top: 20px;
      padding-bottom: 14px;
      width: 176px;
    }
  }
}
.module2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  background: url('https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/02/14/5c5c5430-3a9e-4088-a2cb-f07bfefac498.png');
  background-size: 100% 100%;
  padding: 0px 11px 0px 14px;
  .moudle2-title-img {
    margin-top: 50px;
    padding: 0px 10px;
  }
  .module2-list {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 0px 10px;
    margin-top: 10px;
    .van-image {
      width: 32%;
    }
  }
  .module2-bottom-img {
    margin-top: 20px;
    padding-bottom: 14px;
    width: 176px;
  }
}
.module3-img {
  margin-top: 30px;
}
.module4-img {
  margin-top: 30px;
}

.consult-img {
  position: fixed;
  right: 4px;
  bottom: 82px;
  width: 66px;
  height: 66px;
}

.bottom-line-1 {
  height: 26px;
}
.bottom-line-2 {
  height: 30px;
}
</style>
