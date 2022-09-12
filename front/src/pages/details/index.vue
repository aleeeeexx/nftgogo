<template>
  <div class="detail">
    <div class="nav">
      <van-icon name="arrow-left" class="nav-arrow" @click="router.back()" />
      <div class="nav-text">THE CAR OF SPACE</div>
    </div>
    <div class="d-content">
      <div class="d-top">
        <img
          src="https://black-pearl.oss-cn-shenzhen.aliyuncs.com/2022/09/11/657e248a-79af-43ba-ac20-ccfbc8fa9cc0.png"
          alt=""
        />
      </div>
      <div class="info">
        <div class="name">学森空间车 THE CAR OF SPACE</div>
        <div class="sale">
          <span class="sale-l">发售中</span>
          <span class="sale-r">已售出 1299/1999</span>
        </div>
        <van-progress :percentage="50" pivot-text="已售50%" color="rgb(236, 117, 62)" />
      </div>
      <div class="nft-d">
        <div class="d-top">
          <div class="title">藏品介绍</div>
          <div class="chain">蚂蚁链</div>
        </div>
        <div class="d-bottom">
          <p>
            Beyond earth's atmosphere and beyond the solar system lies our vision with infinite
            possibilities. A city is a key to connecting humanity to outer space. A city where all
            dreams are possible.
          </p>
          <p>A vision of Mars as a pearl. A homage to UAE culture and history of pearl diving.</p>
          <p>
            We'll all take our last breath at some point. We should leave this place satisfied with
            the times we have spent, the memories we have made, the people and cultures we have
            experienced..
          </p>
        </div>
      </div>
      <div class="notice">
        <van-divider>购买须知</van-divider>
        <div class="n-content">
          <p>
            依据我国法律要求，特定条件下的数字藏品的转赠不支持任何形式的变相炒作，我们坚决反对数字藏品炒作、场外交易、欺诈，或以任何其他非法、侵权方式使用的违法违规行为，请大家注意甄别上述涉嫌网络欺诈的行为及其相关风险。
          </p>
          <p>数字藏品为虚拟数字商品，购买前请完成实名认证，未满18周岁人群禁止购买。</p>
          <p>本商品一经出售不支持七天无理由退换货。</p>
        </div>
      </div>
    </div>
    <div class="d-footer">
      <div class="d-con">
        <div class="b-l">
          <span class="sign">￥</span>
          <span> 299</span>
        </div>
        <van-button round class="b-r" color="rgb(236, 117, 62)">立即购买</van-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style lang="scss" scoped>
.detail {
  color: #fff;
  padding: 0 24px;
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #000;
    height: 50px;
    .nav-arrow {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px;
    }
    .nav-text {
      text-align: center;
      height: 50px;
      line-height: 50px;
    }
  }
  .d-content {
    margin-top: 50px;
    margin-bottom: 120px;
    .d-top {
      width: 100%;
      img {
        width: 100%;
        border-radius: 6px;
      }
    }
    .info {
      margin-top: 20px;
      .name {
        font-size: 20px;
      }
    }
    .sale {
      margin-top: 20px;
      height: 40px;
      display: flex;
      font-size: 14px;
      justify-content: space-between;
      .sale-l {
        color: rgb(236, 117, 62);
      }
    }
    .nft-d {
      margin-top: 20px;
      margin-bottom: 20px;
      .d-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title {
          font-size: 20px;
          font-weight: 500;
        }
      }
      .d-bottom {
        font-size: 14px;
      }
    }
    .notice {
      font-size: 12px;
      color: rgba(124, 124, 124, 1);
    }
  }
  .d-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #000;
    color: rgb(236, 117, 62);
    padding: 0 10px;
    .d-con {
      display: flex;
      padding: 10px;
      justify-content: space-between;
      align-items: center;
      .b-l {
        font-size: 24px;
        .sign {
          font-size: 18px;
        }
      }
      .b-r {
        font-size: 14px;
      }
    }
  }
}
</style>
