<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px"><companyIndexSide></companyIndexSide></el-aside>
      <el-container>
        <el-header><companyIndexTop/></el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>   
    </el-container>
    <bottom></bottom>
  </div>
</template>

<script setup>
import companyIndexTop from '@/components/companyIndexTop.vue';
import companyIndexSide from '@/components/companyIndexSide.vue';
import bottom from '@/components/bottom.vue';
</script>

<style lang="scss" scoped>
  .el-main{
    overflow: auto;
    height: calc(100vh - 60px);
  }
  .el-footer{
    height: 100px;
  }
</style>