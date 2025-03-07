import { defineStore } from 'pinia'
import { ref ,reactive} from 'vue'

export const useSearchStore = defineStore('jobs', ()=>{
  //定义 state 状态
  const pageNum = ref(1)
  const subject = ref("不限")
  const address1 = reactive(["全国"])
  const kinds = reactive(["不限"])
  const jobtype = ref("不限")
  const type = ref(0)
  const select1 = ref("学历")
  const select2 = ref("公司行业")
  const select3 = ref("公司规模")
  const input2 = ref('')
  const jobList = reactive([])//展示的职位数组
  const ifNoMore = ref(false)//是否还有更多
  const ifToOtherPage = ref(false)//是否跳转到其他页面
  const selectedIndex = ref(0);
  const reset = () => {
    pageNum.value = 1
    subject.value = "不限"
    address1.splice(0,address1.length,"全国")
    kinds.splice(0,kinds.length,"不限")
    jobtype.value = "不限"
    type.value = 0
    select1.value = "学历"
    select2.value = "公司行业"
    select3.value = "公司规模"
    input2.value = ''
    jobList.splice(0,jobList.length)
    ifNoMore.value = false//是否还有更多
    ifToOtherPage.value = false//是否跳转到其他页面
    selectedIndex.value = 0
  }
  return {
    pageNum,
    subject,
    address1,
    kinds,
    jobtype,
    type,
    select1,
    select2,
    select3,
    input2,
    jobList,
    ifNoMore,
    ifToOtherPage,
    selectedIndex,
    reset
  }
})