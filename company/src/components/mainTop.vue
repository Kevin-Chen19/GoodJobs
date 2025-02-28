<template>
  <el-affix>
    <div class="mainTop">
      <el-row>
        <el-col :span="4"><div class="Icon">
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
          </el-menu>
        </el-col>
        <el-col :span="4" class="avater_name"> 
          <div class="block">
            <el-avatar :size="50" :src="circleUrl" />
          </div>
          <p style="margin-left: 10px;">姓名</p>
        </el-col>
      </el-row>   
    </div>
  </el-affix>
</template>

<script setup>
import { ref } from 'vue'
const activeIndex = ref('1')
const handleSelect = (keyPath) => {
  console.log(keyPath)
}
</script>

<style lang="scss" scoped>
.mainTop{
  background-color: #fff;
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
.avater_name{
  display: flex;
  align-items: center;
}
.el-menu--horizontal.el-menu{
  display: flex;
  justify-content: center;
  border-bottom: none;
}
.el-menu--horizontal>.el-menu-item{
  font-size: large;
}
::v-deep .el-menu--horizontal>.el-sub-menu .el-tooltip__trigger{
  font-size: large;
}
</style>