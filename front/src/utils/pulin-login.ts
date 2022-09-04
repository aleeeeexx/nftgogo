import { getUserInfoByToken, refreshToken } from '@/api/user'
import { useRouter } from 'vue-router'

// 根据朴邻token查询用户信息
const getUserInfo = async (accessToken: string, companyCode: string) => {
  const res = await getUserInfoByToken(accessToken, companyCode)
  return res
}

// 刷新token
const reflesh = async (data: object) => {
  const res = await refreshToken(data)
  return res
}

interface TokenUserInfo {
  externalUserId: string
  mobile: string
  userId: string
  accessToken: string
  refreshToken: string
}

// 设置storage
export const setStorage = (userInfo: TokenUserInfo) => {
  const { externalUserId, mobile, userId, accessToken, refreshToken } = userInfo
  externalUserId && localStorage.setItem('externalUserId', externalUserId)
  mobile && localStorage.setItem('mobile', mobile)
  userId && localStorage.setItem('userId', userId)
  accessToken && localStorage.setItem('access_token', accessToken)
  refreshToken && localStorage.setItem('refreshToken', refreshToken)
}

// 朴邻跳转登录逻辑
export const useLogin = async (accessToken: string, companyCode: string, path: string) => {
  if (!accessToken || !companyCode) return false
  const router = useRouter()
  const userInfo = await getUserInfo(accessToken, companyCode)
  setStorage(userInfo)
  // 保存朴邻的token和companyCode
  localStorage.setItem('companyCode', companyCode)
  localStorage.setItem('pulin_token', accessToken)
  // // 本地保存的数据 --- 可用于刷新token
  const mobile = localStorage.getItem('mobile') as string
  const userId = localStorage.getItem('userId') as string
  const externalUserId = localStorage.getItem('externalUserId') as string
  const localRefreshToken = localStorage.getItem('refreshToken') as string
  // 校验手机号和本地一致并且刷新token所需数据存在，执行刷新token操作
  if (userInfo.mobile === mobile && externalUserId && localRefreshToken && userId) {
    try {
      // 刷新token
      const fleshUserInfo = await reflesh({
        externalUserId,
        userId,
        refreshToken: localRefreshToken
      })
      setStorage(Object.assign(fleshUserInfo, { mobile }))
    } catch (error) {
      // 刷新token失败去登录
      router.replace({
        path: '/mobile-login',
        query: {
          mobile: userInfo.mobile,
          redirect: encodeURIComponent(path)
        }
      })
    }
  } else {
    // 否则去登录
    console.log('useRouter(): ', router)
    // 去手机验证码登录页
    router.replace({
      path: '/mobile-login',
      query: {
        mobile: userInfo.mobile,
        redirect: encodeURIComponent(path)
      }
    })
  }
  return true
}
