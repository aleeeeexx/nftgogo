<template>
  <div class="personal">
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
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// import { useRoute, useRouter } from 'vue-router'
import { getUsrInfo } from '@/api/user'
// import { setStorage } from '@/utils/pulin-login'
// import { Toast } from 'vant'

const list = ref([])
const loading = ref(false)
const finished = ref(false)
const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1)
    }

    // 加载状态结束
    loading.value = false

    // 数据全部加载完成
    if (list.value.length >= 40) {
      finished.value = true
    }
  }, 1000)
}
const info = ref({})
const getInfo = async () => {
  const res = await getUsrInfo()
  console.log(res, 'infooooo')
  info.value = res.result
}
getInfo()
</script>

<style lang="scss" scoped>
.personal {
  width: 100vw;
  min-height: 100vh;
  background-color: black;
  padding: 25px;
  box-sizing: border-box;
  color: azure;
  .header {
    display: flex;
    align-items: center;
    margin-top: 30px;
    .avatar {
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    .info {
      margin-left: 20px;
      .name {
        font-weight: 500;
        font-size: 20px;
      }
      div {
        margin-bottom: 8px;
      }
    }
  }
  .content {
    margin-top: 20px;
    background-color: black;
    .content-list {
      margin-top: 20px;

      .van-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
      :deep .van-list__finished-text {
        width: 100%;
        text-align: center;
      }
      :deep .van-list__loading {
        width: 100%;
        text-align: center;
      }
      .card-item {
        background-color: rgb(68, 75, 75);
        width: 48%;
        margin-top: 20px;
        img {
          width: 100%;
        }
        .text {
          padding: 4px 6px;
        }
      }
    }
  }
}
</style>
