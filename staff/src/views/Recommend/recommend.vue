<template>
  <div class="bigBox">
    <div class="leftBox">
      <div class="kindBox" v-for="item in menu" @click="chooseMenu(item)" :class="{ menuActive : selectMenu === item}">{{ item }}</div>
    </div>
    <div class="rightBox">
      <div class="rightTop">
        <p>根据求职意向推荐适合你的职位</p>
        <div class="topRight">
          <el-dropdown @command="handleCommandOne">
            <el-button >
              {{ select1 }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="item in education" :command="item">{{ item }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-dropdown @command="handleCommand2">
            <el-button >
              {{ select2 }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="item in character" :command="item">{{ item }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="jobItem" v-for="item in showJobs" @click="goToJobDetail(item)">
        <div class="jobTop">
          <h4>{{ item.jobName }}</h4>
          <p>{{ item.salary }}</p>
        </div>
        <div class="jobTags">
          <p v-for="tag in item.tags">{{ tag }}</p>
        </div>
        <div class="jobBottom">
          <div class="companyMess">
            <div class="companyLogo">
              <img :src="photo(item.companyMessage.companyLogo)" />
            </div>
            <div class="companyName">{{ item.companyMessage.companyName }}</div>
            <div class="companyOthers">{{ item.companyMessage.companyIndustry }}</div>
            <div class="companyOthers">{{ item.address }}</div>
            <div class="companyOthers">{{ item.companyMessage.staffNumber }}</div>
          </div>
          <div class="jobBtn">
            立即投递
          </div>
        </div>
      </div>
      <div class="noMore" v-if="ifNoMore">
          暂无更多。。。
      </div>
      <div class="getMoreBtn" @click="getJobs()" v-if="!ifNoMore">更多职位</div>
    </div>
  </div>
  <backTop></backTop>
</template>

<script setup>
import backTop from "@/components/backTop.vue";
import { ArrowDown } from '@element-plus/icons-vue'
import { ref, reactive ,watch, onMounted} from "vue";
import axios from "axios";
import store from "@/store";
import router from "@/router";
import { useJobStore } from "../../store/pinia_Job";
const jobStore = useJobStore()
const menu = ref(["最新推荐"])
const education = ["不限","高中","中专/中技","大专","本科","硕士"]
const character = ["不限","全职","兼职/临时","实习"]
const select1 = ref("学历")
const select2 = ref("工作性质")
const selectMenu = ref("最新推荐")
const pageNum = ref(1)
const showJobs = reactive([])
const ifNoMore = ref(false)
watch([select1,select2,selectMenu], () => {
  console.log("变化了",select1.value,select2.value,selectMenu.value)
  console.log("ifToOtherPage",jobStore.ifToOtherPage)
  //判断是否是从其他界面回到本界面
  if(!jobStore.ifToOtherPage){
    pageNum.value = 1
    showJobs.splice(0,showJobs.length)
    getJobs()
  }
  //当在当前界面点击不同分类后再允许下次获取新数据（滞后性是因为当其他界面回到本界面时watch会先于getJobs执行)
  jobStore.ifToOtherPage = false
}, { deep: true });
const handleCommandOne = (command) => {
  select1.value = command
  jobStore.select1 = command
}
const chooseMenu = (command) => {
  selectMenu.value = command
  jobStore.selectMenu = command
}
const handleCommand2 = (command) => {
  select2.value = command
  jobStore.select2 = command
}
const getJobs = ()=> {
   axios.get('/staffapi/jobs/KindList', {
    params: {
      pageNum: pageNum.value,
      kinds:[selectMenu.value === "最新推荐" ? "不限" : selectMenu.value],
      type: select2.value,
      select1: select1.value,
      subject: '不限',
      address1:["全国"],
      select2:'公司行业',
      select3: '公司规模',
    }
  }).then((res) => {
    console.log(res.data.jobsKindList)
    showJobs.push(...res.data.jobsKindList)
    pageNum.value ++ 
    if(res.data.jobsKindList.length < 5){
      ifNoMore.value = true
      jobStore.ifNoMore = true
    }else{
      ifNoMore.value = false
      jobStore.ifNoMore = false
    }
    //更新pinia
    jobStore.reset()//重置
    jobStore.jobList.push(...showJobs)
    jobStore.pageNum = pageNum.value
    jobStore.ifNoMore = ifNoMore.value
    jobStore.select1 = select1.value
    jobStore.select2 = select2.value
    jobStore.selectMenu = selectMenu.value
  })
}
//匹配公司标志
const photo = (url) => {
  return url
    ? "http://localhost:3000" + url
    : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
};
onMounted(() => {
  axios.get("/staffapi/user/getCurriculum/"+ store.state.userInfo.username).then((res) => {
    console.log(res.data.data[0].jobKinds)
    menu.value.push(...res.data.data[0].jobKinds)
  })
  console.log("jobList",jobStore.jobList);
  if(jobStore.jobList.length === 0){
    getJobs()
  }else{
    Object.assign(showJobs,jobStore.jobList)
    pageNum.value = jobStore.pageNum
    select1.value = jobStore.select1
    select2.value = jobStore.select2
    selectMenu.value = jobStore.selectMenu
    ifNoMore.value = jobStore.ifNoMore
  }
  ifChange()
})
const goToJobDetail = (value)=>{
  router.push({
    path: "/detail",
    query: {
      job: JSON.stringify(value)
    }
  })
}
const ifChange = ()=>{
  let change = true
  if(select1.value === "学历" && select2.value === "工作性质" && selectMenu.value === "最新推荐"){
    change = false
  }
  if(!change){
    jobStore.ifToOtherPage = false
  }
}

</script>

<style lang="scss" scoped>
.bigBox{
  display: flex;
  margin-top: 30px;
  width: 100%;
}
.leftBox{
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-left: 20px;
  width: 18%;
  border-radius: 15px;
  background-color: #fff;
  
  .kindBox{
    width: 90%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    margin: 10px 0;
    background-color: #f5f7fc;
  }
  .kindBox:hover{
    cursor: pointer;
    background-color: rgba(207, 207, 218, 0.439);
    color: rgba(0, 64, 255, 0.676);
  }
  .menuActive{
  background-color: rgba(207, 207, 218, 0.439);
  color: rgba(0, 64, 255, 0.676);
}
}
.rightBox{
  margin-left: 40px;
  width: 65%;
}
.rightTop{
  width: 100%;
  height: 40px;
  background-color: #fff;
  border-radius: 15px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.topRight{
  display: flex;
  .el-button{
    background-color: #fff;
    color: black;
    border: none;
  }
}
.jobItem{
  width: 97.5%;
  background-color: #fff;
  border-radius: 15px;
  margin-top: 20px;
  padding: 20px 25px;
}
.jobItem:hover{
  box-shadow: 15px 10px 10px #d5ddf1;
  .jobBtn{
    background-color: rgba(6, 70, 233, 0.866);
    color: white;
  }
  .jobBtn:hover{
    cursor: pointer;
    background-color: #cfd8e5ac;
    color: black;
  }
}

.jobTop{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  p{
    font-size: 14px;
    font-weight: 600;
    color: rgba(0, 0, 255, 0.593);
  }
}
.jobTags{
  display: flex;
  margin-bottom: 20px;
  p{
    padding: 5px;
    font-size: 14px;
    border-radius: 5px;
    color: gray;
    background-color: rgba(235, 231, 231, 0.764);
    margin-right: 10px;
  }
}
.jobBottom{
  display: flex;
  justify-content: space-between;
  align-items: center;
  .companyMess{
    display: flex;
    div{
      margin-right: 10px;
      line-height: 35px;
    }
    .companyLogo{
      width: 35px;
      height: 35px;
      border-radius: 10px;
      border: 1.5px solid black;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .companyOthers{
      color: rgba(128, 128, 128, 0.71);
    }

  }
}
.jobBtn{
  padding: 7px 20px;
  background-color:#eff4ff;
  border-radius: 15px;
  color: blue;
}
.jobBtn:hover{
  cursor: pointer;
  background-color: #cfd8e5ac;
  color: black;
}
.noMore{
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: gray;
  font-size: 18px;
}
.getMoreBtn{
  display: flex;
  margin-left: 40%;
  justify-content: center;
  padding: 10px 0;
  width: 150px;
  align-items: center;
  background-color: #099bef5a;
  border-radius: 25px;
  color: rgba(0, 72, 255, 0.693);
  margin-top: 20px;
  font-size: 18px;
  font-weight: 600;
}
.getMoreBtn:hover{
  cursor: pointer;
  background-color: #42adeb5a;
  color: rgba(17, 0, 255, 0.693);
}
</style>