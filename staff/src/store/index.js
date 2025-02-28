import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
export default createStore({
  state: {
    isGetterRouter:false,
    userInfo:{},
    avatarUrl:""
  },
  getters: {
  },
  mutations: {
    changeGetterRouter(state,value){
      state.isGetterRouter = value
    },
    changeUserInfo(state,value){
      state.userInfo = {
        ...state.userInfo,
        ...value
      }
    },
    changeAvatarUrl(state,value){
      state.avatarUrl = value
    },
    clearUserInfo(state){
      state.userInfo = {}
    },
    clearAvatarUrl(state){
      state.avatarUrl = ""
    }
  },
  actions: {
  },
  modules: {
  },
  plugins:[createPersistedState({
    paths:["userInfo","avatarUrl"]//指定需要持久化的状态
  })]
})
