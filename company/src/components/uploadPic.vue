<template>
  <el-upload
                  class="avatar-uploader"
                  action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                  :show-file-list="false"
                  :auto-upload="false"
                  :on-change="handleChange"
                >
                  <img v-if="props.avatar" :src="uploadAvatar" class="avatar" />
                  <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
</template>

<script setup>
import { defineEmits, defineProps, computed } from 'vue';
import { Plus } from '@element-plus/icons-vue'
const props = defineProps({
  avatar: String
})
const emit = defineEmits(["Kevinchange"])
  //每次选择完图片的回调
const handleChange = (file) => {
  emit("Kevinchange",file.raw)
}
const uploadAvatar = computed(()=>{
  return props.avatar.includes("blob")?props.avatar:"http://localhost:3000"+props.avatar
})
</script>

<style lang="scss" scoped>

::v-deep  .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

::v-deep  .el-upload:hover {
  border-color: var(--el-color-primary);
}

::v-deep .el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  text-align: center;
  background-color: rgba(245, 242, 242, 0.553);
}
.avatar{
  width: 148px;
  height: 148px;
}
</style>