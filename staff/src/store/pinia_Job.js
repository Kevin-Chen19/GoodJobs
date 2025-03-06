import { defineStore } from 'pinia'
import { ref ,reactive} from 'vue'

export const useJobStore = defineStore('job', ()=>{
  //定义 state 状态
  const jobList = reactive([]);
  const pageNum = ref(1);
  const select1 = ref("学历")
  const select2 = ref("工作性质")
  const selectMenu = ref("最新推荐")
  const ifNoMore = ref(false)
  const ifToOtherPage = ref(false)

  const reset = () => {
     jobList.splice(0,jobList.length)
     pageNum.value = 1
     select1.value = "学历"
     select2.value = "工作性质"
     selectMenu.value = "最新推荐"
     ifNoMore.value = false
     ifToOtherPage.value = false
  }
  return {
    jobList,
    pageNum,
    select1,
    select2,
    selectMenu,
    ifNoMore,
    ifToOtherPage,
    reset
  }
})