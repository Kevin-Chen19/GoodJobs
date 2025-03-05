<template>
  <div class="topMess">
    <div class="topLeft">
      <div class="time"><img src="../../icons/时钟.png" > {{ jobTime }}更新</div>
      <div class="name"><h1>{{ job.jobName }}</h1><h3>{{ job.salary }}</h3></div>
      <div class="tags">
        <p>{{ job.address }}</p>
        <p>{{ job.type }}</p>
        <p v-for="item in job.tags">{{ item }}</p>
      </div>
    </div>
    <div class="topRight">
      <div class="btn">立即投递</div>
    </div>
  </div>
  <div class="otherMess">
    <div>职位描述：</div>
    <p v-html="formattedResponsibility"></p>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import moment from 'moment';
const job = {
  _id: "67baabd935de20723d118221",
  pubUser: "湘潭凝智",
  jobName: "前端开发工程师-25春招",
  salary: "1.5万-2.5万",
  address: "广州",
  subject: [
    "工学",
    "计算机类",
    "前端开发"
  ],
  jobKinds: [
    [
      "互联网/通信及硬件",
      "前端开发",
      "web前端"
    ],
    [
      "互联网/通信及硬件",
      "前端开发",
      "前端开发"
    ]
  ],
  type: "全职",
  tags: [
    "本科",
    "无经验",
    "计算机类"
  ],
  responsibility: "1、依据业务需求、配合后台开发工程师完成界面的交互、联调，完成软件功能模块的开发、测试、以及保证系统模块能按期完工、健壮运行；\n2、根据前端架构师提供的问题解决方案进行实施，保证高效解决系统所产生的问题。",
  requirements: "1、本科或以上、计算机、软件工程、信息系统等相关专业；\n2、熟悉HTML5、CSS3、JavaScript、Ajax、DOM、JQuery、Vue等前端技术；\n3、熟悉项目性能优化的常用方法，并且具备初步的项目优化经验；\n4、熟悉主流浏览器兼容性、响应式布局，熟悉W3C标准、熟悉软件开发流程、设计模式和体系结构",
  companyMessage: {
    _id: "67b17d684313c5790d03f8c7",
    director: "湘潭凝智",
    companyName: "湘潭凝智互联网科技有限责任公司",
    companyAddress: "湘潭经开区2",
    staffNumber: "10~20人",
    companyIndustry: "IT服务",
    companyLogo: "/avataruploads/aed80bd8a30ce2cccc30ea51c87d7146",
    introduction: "很好"
  },
  editTime:  "2025-02-23T05:02:17.904Z"
}
const formattedResponsibility =computed(()=>{
   // 将换行符替换为 <br>，并为 <br> 添加自定义 class
  return job.responsibility.replace(/\n/g, '<br class="line-break">');
}) 
const jobTime = computed(() => {
  return moment(job.editTime).format('YYYY-MM-DD')
})
</script>
<style lang="scss" scoped>
.topMess{
  width: 97%;
  height: 135px;
  background-color: #fff;
  padding: 20px;
  display: flex;
  .topLeft{
    width: 70%;
    height: 135px;
  }
  .topRight{
    width: 30%;
    height: 135px;
  }
}
.time{
  height: 30px;
  line-height: 30px;
  display: flex;
  img{
    width: 30px;
    margin-right: 10px;
  }
}
.name{
  width: 80%;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  h3{
    color: rgba(0, 0, 255, 0.653);
  }
}
.tags{
  display: flex;
  margin-top: 20px;
  color: rgb(107, 105, 105);
  p{
    padding:0 15px;
    border-right: 1px solid black;
  }
  p:last-child{
    border-right: none;
  }
}
.btn{
  width: 170px;
  height: 50px;
  margin-top: 80px;
  margin-left: 40px;
  line-height: 50px;
  font-size: 20px;
  text-align: center;
  background-color: #007fff;
  color: #fff;
  border-radius: 25px;
  cursor: pointer;
}
.btn:hover{
  background-color: #3682ce;
}
.otherMess{
  width: 65%;
  margin-top: 20px;
  height: 500px;
  margin-left: 3%;
  background-color: #fff;
  border-radius: 25px;
  padding: 25px;

}
.line-break {
  margin-top: 10px; /* 设置间距 */
}
</style>