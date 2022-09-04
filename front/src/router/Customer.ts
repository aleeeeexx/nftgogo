const list = () => import(/* webpackChunkName: "CustomerList" */ '@/pages/Customer/list.vue')
const detail = () => import(/* webpackChunkName: "CustomerDetail" */ '@/pages/Customer/detail.vue')
const info = () => import('@/pages/Customer/info.vue')
const staffList = () => import('@/pages/Customer/staffList.vue')
const relateOrderList = () => import('@/pages/Customer/detail/relateOrderList.vue')
const infoHouse = () => import('@/pages/Customer/info/infoHouse.vue')
const editHouse = () =>
  import(/* webpackChunkName: "CustomerEditHouse" */ '@/pages/Customer/editHouse.vue')
const editMember = () => import('@/pages/Customer/editMember.vue')
const formSubmit = () =>
  import(/* webpackChunkName: "CustomerFormSubmit" */ '@/pages/Customer/formSubmit.vue')
const referralHistory = () =>
  import(/* webpackChunkName: "CustomerReferralHistory" */ '@/pages/Customer/referralHistory.vue')

export default [
  {
    path: '/customerList',
    component: list,
    meta: {
      title: '客户列表',
      keepAlive: true
    }
  },
  {
    path: '/customerDetail',
    component: detail,
    meta: {
      title: '客户详情'
    }
  },
  {
    path: '/customerInfo',
    component: info,
    meta: {
      title: '客户信息'
    }
  },
  {
    path: '/staffList',
    component: staffList,
    meta: {
      title: '员工列表'
    }
  },
  {
    path: '/relateOrderList',
    component: relateOrderList,
    meta: {
      title: '可关联订单列表'
    }
  },
  {
    path: '/customerInfoHouse',
    component: infoHouse,
    meta: {
      title: '房屋列表'
    }
  },
  {
    path: '/customerEditHouse',
    component: editHouse,
    name: 'editHouse',
    meta: {
      title: '编辑房屋'
    }
  },
  {
    path: '/customerEditMember',
    component: editMember,
    name: 'editMember',
    meta: {
      title: '编辑成员'
    }
  },
  {
    path: '/customerFormSubmit',
    component: formSubmit
  },
  {
    path: '/referralHistory',
    component: referralHistory,
    name: 'referralHistory',
    meta: {
      title: '历史转介'
    }
  }
]
