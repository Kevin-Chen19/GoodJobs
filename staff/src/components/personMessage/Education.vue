<template>
  <div class="tips">请填写国家承认的教育经历，非培训经历</div>
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
      <el-form-item label="学校名称：" prop="schoolName">
        <el-input v-model="ruleForm.schoolName" placeholder="请输入学校名称" />
      </el-form-item>
      <el-form-item label="最高学历" prop="eduBag">
        <el-select v-model="ruleForm.eduBag">
          <el-option v-for="item in eduArray" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否统招" prop="tongZhao">
        <el-radio-group v-model="ruleForm.tongZhao">
          <el-radio value="统招" size="large" border>统招</el-radio>
          <el-radio value="非统招" size="large" border>非统招</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="学位证书" prop="degree">
        <el-radio-group v-model="ruleForm.degree">
          <el-radio value="有" size="large" border>有</el-radio>
          <el-radio value="无" size="large" border>无</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="所学专业" prop="subject">
        <el-input v-model="ruleForm.subject" placeholder="请输入专业名称" />
      </el-form-item>
      <el-form-item label="在校时间" prop="times">
        <div style="display: flex">
          <el-date-picker
            v-model="ruleForm.times[0]"
            type="date"
            placeholder="入学时间"
            :size="large"
            @change="ifGet = false"
            @clear="clearChange"
          />
          <el-date-picker
            v-model="ruleForm.times[1]"
            type="date"
            placeholder="毕业时间"
            :disabled="ifGet"
            :disabled-date="disabledDate"
            :shortcuts="shortcuts"
            :size="large"
          />
        </div>
      </el-form-item>
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
import axios from "axios";
import store from "@/store";
const emit = defineEmits(["sbmitForm"]);
const ruleFormRef = ref();
const ifGet = ref(true);
const ifEdit = ref(false);
const eduArray = [
  "初中及以下",
  "高中",
  "中专/中技",
  "大专",
  "本科",
  "硕士",
  "博士",
];
const clearChange = () => {
  ifGet.value = true;
  ruleForm.times = [];
};
const disabledDate = (time) => {
  return time.getTime() < ruleForm.times[0];
};
const ruleForm = reactive({
  schoolName: "",
  eduBag: "",
  tongZhao: "统招",
  degree: "有",
  subject: "",
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
  schoolName: [{ required: true, message: "请输入学校名称", trigger: "blur" }],
  eduBag: [{ required: true, message: "请输入最高学历", trigger: "blur" }],
  tongZhao: [{ required: true, message: "请输入是否统招", trigger: "blur" }],
  degree: [{ required: true, message: "请输入学位证书", trigger: "blur" }],
  subject: [{ required: true, message: "请输入所学专业", trigger: "blur" }],
  times: [{ required: true, message: "请选择在校时间", trigger: "blur" }]
});
//添加教育经历
const submitForm = () => {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      ruleForm.times[1] = moment(ruleForm.times[1]).format("YYYY/MM/DD");
      ruleForm.times[0] = moment(ruleForm.times[0]).format("YYYY/MM/DD");
      console.log("submit!", ruleForm);
      let username = store.state.userInfo.username;
      let education = ruleForm;
      axios.post("/staffapi/user/curriculum/addAducation", { username, education }).then((res) => {
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
//修改教育经历
const editForm = () => {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      ruleForm.times[1] = moment(ruleForm.times[1]).format("YYYY/MM/DD");
      ruleForm.times[0] = moment(ruleForm.times[0]).format("YYYY/MM/DD");
      console.log("修改!", ruleForm);
      let username = store.state.userInfo.username;
      let index = props.index;
      axios.post("/staffapi/user/curriculum/updateAducation",{username,index,education:ruleForm}).then((res)=>{
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
//删除教育经历
const deleteItem = ()=>{
  console.log("删除",props.index)
  let username = store.state.userInfo.username;
  let index = props.index;
  axios.post("/staffapi/user/curriculum/deleteAducation",{username,index}).then((res)=>{
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
    if (props.index !== -1) {
      ifEdit.value = true;
      let index = props.index;
      ruleForm.schoolName = props.personMessage.education[index].schoolName;
      ruleForm.eduBag = props.personMessage.education[index].eduBag;
      ruleForm.tongZhao = props.personMessage.education[index].tongZhao;
      ruleForm.degree = props.personMessage.education[index].degree;
      ruleForm.subject = props.personMessage.education[index].subject;
      ruleForm.times = [
        props.personMessage.education[index].times[0],
        props.personMessage.education[index].times[1],
      ];
    }else{
      ifEdit.value = false;
      ruleForm.schoolName = "";
      ruleForm.eduBag = "";
      ruleForm.tongZhao = "统招";
      ruleForm.degree = "有";
      ruleForm.subject = "";
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
</style>
