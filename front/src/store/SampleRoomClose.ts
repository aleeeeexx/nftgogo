import { IDetail, IRoom } from '@/api/SampleRoomClose'
import { Commit } from 'vuex'

interface ISampleRoom extends IDetail, IRoom {}
const SampleRoomClose = {
  state: {
    costVoList: [],
    spaceVoList: [],
    thingVoList: [],
    problemVoList: [],
    item: [],
    viewFlag: 0,
    project: '' //空间的家具列表
  } as ISampleRoom,
  actions: {},
  mutations: {
    setSampleInfo(state: ISampleRoom, playLoad: IDetail) {
      console.log(playLoad)
      state.costVoList = playLoad.costVoList
      state.spaceVoList = playLoad.spaceVoList
      state.thingVoList = playLoad.thingVoList
      state.problemVoList = playLoad.problemVoList
      state.viewFlag = playLoad.viewFlag
    },
    setSampleItem(state: ISampleRoom, playLoad: IRoom) {
      state.item = playLoad.item
      state.project = playLoad.project
    }
  }
}

export default SampleRoomClose
