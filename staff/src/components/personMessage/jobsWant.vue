<template>
<div class="tips">求职意向</div>
  <div class="mainBox">
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="期望职位" prop="jobKinds">
          <el-input v-model="ruleForm.jobKinds" @click="selectCity(0)"/> 
        </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="期望城市" prop="jobCity">
          <el-input v-model="ruleForm.jobCity" @click="selectCity(1)"/> 
        </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="期望薪资" prop="salary">
          <el-input v-model="ruleForm.salary"/> 
        </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工作性质" prop="jobType">
            <div style="display: flex;">
              <el-checkbox v-model="ruleForm.jobType" label="全职" value="全职" size="large" border />
              <el-checkbox v-model="ruleForm.jobType" label="临时/兼职" value="临时/兼职" size="large" border />
              <el-checkbox v-model="ruleForm.jobType" label="实习" value="实习" size="large" border />
            </div> 
        </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
          <el-button  type="primary" @click="submitForm" >
            提交
          </el-button>
      </el-form-item>
    </el-form> 
  </div>
  <el-dialog
    v-model="centerDialogVisible"
    width="850"
    align-center
  >
    <moreJobKinds v-if=" selectWhich === 0 "  @selectKinds="getKinds"></moreJobKinds>
    <moreAddress v-if=" selectWhich === 1 "  @selectAdd="getAddress" ></moreAddress>
  </el-dialog>
</template>

<script setup>
import moreJobKinds from '@/components/moreJobKinds.vue';
import moreAddress from '@/components/moreAddress.vue';
import { ref, reactive,onMounted ,defineEmits} from 'vue'
import axios from 'axios';
const emit = defineEmits(['sbmitForm'])
const props = defineProps({
  personMessage: {
    type: Object,
    default: () => {}, // 默认值
  }
})
const ruleFormRef = ref();
const selectWhich = ref(0);
const centerDialogVisible = ref(false);
const ruleForm = reactive({
  username:props.personMessage.username,
  jobKinds: [],
  jobCity: [],
  salary: '',
  jobType: []
})
const  rules = {
  jobKinds: [
    { required: true, message: '请输入期望职位', trigger: 'blur' },
  ],
  jobCity: [
    { required: true, message: '请输入期望城市', trigger: 'blur' },
  ],
  salary: [
    { required: true, message: '请输入期望薪资', trigger: 'blur' },
  ],
  jobType: [
    { required: true, message: '请选择工作性质', trigger: 'blur' },
  ]
}
const selectCity = (num)=>{
  selectWhich.value = num;
  centerDialogVisible.value = true;
}
const getKinds = (value)=>{
  ruleForm.jobKinds.splice(0,ruleForm.jobKinds.length,...value)
  centerDialogVisible.value = false
}
const getAddress = (value)=>{
  ruleForm.jobCity.splice(0,ruleForm.jobCity.length,...value)
  centerDialogVisible.value = false;
}
const submitForm = () =>{
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      axios.post("/staffapi/user/curriculum/updateJobWant",ruleForm).then(res=>{
        console.log(res)
        if(res.data.ActionType === "ok"){
          emit("sbmitForm","ok")
        }else{
          console.log("修改失败")
        }
      })
    } else {
      console.log('error submit!!');
      return false;
    }
  });
}
onMounted(()=>{
  ruleForm.jobKinds = props.personMessage.jobKinds;
  ruleForm.jobCity = props.personMessage.jobCity;
  ruleForm.salary = props.personMessage.salary;
  ruleForm.jobType = props.personMessage.jobType;
})
</script>

<style lang="scss" scoped>
.tips{
  font-size: 20px;
}
.mainBox{
  width: 80%;
  margin-left: 10%;
}
</style>