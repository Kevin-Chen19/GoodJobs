import { createRouter, createWebHashHistory } from 'vue-router'
import login from '../views/Login/login.vue'
import register from '../views/register/register.vue'
import mainBox from '../views/mainBox.vue'
import routesConfig from './config'
import store from '../store/index'
import { useJobStore } from '@/store/pinia_Job'
import { useSearchStore } from '@/store/searchPinia'

const routes = [
  {
    path:'/login',
    name: 'login',
    component:login
  },
  {
    path:'/',
    name: 'login',
    component:login
  },
  {
    path:'/register',
    name: 'register',
    component:register
  },
  {
    path:'/mainBox',
    name: 'mainBox',
    component:mainBox
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition; // 如果有保存的位置，则恢复
    } else {
      return { top: 0 }; // 否则滚动到顶部
    }
  },
})
router.beforeEach((to, from, next) => {
  const jobStore = useJobStore()
  const searchStore = useSearchStore()
  if(to.path == '/recommend' && from.path !== '/home'){
    jobStore.ifToOtherPage = true
    console.log("路由守卫",)
  }
  if(to.path == '/searchJob' && from.path !== '/home'){
    searchStore.ifToOtherPage = true
  }
   next();
});
routesConfig.forEach(item=>{
  router.addRoute('mainBox',item)
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
        path:"/"
      })
    }else{
      if (!store.state.isGetterRouter) {
        //删除所有的嵌套路由
        router.removeRoute('mainBox')
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
      component:mainBox
    })
  }
  routesConfig.forEach(item=>{
    /*checkPermission(item) &&*/ router.addRoute('mainbox',item)
  })
//改变isGetterRouter的值，表示已经获取过路由了
  store.commit("changeGetterRouter",true)
}

export default router
