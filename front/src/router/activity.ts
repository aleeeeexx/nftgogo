const InsidePurchase = () =>
  import(/* webpackChunkName: "InsidePurchase" */ '@/pages/activity/InsidePurchase.vue')

export default [
  {
    path: '/inside-purchase',
    component: InsidePurchase,
    meta: {
      title: '万物研选',
      noLogin: true
    }
  }
]
