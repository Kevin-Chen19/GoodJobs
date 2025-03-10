<template>
<div class="tips">个人优势</div>
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
    <el-input
      v-model="ruleForm.introduction"
      style="width: 400px"
      :autosize="{ minRows: 2, maxRows: 4 }"
      type="textarea"
      maxlength="200"
      placeholder="请输入"
    />
    <p>最多200字哦</p>
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
import { ref, reactive,onMounted ,defineEmits} from 'vue'
const emit = defineEmits(['sbmitForm'])
const props = defineProps({
  personMessage: {
    type: Object,
    default: () => {}, // 默认值
  }
})
const ruleFormRef = ref();
const ruleForm = reactive({
  username:'',
  introduction: ''
})
const rules = {
  introduction: [
    { required: true, message: '请输入个人优势', trigger: 'blur' }
  ]
}
const submitForm = () => {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      console.log(ruleForm);
      axios.post("/staffapi/user/curriculum/updateIntroduction", ruleForm).then((res) => {
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
onMounted(() => {
  ruleForm.username = props.personMessage.username
  ruleForm.introduction = props.personMessage.introduction
})
</script>

<style lang="scss" scoped>
.tips{
  font-size: 20px;
}
.mainBox{
  margin-left: 20%;
}
p{
  font-size: small;
  color: rgb(199, 201, 203);
}
.el-button{
  margin-top: 20px;
}
</style>