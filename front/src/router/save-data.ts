const index = () => import(/* webpackChunkName: "SaveDataIndex" */ '@/pages/save-data/index.vue')
const success = () =>
  import(/* webpackChunkName: "SaveDataSuccess" */ '@/pages/save-data/success.vue')
const activity = () =>
  import(/* webpackChunkName: "SaveDataActivity" */ '@/pages/save-data/activity.vue')

export default [
  {
    path: '/save-data-index',
    component: index,
    meta: {
      title: '家装品质服务',
      noLogin: true
    }
  },
  {
    path: '/save-data-success',
    component: success,
    meta: {
      title: '提交成功',
      noLogin: true
    }
  },
  {
    path: '/save-data-activity',
    component: activity,
    meta: {
      title: '美居春季焕新活动',
      noLogin: true,
      keepAlive: true
    }
  }
]
