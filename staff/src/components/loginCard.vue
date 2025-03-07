<template>
  <div class="card">
    <div style="z-index: 100">
      <div class="title">求职登录</div>
      <el-form
        ref="FirmFormRef"
        :model="FirmForm"
        :rules="FirmRules"
        label-width="auto"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="FirmForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="FirmForm.password" type="password" />
        </el-form-item>
        <el-button type="primary" @click="submitFirmForm(FirmFormRef)">
          注册/登录
        </el-button>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, defineEmits, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";
const router = useRouter();
const store = useStore();
const emits = defineEmits(["ifRegister"]);
const ifRegister = ref(false);
const props = defineProps({
  trueRegister: {
    type: Boolean,
    required: true,
  },
});
watch(
  () => props.trueRegister,
  (newValue) => {
    ifRegister.value = newValue;
    //进行新用户注册操作
    if (newValue) {
      register();
    }
  },
  { immediate: true, deep: true }
);
const FirmForm = reactive({
  username: "",
  password: ""
});
const FirmRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
const FirmFormRef = ref();


const submitFirmForm = (formRef) => {
  formRef.validate((valid) => {
    if (valid) {
    axios.post("/staffapi/user/login", FirmForm).then((res) => {
        if (res.data.code === 200) {
          store.commit("changeUserInfo", res.data.data);
          localStorage.setItem("token", res.data.token);
          store.commit("changeGetterRouter", false);
          axios.get("/staffapi/user/getCurriculum/"+ store.state.userInfo.username).then((res)=>{
            if (res.data.data.length !== 0) {
              console.log(res.data.data[0].lastLook)
              store.state.lastLook.splice(0,store.state.lastLook.length,...res.data.data[0].lastLook)
              router.push("/home");
            }else{
              router.push("/register");
            }
          })
        } else if (res.data.code === 0) {
          emits("ifRegister", true);
        } else {
          alert(res.data.msg);
        }
      });
    } else {
      console.log("error submit!!");
      return false;
    }
  });
};

const register = () => {
  axios.post("/staffapi/user/register", FirmForm).then((res) => {
    if (res.data.ActionType === "ok") {
      alert("注册成功");
      axios.post("/staffapi/user/login", FirmForm).then((res) => {
        if (res.data.code === 200) {
          store.commit("changeUserInfo", res.data.data);
          localStorage.setItem("token", res.data.token);
          store.commit("changeGetterRouter", false);
          router.push("/home");
        } else if (res.data.code === 0) {
          emits("ifRegister", true);
        } else {
          alert(res.data.msg);
        }
      });
    }
  });
};
</script>

<style lang="scss" scoped>
.el-input {
  width: 200px;
}
::v-deep .el-form {
  margin-top: 30px;
}
::v-deep .el-form-item__label {
  font-size: 17px;
}
::v-deep .el-form-item {
  margin-bottom: 25px;
}
.el-button {
  margin-left: 30%;
  margin-top: 20px;
}
::v-deep .el-button > span {
  font-size: 17px;
}
/* From Uiverse.io by eslam-hany */
.card {
  position: relative;
  width: 320px;
  height: 340px;
  background: mediumturquoise;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  border-radius: 15px;
  cursor: pointer;
}
.title {
  margin-top: 20px;
  margin-bottom: 50px;
  margin-left: 30%;
}
.card::before,
.card::after {
  position: absolute;
  content: "";
  width: 20%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  font-weight: bold;
  background-color: lightblue;
  transition: all 0.5s;
}

.card::before {
  top: 0;
  right: 0;
  border-radius: 0 15px 0 100%;
}

.card::after {
  bottom: 0;
  left: 0;
  border-radius: 0 100% 0 15px;
}

.card:hover::before,
.card:hover:after {
  width: 100%;
  height: 100%;
  border-radius: 15px;
  transition: all 0.5s;
}
</style>
