import { createStore } from 'vuex'
import user from './user'
import SampleRoomClose from './SampleRoomClose'
import createPersistedState from 'vuex-persistedstate'
// 创建一个新的 store 实例
const store = createStore({
  modules: {
    user,
    SampleRoomClose
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })]
})

export default store
