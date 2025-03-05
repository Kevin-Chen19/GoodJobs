<template>
<el-row>
    <el-col :span="5" style=" border-right: 1px solid #0877e6;">
      <el-scrollbar height="400px">
        <div v-for="(item,index) in BigKind" :key="item" class="bigSubject" @click="selectBig(index)" :class="{actived: chooseBig === index}">
          <p>{{ item }}</p>
          <p>></p>
        </div>
      </el-scrollbar>
    </el-col>
    <el-col :span="5" style=" border-right: 1px solid #0877e6;">
      <el-scrollbar height="400px">
        <div v-for="(item,index) in midlueKind[chooseBig]" :key="item" class="bigSubject" @click="selectMidule(index)" :class="{actived: chooseMidule === index}">
          <p class="items">{{ item }}</p>
          <p>></p>
        </div>
      </el-scrollbar>
    </el-col>
    <el-col :span="14">
      <div class="smallBox">
        <div class="smallKindItem" v-for="(item , index) in smallKind[chooseBig][chooseMidule]" ><p @click="chooseOne(index)">{{ item }}</p></div>
      </div>
    </el-col>
  </el-row>
  <div class="selectBottom">
    <div class="hadChoose">
      <div class="result">已选：<p>{{ Select.length }}</p>/5</div>
      <div class="resultItems" v-for="(item , index) in Select">{{ item }}<p @click="cancelOne(index)">X</p></div>
    </div>
    <div class="selectBtns">
      <div class="cancel" @click="cancel()">取消</div>
      <div class="confirm" @click="confirm()">确定</div>
    </div>
  </div>
</template>
<script setup>
import { ref , reactive ,defineEmits , watch} from 'vue'
import { ElMessage } from 'element-plus'
const emit = defineEmits(['selectKinds','cancelKinds']);
const chooseSmall = ref(0)
const chooseBig = ref(0)
const chooseMidule = ref(0)
const hadSelect = reactive([])
const Select = reactive([])

const BigKind = ["互联网/通信及硬件","销售/商务拓展","运维/测试","视觉/交互/设计","金融/保险","物流/采购/供应","翻译/记者/编辑","医疗/医美/医务","教育/培训/科研","房地产/建筑/物业","生产制造"]
const midlueKind = [
  ["软件开发","前端开发","移动开发","通信及硬件研发","人工智能","数据工程师","半导体/芯片"],
  ["销售顾问","商务拓展","销售管理"],
  ["运维支持","测试工程师","售前售后工程师"],
  ["视觉/交互设计师","动画动效设计","工业设计","陈列展示设计"],
  ["投融资","保险","银行及金融服务","证券/基金/期货","信托/担保/拍卖"],
  ["采购/供应链/材料管理","物流管理","仓储管理","交通运输","配送理货"],
  ["翻译","编辑/编校/作家","记者/采编"],
  ["生物/医药研发","临床研究/试验","医药市场/销售","医疗器械","医生/药剂师","护士/医助"],
  ["教务管理","早教/幼教","中小学课程辅导","高等教育","IT培训","职业培训","才艺特长培训","科研/学术培训"],
  ["房地产规划开发","房地产交易","建筑/室内设计","工程安全/工程质检","工程管理"]
  ["生产管理","机械设计/制造","生产质量管理","印刷包装"]
]
const smallKind = [
  [["Java","Python","PHP","C/C++","C#","Node.js","架构师","全栈工程师","云计算","研发经理"],["web前端","前端开发","HTML5","JavaScript"],["Android","iOS","移动开发","小程序开发","鸿蒙开发工程师"]],
  [["销售顾问","客户经理","电话销售","网络销售","外贸业务员"],["渠道销售","渠道经理","商务总监","招商","广告销售"]],
  [["运维工程师","运维开发工程师","系统工程师","系统安全"],["测试工程师","软件测试","硬件测试","系统测试","协议测试","性能测试"]],
  [["平面设计","广告设计","美工","UI设计师","UX设计师","游戏界面设计师"]],[],[],[],[],[],[],[]
]
const props = defineProps({
  Kinds: {
    type: Array,
    required: true, // 必传
    default: () => [] // 默认值
  }
});
watch(()=>props.Kinds,
  (newArray)=>{
    Select.splice(0,Select.length,...newArray)
    hadSelect.splice(0, hadSelect.length, ...newArray)
  }, {immediate: true ,deep: true}
)
const selectBig = (index) => {
  chooseBig.value = index
  chooseMidule.value = 0
}
const selectMidule = (index) => {
  chooseMidule.value = index
}
const chooseOne = (index) => {
  if(smallKind[chooseBig.value][chooseMidule.value][index] !== "不限") {
    if (Select.includes("不限")) {
      Select.splice(Select.indexOf("全国"), 1);
    }
  }
  if(Select.length >= 5) {
    ElMessage.error('工作职类最多只能选5个')
    return
  }
  if(Select.some(item => item === smallKind[chooseBig.value][chooseMidule.value][index])) {
    ElMessage.error('该工作职类已选择')
    return
  }
  chooseSmall.value = index
  const item = ref("")
  item.value = smallKind[chooseBig.value][chooseMidule.value][index]
  Select.push(item.value)
}
const cancelOne = (index) => {
  Select.splice(index,1)
}
const cancel = () =>{
  Select.splice(0,Select.length,...hadSelect);
  emit('cancelKinds')
}
const confirm = () =>{
  //将Select中的数据赋值给hadSelect，让hadSelect中的数据与Select中的数据保持一致
  if(Select.length === 0) {
    Select.push("不限")
  }
  hadSelect.splice(0, hadSelect.length, ...Select);
  emit('selectKinds',hadSelect)
}
</script>
<style lang="scss" scoped>
.el-row{
  width: 100%;
  margin-left: -16px;
}
.bigSubject{
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  width: 86%;
  height: 40px;
  padding: 0 10px;
  cursor: pointer;
  .items{
    width: 90%;
    white-space: nowrap; /* 防止文字换行 */
    overflow: hidden; /* 隐藏超出的部分 */
    text-overflow: ellipsis; 
  }
}
.bigSubject:hover{
  background-color: #0877e614;
  p{
    color: rgba(0, 0, 255, 0.6);
  }
}
.actived{
  background-color: #0877e614;
}
.smallBox{
  display: flex;
  flex-wrap: wrap;
  margin-left: 30px;
}
.smallKindItem{
  height: 50px;
  margin-right: 8%;
  width: 25%;
  line-height: 50px;
  cursor: pointer;
  p{
    width: 95%;
    white-space: nowrap; /* 防止文字换行 */
    overflow: hidden; /* 隐藏超出的部分 */
    text-overflow: ellipsis; 
  }
}
.smallKindItem:hover{
  color: rgba(0, 0, 255, 0.6);
}

.selectBottom{
  margin-left: -2%;
  width: 104%;
  height: 150px;
  border-top: 1px solid #0877e6;
  .hadChoose{
    display: flex;
    margin-left: 20px;
    margin-top: 20px;
    font-size: 15px;
    align-items: center;
    .result{
      display: flex;
      height: 30px;
      line-height: 30px;
      p{
      font-size: 22px;
      }
    }   
    .resultItems{
      display: flex;
      margin-left: 15px;
      padding: 8px 12px;
      background-color: #50a0ef2c;
      border: 1px solid #0877e666;
      color: #0877e6;
      font-size: 15px;
      border-radius: 5px;
      p{
        margin-left: 10px;
        padding: 2px 5px;
        font-size: 10px;
        margin-top: 0.5px;
        cursor: pointer;
      }
      p:hover{
        background-color: rgba(0, 106, 255, 0.426);
        border-radius: 50%;
        color: white;
      }
    }
  }
}
.selectBtns{
  display: flex;
  margin-top: 45px;
  margin-left: 73%;
  height: 50px;
  div{
    cursor: pointer;
  }
  .cancel{
    height: 40px;
    line-height: 40px;
    padding: 0 30px;
    font-size: 15px;
    font-weight: 500;
    margin-right: 20px;
    background-color: #fff;
    border-radius: 5px;
    border: #0877e6 solid 1.5px;
    color: #0877e6;
  }
  .cancel:hover{
    background-color: #0877e614;
    color: rgba(0, 0, 255, 0.6);
  }
  .confirm{
    height: 40px;
    line-height: 40px;
    padding: 0 30px;
    font-size: 15px;
    font-weight: 500;
    margin-right: 20px;
    background-color: #0877e6;
    border-radius: 5px;
    color: white;
  }
  .confirm:hover{
    background-color: #0264c6;
  }
}
.selectActive{
  border: #0877e6 solid 1.5px;
}
</style>