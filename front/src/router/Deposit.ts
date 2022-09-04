const rule = () => import(/* webpackChunkName: "DepositRule" */ '@/pages/Deposit/rule.vue')
const saleAfter = () => import(/* webpackChunkName: "SaleAfter" */ '@/pages/Deposit/SaleAfter.vue')
const saleAfterDetail = () =>
  import(/* webpackChunkName: "SaleAfterDetail" */ '@/pages/Deposit/SaleAfterDetail.vue')

export default [
  {
    path: '/DepositRule',
    component: rule,
    meta: {
      title: '美居用户购买须知',
      isAuth: false
    }
  },
  {
    path: '/SaleAfter',
    component: saleAfter,
    meta: {
      title: '填写售后信息'
    }
  },
  {
    path: '/SaleAfterDetail',
    component: saleAfterDetail,
    meta: {
      title: '售后详情'
    }
  }
]
