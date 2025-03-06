<template>
  <div class="temStyle">
    <search @click="toSearchPage"></search>
    <div class="categoryBox">
      <div style="display: flex" @mouseleave="handleMouseLeave">
        <el-card style="border-radius: 15px">
          <el-tabs
            type="border-card"
            stretch="ture"
            @tab-click="handleTabClick"
            v-model="activeTab"
          >
            <el-tab-pane label="按专业筛选" name="profession">
              <div
                class="jobLine"
                v-for="(item, index) in someCategory"
                :key="index"
                @mouseenter="handleMouseOver(index)"
              >
                <p>{{ item }}</p>
                <p>{{ firstNames[index] }}></p>
              </div>
              <button class="jobCardBtn" @click="allKinds">全部专业</button>
            </el-tab-pane>
            <el-tab-pane label="按职位筛选" name="position">
              <div
                class="jobLine"
                v-for="(item, index) in someCategory2"
                :key="index"
                @mouseenter="handleMouseOver(index)"
              >
                <p>{{ item }}</p>
                <p>{{ firstNames2[index] }}></p>
              </div>
              <button class="jobCardBtn" @click="allKinds">全部职类</button>
            </el-tab-pane>
          </el-tabs>
        </el-card>
        <el-card class="showBox">
          <div v-show="ifSelect" style="padding: 20px">
            <p>{{ getKind }}</p>
            <div class="lineKind" v-for="(item, index) in getCategory">
              <div style="width: 16%; color: gray">{{ item.name }}</div>
              <div class="jobContainer">
                <div class="jobs" v-for="job in getCategory[index].children">
                  <p @click="toJob(job)">{{ job }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-show="!ifSelect">
            <el-carousel height="380px" motion-blur>
              <el-carousel-item :key="1">
                <div
                  class="bgc"
                  :style="{
                    backgroundImage: `url(${require('@/assets/swiper3.jpg')})`,
                  }"
                ></div>
              </el-carousel-item>
              <el-carousel-item :key="2">
                <div
                  class="bgc"
                  :style="{
                    backgroundImage: `url(${require('@/assets/swiper1.jpg')})`,
                  }"
                ></div>
              </el-carousel-item>
              <el-carousel-item :key="3">
                <div
                  class="bgc"
                  :style="{
                    backgroundImage: `url(${require('@/assets/swiper2.jpg')})`,
                  }"
                ></div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-card>
      </div>
    </div>
    <div class="ad">
      <div class="Title">
        <h1>品牌专区</h1>
        <p>行业领导者，邀你共创辉煌</p>
      </div>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="smallBox">
            <div
              class="adBg"
              :style="{
                backgroundImage: `url(${require('@/assets/ad1.jpg')})`,
              }"
            ></div>
            <p>"智汇谯城 才聚药都" 亳州市谯城区引才云平台</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="smallBox">
            <div
              class="adBg"
              :style="{
                backgroundImage: `url(${require('@/assets/ad2.jpg')})`,
              }"
            ></div>
            <p>大学生专属1V1简历定制</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="smallBox">
            <div
              class="adBg"
              :style="{
                backgroundImage: `url(${require('@/assets/ad3.jpg')})`,
              }"
            ></div>
            <p>爱上洛阳 留在洛阳</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="ad">
      <div class="Title">
        <h1>最新职位</h1>
        <p>平台最新职位上新</p>
      </div>
      <el-row :gutter="20" class="jobAddress">
        <el-col :span="8" v-for="(item, index) in jobs" @click="goToJobDetail(item)">
          <div class="smallBox">
            <div class="jobNameLine">
              <p>{{ item.jobName }}</p>
              <p style="color: #409eff">{{ item.salary }}</p>
            </div>
            <div class="require">
              <p v-for="tags in item.tags">{{ tags }}</p>
            </div>
            <div class="companyMess">
              <div class="Logo">
                <img :src="photo(item.companyMessage.companyLogo)" />
              </div>
              <div class="Message">
                <p>{{ item.companyMessage.companyName }}</p>
                <div class="more">
                  <div class="company">
                    <p>{{ item.companyMessage.companyIndustry }}</p>
                    <p>{{ item.companyMessage.staffNumber }}</p>
                  </div>
                  <div>{{ item.address }}</div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <button class="getMore" @click="lookMore()">查看更多</button>
    <bottom></bottom>
  </div>
</template>
<script setup>
import bottom from "@/components/bottom.vue";
import search from "@/components/search.vue";
import { ref, onMounted, } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
const router = useRouter();
const ifByProfession = ref(true);
const activeTab = ref("profession");
const handleTabClick = (tab) => {
  ifByProfession.value = tab.props.name === "profession";
  console.log(ifByProfession.value);
};
const someCategory = ["工学", "理学", "医学", "管理学", "文学"];
const someCategory2 = [
  "销售/商务拓展",
  "互联网/通信及硬件",
  "视觉/交互/设计",
  "运营/客服",
  "产品/项目/高级管理",
];
const tinyCategory = [
  [
    { name: "安全科学与工程类", children: ["安全工程", "安全生成简单"] },
    {
      name: "材料类",
      children: [
        "材料科学与工程",
        "材料物理",
        "材料化学",
        "高分子材料与工程",
        "功能材料",
        "纳米材料与技术",
        "焊接技术与工程",
        "宝石及材料工艺学",
      ],
    },
  ],
  [
    { name: "统计学类", children: ["统计学", "应用统计学", "经济统计学"] },
    {
      name: "物理学类",
      children: ["物理学", "声学", "应用物理学", "量子信息科学"],
    },
    { name: "心理学类", children: ["心理学", "应用心理学", "心理学"] },
  ],
  [
    {
      name: "动物医学类",
      children: ["动物医学", "动物药学", "动植物检疫", "中兽医学"],
    },
    {
      name: "公共卫生与预防医学类",
      children: [
        "妇幼保健医学",
        "食品卫生与营养学",
        "卫生监督",
        "运动与公共健康",
      ],
    },
    { name: "护理学类", children: ["护理学"] },
  ],
  [
    {
      name: "工商管理类",
      children: [
        "会计学",
        "财务管理",
        "审计学",
        "市场营销",
        "人力资源管理",
        "工商管理",
        "物流管理",
        "零售业管理",
        "文化产业管理",
        "资产评估",
      ],
    },
    {
      name: "电子商务类",
      children: ["电子商务", "电子商务及法律", "跨境电子商务"],
    },
  ],
  [
    { name: "戏剧与影视学类", children: ["广播电视编导"] },
    {
      name: "新闻传播学",
      children: [
        "新闻学",
        "传播学",
        "广告学",
        "数字出版",
        "广播电视学",
        "动画",
        "戏剧影视文学",
        "会展",
      ],
    },
  ],
];
const tinyCategory2 = [
  [
    {
      name: "销售顾问",
      children: [
        "销售工程师",
        "外贸经理",
        "销售顾问",
        "商品销售",
        "电话销售",
        "代理商销售",
        "网络销售",
        "外贸业务员",
        "客户经理",
      ],
    },
    {
      name: "商务拓展",
      children: [
        "商务专员",
        "商务经理",
        "商务总监",
        "商务渠道",
        "招商",
        "选址开发",
        "广告销售",
        "渠道销售",
        "渠道经理",
      ],
    },
    {
      name: "销售管理",
      children: [
        "销售团队经理",
        "城市经理",
        "销售总监",
        "销售督导",
        "区域总监",
      ],
    },
  ],
  [
    {
      name: "软件研发",
      children: [
        "Java",
        "PHP",
        "Python",
        "C",
        "C#",
        "c/c++",
        "Golang",
        "Node.js",
        "架构师",
        "全栈工程师",
        "嵌入式开发",
        "需求分析工程师",
        "系统集成",
        "云计算",
        "研发经理",
      ],
    },
    {
      name: "前端开发",
      children: ["web前端", "前端开发", "HTML5", "javaScript"],
    },
    {
      name: "移动研发",
      children: [
        "Android",
        "iOS",
        "小程序开发",
        "小游戏开发",
        "鸿蒙开发工程师",
        "移动开发",
      ],
    },
  ],
  [
    {
      name: "视觉/交互设计",
      children: [
        "交互设计",
        "平面设计",
        "UI设计",
        "网页设计",
        "游戏设计",
        "手绘师",
        "设计总监",
      ],
    },
    {
      name: "动画动效设计",
      children: ["Flash设计师", "动画设计", "特效设计", "角色模型师"],
    },
    {
      name: "工业设计",
      children: [
        "工业设计",
        "包装设计",
        "橱柜设计",
        "家具设计",
        "玩具设计",
        "珠宝设计",
      ],
    },
  ],
  [
    {
      name: "电商运营",
      children: [
        "国内电商运营",
        "电商专员/助理",
        "电商经理/主管",
        "品类运营",
        "淘宝/天猫运营",
        "跨境电商运营",
        "选品师",
      ],
    },
    {
      name: "新媒体运营",
      children: [
        "新媒体编辑",
        "新媒体运营",
        "微博运营",
        "直播运营",
        "短视频运营",
      ],
    },
    {
      name: "业务运营",
      children: [
        "运营助理/专员",
        "运营主管",
        "社区运营",
        "平台运营",
        "产品运营",
        "会员运营",
        "内容审核",
        "销售运营",
        "游戏运营",
      ],
    },
  ],
  [
    {
      name: "产品经理",
      children: [
        "产品经理",
        "产品助理",
        "产品总监",
        "安全产品经理",
        "商业化产品经理",
      ],
    },
    {
      name: "项目管理",
      children: [
        "项目专员",
        "项目执行",
        "项目总监",
        "汽车项目经理",
        "广告/会展项目经理",
        "物流/仓储项目经理",
      ],
    },
    {
      name: "高级管理",
      children: ["CEO/总裁/总经理", "CFO", "CIO", "CMO", "COO"],
    },
  ],
];
const firstNames = tinyCategory.map((subArray) => subArray[0].name);
const firstNames2 = tinyCategory2.map((subArray) => subArray[0].name);
const getCategory = ref([]);
const getKind = ref("");
const ifSelect = ref(false);
const jobs = ref([]);
const handleMouseOver = (index) => {
  if (ifByProfession.value) {
    getKind.value = someCategory[index];
    getCategory.value = tinyCategory[index];
  } else {
    getKind.value = someCategory2[index];
    getCategory.value = tinyCategory2[index];
  }
  ifSelect.value = true;
};
const handleMouseLeave = () => {
  ifSelect.value = false;
};
const toJob = (job) => {
  router.push({
    path:"/searchJob",
    state:{
      witch:ifByProfession.value,
      jobKind:job
    }
  })
};
onMounted(async () => {
  const result = await axios.get("/staffapi/jobs/list");
  jobs.value = result.data.jobsList;
});
const photo = (url) => {
  return url
    ? "http://localhost:3000" + url
    : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
};
const lookMore = () => {
  router.push("/recommend");
};
const allKinds = () =>{
  router.push("/searchJob")
}
const toSearchPage = ()=>{
  router.push("/searchJob")
}
const goToJobDetail = (value)=>{
  router.push({
    path: "/detail",
    query: {
      job: JSON.stringify(value)
    }
  })
}
</script>
<style lang="scss" scoped>
.temStyle {
  background-color: rgb(245, 247, 252);
  height: fit-content;
  margin-top: 20px;
}
.searchBox {
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
  .but {
    width: 15%;
    height: 90%;
    font-size: large;
  }
}
::v-deep .el-input__wrapper {
  box-shadow: none;
}
.categoryBox {
  display: flex;
  justify-content: center;
}
.jobLine {
  width: 240px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-radius: 15px;
}
.jobLine:hover {
  background-color: rgba(245, 247, 255);
  cursor: pointer;
}
.jobCardBtn {
  margin-left: 5%;
  width: 90%;
  height: 40px;
  border: none;
  border-radius: 15px;
  background-color: #409eff;
  color: white;
  font-size: large;
  margin-top: 30px;
}
.jobCardBtn:hover {
  background-color: #66b1ff;
  cursor: pointer;
}
.showBox {
  height: 380px;
  width: 700px;
  margin-left: 30px;
  border-radius: 15px;
}
.lineKind {
  margin-top: 20px;
  display: flex;
  margin-bottom: 10px; /* 可选：设置行间距 */
}
::v-deep .el-card__body {
  padding: 0;
}
.jobContainer {
  width: 80%;
  display: flex;
  flex-wrap: wrap; /* 允许换行 */
  border-bottom: 2px solid rgba(200, 198, 198, 0.287);
}
.jobs {
  flex: 0 0 calc(25% - 10px); /* 每行5个元素，所以每个元素占20%的宽度，减去间距 */
  box-sizing: border-box;
  padding: 0 10px 10px 10px;
  text-align: left;
  width: 100px; /* 设置固定宽度以实现宽高一致 */
  display: flex;
  align-items: center; /* 垂直居中对齐 */
  justify-content: center; /* 水平居中对齐 */
  /* 文本溢出省略号 */
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%; /* 确保文本占满整个宽度 */
  }
  p:hover {
    color: #409eff;
    cursor: pointer;
  }
}
.bgc {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
}
/*广告区样式 */
.ad {
  width: 90%;
  margin-left: 5%;
  margin: 40px auto;
  .Title {
    display: flex;
    align-items: center;
    margin-left: 10px;
    p {
      margin-left: 20px;
      color: rgb(174, 173, 173);
    }
  }
}
.smallBox {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 15px;
  margin-top: 20px;
  padding: 20px 0;
  p {
    margin-top: 10px;
  }
}
.smallBox:hover {
  cursor: pointer;
  box-shadow: rgb(177, 176, 176) 0px 2px 3px 0px;
}
.adBg {
  width: 90%;
  height: 190px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 15px;
}
.jobAddress {
  display: flex;
  flex-wrap: wrap;
}
/*精选职位 */
.jobNameLine {
  width: 90%;
  display: flex;
  justify-content: space-between;
}
.require {
  width: 90%;
  display: flex;
  p {
    padding: 5px;
    background-color: #dcdbdb89;
    border-radius: 5px;
    margin-right: 5px;
    color: #666565ea;
  }
}
.companyMess {
  width: 90%;
  margin-top: 20px;
  display: flex;
  align-items: center;
  .Logo {
    width: 50px;
    height: 50px;
    border: 2px solid black;
    margin-right: 10px;
    border-radius: 10px;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .Message {
    width: 80%;
    p {
      margin: 0;
    }
  }
  .more {
    width: 100%;
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    .company {
      display: flex;
      align-items: center;
      p {
        margin-right: 5px;
        color: rgb(174, 171, 171);
      }
    }
  }
}
/*查看更多按钮 */
.getMore {
  width: 10%;
  height: 35px;
  margin-left: 45%;
  margin: 20px auto 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: none;
  padding: 5px 20px;
  color: white;
  font-size: 16px;
  background-color: rgb(66, 110, 255);
  cursor: pointer;
}
</style>
