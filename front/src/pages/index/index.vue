<template>
  <div class="index">
    <div class="main">
      <div class="cont-tit">
        <div class="titl-l">THE CITY OF XUESEN</div>
        <div class="titl-r"></div>
      </div>
      <div class="list" v-if="list.length">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div v-for="(item, index) in list" :key="index" @click="router.push('/detail')">
            <Card :info="item"></Card>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Card from '../../components/card/index.vue'
const router = useRouter()
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
  if (list.value.length >= 4) {
    finished.value = true
  }
}
</script>

<style lang="scss" scoped>
.index {
  padding: 20px;
  .main {
    .cont-tit {
      color: #fff;
      padding: 20px 0;
      .titl-l {
        font-size: 20px;
      }
    }
    .list {
      padding-bottom: 15px;
    }
  }
}
</style>
