<template>
  <el-row >
    <el-col :span="5" style=" border-right: 1px solid #0877e6;">
      <el-scrollbar height="400px">
        <div v-for="(item,index) in bigSubject" :key="item" class="bigSubject" @click="selectBig(index)" :class="{actived: chooseBig === index}">
          <p>{{ item }}</p>
          <p>></p>
        </div>
      </el-scrollbar>
    </el-col>
    <el-col :span="5" style=" border-right: 1px solid #0877e6;">
      <el-scrollbar height="400px">
        <div v-for="(item,index) in miduleSubject[chooseBig]" :key="item" class="bigSubject" @click="selectMidule(index)" :class="{actived: chooseMidule === index}">
          <p class="items">{{ item }}</p>
          <p>></p>
        </div>
      </el-scrollbar>
    </el-col>
    <el-col :span="14">
      <div class="smallBox" >
        <div class="smallKindItem" v-for="(item , index) in smallSubject[chooseBig][chooseMidule]" ><p @click="choseSub(item)">{{ item }}</p></div>
      </div>
    </el-col>
  </el-row>
</template>
<script setup>
import { ref , defineEmits} from 'vue'
const chooseBig = ref(0)
const chooseMidule = ref(0)
// 定义 emits
const emit = defineEmits(['select']);
const bigSubject = ["工学","理学","医学","农学","管理学","文学","法学","艺术学","经济学","教育学","农林牧渔","土木建筑","能源动力与材料","交通运输"]
const miduleSubject = [
  ["计算机类","安全科学与工程","材料类","测绘类","电气类","电子信息类"],
  ["数学类","物理学类","化学类","地理科学类","大气科学类","海洋科学类","地球物理学类","地质学类","生物科学类","心理学类","统计学类"],
  ["临床医学类","口腔医学类","中医学类","药学类","医学技术类","护理学类"],
  ["植物生产类","动物生产类","林学类","水产类","草学类"],
  ["工商管理类","公共管理类","旅游管理类","图书情报与档案管理类","物流管理与工程类","电子商务类"],
  ["中国语言文学类","外国语言文学类","新闻传播学类"],
  ["法学类","政治学类","社会学类","民族学类","马克思主义理论类","公安学类"],
  ["艺术学理论类","戏剧与影视学类","美术学类","设计学类","音乐与舞蹈学类"],
  ["经济学类","金融学类","经济与贸易类","统计学类"],
  ["教育学类","体育学类"],
  ["农业类"],
  ["建筑设计类","土建施工类"],
  ["黑色金属材料类","新能源发电工程类"],
  ["城市轨道交通类","道路运输类","铁道运输类"],
]
const smallSubject = [
  [["区块链工程","机器人工程","人工智能","软件工程","网络工程","信息安全","物联网工程","计算机科学与技术","前端开发"],["安全工程","安全生产监督"],["材料化学","材料科学与工程","材料物理","复合材料与工程","功能材料","焊接技术与工程","金属材料工程","冶金工程","涂料工程","电子信息材料","智能材料与结构"],["测绘工程","导航工程","地理国情监测","遥感科学与技术"],["电机电器智能化","电气工程及其自动化","光源与照明","电动载运工程"]],
  [["数据计算及应用","数理基础科学","数学与应用数学","信息与计算科学"],["核物理","量子信息科学","声学","应用物理学"],["化学测量学与技术","资源化学"],["地理科学","自然地理与资源科学"]],
  [["儿科学","放射医学","精神医学","临床医学","麻醉学","眼视光医学","医学影像学","助产学"],["口腔医学"],["针灸推拿学","中医骨伤科学","中医康复学","中医养生学"]],
  [["茶学","农学","园艺","植物保护","农药化肥","生物育种技术"],["实验动物学","水生动物学","饲料工程","经济动物学"],["智慧林业"]],
  [["创业管理","财务管理","财务会计教育","劳动关系","市场营销","物业管理"],["城市管理","海关管理","行政管理","交通管理","公共事业管理"],["酒店管理","旅游管理","会展经济与管理","旅游管理与服务教育"]],[],[],[],[],[],[],[],[],[]
]

function choseSub(item) {
  emit('select', item); // 将选中的值传递给父组件
}
const selectBig = (index) => {
  console.log(index)
  chooseBig.value = index
  chooseMidule.value = 0
}
const selectMidule = (index) => {
  chooseMidule.value = index
  console.log(index)
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
</style>