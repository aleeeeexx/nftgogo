import request from '@/utils/request'
import * as url from './url'

// 获取用户信息
interface ListData {
  node_id: string
  node_name: string
  categories: string[]
  code_mapping: {
    supplier_id: string
  }
}
interface roleList {
  short_name: string
  group_name: string
  node_list: ListData[]
}
interface UserInfo {
  id: number
  nickname: string
  mobile: string
  roleList: roleList[]
}
// 根据朴邻token查询用户信息
interface TokenUserInfo {
  externalUserId: string
  mobile: string
  userId: string
  accessToken: string
  refreshToken: string
}
export const getUserInfo = async () => {
  const res = await request({
    url: `${url.VUE_APP_DIANA_URL}/api/user/info`,
    method: 'get'
  })
  return res.result as UserInfo
}

// 根据朴邻token查询用户信息
export const getUserInfoByToken = async (token: string, companyCode: string) => {
  const res = await request({
    url: `${url.VUE_APP_DIANA_URL}/api/user/getUserInfo?token=${token}&companyCode=${companyCode}`,
    method: 'get'
  })
  return res.result as TokenUserInfo
}

// 通过手机获取验证码
export const getVerifyCode = async (mobile: string) => {
  const res = await request({
    url: `/getVerifyCode?mobile=${mobile}`,
    method: 'get'
  })
  return res
}

// 刷新token
export const refreshToken = async (data: object) => {
  const res = await request({
    url: `${url.VUE_APP_DIANA_URL}/api/user/refreshToken`,
    method: 'post',
    data
  })
  return res.result as TokenUserInfo
}

// 验证码登录
export const loginByVerifyCode = async (data: object) => {
  const res = await request({
    url: '/user/register',
    method: 'post',
    data
  })
  return res.result as TokenUserInfo
}

export const getUsrInfo = async () => {
  const res = await request({
    url: '/user/usrInfo',
    method: 'get'
  })
  return res
}
