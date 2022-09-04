// 样板间撤场需求  https://www.figma.com/file/qLgeF6ViSGUnvQsIiNSTwA/%E6%A0%B7%E6%9D%BF%E9%97%B4%E6%92%A4%E5%9C%BA?node-id=1091%3A11303

const detail = () =>
  import(/* webpackChunkName: "SampleRoomCloseDetail" */ '@/pages/SampleRoomClose/detail.vue')
const create = () =>
  import(/* webpackChunkName: "SampleRoomCloseCreate" */ '@/pages/SampleRoomClose/create.vue')
const space = () =>
  import(/* webpackChunkName: "SampleRoomCloseSpace" */ '@/pages/SampleRoomClose/space.vue')
const room = () =>
  import(/* webpackChunkName: "SampleRoomCloseRoom" */ '@/pages/SampleRoomClose/room.vue')
const Return = () =>
  import(/* webpackChunkName: "SampleRoomCloseReturn" */ '@/pages/SampleRoomClose/return.vue')
const Handle = () =>
  import(/* webpackChunkName: "SampleRoomCloseHandle" */ '@/pages/SampleRoomClose/handle.vue')
export default [
  {
    path: '/SampleRoomCloseDetail',
    component: detail,
    meta: {
      title: '样板间撤场验收'
    }
  },
  {
    path: '/SampleRoomCloseCreate',
    component: create,
    meta: {
      title: '样板间撤场验收'
    }
  },
  {
    path: '/SampleRoomCloseSpace',
    component: space,
    meta: {
      title: '样板间验房'
    }
  },
  {
    path: '/SampleRoomCloseRoom',
    component: room,
    meta: {
      title: '房屋名称'
    }
  },

  {
    path: '/SampleRoomCloseReturn',
    component: Return,
    meta: {
      title: '归还物品'
    }
  },

  {
    path: '/SampleRoomCloseHandle',
    component: Handle,
    meta: {
      title: '验房遗留问题跟进'
    }
  }
]
