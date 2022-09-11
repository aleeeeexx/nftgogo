<template>
  <div class="index">
    <div class="main">
      <div class="cont-tit">
        <div class="titl-l">热门推荐</div>
        <div class="titl-r"></div>
      </div>
      <div class="list">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div v-for="(item, index) in list" :key="index">
            <Card :info="item"></Card>
          </div>
        </van-list>
      </div>
    </div>
  </div>
  <!-- <div class="personal">
    <div class="header">
      <div class="avatar">
        <img
          src="https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/08/25/af02394e-1f72-415c-b09c-e325af362b88.jpg"
          alt=""
        />
      </div>
      <div class="info">
        <div class="name">收藏家{{ info.phone }}</div>
        <div class="id">id:{{ '12345' }}</div>
        <div class="hash">区块链地址:ghr10xhfzvVaymek4mjh</div>
      </div>
    </div>
    <div class="content">
      <div class="content-tit">我的藏品</div>
      <div class="content-list">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="card-item" v-for="item in list" :key="item" :title="item">
            <img
              src="https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/08/25/af02394e-1f72-415c-b09c-e325af362b88.jpg"
              alt=""
            />
            <div class="text">toyaya Li |Cyber</div>
            <div class="text">toyaya Li |Cyber</div>
          </div>
        </van-list>
      </div>
    </div>
  </div> -->
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import Card from '../../components/card/index.vue'
const mockData = [
  {
    img: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/09/11/657e248a-79af-43ba-ac20-ccfbc8fa9cc0.png',
    nftname: 'Cyber Galaxy 赛博星球',
    tags: ['新锐艺术家', '盲盒头像', '限量1999份'],
    sales: 1999,
    price: '299.00',
    creator: '像素公司',
    saleprogress: '20'
  }
]
const list = ref([
  {
    img: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/09/11/657e248a-79af-43ba-ac20-ccfbc8fa9cc0.png',
    nftname: 'Cyber Galaxy 赛博星球',
    tags: ['新锐艺术家', '盲盒头像', '限量1999份'],
    sales: 1999,
    price: '299.00',
    creator: '像素公司',
    saleprogress: '20'
  },
  {
    img: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/09/11/e2bd2a10-fa6f-4e22-8475-12a0071e925f.jpeg',
    nftname: 'Cyber Galaxy 赛博星球',
    tags: ['新锐艺术家', '盲盒头像', '限量1999份'],
    sales: 1999,
    price: '299.00',
    creator: '像素公司',
    saleprogress: '20'
  },
  {
    img: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/09/11/f5f4332b-3d96-4409-8b66-dbfad367057a.jpeg',
    nftname: 'Cyber Galaxy 赛博星球',
    tags: ['新锐艺术家', '盲盒头像', '限量1999份'],
    sales: 1999,
    price: '299.00',
    creator: '像素公司',
    saleprogress: '20'
  },
  {
    img: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/09/11/0b3c1874-0ad7-4052-a96c-f9b056daa18a.png',
    nftname: 'Cyber Galaxy 赛博星球',
    tags: ['新锐艺术家', '盲盒头像', '限量1999份'],
    sales: 1999,
    price: '299.00',
    creator: '像素公司',
    saleprogress: '20'
  }
])
const loading = ref(false)
const finished = ref(false)
const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  //   setTimeout(() => {
  //     list.value = list.value.concat(mockData)
  //     // 加载状态结束
  //     loading.value = false
  //     // 数据全部加载完成
  //     if (list.value.length >= 20) {
  //       finished.value = true
  //     }
  //   }, 0)
  if (list.value.length >= 20) {
    finished.value = true
  }
}
// import { ref } from 'vue'
// // import { useRoute, useRouter } from 'vue-router'
// import { getUsrInfo } from '@/api/user'
// // import { setStorage } from '@/utils/pulin-login'
// // import { Toast } from 'vant'

// const list = ref([])
// const loading = ref(false)
// const finished = ref(false)
// const onLoad = () => {
//   // 异步更新数据
//   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
//   setTimeout(() => {
//     for (let i = 0; i < 10; i++) {
//       list.value.push(list.value.length + 1)
//     }

//     // 加载状态结束
//     loading.value = false

//     // 数据全部加载完成
//     if (list.value.length >= 40) {
//       finished.value = true
//     }
//   }, 1000)
// }
// const info = ref({})
// const getInfo = async () => {
//   const res = await getUsrInfo()
//   console.log(res, 'infooooo')
//   info.value = res.result
// }
// getInfo()
</script>

<style lang="scss" scoped>
.index {
  padding: 20px;
  .main {
    .cont-tit {
      color: #fff;
      padding: 20px 0;
    }
  }
}
</style>
