import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { createPinia } from 'pinia'
const pinia = createPinia()
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(store).use(router).use(ElementPlus).use(pinia).mount('#app')

