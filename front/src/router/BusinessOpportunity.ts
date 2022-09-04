const create = () =>
  import(
    /* webpackChunkName: "BusinessOpportunityCreate" */ '@/pages/BusinessOpportunity/create/index.vue'
  )
const index = () =>
  import(/* webpackChunkName: "BusinessOpportunityIndex" */ '@/pages/BusinessOpportunity/index.vue')
const detail = () =>
  import(
    /* webpackChunkName: "BusinessOpportunityDetail" */ '@/pages/BusinessOpportunity/detail.vue'
  )
const selectRecommend = () =>
  import(
    /* webpackChunkName: "SelectRecommend" */ '@/pages/BusinessOpportunity/SelectRecommend.vue'
  )

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
export default [
  {
    path: '/businessCreate',
    component: create,
    meta: {
      title: '转介客户',
      keepAlive: true
    }
  },
  {
    path: '/business',
    component: index,
    meta: {
      title: '历史转介'
    }
  },
  {
    path: '/businessDetail',
    component: detail,
    meta: {
      title: '转介详情'
    }
  },
  {
    path: '/selectRecommend',
    component: selectRecommend,
    meta: {
      title: '选择推荐人'
    }
  }
]
