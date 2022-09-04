import request from '@/utils/request'
import * as url from './url'

// 保存客户留资信息
export interface ISAVEDATATYPE {
  customerName: string
  customerMobile: string
  provinceCode: string
  provinceName: string
  cityCode: string
  cityName: string
  routeType: string
  routeId: string
  city: string
  refferalSource: string
  referrerId: string | undefined
}
export const saveCustomerData = async (data: ISAVEDATATYPE) => {
  const res = await request({
    url: `${url.VUE_APP_DIANA_URL}/api/customer/leaveInfo`,
    method: 'post',
    data
  })
  return res.result
}

// 保存客户留资咨询内容
export interface IADVICETYPE {
  fixtureStatus?: string | number
  adviceContent?: string | number
  otherInfo?: string | number
  customerId: string | number
}
export const saveAdviceContent = async (data: IADVICETYPE) => {
  const res = await request({
    url: `${url.VUE_APP_DIANA_URL}/api/customer/adviceContent`,
    method: 'post',
    data
  })
  return res.result
}

export interface IOUPAICITYLIST {
  cityCode: string
  cityName: string
  id: string | number
}
export interface ICITYLIST {
  cityCode: string
  cityName: string
}
interface IACTIVITYTYPE {
  modlue1CityList: ICITYLIST[]
  modlue2CityList: ICITYLIST[]
  oppeinCityList: IOUPAICITYLIST[]
}
// 加载活动数据
export const getActivityCity = async () => {
  const res = await request({
    url: `${url.VUE_APP_DIANA_URL}/lanternActivity/api/oppein/list`,
    method: 'get'
  })
  return res.result as IACTIVITYTYPE
}

export interface IMODULETYPE {
  id: number
  url: string
}
// 加载模块1数据
export const getModuleOneList = async (cityName: string) => {
  const res = await request(
    {
      url: `${url.VUE_APP_DIANA_URL}/lanternActivity/api/front/goods/list`,
      method: 'get',
      params: {
        cityName
      }
    },
    false
  )
  return res.result as IMODULETYPE[]
}
