<template>
  <search @search="toSearch"></search>
  <div class="kindBox">
    <div class="selectTab">
      <div class="selectItem"
      v-for="(option, index) in options"
      :key="index"
      :class="{ kindActive :  selectedIndex === index  }"
      @click="selectOption(index)"
    >
      {{ option.label }}
      </div>
    </div>
    <div class="kindItems">
      <div class="itemLine" v-if="selectedIndex === 0">
        <div class="bigKind">专业分类</div>
        <div class="kindRight">
          <div class="moreKind" v-for="(item , index) in kind1" @click="selectSubject(index)" :class="{select : subject === item}">{{item}}</div>
          <div class="tomore" @click="getMoreSubject(0)">更多专业</div>
        </div>
      </div>
      <div class="itemLine" v-else>
        <div class="bigKind">职位类别</div>
        <div class="kindRight">
          <div class="moreKind" v-for="(item , index) in kind2" :class="{select : ifSelectKinds(item)}" @click="selectKinds(index)">{{item}}</div>
          <div class="tomore" @click="getMoreSubject(1)">更多职类</div>
      </div>
      </div>
      <div class="itemLine">
        <div class="bigKind">工作地点</div>
        <div class="kindRight">
          <div class="moreKind" v-for="(item , index) in address" :class="{select : ifSelectCity(item)}" @click="selectCity(index)">{{item}}</div>
          <div class="tomore" @click="getMoreSubject(2)">更多城市</div>
        </div>
      </div>
      <div class="itemLine">
        <div class="bigKind">职位类型</div>
        <div class="moreKind" v-for="(item , index) in jobType" @click="selectType(index)" :class="{select : type === index}">{{item}}</div>
      </div>
      <div class="itemLine">
        <div class="bigKind">其他筛选</div>
          <el-dropdown @command="handleCommand1">
            <div class="moreKind">
              {{ select1 }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="item in education" :command="item">{{ item }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-dropdown @command="handleCommand2">
            <div class="moreKind">
              {{ select2 }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="item in industry" :command="item">{{ item }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-dropdown @command="handleCommand3">
            <div class="moreKind">
              {{ select3 }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="item in companySize" :command="item">{{ item }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
      </div>
    </div>
    <div class="haveChoose">
      <div class="bigKind">已选条件:
        <div class="hadGet" v-if=" subject!=='' && selectedIndex == 0 ">已选专业：{{ subject }}</div>
        <div class="hadGet" v-if="kinds.length !== 0 && selectedIndex == 1">已选职类：<p v-for="item in kinds">{{ item }}</p></div>
        <div class="hadGet" v-if="address1.length !== 0">已选城市：<p v-for="item in address1">{{ item }}</p></div>
      </div>
    </div>
  </div>
  <div class="mainBox">
    <div class="mainLeft">
      <div class="jobItem"v-for="item in showJobs" @click="goToJobDetail(item)">
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
    </div>
    <div class="mainRight">
      <el-card class="leftBox" shadow="hover">广告区</el-card>
      <el-card class="leftBox" shadow="hover">广告区</el-card>
      <el-card class="leftBox" shadow="hover">广告区</el-card>
    </div>
  </div>
  <div class="getMoreBtn" @click="getMore()" v-if="!ifNoMore">更多职位</div>
  <backTop></backTop>
  <el-dialog
    v-model="centerDialogVisible"
    width="850"
    align-center
  >
    <template #header>
      <div class="my-header">
        <div class="top">
          <p>请选择{{ selectitems[selectWhich] }}</p>
        </div>
      </div>
    </template>
    <div v-if="selectWhich === 0">
      <moresubjects @select="getSubject"></moresubjects>
    </div>
    <div v-else-if="selectWhich === 1">
      <moreJobKinds :Kinds="kinds" @selectKinds="getKinds" @cancelKinds="cancelKinds"></moreJobKinds>
    </div>
    <div v-else-if="selectWhich === 2">
      <moreAddress :Citys="address1" @selectAdd="getAddress" @cancelAdd="cancel"></moreAddress>
    </div>
  </el-dialog>
</template>

<script setup>
import backTop from '@/components/backTop.vue';
import moresubjects from '@/components/moresubjects.vue';
import moreAddress from '@/components/moreAddress.vue';
import moreJobKinds from '@/components/moreJobKinds.vue';
import { ArrowDown,Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import search from '@/components/search.vue';
import { ref ,reactive ,onMounted ,watch} from 'vue';
import { useRouter } from 'vue-router';
import {useSearchStore} from '@/store/searchPinia'
const searchStore = useSearchStore()
import axios from 'axios';
const router = useRouter()
const input2 = ref('')
const centerDialogVisible = ref(false)
const selectWhich = ref(0)
const subject = ref("不限")
const address1 = reactive(["全国"])
const kinds = reactive(["不限"])
const jobtype = ref("不限")
const type = ref(0)
const showJobs = reactive([])//展示的职位数组
const pageNum = ref(1)//当前页数
const ifNoMore = ref(false)//是否还有更多
// 定义选项数组
const options = [
  { label: '按专业筛选' },
  { label: '按职类筛选' }
];
const selectitems = ["专业","职位","城市"]
const select1 = ref("学历")
const select2 = ref("公司行业")
const select3 = ref("公司规模")
const education = ["不限","高中","中专/中技","大专","本科","硕士"]
const industry = ["不限","IT服务","金融","教育","房地产","贸易","服务业"]
const companySize = ["不限","10~20人","150-500人","500-1000人","1000-5000人","5000-10000人","10000人以上"]
const kind1 = ["不限","电子商务","计算机科学与技术","软件工程","土木工程","财务管理","市场营销"]
const kind2 = ["不限","web前端","销售顾问","算法工程师","外贸业务员","人力资源专员/助理","后端程序员"]
const address = ["全国","北京","上海","广州","深圳","武汉","南京","苏州","天津","重庆","长沙"]
const jobType = ["不限","全职","兼职/临时","实习"]
// 定义一个响应式数据属性来跟踪选中的索引，默认为0（第一个选项）
const selectedIndex = ref(0);
const toSearch = (value) => {
  input2.value = value
  pageNum.value = 1
  getMore()
}
const getSearchJobs = (num)=>{
  axios.get("/staffapi/jobs/searchList",{params:{pageNum:num,keyword:input2.value}}).then((res)=>{
    console.log(res.data.jobsKindList)
    showJobs.splice(0,showJobs.length,...res.data.jobsKindList)
    if(res.data.jobsKindList.length < 5){
      ifNoMore.value = true
    }
  })
}
// 定义一个方法来处理选项的点击事件
function selectOption(index) {
  selectedIndex.value = index;
  if(index === 0){
    kinds.splice(0,kinds.length,...["不限"])
  }else{
    subject.value = "不限"
  }
}
const handleCommand1 = (command) => {
  select1.value = command
}
const handleCommand2 = (command) => {
  select2.value = command
}
const handleCommand3 = (command) => {
  select3.value = command
}
const selectType = (index) => {
  type.value = index
  jobtype.value = jobType[index]
}
const selectSubject = (index) => {
  subject.value = kind1[index]
}
const selectCity = (index) => {
  if(address1.includes(address[index])){
    ElMessage.error('您已经选择过了哦')
    return
  }
  if(address[index] !== "全国"){
    if (address1.includes("全国")) {
      address1.splice(address1.indexOf("全国"), 1);
    }
  }else if(address[index] === "全国"){
    address1.splice(0,address1.length,"全国")
    return
  }
  if(address1.length === 5){
    ElMessage.error('最多只能选择5个城市')
    return
  }
  address1.push(address[index])
}
const selectKinds = (index) =>{
  if(kinds.includes(kind2[index])){
    ElMessage.error('您已经选择过了哦')
    return
  }
  if(kind2[index] !== "不限"){
    if (kinds.includes("不限")) {
      kinds.splice(kinds.indexOf("不限"), 1);
    }
  }else{
    kinds.splice(0,kinds.length,"不限")
    return
  }
  if(kinds.length === 5){
    ElMessage.error('最多只能选择5个职类')
    return
  }
  kinds.push(kind2[index])
}
const getMoreSubject = ( id ) =>{
  centerDialogVisible.value = true
  selectWhich.value = id
}

const getSubject = (value)=>{
  subject.value = value
  centerDialogVisible.value = false
  console.log(subject.value)
}
const getAddress = (value)=>{
  address1.splice(0,address1.length,...value)
  centerDialogVisible.value = false
  console.log(address1)
}
const cancel = () =>{
  centerDialogVisible.value = false
}
const getKinds = (value) =>{
  kinds.splice(0,kinds.length,...value)
  centerDialogVisible.value = false
  console.log(kinds)
}
const cancelKinds = () =>{
 centerDialogVisible.value = false
}
const ifSelectCity =(city)=>{
  if(address1.includes(city)){
    return true
  }else{
    return false
  }
}
const ifSelectKinds = (value) =>{
  if(kinds.includes(value)){
    return true
  }else{
    return false
  }
}
//获取更多
const getMore = () => {
  if(input2.value === ""){
    getJobs()
  }else{
    getSearchJobs(pageNum.value)
    pageNum.value ++
  }
}
//获取职位
const getJobs = ()=> {
   axios.get('/staffapi/jobs/KindList', {
    params: {
      pageNum: pageNum.value,
      subject: subject.value,
      address1,
      kinds,
      type: jobtype.value,
      select1: select1.value,
      select2: select2.value,
      select3: select3.value,
    }
  }).then((res) => {
    console.log(res.data.jobsKindList)
    showJobs.push(...res.data.jobsKindList)
    pageNum.value ++ 
    if(res.data.jobsKindList.length < 5){
      ifNoMore.value = true
    }else{
      ifNoMore.value = false
    }
    //更新pinia
    searchStore.reset()//重置
    searchStore.jobList.push(...showJobs)
    searchStore.pageNum = pageNum.value
    searchStore.ifNoMore = ifNoMore.value
    Object.assign(searchStore.address1,address1)
    Object.assign(searchStore.kinds,kinds)
    searchStore.subject = subject.value
    searchStore.jobtype = jobtype.value
    searchStore.type = type.value
    searchStore.select1 = select1.value
    searchStore.select2 = select2.value
    searchStore.select3 = select3.value
    searchStore.selectWhich = selectWhich.value
    searchStore.input2 = input2.value
  })
}
//匹配公司标志
const photo = (url) => {
  return url
    ? "http://localhost:3000" + url
    : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
};
onMounted(() => {
  console.log(history.state.jobKind)
  if(history.state.jobKind === undefined){
    if(searchStore.jobList.length === 0 ){
      getJobs()
    }else{
      Object.assign(showJobs,searchStore.jobList)
      pageNum.value = searchStore.pageNum
      ifNoMore.value = searchStore.ifNoMore
      subject.value = searchStore.subject
      Object.assign(address1,searchStore.address1)
      Object.assign(kinds,searchStore.kinds)
      jobtype.value = searchStore.jobtype
      type.value = searchStore.type
      select1.value = searchStore.select1
      select2.value = searchStore.select2
      select3.value = searchStore.select3
      selectWhich.value = searchStore.selectWhich
      input2.value = searchStore.input2
    }
  }else{
  if(history.state.witch === true){
      selectedIndex.value = 0;
      subject.value = history.state.jobKind
    }else if(history.state.witch === false){
      selectedIndex.value = 1;
      kinds.splice(0,kinds.length,history.state.jobKind)
    }
  }
 
})
watch([subject, address1, kinds, jobtype,select1,select2,select3], () => {
  if(!searchStore.ifToOtherPage){
    pageNum.value = 1
    showJobs.splice(0,showJobs.length)
    getJobs()
  }
  searchStore.ifToOtherPage = false
  console.log("watch调用一次")
// 将 history.state.jobKind 设置为 undefined
  const currentState = history.state;
  const newState = {
    ...currentState, // 保留其他状态
    jobKind: undefined, // 设置 jobKind 为 undefined
  };
  // 使用 history.replaceState 更新 state
  history.replaceState(newState, '');

  }, { deep: true });
const goToJobDetail = (value)=>{
  router.push({
    path: "/detail",
    query: {
      job: JSON.stringify(value)
    }
  })
}
</script>
<style lang="scss" scoped>
.kindBox{
  width: 90%;
  height: 300px;
  margin-left: 5%;
}
.selectTab{
  display: flex;
}
.selectItem{
  display: flex;
  height: 50px;
  width: 120px;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-bottom: none;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  cursor: pointer;
}
.kindItems{
  width: 100%;
  height: fit-content;
  padding: 20px 10px;
  background-color: #fff;
  border-top-right-radius: 15px;
  border-bottom: 2px solid #e0e6f6;
}
.moreKind{
  padding: 3px 10px;
  cursor: pointer;
  margin-right: 30px;
}
.moreKind:hover , .tomore:hover{
  color: blue;
}
.tomore{
  font-size: 14px;
  font-weight: 500;
  color: rgb(152, 149, 149);
  cursor: pointer;
}
.kindActive{
 color: rgba(10, 10, 238, 0.502);
 font-weight: 600;
 background-color: #e0e6f6;
}
.itemLine{
  display: flex;
  margin-bottom: 20px;
  .kindRight{
    width: 90%;
    display: flex;
    justify-content: space-between;
}
}
.bigKind{
  font-weight: 600;
  margin-right: 30px;
  display: flex;
  align-items: center;
}
.haveChoose{
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  background-color: #fff;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  display: flex;
  align-items: center;
}
.el-tooltip__trigger{
  font-size: 16px;
  color: black;
}
.mainBox{
  display: flex;
  width: 91.5%;
  margin-left: 5%;
  margin-top: 20px;
  .mainLeft{
    width: 70%;
  }
  .mainRight{
    margin-left: 3%;
    width: 27%;
  }
}
.jobItem{
  width: 95%;
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
      display: flex;
      justify-content: center;
      align-items: center;
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

.leftBox{
  border-radius: 15px;
  width: 100%;
  height: 160px;
  margin-top: 20px;
}
.noMore{
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: gray;
  font-size: 18px;
}
.top{
  display: flex;
  height: 30px;
  line-height: 30px;
  margin-left: 20px;
  p{
    font-size: 18px;
    font-weight: 600;
    margin-right: 20px;
  }
}
.hadGet{
  font-size: 15px;
  font-weight: 400;
  padding: 5px 15px;
  border-radius: 10px;
  border: #056cfbac 1.5px solid;
  color: #056cfbac;
  margin-left: 10px;
  display: flex;
  p{
    margin-right: 5px;
  }
}
.select{
  border-radius: 15px;
  background-color: #099bef5a;
  color: rgba(0, 72, 255, 0.693);
}
.getMoreBtn{
  display: flex;
  margin-left: 30%;
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