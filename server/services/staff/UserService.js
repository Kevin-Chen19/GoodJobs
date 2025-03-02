const userModel = require("../../models/UserModel");
const curriculumModel = require("../../models/curriculumVitae");
const UserService = {
  login:async({username,password})=>{
    // 首先查找用户名是否存在
    const user = await userModel.findOne({ username });
    if (!user) {
      return { success: false,code:0};
    }
    // 如果用户名存在，验证密码是否正确
    if (user.password === password) {
      // 密码正确，返回成功信息和用户数据或令牌
      return { success: true, code:200, data:user };
    } else {
      // 密码不正确
      return { success: false,code:-1};
    }
  },
  register:async({username,password,role})=>{
    return userModel.create({username,password,role})
  },
  curriculum:async({username,name,age,sex,status,address,email,phone,jobStatus,jobKinds,jobCity,salary,jobType,education})=>{
    // 将 education 转换为数组形式
    const educationArray = [education];
    return curriculumModel.create({username,name,age,sex,status,address,email,phone,jobStatus,jobKinds,jobCity,salary,jobType,education:educationArray})
  },
  getCurriculum:async({username})=>{
    console.log("用户名：",username)
    return curriculumModel.find({username})
  },
  addAducation:async({username,education})=>{
    return curriculumModel.updateOne({username},{$push:{education}})
  },
  updateBase:async({username,name,age,sex,status,address,email,phone})=>{
    return curriculumModel.updateOne({username},{$set:{name,age,sex,status,address,email,phone}})
  },
  updatejobStatus:async({username,jobStatus})=>{
    return curriculumModel.updateOne({username},{$set:{jobStatus}})
  }
}
module.exports = UserService