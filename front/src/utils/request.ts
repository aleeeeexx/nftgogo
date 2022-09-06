import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { Toast } from 'vant'
import store from '@/store/index'
import type { User } from '@/store/user'
import type { ComponentInstance } from 'vant/lib/utils/basic'
let BASE_URL
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:7001' //本地开发node后端地址
} else {
  BASE_URL = '' //后续生产地址
}
// import { useRouter } from 'vue-router'
interface ApiResult {
  code: number
  message: string
  // @ts-ignore
  //eslint-disable-next-line
  result?: any
}
axios.defaults.baseURL = BASE_URL
const instance = axios.create({
  // 超时时间 1 分钟
  timeout: 30 * 1000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const state = store.state as { user: User }
    const role = state.user.role
    const orgCode = state.user.orgCode
    const token = localStorage.getItem('access_token')
    config.headers = {
      Authorization: `Bearer ${token}`,
      token,
      ...config.headers,
      role,
      orgCode
    }
    return config
  },
  (err: AxiosError) => {
    Promise.reject(err)
  }
)
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (err: AxiosError) => {
    return Promise.reject(err)
  }
)

Toast.allowMultiple()
let reqNum = 0
let toast: ComponentInstance | undefined
const startLoading = () => {
  if (reqNum === 0) {
    toast = Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner',
      duration: 0
    })
  }
  reqNum++
}
const endLoading = () => {
  if (reqNum <= 0) return
  reqNum--
  if (reqNum === 0) {
    //loading结束
    toast && toast.clear()
  }
}

const request = (options: AxiosRequestConfig = {}, loading = true, delay = false) => {
  loading && startLoading()

  return new Promise<ApiResult>((resolve, reject) => {
    instance(options)
      .then((response: AxiosResponse) => {
        //结束loading，如果传了delay为true，则延迟150ms用于合并下一个串行请求
        setTimeout(
          () => {
            endLoading()
          },
          delay ? 150 : 0
        )
        if (response?.status === 200) {
          // 临时使用mock数据 使用mock数据 不验证code
          if (options.url?.includes('mock')) {
            const res: ApiResult = response.data
            return resolve(res)
          } else {
            if (response?.data?.code === 0) {
              return resolve(response.data)
            } else {
              return Promise.reject(response)
            }
          }
        } else {
          return Promise.reject(response)
        }
      })
      .catch(result => {
        if (result?.status === 200) {
          // code 非 0 情况
          Toast.fail(JSON.stringify(result?.data?.message).replace(/"/g, ''))

          if (result?.data?.code === -1) {
            //重新登陆 result?.data?.code === -2 ||
            // location.href = `${location.origin}/hasaki/#/login`
            const state = store.state as { user: User }
            if (state.user.isPulin) {
              resolve(result?.data)
            } else {
              Toast.fail('请登录后操作')
            }
          }
        } else if (result?.status && result?.status !== 200) {
          // 状态码非200情况
          Toast.fail(JSON.stringify(result?.data?.message).replace(/"/g, ''))
        } else {
          // 其他情况
          const message = JSON.stringify(result?.message).replace(/"/g, '')
          if (message.indexOf('Network') > -1) {
            Toast.fail('升级中...')
          } else if (message.indexOf('timeout') > -1) {
            Toast.fail('请求超时')
          } else {
            Toast.fail(message)
          }
        }
        endLoading()
        reject(result)
      })
  })
}
export default request
