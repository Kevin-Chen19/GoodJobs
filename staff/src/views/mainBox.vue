<template>
  <div class="common-layout ">
    <el-container>
      <el-header><mainTop></mainTop></el-header>
      <el-main class="container"><router-view></router-view></el-main>
    </el-container>
  </div>
  <div class="botm">
    <bottom></bottom>
  </div>
</template>
<script setup>
import mainTop from "@/components/mainTop.vue";
import bottom from "@/components/bottom.vue";
</script>
<style lang="scss" scoped>
.container{
  max-width: 1400px;
  margin: 0 auto;
}
.el-header{
  --el-header-padding:0;
}
.botm{
  width: 100%;
  height: fit-content;
  background-color: black;
}
</style>