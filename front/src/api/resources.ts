import * as url from './url'
import request from '@/utils/request'
import axios from 'axios'
export const getProvince = () => {
  return request({
    url: `${url.VUE_APP_DIANA_URL}/region/province`,
    method: 'GET'
  })
}

export const getCity = (province: string) => {
  return request({
    url: `${url.VUE_APP_DIANA_URL}/region/city`,
    method: 'GET',
    params: { province }
  })
}
export const getProject = (city: string) => {
  return request({
    url: `${url.VUE_APP_DIANA_URL}/resource/project`,
    method: 'GET',
    params: { city }
  })
}

export const getHouse = (project: string) => {
  return request({
    url: `${url.VUE_APP_DIANA_URL}/resource/building`,
    method: 'GET',
    params: { project }
  })
}

export const getHome = (building: string) => {
  return request({
    url: `${url.VUE_APP_DIANA_URL}/resource/house`,
    method: 'GET',
    params: { building }
  })
}

export const upload = (file: Object) => {
  return axios
    .create({
      // 超时时间 1 分钟
      timeout: 60000,
      headers: {
        'Content-Type': 'multipart/form-data;'
      }
    })
    .post(`${url.VUE_APP_UPLOAD_URL}`, file)
}
