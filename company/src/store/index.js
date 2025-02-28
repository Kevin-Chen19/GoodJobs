import { createStore } from 'vuex'

import createPersistedState from 'vuex-persistedstate'
export default createStore({
  state: {
    isGetterRouter:false,
    userInfo:{},
    companyMessage:{},
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
    changeCompanyMessage(state,value){
      state.companyMessage = {
        ...state.companyMessage,
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
    },
    clearCompanyMessage(state){
      state.companyMessage = {}
    }
  },
  actions: {
  },
  modules: {
  },
  plugins:[createPersistedState({
    paths:["userInfo","avatarUrl","companyMessage"]//指定需要持久化的状态
  })]
})
