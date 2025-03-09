import companyIndex from '../views/companyIndex/companyIndex.vue'
import jobsCenter from '@/views/jobsCenter/jobsCenter.vue'
import chat from '@/views/chat/chat.vue'
const routesConfig = [
  {
    path:'/companyIndex',
    component:companyIndex
  },
  {
    path:'/jobsCenter',
    component:jobsCenter
  },
  {
    path:'/chat',
    component:chat
  }
]
export default routesConfig