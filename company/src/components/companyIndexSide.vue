<template>
  <div>
    <el-menu
      active-text-color="#0d0101"
      class="el-menu-vertical-demo"
      default-active="1"
      text-color="#fff"
      @select="handleSelect"
    >
      <div>
        <el-menu-item index="1">
          <div
            class="icons"
            :style="{ backgroundImage: `url(${require('@/assets/主页.png')})` }"
          ></div>
          <span>企业主页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <div
            class="icons"
            :style="{ backgroundImage: `url(${require('@/assets/职位.png')})` }"
          ></div>
          <span>职位中心</span>
        </el-menu-item>
        <el-menu-item index="3">
          <div
            class="icons"
            :style="{ backgroundImage: `url(${require('@/assets/互动.png')})` }"
          ></div>
          <span>互动</span>
        </el-menu-item>
      </div>
      <div>
        <el-menu-item index="4">
          <div
            class="icons"
            :style="{ backgroundImage: `url(${require('@/assets/客服.png')})` }"
          ></div>
          <span>客服帮助</span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const handleSelect = (key) => {
  if (key == 1) {
    if (route.path == "/companyIndex") {
      return;
    } else {
      router.push("/companyIndex");
    }   
  }else if  (key == 2){
    if(route.path == "/jobsCenter"){
      return;
    }else{
      router.push("/jobsCenter");
    }
  }else if (key == 3){
    if(route.path == "/chat"){
      return;
    }else{
      router.push("/chat");
    }
  }
}
</script>
<style lang="scss" scoped>
.el-menu {
  height: calc(100vh - 20px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #036ff4;
}
.el-menu-item {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
}
.el-menu-item:hover {
  background-color: rgb(38, 76, 243);
}
.icons {
  width: 25px;
  height: 25px;
  margin-right: 20px;
  background-size: 100% 100%;
}
</style>
