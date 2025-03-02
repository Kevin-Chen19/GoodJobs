<template>
  <div class="boxTitle">基本信息</div>
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
        </el-row>
        <el-form-item>
          <el-button  type="primary" @click="submitForm()" class="subbtn">
            提交
          </el-button>
        </el-form-item>
      </el-form>
  </div>
</template>
<script setup>
import { ref, reactive ,defineEmits,h ,onMounted} from 'vue';
import { ElNotification } from 'element-plus';
const emit = defineEmits(['pubBaseMess']);
const ruleFormRef = ref();
const sexArry = ['男','女'];
const ruleForm = reactive({
  username:'',
  name: '',
  age: '',
  sex: '',
  status: '',
  address: '',
  email: '',
  phone: '',
})
const props = defineProps({
  personMessage: {
    type: Object,
    required: true, // 必传
    default: () => {} // 默认值
  }
});
const rules = reactive({
  name:[{ required: true, message: '请输入姓名', trigger: 'blur' }],
  age:[{ required: true, message: '请输入年龄', trigger: 'blur' }],
  sex:[{ required: true, message: '请输入性别', trigger: 'blur' }],
  status:[{ required: true, message: '请输入身份', trigger: 'blur' }],
  address:[{ required: true, message: '请输入现居住城市', trigger: 'blur' }],
  email:[{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  phone:[{ required: true, message: '请输入电话', trigger: 'blur' }]
})
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
const submitForm = () => {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      if(validateEmail(ruleForm.email) && validatePhone(ruleForm.phone)){
        emit('pubBaseMess',ruleForm)
      }  
    } else {
      console.log('error submit!!');
      return false;
    }
  });
}
onMounted(() => {
  ruleForm.username = props.personMessage.username
  ruleForm.name = props.personMessage.name
  ruleForm.age = props.personMessage.age
  ruleForm.sex = props.personMessage.sex
  ruleForm.status = props.personMessage.status
  ruleForm.address = props.personMessage.address
  ruleForm.email = props.personMessage.email
  ruleForm.phone = props.personMessage.phone
})
</script>

<style lang="scss" scoped>
.boxTitle{
  font-size: 20px;
}
.mainBox{
  width: 80%;
  margin-left: 10%;
}
</style>