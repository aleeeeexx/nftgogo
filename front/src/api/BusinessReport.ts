import * as url from './url'
import request from '@/utils/request'
export interface Business {
  referrerMobile: string
  intentionDescription: string
  customerName: string
  customerMobile: string
  provinceCode?: string
  provinceName?: string
  cityCode?: string
  cityName?: string
  projectCode?: string
  projectName?: string
  buildingCode?: string
  buildingName?: string
  houseCode?: string
  assistContactsPhone?: string
  assistContactsName?: string
  intentionType?: string
  recommendPerName?: string
  recommendPerPhone?: string
  referralSource?: string
  fromAppId?: number
  companyCode?: string
}
interface Page {
  page: number
  size: number
}
export const reportBusiness = (data: Business) => {
  return request({
    url: `${url.VUE_APP_DIANA_URL}/api/referral`,
    method: 'POST',
    data
  })
}

interface ReferralHistory {
  houseName: string
  feedbackMessage: string
  customerName: string
  customerMobile: string
  cityName: string
  projectName: string
  provinceName: string
  id: number
  houseCode: string
}

export const getReferralHistory = async (
  referrerMobile: string,
  page: Page = { page: 1, size: 10 }
) => {
  const res = await request({
    url: `${url.VUE_APP_DIANA_URL}/api/referral/${referrerMobile}`,
    method: 'get',
    params: { ...page }
  })
  const records: ReferralHistory[] = res.result.records
  return records
}
interface ProcessRecord {
  title: string
  content: string
  createdTime: string
}
export interface FeedbackRecord extends ReferralHistory {
  feedbackRecords: ProcessRecord[]
  intentionDescription: string
}
export const getReferralFeedbackRecord = async (referralId: number) => {
  const res = await request({
    url: `${url.VUE_APP_DIANA_URL}/referralFeedbackRecord/${referralId}`,
    method: 'get'
  })
  const records: FeedbackRecord = res.result
  return records
}

interface VisitorByMobileType {
  externalUserId: string
  nickname: string
  id: string
  mobile: string
  name: string
  source: string
  avatar: string
}
// 根据手机号查询访客
export const getVisitorByMobile = async (mobile: string) => {
  const res = await request({
    url: `${url.VUE_APP_DIANA_URL}/api/visitor/getVisitorByMobile`,
    method: 'get',
    params: { mobile }
  })
  const result: VisitorByMobileType = res.result
  return result
}

interface ISEARCH {
  nameOrMobile: string
  pageSize: number
  pageNo: number
}
interface IEMPLOYEERELIST {
  name: string
  positionCode: string
  positionName: string
  mobile: string
  organization: string
  organizationName: string
}
interface IEMPLOYEEREESULT {
  current: number
  pages: number
  records: IEMPLOYEERELIST[]
}
// 获取员工信息，推荐人列表
export const loadEmployeeSearch = async (data: ISEARCH) => {
  const res = await request({
    url: `${url.VUE_APP_BLACKSAM_URL}/frontend/employee/search`,
    method: 'POST',
    data
  })
  const result: IEMPLOYEEREESULT = res.result
  return result
}
