<template>
<el-backtop :bottom="100">
    <div class="backTop">
      <img src="../assets/回到顶部.png">
    </div>
</el-backtop>
</template>
<style lang="scss" scoped>
.backTop{
  height: 100%;
  width: 100%;
  background-color: var(--el-bg-color-overlay);
  box-shadow: var(--el-box-shadow-lighter);
  text-align: center;
  line-height: 40px;
  border-radius: 50%;
  align-items: center;
}
img{
  margin-top: 5px;
  width: 30px;
  height: 30px;
}
</style>