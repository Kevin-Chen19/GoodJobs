import home from '../views/Home/home.vue'
import recommend from '../views/Recommend/recommend.vue'
import searchJob from '../views/searchJob/searchJob.vue'
import person from '../views/Person/person.vue'
const routesConfig = [
  {
    path:'/home',
    component:home
  },
  {
    path:'/recommend',
    component:recommend
  },
  {
    path:'/searchJob',
    component:searchJob
  },
  {
    path:'/person',
    component:person
  }
]
export default routesConfig