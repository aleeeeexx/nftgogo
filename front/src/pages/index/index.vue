<template>
  <div class="index">
    <div class="main">
      <div class="cont-tit">
        <div class="titl-l">THE CITY OF XUESEN</div>
        <div class="titl-r"></div>
      </div>
      <div class="video-con">
        <video autoplay controls muted>
          <source src="https://uaenft.io/assets/img/gallery/mars-2117.mp4" type="video/mp4" />
          您的浏览器不支持Video标签。
        </video>
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
    img: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/09/25/099295ad-c0a8-4aa2-8cdd-e48f3ce1dfef.jpeg',
    nftname: 'Cyber Galaxy 赛博星球',
    tags: ['新锐艺术家', '盲盒头像', '限量1999份'],
    sales: 1999,
    price: '299.00',
    creator: '像素公司',
    saleprogress: '20'
  },
  {
    img: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/09/25/e99ba052-e2ae-4ba2-87a9-6259e3498c49.jpeg',
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
  },
  {
    img: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/09/25/d4458560-f5f7-4a43-a27d-5cb22a0908f8.jpeg',
    nftname: 'Cyber Galaxy 赛博星球',
    tags: ['新锐艺术家', '盲盒头像', '限量1999份'],
    sales: 1999,
    price: '299.00',
    creator: '像素公司',
    saleprogress: '20'
  },
  {
    img: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/09/25/28054016-747c-486b-8bfb-4b6ab96cc26f.jpeg',
    nftname: 'Cyber Galaxy 赛博星球',
    tags: ['新锐艺术家', '盲盒头像', '限量1999份'],
    sales: 1999,
    price: '299.00',
    creator: '像素公司',
    saleprogress: '20'
  },
  {
    img: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/09/25/03539720-a12b-4633-a4a0-5f8b6d09f176.jpeg',
    nftname: 'Cyber Galaxy 赛博星球',
    tags: ['新锐艺术家', '盲盒头像', '限量1999份'],
    sales: 1999,
    price: '299.00',
    creator: '像素公司',
    saleprogress: '20'
  },
  {
    img: 'https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/09/25/462bbaff-6054-455f-8d13-26c4fc80e9b3.jpeg',
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
  background-image: url(https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/09/25/60556970-1d08-4bac-8997-888f23523a9d.png);
  background-position: center top;
  background-size: auto auto;
  background-repeat: no-repeat;
  .main {
    video {
      width: 100%;
    }
    .cont-tit {
      color: #fff;
      padding: 20px 0;
      .titl-l {
        font-size: 20px;
      }
    }
    .list {
      margin-top: 20px;
      padding-bottom: 40px;
    }
  }
}
</style>
