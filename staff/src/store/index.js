import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
export default createStore({
  state: {
    isGetterRouter:false,
    userInfo:{}
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
      clearUserInfo(state){
        state.userInfo = {}
      }
    },
  actions: {
  },
  modules: {
  },
  plugins:[createPersistedState({
    paths:["userInfo"]//指定需要持久化的状态
  })]
})
