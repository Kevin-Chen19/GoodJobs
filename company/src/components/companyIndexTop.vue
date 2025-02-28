<template>
  <div class="disFlex">
    <div class="Icon">
      <div class="name">好工作</div>
      <p>haogongzou.com</p>
    </div>
    <div class="avatarName">
      <div class="loginout" @click="LoginOut()">退出登录</div>
      <div>|</div>
      <el-avatar :size="50" :src="avatarUrl" />
      <p>湘潭凝智</p>
    </div>
  </div>
</template>
<script setup>
import store from "@/store";
import { computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const avatarUrl = computed(() =>
  store.state.avatarUrl
    ? "http://localhost:3000" + store.state.avatarUrl
    : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
);
const LoginOut = () => {
  localStorage.removeItem("token");
  store.commit("clearUserInfo"); //清空用户信息
  store.commit("clearAvatarUrl");
  store.commit("clearCompanyMessage"); //清空公司信息
  //跳转到/login
  router.push("/");
};
</script>

<style lang="scss" scoped>
.disFlex {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  background-color: #fff;
}
.Icon {
  width: 120px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: orange;
  color: white;
  .name {
    font-family: "阿里妈妈方圆体 VF Regular";
    font-size: 20px;
    font-weight: 700;
  }
  p {
    font-size: smaller;
  }
}
@font-face {
  font-family: "阿里妈妈方圆体 VF Regular";
  src: url("../fontResource/KCBE3ffOGlMG.woff2") format("woff2"),
    url("../fontResource/KCBE3ffOGlMG.woff") format("woff");
}
.avatarName {
  display: flex;
  align-items: center;
  p {
    margin-left: 10px;
  }
  div {
    margin-right: 10px;
  }
}
.loginout {
  color: rgba(41, 107, 248, 0.865);
  cursor: pointer;
}
</style>
