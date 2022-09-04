import request from '@/utils/request'
import * as url from './url'

// 获取客户城市列表
export interface CityList {
  code: string
  name: string
  cityList?: CityList[]
}
export const getCustomerCityList = async () => {
  const res = await request({
    url: `${url.VUE_APP_DIANA_URL}/resource/line/city`,
    method: 'get'
  })
  return res.result as CityList[]
}
export const getCustomerCityProvince = async () => {
  const res = await request({
    url: `${url.VUE_APP_DIANA_URL}/resource/line/cityWithProvince`,
    method: 'get'
  })
  return res.result as CityList[]
}
export const getIntentionList = async () => {
  const res = await request({
    url: `${url.VUE_APP_DIANA_URL}/api/commonConfig/list/configOption/referral`,
    method: 'get'
  })
  return res.result
}
export const saveReferralTag = async (data: Object) => {
  return await request({
    url: `${url.VUE_APP_DIANA_URL}/referral/tag/saveReferralTag`,
    method: 'post',
    data
  })
}
export const saveFollowLabel = async (data: Object) => {
  return await request({
    url: `${url.VUE_APP_DIANA_URL}/referral/tag/saveFollowLabel`,
    method: 'post',
    data
  })
}
export const checkCustomerExist = async (data: Object) => {
  const res = await request({
    url: `${url.VUE_APP_DIANA_URL}/customer/checkCustomerExist`,
    method: 'post',
    data
  })
  return res.result
}
export const saveHouseMember = async (data: Object) => {
  return await request({
    url: `${url.VUE_APP_DIANA_URL}/customer/saveHouseMember`,
    method: 'post',
    data
  })
}
export const deleteHouseMember = async (params: Object) => {
  return await request({
    url: `${url.VUE_APP_DIANA_URL}/customer/deleteHouseMember`,
    method: 'get',
    params
  })
}
// 订单，工具栏访客页
export const getCustomerOrder = async (params: Object) => {
  const res = await request({
    url: `${url.VUE_APP_BLACKSAM_URL}/admin/order/customerSystem/list`,
    method: 'get',
    params
  })
  return res.result
}
// 订单，线索关联订单
export const getBindOrderList = async (params: Object) => {
  const res = await request({
    // url: `http://10.39.68.64:8085/referral/pageOtherBindOrder`,
    url: `${url.VUE_APP_DIANA_URL}/referral/pageOtherBindOrder`,
    method: 'get',
    // params: { referralId: '263778', mobile: '15996255019' }
    params
  })
  return res.result
}
// 订单，客户详情页
export const getCustomerReferralOrder = async (customerId: string) => {
  const res = await request({
    url: `${url.VUE_APP_DIANA_URL}/api/referral/customerReferralOrderPage`,
    method: 'get',
    params: { customerId: customerId, pageSize: 100, page: 1 }
  })
  return res.result
}
export const getReferralOrder = async (referralId: string) => {
  const res = await request({
    url: `${url.VUE_APP_DIANA_URL}/api/referral/referralOrderPage`,
    method: 'get',
    params: { referralId, pageSize: 100, page: 1 }
  })
  return res.result
}

// 获取客户分页数据
export interface CustomerlHistory {
  belongProject: string
  cityCode: string
  cityName: string
  id: number
  referralId: number
  name: string
  customerSource: string | number
  referralTime: string
  mobile?: string
}
export interface CustomerlHistoryList {
  records: CustomerlHistory[]
  current: number
  pages: number
}
export const getCustomerPublicPage = async (params: Object) => {
  const res = await request({
    url: `${url.VUE_APP_DIANA_URL}/api/customer/page`,
    method: 'get',
    params
  })
  const records: CustomerlHistoryList = res?.result
  return records
}

// 获取客户详情数据
export interface HouseInfoType {
  provinceCode: string
  provinceName: string
  cityCode: string
  cityName: string
  projectCode: string
  projectName: string
  buildingCode: string
  buildingName: string
  houseCode: string
  houseName: string
  customerRole: number
  houseType: string
  memberList: { [x: string]: string }[]
}
export interface CustomerDetailType {
  id: string
  userId: string
  mobile: string
  name: string
  cityCode: string
  customerTag: string[]
  customerHouse: HouseInfoType[]
  status: number
  followFlag: boolean | undefined
}
export const getCustomerDetail = async (id: string, flag: string) => {
  const res = await request({
    url: `${url.VUE_APP_DIANA_URL}/customer/${id}`,
    method: 'get',
    params: { flag }
  })
  const result: CustomerDetailType = res?.result
  return result
}

// 获取客户转介数据
export interface CustomerReferralType {
  createdTime: string
  customerSource: number
  id: string
  intentionDescription: string
  intentionType: string
  currentFollowerFlag: boolean
  status: number
  locked: number
}
export const getCustomerReferral = async (id: string) => {
  const res = await request({
    url: `${url.VUE_APP_DIANA_URL}/referral/${id}`,
    method: 'get'
  })
  const result: CustomerReferralType[] = res?.result
  return result
}

// 更新客户房屋信息
interface UpdateCustomerDetailType {
  houseList: HouseInfoType[]
  customerId: number | string
}
export const updateCustomerDetail = async (data: UpdateCustomerDetailType) => {
  return await request({
    url: `${url.VUE_APP_DIANA_URL}/customer`,
    method: 'put',
    data
  })
}

// 获取客户跟进记录
export interface RecordInfoType {
  recordId: number
  content: string
  createdTime: string
  followerMobile: string
  followerName: string
  orderInfo: {
    categoryName: string
    code: string
    createdTime: string
    finishPaidTime: string
  }
}
export interface FollowRecordType {
  recordList: RecordInfoType[]
  id: number
  status: number
  followerName: string
  followerMobile: string
  show: boolean
  fold: boolean
  followUpTagArray: string[]
}
export const getReferralFollowRecord = async (customerId: string) => {
  const res = await request({
    url: `${url.VUE_APP_DIANA_URL}/referralFollowRecord/${customerId}`,
    method: 'get'
  })
  const result: FollowRecordType[] = res?.result
  return result
}

// 确认客户是否有效、添加跟进记录、延期、结束客户跟进
interface UpdateFollowType {
  type: number
  customerId?: number
  referralId?: number | string
  valid?: number
  content?: string
}
export const UpdateFollow = async (data: UpdateFollowType) => {
  return await request({
    url: `${url.VUE_APP_DIANA_URL}/referral`,
    method: 'put',
    data
  })
}
// 是否同意跟进
export const AgreeFollow = async (data: object) => {
  return await request({
    url: `${url.VUE_APP_DIANA_URL}/referral/agreeFollowOrNot`,
    method: 'post',
    data
  })
}
// 批量指派、改派
interface AssignOrReassignType {
  type: number
  customerIdList: number[]
  followerMobile: string
  followerId: number
  deliveryPlanId?: number
  followerName?: string
}
export const AssignOrReassign = async (data: AssignOrReassignType) => {
  return await request({
    url: `${url.VUE_APP_DIANA_URL}/referral/assignOrReassign`,
    method: 'put',
    data
  })
}

/* 访客 */
// 企微外部联系人信息
export const getExternalUser = async (externalUserId: string) => {
  const res = await request({
    url: `${url.VUE_APP_DIANA_URL}/qyWeixin/getExternalUser`,
    method: 'get',
    params: { externalUserId }
  })
  return res.result
}

// 查询访客
export const getVisitor = async (externalUserId: string) => {
  const res = await request({
    url: `${url.VUE_APP_DIANA_URL}/api/visitor/getVisitor`,
    method: 'get',
    params: { externalUserId }
  })
  return res.result
}

// 保存访客
export const saveVisitor = async (data: Object) => {
  return await request({
    url: `${url.VUE_APP_DIANA_URL}/api/visitor/saveVisitor`,
    method: 'post',
    data
  })
}

// 手机号查询线索
export const getCluesByMobile = async (mobile: string) => {
  const res = await request({
    url: `${url.VUE_APP_DIANA_URL}/api/visitor/getReferralList`,
    method: 'get',
    params: { mobile }
  })
  return res.result
}

// 手机号查询房屋
export const getHouseByMobile = async (mobile: string) => {
  const res = await request({
    url: `${url.VUE_APP_DIANA_URL}/api/visitor/getHouseList`,
    method: 'get',
    params: { mobile }
  })
  return res.result
}

// 修改客户意向类型
export const updateIntentionType = async (data: Object) => {
  return await request({
    url: `${url.VUE_APP_DIANA_URL}/api/referral/updateIntentionType`,
    method: 'post',
    data
  })
}

// 结束跟进复核
export const approveTerminate = async (data: Object) => {
  return await request({
    url: `${url.VUE_APP_DIANA_URL}/referral/terminateApprove`,
    method: 'post',
    data
  })
}

// 转介绑定订单
export const referralBindOrder = async (data: Object) => {
  return await request({
    url: `${url.VUE_APP_DIANA_URL}/api/referral/bindOrder`,
    method: 'post',
    data
  })
}
/* 被指派员工PA列表 */
export const getPaList = async (customerId: number, params: object) => {
  const res = await request({
    url: `${url.VUE_APP_DIANA_URL}/api/referral/assign/pa/list/${customerId}`,
    method: 'get',
    params
  })
  return res.result
}
export interface IDASHBOARD {
  totalCounts: string
  warningCounts: number
}
/* dashbord可跟进客户统计—公池*/
export const canFollowCounts = async (currentDeliveryPlanId: string) => {
  const res = await request({
    url: `${url.VUE_APP_DIANA_URL}/api/referral/counts/canFollowCounts`,
    method: 'GET',
    params: {
      currentDeliveryPlanId
    }
  })
  const result: IDASHBOARD = res?.result
  return result
}

/* dashbord跟进中客户统计—公池*/
export const followingCounts = async (currentDeliveryPlanId: string) => {
  const res = await request({
    url: `${url.VUE_APP_DIANA_URL}/api/referral/counts/followingCounts`,
    method: 'GET',
    params: {
      currentDeliveryPlanId
    }
  })
  const result: IDASHBOARD = res?.result
  return result
}
