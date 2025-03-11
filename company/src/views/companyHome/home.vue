<template>
  <comNavTop />
  <div class="bigContainer">
    <div class="tips">完成企业信息填写，即刻入驻平台~</div>
    <div class="FormClass">
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item label="企业全称" prop="companyName">
          <el-input v-model="ruleForm.companyName"  />
        </el-form-item>
        <el-form-item label="企业地址" prop="companyAddress">
          <el-input v-model="ruleForm.companyAddress"/> 
        </el-form-item>
        <el-form-item label="企业员工数" prop="staffNumber">
          <el-select v-model="ruleForm.staffNumber">
            <el-option v-for="item in personNumber" :label= " item " :value=" item " />         
          </el-select>
        </el-form-item>
        <el-form-item label="企业行业" prop="companyIndustry">
          <el-select v-model="ruleForm.companyIndustry">
            <el-option v-for="item in Industry" :label= " item.bigKind " :value=" item.bigKind " />
          </el-select>
        </el-form-item>
        <el-form-item label="企业简介" prop="introduction">
          <el-input v-model="ruleForm.introduction"/> 
        </el-form-item>
        <el-form-item label="企业标志" prop="companyLogo">
          <uploadPic :avatar="ruleForm.companyLogo" @kevinchange="handleChange"/>
        </el-form-item>
        <el-form-item>
          <el-button v-if="!ifEdit" type="primary" @click="submitForm(ruleFormRef)" class="subbtn">
            提交
          </el-button>
          <el-button v-if="ifEdit" type="primary" @click="editForm(ruleFormRef)" class="subbtn">
            修改
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import comNavTop from '@/components/comNavTop.vue'
import { reactive, ref, onMounted} from 'vue'
import { useRouter ,useRoute} from 'vue-router'
import uploadPic from '@/components/uploadPic.vue'
import axios from '../../util/axios.config'
import store from '@/store'
import upload from '@/util/upload'
const router = useRouter()
const route = useRoute()
const ruleFormRef = ref()
const ifEdit = ref(false)
const personNumber = ["0~10人", "20~50人", "50~100人", "100~500人", "500~1000人", "1000~5000人", "5000~10000人", "10000人以上"]
const Industry = [{bigKind:"IT服务",smallKind:["互联网/通信及硬件","IT软件与服务","电子技术","通信/电信运营、增值服务","计算机硬件","计算机软件","电子/电器/半导体/仪器仪表"]},
{bigKind:"房地产/建筑/建材/工程",smallKind:["房地产开发/建筑与工程","房地产服务","建筑与工程","家居/室内设计/装潢","物业管理/商业中心"]},
{bigKind:"贸易/进出口",smallKind:["批发/零售","快速消费品（食品/饮料/烟酒/日化）","耐用消费品（服饰/纺织/皮革/家具/家电）","贸易/进出口","专业销售/批发"]},
{bigKind:"金融/银行/投资",smallKind:["银行","基金/证券/期货/投资","保险","信托/担保/拍卖/典当"]},
{bigKind:"教育/培训/院校",smallKind:["教育/培训/院校","专业服务（咨询、人力资源、财会）","学术/科研"]},
{bigKind:"服务业",smallKind:["餐饮业","酒店/旅游","娱乐/体育/休闲","美容/保健","生活服务","医疗/护理/美容/保健/卫生服务","医疗设备/器械"]},
{bigKind:"物流/运输",smallKind:["交通/运输/物流","航天/航空","物流/仓储"]}]
const ruleForm = reactive({
  _id: '',
  director: '',
  companyName: '',
  companyAddress: '',
  staffNumber: "10~20人",
  companyIndustry: 'IT服务',
  introduction: '',
  companyLogo: '',
  LogoFile:null,
  contents: '暂无'
})

const rules = reactive({
  companyName: [
  { required: true, message: '请输入企业全称', trigger: 'blur' },],
  companyAddress: [
  { required: true, message: '请输入企业地址', trigger: 'blur' },],
  staffNumber: [
  { required: true, message: '请输入企业规模', trigger: 'blur' },],
  companyIndustry: [
  { required: true, message: '请输入企业行业', trigger: 'blur' },],
  introduction: [
  { required: true, message: '请输入企业简介', trigger: 'blur' },],
  companyLogo: [
  { required: true, message: '请输入企业标志', trigger: 'blur' },]
})



const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate(async(valid) => {
    if (valid) {
      ruleForm.director = store.state.userInfo.username
      try{
        const res = await upload("/companyapi/user/messageAdd", ruleForm)
        console.log(res.ActionType)
        if(res.ActionType == "ok"){
          alert("提交成功")
          router.push("/companyIndex")
        }else {
        console.log('error submit!')
      }
      } catch(err){
        console.log(err)
      }
    }
  })
}
const editForm = (formEl) => {
  if (!formEl) return
  formEl.validate(async(valid) => {
    if (valid) {
      ruleForm.director = store.state.userInfo.username
      try{
        const res = await upload("/companyapi/user/messageEdit", ruleForm)
        console.log(res.ActionType)
        if(res.ActionType == "ok"){
          alert("修改成功")
          router.push("/companyIndex")
        }else {
        console.log('error submit!')
      }
      } catch(err){
        console.log(err)
      }
    }
  })
}
const handleChange = (file) => {
  ruleForm.companyLogo = URL.createObjectURL(file)
  ruleForm.LogoFile = file
  console.log(ruleForm.LogoFile,ruleForm.companyLogo)
}

const director = store.state.userInfo.username;
onMounted(async()=>{
  ifEdit.value = route.query.key == "edit"
  try{
    const result = await axios.get("/companyapi/user/getMessage/"+ director);
    if(result.data.Message[0] != null){
      ruleForm._id = result.data.Message[0]._id;
      ruleForm.companyName = result.data.Message[0].companyName;
      ruleForm.companyAddress = result.data.Message[0].companyAddress;
      ruleForm.introduction = result.data.Message[0].introduction;
      ruleForm.companyIndustry = result.data.Message[0].companyIndustry;
      ruleForm.staffNumber = result.data.Message[0].staffNumber;
      ruleForm.companyLogo = result.data.Message[0].companyLogo;
    }
  }catch(err){
    console.log(err)
  }
})
</script>
<style lang="scss" scoped>
.bigContainer{
  width: 80%;
  margin-left: 10%;
  margin-bottom: 30px;
  border-radius: 25px;
  background: rgb(249,255,255);
  background: linear-gradient(0deg, rgba(249,255,255,1) 0%, rgba(199,221,240,1) 100%);
  padding: 20px;
}
.tips{
  font-size: 20px;
  font-weight: 700;
  margin: 20px;
}
.FormClass{
  margin-top: 40px;
  width: 60%;
  margin-left: 20%;
}
.subbtn{
  width: 100px;
  padding: 10px;
}
</style>