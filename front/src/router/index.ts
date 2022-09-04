import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import store from '@/store/index'
import BusinessOpportunity from './BusinessOpportunity'
import SampleRoomClose from './SampleRoomClose'
import Customer from './Customer'
import Deposit from './Deposit'
import SaveData from './save-data'
import activity from './activity'
const Login = () => import(/* webpackChunkName: "Login" */ '@/pages/login.vue')
const Activity = () => import(/* webpackChunkName: "Activity" */ '@/pages/activity.vue')
const getCoupon = () => import(/* webpackChunkName: "getCoupon" */ '@/pages/common/GetCoupon.vue')
const mobileLogin = () => import(/* webpackChunkName: "mobileLogin" */ '@/pages/mobile-login.vue')
const personal = () => import(/* webpackChunkName: "personal" */ '@/pages/personal/index.vue')

// 1. 定义路由组件.
// 也可以从其他文件导入
const routes = [
  {
    path: '/login',
    component: Login,
    meta: {
      title: '登陆'
    }
  },
  {
    path: '/mobile-login',
    component: mobileLogin,
    meta: {
      title: '手机号登录'
    }
  },
  {
    path: '/activity',
    component: Activity,
    meta: {
      title: '万物云美居内购',
      isAuth: false
    }
  },
  {
    path: '/personal-center',
    component: personal,
    meta: {
      title: '个人中心'
    }
  },
  {
    path: '/get-coupon',
    component: getCoupon,
    meta: {
      title: '领取优惠券',
      isAuth: false
    }
  },
  ...BusinessOpportunity,
  ...SampleRoomClose,
  ...Customer,
  ...Deposit,
  ...SaveData,
  ...activity
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
  scrollBehavior(to, from, savedPosition) {
    // 保存页面滚动的位置
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  NProgress.start()

  // 不需要登录
  if (to.meta.noLogin) next()
  // 判断是否头里面带access_token
  if (to.query.access_token) {
    // 从登录系统跳转回来，url会带上access_token，把access_token存进cookie，并去掉url里面的access_token重新跳转
    localStorage.setItem('access_token', to.query.access_token as string)
    console.log(to.query.access_token, 'to.query.access_token')
    store.dispatch('getInfo')
    if (to.query.role && to.query.orgCode) {
      const role = to.query.role
      const orgCode = to.query.orgCode
      store.commit('setMobileRole', { role, orgCode })
    }
    //替换掉含token的路由保证返回不会再次走到这条判断 保留其他query
    const query = to.query
    delete query.access_token
    router.replace({ path: to.path, query })
  } else {
    // 链接没带access_token
    if (to.path !== '/login') {
      // 对于不要验证的页面直接放行
      if (to.meta.isAuth === false) {
        next()
      } else {
        // 如果不是去登录页，检查里面有没有access_token，没有跳到登录页
        next()
        // localStorage.getItem('access_token') ? next() : next('/login')
      }
    } else {
      next()
    }
  }
})

router.afterEach((to, from) => {
  NProgress.done()
})

export default router
