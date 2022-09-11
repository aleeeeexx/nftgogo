<template>
  <div class="card">
    <div class="top">
      <img :src="info?.img" alt="" />
    </div>
    <div class="bottom">
      <div class="name">{{ info?.nftname }}</div>
      <div class="tags">
        <div class="tag-item" v-for="(item, index) in info?.tags" :key="index">{{ item }}</div>
      </div>
      <div class="price">￥{{ info?.price }}</div>
      <div class="creator">
        <div class="c-l">
          <span class="c-icon"> <img :src="info?.img" alt="" /></span>
          <span class="c-text">{{ info?.creator }}</span>
        </div>
        <div class="c-r">发售中,已售{{ info?.saleprogress }}%</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
// interface Item {
//   img: string
//   nftname: string
//   tags: string[]
//   sales: number
//   price: string
//   creator: string
//   saleprogress: string
// }
// export interface ListItem {
//   name: string
//   status: string
//   body: Item[]
//   id: number
// }
defineProps({
  info: {
    type: Object
  },
  name: {
    type: String
  },
  status: {
    type: String
  }
  // info: {
  //   type: Array as PropType<Item[]>,
  //   default() {
  //     return []
  //   }
  // }
})
</script>

<style lang="scss">
.card {
  color: #fff;
  padding: 5px;
  background-color: rgb(61, 57, 57);
  margin-bottom: 20px;
  .top {
    img {
      width: 100%;
      border-radius: 5px;
    }
  }
  .bottom {
    padding: 0 12px;
    .name {
      padding: 10px 0;
      font-size: 20px;
    }
    .tags {
      display: flex;
      .tag-item {
        line-height: 20px;
        padding: 0 4px;
        border: 1px solid gold;
        color: gold;
        font-size: 10px;
        margin-right: 6px;
      }
      margin-bottom: 10px;
    }
    .price {
      font-size: 22px;
      color: gold;
      margin-bottom: 5px;
    }
    .creator {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .c-l {
        display: flex;
        align-items: center;
        .c-icon {
          margin-right: 8px;
          img {
            width: 20px;
            height: 20px;
            border-radius: 50%;
          }
        }
        .c-text {
          font-size: 12px;
        }
      }
      .c-r {
        padding: 5px;
        width: 100px;
        height: 20px;
        line-height: 20px;
        border-radius: 20px;
        background-color: rgb(236, 117, 62);
        background-image: linear-gradient(to right, rgb(236, 117, 62), rgb(234, 140, 97));
        color: #000;
        font-size: 10px;
        text-align: center;
      }
    }
  }
}
</style>
