import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
export default createStore({
  state: {
    isGetterRouter:false,
    userInfo:{},
    lastLook:[]
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
    changeLastLook(state,value){
      const isExist = state.lastLook.some(item=>item._id === value._id)
      if(!isExist){
        if(state.lastLook.length<3){
          state.lastLook.push(value)
        }else{
          state.lastLook.splice(0,1)
          state.lastLook.push(value)
        }
      }
    },
      clearUserInfo(state){
        state.userInfo = {}
      },
      clearLastLook(state){
        state.lastLook = []
      } 
    },
  actions: {
  },
  modules: {
  },
  plugins:[createPersistedState({
    paths:["userInfo","lastLook"]//指定需要持久化的状态
  })]
})
