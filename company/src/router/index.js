import { createRouter, createWebHashHistory } from 'vue-router'
import login from '../views/login.vue'
import companyhome from '../views/companyHome/home.vue'
import mainbox from '../views/Mainbox.vue'
import routesConfig from './config'
import store from '../store/index'
const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/companyHome',
    name: 'companyhome',
    component: companyhome
  },
  {
    path: '/mainbox',
    name: 'mainbox',
    component: mainbox
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

routesConfig.forEach(item=>{
  router.addRoute('mainbox',item)
})

//路由守卫，路由拦截
//每次路由跳转之前都会执行这个函数
router.beforeEach((to,from,next)=>{
  if (to.name == 'login') {
    next()
  }else{
    //如果已经授权登录过了，则next()放行跳转
    //若未授权则重定向到login
    if (!localStorage.getItem("token")) {
      next({
        path:"/login"
      })
    }else{
      if (!store.state.isGetterRouter) {
        //删除所有的嵌套路由
        router.removeRoute('mainbox')
        configRouter()
        next({
          path:to.fullPath
        })
      }else{
        next()
      }      
    }
  }
})

const configRouter = ()=>{
  if(!router.hasRoute('mainbox')){
    router.addRoute({
      path:'/mainbox',
      name:'mainbox',
      component:mainbox
    })
  }
  routesConfig.forEach(item=>{
    checkPermission(item) && router.addRoute('mainbox',item)
  })
//改变isGetterRouter的值，表示已经获取过路由了
  store.commit("changeGetterRouter",true)
}
const checkPermission = (item)=>{
if (item.requireAdmin) {
  console.log("身份校验：",store.state.userInfo.role === 1)
    return (store.state.userInfo.role === 1)
  }else{
    return true
  }
}
export default router
