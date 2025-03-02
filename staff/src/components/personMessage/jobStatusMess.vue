<template>
<div class="boxTitle">求职状态</div>
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
      <el-form-item label="求职状态" prop="jobStatus">
        <el-cascader
          v-model="ruleForm.jobStatus"
          :options="statusOptions"
          :props="hhh"
          @change="handleChange"
        />
        </el-form-item>
        <el-form-item>
          <el-button  type="primary" @click="submitForm()" class="subbtn">
            提交
          </el-button>
        </el-form-item>
      </el-form>
  </div>
</template>
<script setup>
import { ref, reactive ,defineEmits,onMounted} from 'vue';
const emit = defineEmits(['pubJobStatusMess']);
const ruleFormRef = ref();
const hhh = {
  expandTrigger: 'hover',
}
const statusOptions = [
  {
    value: '在职',
    label: '在职',
    children: [
      {value:'正在找工作',label:'正在找工作'},
      {value:'看看机会',label:'看看机会'},
  ]
  },
  {
    value: '离职',
    label: '离职',
    children: [
      {value:'正在找工作',label:'正在找工作'},
      {value:'看看机会',label:'看看机会'},
  ]
  },
  {
    value: '在校',
    label: '在校',
    children: [
      {value:'正在找工作',label:'正在找工作'},
      {value:'看看机会',label:'看看机会'},
  ]
  },
  {
    value: '离校',
    label: '离校',
    children: [
      {value:'正在找工作',label:'正在找工作'},
      {value:'看看机会',label:'看看机会'},
  ]
  }
]
const ruleForm = reactive({
  username:"",
  jobStatus:[]
})
const props = defineProps({
  personMessage: {
    type: Object,
    required: true, // 必传
    default: () => {} // 默认值
  }
});
const rules = reactive({
  jobStatus: [{ required: true, message: '请选择求职状态', trigger: 'blur' }]
})
const submitForm = () => {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      emit('pubJobStatusMess',ruleForm)
    } else {
      console.log('error submit!!');
      return false;
    }
  });
}
onMounted(() => {
  ruleForm.username = props.personMessage.username
  ruleForm.jobStatus = props.personMessage.jobStatus
})
</script>

<style lang="scss" scoped>
.boxTitle{
  font-size:20px;
}
.mainBox{
  margin-left:30%;
}
</style>