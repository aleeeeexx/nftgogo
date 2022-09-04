import * as url from './url'
import request from '@/utils/request'
export const coupon = (beiAnNo: string) => {
  return request({
    url: `${url.VUE_APP_DIANA_URL}/referral/zhuangXiuBeiAnRefer/${beiAnNo}`,
    method: 'GET'
  })
}
export const couponInfo = () => {
  return request({
    url: `${url.VUE_APP_DIANA_URL}/referral/getCouponReleaseBatch`,
    method: 'GET'
  })
}
