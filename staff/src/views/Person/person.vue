<template>
  <div class="topLine"><p>在线简历</p></div>
  <div class="mainBox">
    <div class="left" ref="containerRef">
      <div class="first" id="part1">
        <el-upload
          class="upload-demo"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
          :on-change="handleChange"
          :auto-upload="false"
        >
          <div class="Avatar">
            <img v-if="!personMessage.avator" src= "/public/images/默认证件.png" alt="" />
            <img v-if="personMessage.avator" :src= "uploadAvatar"  />
          </div>
        </el-upload>
        <div class="baseMess">
          <div class="name_Edit">
            <div class="name">{{ personMessage.name }}</div>
            <div class="edit" @click="selects(1)">编辑</div>
          </div>
          <div class="personTags">
            <p>{{ personMessage.sex }}</p>
            <p class="col">|</p>
            <p>{{ personMessage.age }}岁</p>
            <p class="col">|</p>
            <p>{{ personMessage.address }}</p>
            <p class="col">|</p>
            <p>{{ personMessage.status }}</p>
          </div>
          <div class="phone_Emil">
            <p>手机：{{ personMessage.phone }}</p>
            <p>邮箱：{{ personMessage.email }}</p>
          </div>
        </div>
      </div>
      <div class="MessageItem" id="part2">
        <div class="itemTop">
          <div class="title">
            <img src="/public/icons/求职状态.png" />求职状态
          </div>
          <div class="edit" @click="selects(2)">编辑</div>
        </div>
        <div class="status">
          {{
            personMessage.jobStatus
              ? personMessage.jobStatus[0] + "---" + personMessage.jobStatus[1]
              : ""
          }}
        </div>
      </div>
      <div class="MessageItem" id="part3">
        <div class="itemTop">
          <div class="title">
            <img src="/public/icons/教育经历.png" />教育经历
          </div>
          <div class="additems" @click="(selectSome = -1 , selects(0) )">+ 添加教育经历</div>
        </div>
        <div
          class="educations"
          v-for="(item, index) in personMessage.education"
        >
          <div class="scoo">{{ item.schoolName }}</div>
          <div class="edub">
            <div class="ttm">
              <p>{{ item.eduBag }}</p>
              <p class="col">|</p>
              <p>{{ item.subject }}</p>
              <p>{{ item.times[0] + "--" + item.times[1] }}</p>
            </div>
            <p class="edit1" @click="(selectSome = index , selects(0) )">编辑</p>
          </div>
        </div>
      </div>
      <div class="MessageItem" id="part4">
        <div class="itemTop">
          <div class="title">
            <img src="/public/icons/求职意向.png" />求职意向
          </div>
          <div class="edit" @click="selects(4)">编辑</div>
        </div>
        <div class="jobKinds">
          <p>
            {{
              personMessage.jobKinds ? arrayString(personMessage.jobKinds) : ""
            }}
          </p>
        </div>
        <div class="jobRequest">
          <div class="items">薪资要求：{{ personMessage.salary }}</div>
          <div class="items">
            期望城市：{{
              personMessage.jobCity ? arrayString(personMessage.jobCity) : ""
            }}
          </div>
          <div class="items">
            工作性质：{{
              personMessage.jobType ? arrayString(personMessage.jobType) : ""
            }}
          </div>
        </div>
      </div>
      <div class="MessageItem" id="part5">
        <div class="itemTop">
          <div class="title">
            <img src="/public/icons/个人优势.png" />个人优势
          </div>
          <div class="edit" @click="selects(5)">编辑</div>
        </div>
        <div class="introduction">{{ personMessage.introduction }}</div>
      </div>
      <div class="MessageItem" id="part6">
        <div class="itemTop">
          <div class="title">
            <img src="/public/icons/工作经历.png" />工作/实习经历
          </div>
          <div class="additems" @click="(selectSome=-1,selects(6))">+ 添加工作经验</div>
        </div>
        <div
          class="jobExperience"
          v-for="(item, index) in personMessage.experience"
          @mouseenter="hover(0)"
          @mouseleave="outHover(0)"
        >
          <div class="company_time">
            <p class="company">{{ item.companyName }}</p>
            <p v-if="!hoverWitch[0]">{{ item.times[0] }}--{{ item.times[1] }}</p>
            <p v-if="hoverWitch[0]" class="edit" @click="(selectSome=index , selects(6))">编辑</p>
          </div>
          <div class="jobKind_salary">
            <p>{{ item.jobName }}</p>
            <p class="col">|</p>
            <p>{{ item.salary }}</p>
          </div>
          <div class="jobKind_salary">
            <p>所属行业：{{ item.industry }}</p>
            <p class="col">|</p>
            <p>职位名称：{{ item.jobName }}</p>
          </div>
          <p>工作内容：</p>
          <div class="workRole">{{ item.introduction }}</div>
        </div>
      </div>
      <div class="MessageItem" id="part7">
        <div class="itemTop">
          <div class="title">
            <img src="/public/icons/项目经历.png" />项目经历
          </div>
          <div class="additems" @click="(selectSome=-1, selects(7))">+ 添加项目经历</div>
        </div>
        <div
          class="jobExperience"
          v-for="(item, index) in personMessage.projects"
          @mouseenter="hover(1)"
          @mouseleave="outHover(1)"
        >
          <div class="company_time">
            <p class="company">{{ item.projectsName }}</p>
            <p v-if="!hoverWitch[1]">{{ item.times[0] }}--{{ item.times[1] }}</p>
            <p v-if="hoverWitch[1]" class="edit" @click="(selectSome=index, selects(7))">编辑</p>
          </div>
          <p>项目描述：</p>
          <div class="workRole">{{ item.introduction }}</div>
        </div>
      </div>
      <div class="MessageItem" id="part8">
        <div class="itemTop">
          <div class="title">
            <img src="/public/icons/证书荣誉.png" />证书荣誉
          </div>
          <div class="additems" @click="selects(3)">+ 添加荣誉证书</div>
        </div>
        <p class="honorary" v-for="(item, index) in personMessage.honorary">
          {{ item }} <img src="/public/icons/删除.png"  @click="deleteHonorary(index)"/>
        </p>
      </div>
    </div>
    <div class="right">
      <div class="ai">
        <h3>AI简历优化</h3>
        <p>快速提升简历质量~</p>
        <p>></p>
      </div>
      <div class="menu">
        <el-anchor
          :container="containerRef"
          direction="vertical"
          type="default"
          :offset="30"
          @click="handleClick"
        >
          <el-anchor-link href="#part1" title="基本信息" />
          <el-anchor-link href="#part2" title="求职状态" />
          <el-anchor-link href="#part3" title="教育经历" />
          <el-anchor-link href="#part4" title="求职意向" />
          <el-anchor-link href="#part5" title="个人优势" />
          <el-anchor-link href="#part6" title="工作/实习经历" />
          <el-anchor-link href="#part7" title="项目经历" />
          <el-anchor-link href="#part8" title="证书荣誉" />
        </el-anchor>
      </div>
    </div>
  </div>
  <el-dialog v-model="centerDialogVisible" width="850" align-center>
    <education v-if="selectWhich === 0" :personMessage="personMessage"
    :index=selectSome @sbmitForm="refreshMessage"></education>
    <baseMess v-if="selectWhich === 1"
    :personMessage="personMessage"@sbmitForm="refreshMessage"></baseMess>
    <jobStatusMess v-if="selectWhich === 2"
      :personMessage="personMessage"@pubJobStatusMess="pubJobStatusMess"></jobStatusMess>
    <honorary v-if="selectWhich === 3" 
    @sbmitForm="refreshMessage"></honorary>
    <jobsWant v-if="selectWhich === 4"
    :personMessage="personMessage"@sbmitForm="refreshMessage"></jobsWant>
    <introduction v-if="selectWhich === 5"
    :personMessage="personMessage"@sbmitForm="refreshMessage"></introduction>
    <experience v-if="selectWhich === 6" :personMessage="personMessage"
    :index=selectSome @sbmitForm="refreshMessage"></experience>
    <projects v-if="selectWhich === 7" :personMessage="personMessage"
    :index=selectSome @sbmitForm="refreshMessage"></projects>
  </el-dialog>
  <backTop></backTop>
  <div style="height: 40px"></div>
  <bottom></bottom>
</template>

<script setup>
import backTop from "../../components/backTop.vue";
import bottom from "@/components/bottom.vue";
import Education from "@/components/personMessage/Education.vue";
import baseMess from "@/components/personMessage/baseMess.vue";
import jobStatusMess from "@/components/personMessage/jobStatusMess.vue";
import jobsWant from "@/components/personMessage/jobsWant.vue";
import introduction from "@/components/personMessage/introduction.vue";
import honorary from "@/components/personMessage/honorary.vue";
import experience from "@/components/personMessage/experience.vue";
import projects from "@/components/personMessage/projects.vue";
import { ref, reactive, onMounted ,computed} from "vue";
import upload from '@/util/upload'
import axios from "../../util/axios.config";
import store from "@/store";
const hoverWitch = reactive([false, false, false]);
let personMessage = reactive({});
const selectWhich = ref(1);
const selectSome = ref(-1);
const centerDialogVisible = ref(false);
const avator = ref("");
const avatorFile = ref(null);
const arrayString = (array) => {
  return array.join("、");
};
const uploadAvatar = computed(()=>{
  if(personMessage.avator){
    return personMessage.avator.includes("blob")?personMessage.avator:"http://localhost:3000"+personMessage.avator
  }else{
    return "../../icons/头像.png"
  }
  
})
const handleChange = async (file) => {
  avator.value = URL.createObjectURL(file.raw)
  avatorFile.value = file.raw
  console.log(avatorFile.value , avator.value )
  const res = await upload("/staffapi/user/curriculum/updateAvator",{
    username:store.state.userInfo.username,
    avator:avator.value,
    avatorFile:avatorFile.value
  })
  if (res.ActionType === "ok") {
    getPersonMessage();
  }
  console.log(res)
}
const handleClick = (e) => {
  e.preventDefault();
};
const hover = (index) => {
  hoverWitch[index] = true;
};
const outHover = (index) => {
  hoverWitch[index] = false;
};
const selects = (num) => {
  selectWhich.value = num;
  centerDialogVisible.value = true;
};
const getPersonMessage = () => {
  axios
    .get("/staffapi/user/getCurriculum/" + store.state.userInfo.username)
    .then((res) => {
      console.log(res);
      if (res.data.data.length !== 0) {
        /*reactive 的使用:
        reactive 创建的响应式对象不能直接重新赋值，否则会失去响应性。
        通过 Object.assign 或手动赋值的方式更新对象的属性。*/
        // 将返回的数据合并到 personMessage 中
        Object.assign(personMessage, res.data.data[0]);
        console.log(personMessage);
      }
    });
};
const pubJobStatusMess = (value) => {
  console.log("jobStatusMess", value);
  centerDialogVisible.value = false;
  axios.post("/staffapi/user/curriculum/updatejobStatus", value).then((res) => {
    if (res.data.ActionType === "ok") {
      getPersonMessage();
    }
  });
};
const deleteHonorary = (index)=>{
  axios.post("/staffapi/user/curriculum/deleteHonorary",{username:personMessage.username,index}).then((res)=>{
    if(res.data.ActionType === "ok"){
      getPersonMessage();
    }
  })
}
const refreshMessage = () => {
  centerDialogVisible.value = false;
  getPersonMessage();

};
onMounted(() => {
  getPersonMessage();
});
</script>
<style lang="scss" scoped>
.topLine {
  width: 100%;
  height: 60px;
  background-color: #fff;
  p {
    display: flex;
    width: 20%;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    border-bottom: 2px solid rgba(0, 0, 255, 0.625);
    color: rgba(0, 0, 255, 0.625);
  }
}
.mainBox {
  display: flex;
  width: 100%;
  height: fit-content;
  justify-content: space-between;
  margin-top: 20px;
}
.left {
  width: 74%;
  height: fit-content;
  background-color: #fff;
}
.right {
  width: 25%;
  height: fit-content;
  background-color: transparent;
}
.first {
  display: flex;
  width: 100%;
  padding: 20px;
  margin-top: 20px;
  .baseMess {
    width: 80%;
    margin-left: 20px;
    .name_Edit {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .name {
        font-size: 30px;
        margin-left: 15px;
      }
    }
    .personTags {
      margin-top: 20px;
      width: 50%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: large;
    }
    .phone_Emil {
      width: 70%;
      margin-top: 10px;
      margin-left: 15px;
      font-size: large;
      display: flex;
      justify-content: space-between;
    }
  }
}
.Avatar {
  margin-top: -20px;
    width: 120px;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
.col {
  font-size: small;
  color: rgba(128, 128, 128, 0.685);
}
.MessageItem {
  width: 93%;
  margin-top: 20px;
  padding: 40px 30px;
  .itemTop {
    width: 100%;
    height: 100%;
    display: flex;
    margin-bottom: 30px;
    justify-content: space-between;
    align-items: center;
    font-size: large;
    .title {
      font-size: 25px;
      display: flex;
      align-items: center;
      img {
        width: 30px;
        margin-right: 10px;
      }
    }
  }
}
.status {
  color: rgba(21, 21, 21, 0.714);
}
.edit {
  cursor: pointer;
  color: #5d7aff;
}
.additems {
  cursor: pointer;
  padding: 5px 10px;
  color: #5d7aff;
  border: #5d7aff solid 1px;
  border-radius: 20px;
}
.educations {
  display: flex;
  margin-bottom: 20px;
  color: rgba(21, 21, 21, 0.714);
  .scoo {
    width: 30%;
    font-size: larger;
  }
  .edub {
    width: 70%;
    display: flex;
    justify-content: space-between;
    .ttm {
      width: 70%;
      display: flex;
    }
  }
  p {
    font-size: medium;
    margin-right: 20px;
  }
  .edit {
    margin-left: 29%;
    color: rgba(21, 21, 234, 0.632);
  }
  .edit1 {
    color: rgba(21, 21, 234, 0.632);
    cursor: pointer;
  }
}
.jobKinds {
  display: flex;
  margin-bottom: 20px;
  p {
    font-size: large;
    color: rgba(21, 21, 21, 0.714);
  }
}
.jobRequest {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  color: rgba(21, 21, 21, 0.714);
  .items {
    width: 49.5%;
    height: 35px;
    line-height: 35px;
  }
}
.introduction {
  color: rgba(21, 21, 21, 0.714);
}
.jobExperience {
  color: rgba(21, 21, 21, 0.714);
  div {
    margin-bottom: 20px;
  }
}
.company_time {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  color: rgba(21, 21, 21, 0.714);
  .company {
    font-size: larger;
    color: black;
  }
}
.jobKind_salary {
  display: flex;
  color: rgba(21, 21, 21, 0.714);
  p {
    margin-right: 20px;
  }
}
.honorary {
  color: rgba(21, 21, 21, 0.714);
  margin-bottom: 10px;
  img {
    width: 15px;
    margin-left: 20px;
    cursor: pointer;
  }
}
.ai {
  display: flex;
  justify-content: space-around;
  background-color: #5d7aff;
  height: 50px;
  width: 100%;
  line-height: 50px;
  color: white;
  p {
    font-size: small;
  }
}
.menu {
  margin-top: 20px;
}
.el-anchor__item {
  height: 50px;
  ::v-deep .el-anchor__link {
    line-height: 50px;
    font-size: large;
  }
  ::v-deep .el-anchor__link:hover {
    color: #5d7aff;
  }
}
</style>
