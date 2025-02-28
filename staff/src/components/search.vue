<template>
      <div class="searchBox">
      <el-input
            v-model="input2"
            style="width: 80%"
            placeholder="搜索你想要的职位"
            :prefix-icon="Search"
            clearable="true"
          />
      <el-button type="primary" round class="but">搜索</el-button>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
const input2 = ref('')
</script>
<style lang="scss" scoped>
.searchBox{
  width: 60%;
  margin-top: 20px;
  margin-left: 20%;
  margin-bottom: 25px;
  height: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 2px solid black;
  border-radius: 25px;
  .but{
    width: 15%;
    height: 90%;
    font-size: large;
  }
}
::v-deep .el-input__wrapper{
  box-shadow: none;
}
</style>