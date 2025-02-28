<template>
  <div class="editBtn" @click="EditMess()">
    信息编辑<el-icon><Right /></el-icon>
  </div>
  <el-scrollbar height="calc(100vh-200px)">
    <div class="boxTitle">基本信息</div>
    <div class="firstBox">
      <div class="LogoPic" ><img :src="avatarUrl"></div>
      <div class="basicMess">
        <h4 style="margin-bottom: 5px">关于</h4>
        <h3 style="margin-bottom: 15px">{{ companyMessage.companyName }}</h3>
        <p style="margin-bottom: 10px">
          公司坐落于{{ companyMessage.companyAddress }}
        </p>
        <p>
          {{ companyMessage.introduction }}
        </p>
        <div class="tags">
          <div class="tagsItem">
            <div>{{ companyMessage.companyIndustry }}</div>
            <p>企业行业</p>
          </div>
          <div class="tagsItem">
            <div>{{ companyMessage.staffNumber }}</div>
            <p>企业规模</p>
          </div>
        </div>
      </div>
    </div>
    <div class="secondBox">
      <div class="boxTitle">企业相册</div>
      <div class="noPics" v-if="!ifHaveAlbum">您暂时没有上传，点我上传吧~</div>
      <el-carousel :interval="4000" type="card" height="300px" v-if="ifHaveAlbum">
        <el-carousel-item v-for="(item, index) in companyAlbum" :key="index">
          <img :src="require(`@/assets/${item}`)" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </el-scrollbar>
</template>
<script setup>
import { ref, onMounted, reactive, computed} from "vue";
import { Right } from "@element-plus/icons-vue";
import { useRouter} from "vue-router";
import axios from "axios";
import store from "@/store";
const router = useRouter();
const companyAlbum = ["swiper1.jpg", "swiper2.jpg", "swiper3.jpg"];
const ifHaveAlbum = ref(true);
const avatarUrl = computed(()=>store.state.avatarUrl?'http://localhost:3000'+store.state.avatarUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png")
const companyMessage = reactive({
  companyName: "",
  companyAddress: "",
  introduction: "",
  companyIndustry: "",
  staffNumber: "",
  companyLogo: ""
});
const director = store.state.userInfo.username;
onMounted(async()=>{
  const result = await axios.get("/companyapi/user/getMessage/"+ director);
    companyMessage.companyName = result.data.Message[0].companyName;
    companyMessage.companyAddress = result.data.Message[0].companyAddress;
    companyMessage.introduction = result.data.Message[0].introduction;
    companyMessage.companyIndustry = result.data.Message[0].companyIndustry;
    companyMessage.staffNumber = result.data.Message[0].staffNumber;
    companyMessage.companyLogo = result.data.Message[0].companyLogo;
    store.commit("changeCompanyMessage", result.data.Message[0]);
    store.commit("changeAvatarUrl", result.data.Message[0].companyLogo);
})
const EditMess =()=>{
  router.push({ path: '/companyHome', query: { key: 'edit' } });
}
</script>
<style lang="scss" scoped>
.editBtn {
  margin-left: 90%;
  display: flex;
  align-items: center;
  color: #66b1ff;
  font-size: 18px;
}
.editBtn:hover {
  cursor: pointer;
  color: rgb(32, 140, 248);
}
.boxTitle {
  font-size: 20px;
  font-weight: 600;
  font-family: "华文楷体";
}
.firstBox {
  width: 99%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.LogoPic {
  width: 270px;
  height: 270px;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img{
    width: 100%;;
  }
}
.basicMess {
  width: 500px;
  * {
    margin: 0;
  }
}
.tags {
  display: flex;
  margin-top: 20px;
}
.tagsItem {
  margin-right: 40px;
  div {
    width: 130px;
    padding-bottom: 5px;
    border-bottom: 2px solid black;
    font-size: 17px;
  }
  p {
    color: gray;
    margin-top: 5px;
    font-size: 15px;
  }
}
.secondBox {

  margin-top: 20px;
}
.noPics {
  width: 100%;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: gray;
}
</style>
