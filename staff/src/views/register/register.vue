<template>
  <navTop></navTop>
  <div class="formBox">
    <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
      >
      <div class="formTitle">请先填写必要信息</div>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"  />
        </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年龄" prop="age">
          <el-input v-model="ruleForm.age" type="number"/> 
        </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" prop="sex">
          <el-select v-model="ruleForm.sex">
            <el-option v-for="item in sexArry" :label= " item " :value=" item " />         
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份" prop="status">
          <el-input v-model="ruleForm.status" placeholder="社会工作者/26届应届生"/> 
        </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="现居住城市" prop="address">
          <el-input v-model="ruleForm.address"/> 
        </el-form-item>
        </el-col>
        <el-col :span="12">
           <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"/> 
        </el-form-item>
        </el-col>
        <el-col :span="12">
           <el-form-item label="电话" prop="phone">
          <el-input v-model="ruleForm.phone"/> 
        </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label="求职状态" prop="jobStatus">
              <el-cascader
                v-model="ruleForm.jobStatus"
                :options="statusOptions"
                :props="props"
                @change="handleChange"
              />
        </el-form-item>
        </el-col>
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
        <el-col :span="12">
          <el-form-item label="教育经历" prop="education">
          <div class="inputBox" @click="selectCity(2)">{{ educationShow }}</div>
        </el-form-item>
        </el-col>
      </el-row>
        <el-form-item>
          <el-button v-if="!ifEdit" type="primary" @click="submitForm()" class="subbtn">
            提交
          </el-button>
          <el-button v-if="ifEdit" type="primary" @click="editForm(ruleFormRef)" class="subbtn">
            修改
          </el-button>
        </el-form-item>
      </el-form>
  </div>
  <el-dialog
    v-model="centerDialogVisible"
    width="850"
    align-center
  >
    <moreJobKinds v-if=" selectWhich === 0 "  @selectKinds="getKinds" @cancelKinds="cancel"></moreJobKinds>
    <moreAddress v-if=" selectWhich === 1 "  @selectAdd="getAddress" @cancelAdd="cancel"></moreAddress>
    <education :ifRegister="true" v-if=" selectWhich === 2 " @register="getAducations"></education>
  </el-dialog>
</template>
<script setup>
import navTop from '../../components/navTop.vue';
import moreAddress from '@/components/moreAddress.vue';
import moreJobKinds from '@/components/moreJobKinds.vue';
import education from '@/components/personMessage/Education.vue';
import { useRouter } from 'vue-router';
import { reactive, ref, h} from 'vue';
import { ElNotification } from 'element-plus'
import store from '@/store';
import axios from '../../util/axios.config';
const router = useRouter();
const selectWhich = ref(0);
const ifEdit = ref(false);
const ruleFormRef = ref();
const centerDialogVisible = ref(false);
const sexArry = ['男','女'];
const props = {
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
  username:store.state.userInfo.username,
  name: '',
  age: '',
  sex: '',
  status: '',
  address: '',
  email: '',
  phone: '',
  jobStatus: '',
  jobKinds: [],
  jobCity: [],
  salary: '',
  jobType: [],
  education: {}
})
const educationShow =ref("") 
const rules = reactive({
  name:[{ required: true, message: '请输入姓名', trigger: 'blur' }],
  age:[{ required: true, message: '请输入年龄', trigger: 'blur' }],
  sex:[{ required: true, message: '请输入性别', trigger: 'blur' }],
  status:[{ required: true, message: '请输入身份', trigger: 'blur' }],
  address:[{ required: true, message: '请输入现居住城市', trigger: 'blur' }],
  email:[{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  phone:[{ required: true, message: '请输入电话', trigger: 'blur' }],
  jobStatus:[{ required: true, message: '请输入求职状态', trigger: 'blur' }],
  jobKinds:[{ required: true, message: '请输入期望职位', trigger: 'blur' }],
  jobCity:[{ required: true, message: '请输入期望城市', trigger: 'blur' }],
  salary:[{ required: true, message: '请输入期望薪资', trigger: 'blur' }],
  jobType:[{ required: true, message: '请输入工作性质', trigger: 'blur' }],
  education:[{ required: true, message: '请输入教育经历', trigger: 'blur' }]
})
const selectCity = (num)=>{
  selectWhich.value = num;
  centerDialogVisible.value = true;
}
const getAddress = (value)=>{
  ruleForm.jobCity.splice(0,ruleForm.jobCity.length,...value)
  centerDialogVisible.value = false
  console.log(ruleForm.jobCity)
}
const getKinds = (value)=>{
  ruleForm.jobKinds.splice(0,ruleForm.jobKinds.length,...value)
  centerDialogVisible.value = false
  console.log(ruleForm.jobKinds)
}
//邮箱地址的正则验证
const validateEmail = (email) => {
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if(!reg.test(email)){
    openError(0)
    return false;
  }else{
    return true;
  }
}
//验证国内电话的正则
const validatePhone = (phone) => {
  const reg = /^1[3-9]\d{9}$/;
  if(!reg.test(phone)){
    openError(1)
    return false;
  }else{
    return true;
  }
}
const openError = (num) => {
  if(num === 0){
     ElNotification({
      title: '表单填写有误',
      message: h('i', { style: 'color: teal' }, '您的邮箱地址格式有误'),
    })
  }else if(num === 1){
    ElNotification({
      title: '表单填写有误',
      message: h('i', { style: 'color: teal' }, '您的电话号码格式有误'),
    })
  }
}
const getAducations = (value) => {
  centerDialogVisible.value = false;
  ruleForm.education = value
  educationShow.value = ruleForm.education.schoolName+"-"+ruleForm.education.subject
  console.log("education",ruleForm.education)
}
const submitForm = () => {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      if(validateEmail(ruleForm.email) && validatePhone(ruleForm.phone)){
        console.log('submit!', ruleForm);
        axios.post('/staffapi/user/curriculum',ruleForm).then(res=>{
          if(res.data.ActionType === "ok"){
            console.log("提交成功")
            router.push('/person')
          }else{
            console.log("提交失败")
          }
        }).catch((err)=>{
          console.log(err)
        })
      }
    } else {
      console.log('error submit!!');
      return false;
    }
  });
}
</script>

<style lang="scss" scoped>
.formBox{
  margin-left: 10%;
  width:80%;
  height:500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  border-radius: 25px;
}
.el-form{
  margin-left: 200px;
  .formTitle{
    font-size: 20px;
    margin-left: 240px;
    margin-bottom: 20px;
  }
}
.el-row{
  flex-wrap: wrap;
}
.inputBox{
  width: 200px;
  height: 30px;
  border: 1.5px solid #e3e2e2af;
  border-radius: 5px;
  line-height: 30px;
  padding:0 5px;
  overflow: hidden;
}
input{
  width: 200px;
}
.el-select{
  width: 200px;
}

</style>