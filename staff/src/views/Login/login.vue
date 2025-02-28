<template>
  <navTop/>
  <div class="loginLine">
    <el-carousel height="500px" :autoplay="false">
      <el-carousel-item :key="1">
        <div
          class="imgs"
          :style="{
            backgroundImage: `url(${require('@/assets/firstImg.jpg')})`,
          }"
        ></div>
      </el-carousel-item>
      <el-carousel-item :key="2">
        <div
          class="imgs"
          :style="{
            backgroundImage: `url(${require('@/assets/firstImg.jpg')})`,
          }"
        ></div>
      </el-carousel-item>
    </el-carousel>
    <div class="lgc">
      <loginCard @ifRegister="ifRegister" :trueRegister="trueRegister"/>
    </div>
  </div>
  <div class="lineIcon">
    <el-row :gutter="20">
    <el-col :span="4"></el-col>
    <el-col :span="4"><img src="../../icons/建筑.png" ><h4>高薪名企</h4><p>1000万+名企在线</p></el-col>
    <el-col :span="4"><img src="../../icons/入职.png" ><h4>极速入职</h4><p>快速约面试拿高薪</p></el-col>
    <el-col :span="4"><img src="../../icons/喇叭.png" ><h4>有投必应</h4><p>24小时极速反馈</p></el-col>
    <el-col :span="4"><img src="../../icons/权威认证.png" ><h4>行业权威</h4><p>3.74亿+职场人选择</p></el-col>
    <el-col :span="4"></el-col>
  </el-row>
  </div>
  <div class="jobType">
    <div class="blackCover"></div>
    <div class="top">
      <div>知名企业覆盖超1436万+</div>
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="IT互联网" name="first"><img src="../../assets/IT互联网.png"></el-tab-pane>
        <el-tab-pane label="制造业" name="second"><img src="../../assets/制造业.png"></el-tab-pane>
        <el-tab-pane label="房地产" name="third"><img src="../../assets/房地产.png"></el-tab-pane>
        <el-tab-pane label="消费品" name="fourth"><img src="../../assets/消费品.png"></el-tab-pane>
        <el-tab-pane label="金融" name="fifth"><img src="../../assets/金融.png"></el-tab-pane>
        <el-tab-pane label="服务业" name="sixth"><img src="../../assets/服务业.png"></el-tab-pane>
      </el-tabs>
    </div>   
  </div>
  <bottom/>
  <el-dialog
    v-model="dialogVisible"
    title="提示"
    width="500"
  >
    <span>账号不存在，您是否需要注册该新账号？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="toRegister()">
          注册
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import navTop from '@/components/navTop.vue'
import loginCard from "@/components/loginCard.vue";
import bottom from "@/components/bottom.vue";
import { ref } from 'vue'
const dialogVisible = ref(false)
const trueRegister = ref(false)
const activeName = ref('first')
const toRegister = () => {
  dialogVisible.value = false
  trueRegister.value = true
}
const ifRegister = () => {
  dialogVisible.value = true
}
</script>
<style lang="scss" scoped>
.loginLine {
  position: relative;
  .lgc {
    position: absolute;
    top: 50%;
    left: 75%;
    transform: translate(-50%, -50%);
  }
}
.el-carousel-item {
  width: 100%;
  height: 500px;
}
.imgs {
  width: 100%;
  height: 500px;
  background-size: cover;
  background-position: center;
}
.lineIcon{
  margin: 30px 0;
}
.el-col{
  text-align: center;
  p{
    font-size: 14px;
    color: #999;
  }
  img{
    width: 50px;
  }
}
.jobType{
  position: relative;
  background-image: url("../../assets/work.png");
  background-size: cover;
  background-position: center;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  color: white;
  margin: 30px 0;

  .blackCover{
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.754);
    z-index: 1;
  }
  .top{
    position: relative;
    padding: 20px 0;
    z-index: 2;
  }
   .el-tabs{
    margin: 20px 0;
  }
  ::v-deep .el-tabs__header{
    width: fit-content;
    margin-left: 31%;
    margin-bottom: 30px;
  }
  ::v-deep .el-tabs__item{
    font-size: 18px;
    font-weight: 500;
    color: rgb(184, 181, 181);
  }
  ::v-deep .el-tabs__item.is-active, ::v-deep .el-tabs__item:hover{
    color: white;
  }
  img{
    width: 75%;
  }
}
</style>
