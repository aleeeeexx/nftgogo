import * as url from './url'
import request from '@/utils/request'

interface DepositReturn {
  orderId: number
  reason: string
  returnAmount: number
}
export const setDepositReturn = async (data: DepositReturn) => {
  const res = await request({
    url: `${url.VUE_APP_DIANA_URL}/api/deposit/order/return/submit`,
    method: 'POST',
    data
  })
  return res.result
}

export interface OrderReturnTimeVoList {
  title: string
  description: string
  createdTime: string
}
export interface depositReturnInfo {
  orderReturnTimeVoList: OrderReturnTimeVoList[]
  returnCode: string
  returnId: string
  orderId: string
  returnStatus: 1 | 2 | 3 | 4 //售后状态 售后状态 1-售后中，2-已完成，3-已拒绝，4-已取消
  returnAmount: number
}
export const depositReturnList = async (orderId: string) => {
  const res = await request({
    url: `${url.VUE_APP_DIANA_URL}/api/deposit/order/return/list/${orderId}`,
    method: 'GET'
  })
  return res.result as depositReturnInfo
}
export const cancelDepositReturn = async (returnId: string) => {
  const res = await request({
    url: `${url.VUE_APP_DIANA_URL}/api/deposit/order/return/close/${returnId}`,
    method: 'POST'
  })
  return res.result
}
