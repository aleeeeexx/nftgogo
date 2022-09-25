<template>
  <div class="personal">
    <div class="profile">
      <div class="p-t">
        <img
          src="https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/09/25/92643ff6-407b-473d-9e71-e207fee7fe98.png"
          alt=""
        />
      </div>
      <div class="p-name">coconutman</div>
      <div class="p-hash">0x701b6b6479d01e963ec5</div>
    </div>
    <div class="tabs">
      <van-tabs
        v-model:active="active"
        background="#000"
        title-inactive-color="#8E8E95"
        title-active-color="#fff"
        animated
      >
        <van-tab title="Collected">
          <template #title>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-all"></use>
            </svg>
            Collected
          </template>
          <van-search v-model="value" placeholder="请输入搜索关键词" />
          <div class="content-list">
            <van-list
              v-model:loading="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <div class="card-item" v-for="item in list" :key="item" :title="item">
                <img
                  src="https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/09/25/462bbaff-6054-455f-8d13-26c4fc80e9b3.jpeg"
                  alt=""
                />
                <div class="text">toyaya Li |Cyber</div>
                <div class="text">toyaya Li |Cyber</div>
              </div>
            </van-list>
          </div>
        </van-tab>
        <van-tab title="Created">
          <template #title>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-component"></use>
            </svg>
            Created
          </template>
          <van-search v-model="value" placeholder="请输入搜索关键词" />
          <div class="content-list">
            <van-list
              v-model:loading="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <div class="card-item" v-for="item in list" :key="item" :title="item">
                <img
                  src="https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/09/25/28054016-747c-486b-8bfb-4b6ab96cc26f.jpeg"
                  alt=""
                />
                <div class="text">toyaya Li |Cyber</div>
                <div class="text">toyaya Li |Cyber</div>
              </div>
            </van-list>
          </div>
        </van-tab>
        <van-tab title="Favorited">
          <template #title>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-fabulous"></use>
            </svg>
            Favorited
          </template>
          <div class="content-list">
            <van-list
              v-model:loading="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <div class="card-item" v-for="item in list" :key="item" :title="item">
                <img
                  src="https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/09/11/657e248a-79af-43ba-ac20-ccfbc8fa9cc0.png"
                  alt=""
                />
                <div class="text">toyaya Li |Cyber</div>
                <div class="text">toyaya Li |Cyber</div>
              </div>
            </van-list>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <!-- <div class="header">
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
    </div> -->
    <!-- <div class="content">
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
              src="https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/09/11/657e248a-79af-43ba-ac20-ccfbc8fa9cc0.png"
              alt=""
            />
            <div class="text">toyaya Li |Cyber</div>
            <div class="text">toyaya Li |Cyber</div>
          </div>
        </van-list>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// import { useRoute, useRouter } from 'vue-router'
import { getUsrInfo } from '@/api/user'
// import { setStorage } from '@/utils/pulin-login'
// import { Tab, Tabs } from 'vant'

const list = ref([])
const loading = ref(false)
const finished = ref(false)
const active = ref(0)
const value = ref('')
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
:deep .van-search {
  margin-top: 20px;
  border: 1px solid #4f4f4f !important;
  border-radius: 4px;
}
.personal {
  width: 100vw;
  min-height: 100vh;
  background-color: black;
  padding: 25px 8px;
  box-sizing: border-box;
  color: azure;
  .profile {
    .p-t {
      display: flex;
      margin-top: 20px;
      img {
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin: 0 auto;
      }
    }
    .p-name {
      font-size: 24px;
      text-align: center;
      margin-top: 24px;
      font-weight: 500;
    }
    .p-hash {
      color: azure;
      margin-top: 12px;
      text-align: center;
    }
  }
  .tabs {
    margin-top: 20px;
    :deep .van-tabs--line .van-tabs__wrap {
      border-bottom-color: #4f4f4f !important;
    }
    .content-list {
      margin-top: 10px;

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
        background-color: #1e1e1e;
        width: 43%;
        margin-top: 20px;
        padding: 10px;
        border-radius: 8px;
        img {
          width: 100%;
          border-radius: 8px;
        }
        .text {
          padding: 4px 6px;
          font-size: 12px;
        }
      }
    }
  }
}

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
