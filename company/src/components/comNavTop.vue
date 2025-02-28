<template>
  <div class="bigContainers">
    <div class="topLine">
      <div class="Icon">
        <div class="name">好工作</div>   
      </div>
      <div class="act">
        <p class="outLogin" @click="LoginOut()">退出登录</p>
      </div>
    </div>
  </div>
  
</template>
<script setup>
import store from "@/store/index.js";
import { useRouter} from "vue-router";
const router = useRouter();
const LoginOut = ()=>{
  localStorage.removeItem('token')
  store.commit("clearUserInfo")//清空用户信息
  store.commit("clearAvatarUrl")
  store.commit("clearCompanyMessage")//清空公司信息
  router.push('/')
}
</script>
<style lang="scss" scoped>
.bigContainers{
  width: 80%;
  margin-left: 10%;
  margin-bottom: 20px;
}
  .topLine{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .Icon{
  margin-left: 20px;
  width: 100px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: orange;
  color: white;
  .name{
    font-family: "阿里妈妈方圆体 VF Regular";
    font-size: 25px;
    font-weight: 700;
  }
}
@font-face {
  font-family: "阿里妈妈方圆体 VF Regular";
  src: url("../fontResource/KCBE3ffOGlMG.woff2") format("woff2"),
  url("../fontResource/KCBE3ffOGlMG.woff") format("woff");
}
.outLogin{
  color: rgba(41, 107, 248, 0.865);
  margin-right: 20px;
  cursor: pointer;
}
</style>