<template>
  <div class="common-layout">
    <el-container>
      <el-header><mainTop></mainTop></el-header>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </div>
</template>
<script setup>
import mainTop from "@/components/mainTop.vue";
</script>
