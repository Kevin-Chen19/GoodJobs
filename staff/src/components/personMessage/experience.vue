<template>
  <div class="tips">请填写真实的工作/实习经历</div>
  <div>
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
    >
      <el-form-item label="公司名称：" prop="companyName">
        <el-input v-model="ruleForm.companyName" placeholder="请输入学校名称" />
      </el-form-item>
      <el-form-item label="所属行业" prop="industry">
        <el-input v-model="ruleForm.industry" placeholder="如：IT服务" />
      </el-form-item>
      <el-form-item label="职位名称" prop="jobName">
        <el-input v-model="ruleForm.jobName" placeholder="如：销售管理" />
      </el-form-item>
      <el-form-item label="薪资水平" prop="salary">
        <el-input v-model="ruleForm.salary" placeholder="请输入薪资（选填）" />
      </el-form-item>
      <el-form-item label="在职时间" prop="times">
        <div style="display: flex">
          <el-date-picker
            v-model="ruleForm.times[0]"
            type="date"
            placeholder="入职时间"
            :disabled-date="disabledDate1"
            :size="large"
            @change="ifGet = false"
            @clear="clearChange"
          />
          <el-date-picker
            v-model="ruleForm.times[1]"
            type="date"
            placeholder="离职时间"
            :disabled="ifGet"
            :disabled-date="disabledDate"
            :shortcuts="shortcuts"
            :size="large"
          />
          <el-checkbox v-model="ifNow" @change="chooseIfNow">至今</el-checkbox>
        </div>
      </el-form-item>
      <el-form-item label="工作描述" prop="introduction">
        <el-input
          v-model="ruleForm.introduction"
          style="width: 400px"
          :autosize="{ minRows: 6, maxRows: 14 }"
          type="textarea"
          maxlength="3000"
          placeholder="请输入工工作内容："
        />
      </el-form-item>
      <p>最多3000字哦</p>
      <el-form-item>
        <el-button v-if="!ifEdit" type="primary" @click="submitForm()" class="subbtn">
          提交
        </el-button>
        <el-button v-if="ifEdit" type="primary" @click="editForm" class="subbtn">
          确认修改
        </el-button>
        <el-button v-if="ifEdit" type="danger" @click="deleteItem" class="subbtn">
          删除该经历
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { ref, reactive, defineEmits, watch } from "vue";
import moment from "moment";
import axios from "../../util/axios.config";
const emit = defineEmits(["sbmitForm"]);
const ruleFormRef = ref();
const ifGet = ref(true);
const ifEdit = ref(false);
const ifNow = ref(false);
const username = ref("")
const clearChange = () => {
  ifGet.value = true;
  ruleForm.times = [];
};
const disabledDate1 = (time)=>{
  return time.getTime() > Date.now();
}
const disabledDate = (time) => {
  return time.getTime() < ruleForm.times[0] || time.getTime() > Date.now();
};
const ruleForm = reactive({
  companyName: "",
  industry: "",
  jobName: "",
  salary: "",
  introduction: "",
  times: [],
});
const props = defineProps({
  personMessage: {
    type: Object,
    default: () => {}, // 默认值
  },
  index: {
    type: Number,
    required: true, 
    default:() => -1// 确保 index 是必传的
  },
});
const rules = reactive({
  companyName: [{ required: true, message: "请输入公司名称", trigger: "blur" }],
  industry: [{ required: true, message: "请输入行业", trigger: "blur" }],
  jobName: [{ required: true, message: "请输入职位名称", trigger: "blur" }],
  introduction: [{ required: true, message: "请输入工作描述", trigger: "blur" }],
  times: [{ required: true, message: "请选择在职时间", trigger: "blur" }],
});
const chooseIfNow = ()=>{
  console.log(ifNow.value)
  if(ifNow.value){
    ruleForm.times[1] = "至今";
  }
}
//添加工作经历
const submitForm = () => {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      ruleForm.times[0] = moment(ruleForm.times[0]).format("YYYY/MM/DD");
      if(ruleForm.times[1] !== "至今"){
        if(ruleForm.times[1] === ""){
          ruleForm.times[1] = "至今";
        }else{
          ruleForm.times[1] =moment(ruleForm.times[1]).format("YYYY/MM/DD");
        } 
      }
      axios.post("/staffapi/user/curriculum/addExperience", { username:username.value, experience:ruleForm }).then((res) => {
      if (res.data.ActionType === "ok") {
        emit("sbmitForm", "ok");
      }
    });
    } else {
      console.log("error submit!!");
      return false;
    }
  });
};
//修改工作经历
const editForm = () => {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      ruleForm.times[0] = moment(ruleForm.times[0]).format("YYYY/MM/DD");
      if(ruleForm.times[1] !== "至今"){
        if(ruleForm.times[1] === ""){
          ruleForm.times[1] = "至今";
        }else{
          ruleForm.times[1] =moment(ruleForm.times[1]).format("YYYY/MM/DD");
        } 
      }
      let index = props.index;
      axios.post("/staffapi/user/curriculum/updateExperience",{username:username.value,index,experience:ruleForm}).then((res)=>{
        if(res.data.ActionType === "ok"){
          emit("sbmitForm", "ok");
        }
      })
    } else {
      console.log("error submit!!");
      return false;
    }
  });
};
//删除工作经历
const deleteItem = ()=>{
  let index = props.index;
  axios.post("/staffapi/user/curriculum/deleteExperience",{username:username.value,index}).then((res)=>{
    if(res.data.ActionType === "ok"){
      emit("sbmitForm", "ok");
    }
  })
}
watch(
  () => props.index, // 监听 index 的变化
  (newIndex) => {
    console.log("index 变化:", newIndex);
    // 在这里执行你的逻辑
    username.value=props.personMessage.username;
    if (props.index !== -1) {
      ifEdit.value = true;
      let index = props.index;
      ruleForm.companyName = props.personMessage.experience[index].companyName;
      ruleForm.industry = props.personMessage.experience[index].industry;
      ruleForm.jobName = props.personMessage.experience[index].jobName;
      ruleForm.salary = props.personMessage.experience[index].salary;
      ruleForm.introduction = props.personMessage.experience[index].introduction;
      ruleForm.times = [
        props.personMessage.experience[index].times[0],
        props.personMessage.experience[index].times[1],
      ];
    }else{
      ifEdit.value = false;
      ruleForm.companyName = "";
      ruleForm.industry = "";
      ruleForm.jobName = "";
      ruleForm.salary = "";
      ruleForm.introduction = "";
      ruleForm.times = [];
    }
  },
  { immediate: true } // 立即执行一次
);
</script>
<style lang="scss" scoped>
.tips {
  margin-bottom: 20px;
  color: orange;
}
.el-form {
  margin-left: 20%;
}
.el-input,
.el-select {
  width: 300px;
}
.el-checkbox{
  margin-left: 10px;
}
p{
  margin-top: -20px;
  margin-left: 400px;
}
</style>
