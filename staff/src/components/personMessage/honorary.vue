<template>
  <div class="tips">证书荣誉</div>
    <div class="mainBox">
      <el-form
        ref="ruleFormRef"
        style="max-width: 400px"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
      >
      <el-form-item label="荣誉名称" prop="honorary">
        <el-input v-model="ruleForm.honorary" /> 
      </el-form-item>
      <el-form-item>
        <el-button  type="primary" @click="submitForm" >
          提交
        </el-button>
      </el-form-item>
    </el-form>
    </div>
  
  </template>
  
  <script setup>
  import axios from "../../util/axios.config";
  import { ref, reactive ,defineEmits} from 'vue'
  import store from '@/store';
  const emit = defineEmits(['sbmitForm'])
  const ruleFormRef = ref();
  const ruleForm = reactive({
    username:store.state.userInfo.username,
    honorary:''
  })
  const rules = {
    introduction: [
      { required: true, message: '请输入证书荣誉', trigger: 'blur' }
    ]
  }
  const submitForm = () => {
    ruleFormRef.value.validate((valid) => {
      if (valid) {
        console.log(ruleForm);
        axios.post("/staffapi/user/curriculum/addHonorary", ruleForm).then((res) => {
          if (res.data.ActionType === "ok") {
            emit('sbmitForm',ruleForm)
          }
        });
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  };
  </script>
  
  <style lang="scss" scoped>
  .tips{
    font-size: 20px;
  }
  .mainBox{
    margin-left: 25%;
  }
  p{
    font-size: small;
    color: rgb(199, 201, 203);
  }
  .el-button{
    margin-top: 20px;
  }
  </style>