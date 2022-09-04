import request from '@/utils/request'
import * as url from './url'

// 获取样板间操作撤场记录
export const getDetail = async (sampleRoomId: number) => {
  const res = await request({
    url: `${url.VUE_APP_DIANA_URL}/sampleRoom/api/withdrawal/edit/details/${sampleRoomId}`,
    method: 'get'
  })
  return res.result as IDetail
}

// 【用户端】获取撤场记录列表
export function getCustomerList(mobile: string) {
  return request({
    url: `${url.VUE_APP_DIANA_URL}/sampleRoom/api/withdrawal/user/list/${mobile}`,
    method: 'get'
  })
}
//保存样板间撤场记录（费用） 空间物件费用
export interface IMoney {
  type: 1 | 2 | 3
  project?: string
  recordId?: number
  sampleRoomId: number
  id?: number | undefined
  degree?: number | string
  item?: string
  description?: string
  status?: number
  imageUrlArray?: string[]
  num?: number
  checkbox?: 0 | 1
}

export interface ICostVoList {
  id?: number | undefined
  project: string
  degree: number | string
}
export interface IProblemVoList extends IMoney {
  result?: IMoney
}
export interface ISpaceVoList {
  project: string
  itemVo: IMoney[]
}
export interface IThingVoList {
  id?: number
  num: number
  project: string
  status: 0 | 1
}
export interface IDetail {
  costVoList: ICostVoList[]
  problemVoList: IProblemVoList[]
  spaceVoList: ISpaceVoList[]
  thingVoList: IThingVoList[]
  viewFlag: 0 | 1
}
export function saveMoney(data: IMoney[]) {
  return request({
    url: `${url.VUE_APP_DIANA_URL}/sampleRoom/api/withdrawal/save`,
    method: 'POST',
    data
  })
}
export function editProblem(data: IMoney[]) {
  return request({
    url: `${url.VUE_APP_DIANA_URL}/sampleRoom/api/withdrawal/solve`,
    method: 'POST',
    data
  })
}

export interface IRoom {
  item: string[]
  project: string
}
export const getRoom = async (sampleRoomId: number) => {
  const res = await request({
    url: `${url.VUE_APP_DIANA_URL}/sampleRoom/api/withdrawal/space/${sampleRoomId}`,
    method: 'get'
  })
  return res.result as IRoom[]
}

interface ISpace extends IMoney {
  result?: IMoney
}
export interface IRecord {
  accepter: string
  createdTime: string
  finalCheckTime: string
  initiator: string
  spaceVoList: ISpace[]
  thingVoList: IThingVoList[]
  costVoList: ICostVoList[]
  status?: Number
}
// 获取样板间撤场详情
export const getRecord = async (sampleRoomId: number) => {
  const res = await request({
    url: `${url.VUE_APP_DIANA_URL}/sampleRoom/api/withdrawal/details/${sampleRoomId}`,
    method: 'get'
  })
  return res.result as IRecord
}
export const agree = async (sampleRoomId: number) => {
  const res = await request({
    url: `${url.VUE_APP_DIANA_URL}/sampleRoom/api/withdrawal/agree/${sampleRoomId}`,
    method: 'POST'
  })
  return res.result
}
