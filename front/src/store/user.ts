import { getUserInfo } from '@/api/user'
import { Commit } from 'vuex'
export interface BaseInfo {
  accessToken: string
  avatar_url: string
  created: string
  customer_type: string
  id: string
  im_id: string
  level_no: number
  main_house_code: string
  mobile: string
}

export interface User {
  isPulin: boolean // 是否是朴邻进入
  userId: string
  supplierId: string
  roleName: string
  categories: string // 所属范围
  role: string // 当前选中的角色
  orgCode: string
  orgName: string // 组织范围code
  info: BaseInfo //返回的用户信息
}
const user = {
  state: {
    userId: '',
    categories: '',
    roleName: '',
    role: '',
    orgCode: '',
    info: null,
    orgName: '',
    supplierId: '',
    isPulin: false
  },
  actions: {
    async getInfo({ commit }: { commit: Commit }) {
      const res = await getUserInfo()
      commit('setInfo', res)
    }
  },
  mutations: {
    deleteInfo(state: User) {
      state = Object.assign(state, {
        roleName: '',
        role: '',
        orgCode: '',
        info: null,
        categories: '',
        orgName: '',
        supplierId: ''
      })
    },
    setInfo(state: User, playLoad: BaseInfo) {
      state.info = playLoad
      state.userId = playLoad.id
    },
    // 为手机端没有选择角色设置默认角色
    setMobileRole(
      state: User,
      playLoad: {
        orgCode: string
        role: string
        id: string
      }
    ) {
      state.orgCode = playLoad.orgCode
      state.role = playLoad.role
      state.userId = playLoad.id
    },
    setRole(
      state: User,
      playLoad: {
        orgCode: string
        role: string
        id: string
        roleName: string
        categories: string
        orgName: string
        supplierId: string
      }
    ) {
      state.orgCode = playLoad.orgCode
      state.orgName = playLoad.orgName
      state.role = playLoad.role
      state.userId = playLoad.id
      state.roleName = playLoad.roleName
      state.categories = playLoad.categories
      state.supplierId = playLoad.supplierId
    },
    setIsPulin(state: User, isPulin: boolean) {
      state.isPulin = isPulin
    }
  }
}

export default user
