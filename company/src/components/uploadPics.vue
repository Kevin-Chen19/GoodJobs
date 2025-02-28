<template>
<el-upload action="#" list-type="picture-card" :auto-upload="false" :file-list="files" @remove="handleRemove"
:on-change="handleChange" :disabled=" files.length === 5  " >
    <el-icon ><Plus /></el-icon>
    <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <el-icon><zoom-in /></el-icon>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <el-icon><Download /></el-icon>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <el-icon><Delete /></el-icon>
          </span>
        </span>
      </div>
    </template>
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script  setup>
import {defineEmits, ref, computed} from 'vue'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
const emit = defineEmits(["Albumchange"])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
const files = ref([])
const postFiles = ref([])
const handleRemove = (file) => {
  //移除图片操作
    const index = files.value.findIndex(f => f.uid === file.uid);
    if (index !== -1) {
      files.value.splice(index, 1);
      emitData()
    }
}
const handleChange = (uploadFiles, fileList) => {
  files.value = fileList
  if (files.value.length >= 5) {
    ElMessage({
    message: '您好，公司相册仅支持最多上传5张照片哦',
    type: 'warning',
  })
  }  
  emitData()
};
const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}

const handleDownload = (file) => {
  console.log(file)
}
const emitData = () => {
  postFiles.value = files.value.map(file => {
    return {
      name: file.raw
    }
  })
  emit("Albumchange",postFiles.value)
}
</script>