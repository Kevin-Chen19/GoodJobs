const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const curriculumType = {
  username:String,//用户名
  avator:String,//证件照
  name:String,//真实姓名
  sex:String,//性别
  age:String,//年龄
  phone:String,//电话
  email:String,//邮箱
  education:Array,//学历
  jobType:Array,//意向工作类型
  jobCity:Array,//意向工作城市
  jobStatus:Array,//意向工作状态
  address:String,//现居地址
  jobKinds:Array,//意向工作职类
  salary:String,//意向工资
  status:String,//目前身份
  introduction:String,//自我介绍
  experience:Array,//工作经验
  projects:Array,//项目经验
  honorary:Array,//荣誉奖项
  lastLook:Array,//最近浏览
}
const curriculumVitaeModel = mongoose.model("curriculumVitae",new Schema(curriculumType) );
module.exports = curriculumVitaeModel;