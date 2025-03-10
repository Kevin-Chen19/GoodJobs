<template>
  <el-affix>
    <div class="mainTop">
      <el-row>
        <el-col :span="4"
          ><div class="Icon">
            <div class="name">好工作</div>
          </div>
        </el-col>
        <el-col :span="16">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            :ellipsis="false"
            @select="handleSelect"
          >
            <el-menu-item index="首页">首页</el-menu-item>
            <el-menu-item index="职位推荐">职位推荐</el-menu-item>
            <el-menu-item index="职位搜索">职位搜索</el-menu-item>
            <el-sub-menu index="4">
              <template #title>求职服务</template>
              <el-menu-item index="简历模版">简历模版</el-menu-item>
              <el-menu-item index="AI求助">AI求助</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="关于我">关于我</el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="4" class="avater_name">
          <div class="block">
            <img class="touPic" src="/public/images/默认图像.png" />
          </div>
          <p style="margin-left: 10px">{{ store.state.userInfo.username }}</p>
          <div class="lin">|</div>
          <div class="out" @click="outLogin()">退出登录</div>
        </el-col>
      </el-row>
    </div>
  </el-affix>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import store from "@/store/index.js";
import {useJobStore} from "@/store/pinia_Job.js"
import {useSearchStore} from "@/store/searchPinia.js"
const route = useRoute();
const router = useRouter();
const activeIndex = ref("1");
import axios from "../util/axios.config";
const handleSelect = (keyPath) => {
  console.log(keyPath);
  //获取当前路由
  console.log("Current route:", route.path);
  if (keyPath == "首页") {
    if (route.path == "/home") {
      return;
    } else {
      router.push("/home");
    }
  } else if (keyPath == "职位推荐") {
    if (route.path == "/recommend") {
      return;
    } else {
      router.push("/recommend");
    }
  } else if (keyPath == "职位搜索") {
    if (route.path == "/searchJob") {
      return;
    } else {
      router.push("/searchJob");
    }
  }else if(keyPath == "关于我"){
    if (route.path == "/person") {
      return;
    } else {
      router.push("/person");
    }
  }
};
const outLogin = () => {
  const piniaJob = useJobStore();
  const searchPinia = useSearchStore();
  axios.post("/staffapi/user/curriculum/updateLastLook",{
    username:store.state.userInfo.username,
    lastLook:store.state.lastLook
  }).then((res) => {
    console.log(res);
  });
  localStorage.removeItem("token");
  store.commit("clearUserInfo"); //清空用户信息
  store.commit("clearLastLook"); //清空用户最后浏览记录
  piniaJob.reset(); //清空pinia数据
  searchPinia.reset(); //清空pinia数据
  router.push("/login");
};
</script>

<style lang="scss" scoped>
.mainTop {
  background-color: #fff;
}
.Icon {
  margin-left: 20px;
  width: 100px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: orange;
  color: white;
  .name {
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
.avater_name {
  display: flex;
  align-items: center;
}
.el-menu--horizontal.el-menu {
  display: flex;
  justify-content: center;
  border-bottom: none;
}
.el-menu--horizontal > .el-menu-item {
  font-size: large;
}
::v-deep .el-menu--horizontal > .el-sub-menu .el-tooltip__trigger {
  font-size: large;
}
.lin {
  margin-left: 10px;
  font-size: 20px;
  color: rgb(215, 210, 210);
}
.out {
  margin-left: 10px;
  cursor: pointer;
  font-size: 15px;
  color: rgb(36, 86, 236);
}
.touPic{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
