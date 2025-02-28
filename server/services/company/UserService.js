const userModel = require("../../models/UserModel");
const CompanyModel = require("../../models/CompanyModel");
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
  messageAdd:async({director,companyName,companyAddress,staffNumber,companyIndustry,introduction,companyLogo})=>{
    return CompanyModel.create({director,companyName,companyAddress,staffNumber,companyIndustry,introduction,companyLogo})
  },
  getMessage:async({director})=>{
    return CompanyModel.find({director})
  },
  messageEdit:async({_id,companyName,companyAddress,staffNumber,companyIndustry,introduction,companyLogo})=>{
    if(companyLogo){
      return CompanyModel.updateOne({_id},{companyName,companyAddress,staffNumber,companyIndustry,introduction,companyLogo})
    }else{
      return CompanyModel.updateOne({_id},{companyName,companyAddress,staffNumber,companyIndustry,introduction})
    }
  },
  upload:async({_id,username,password,gender,introduction,avatar})=>{
    if(avatar){
      return userModel.updateOne({_id},{username,password,gender,introduction,avatar})
    }else{
      return userModel.updateOne({_id},{username,password,gender,introduction})
    }
    
  },
  add:async({username,password,role})=>{
    return userModel.create({username,password,role})
  },
  getList:async(req,res)=>{
    return userModel.find({},["username","role","avatar","introduction","gender","password"])
  },
  delList:async({_id})=>{
    return userModel.deleteOne({_id})
  },
  putList:async({_id,username,password,role,introduction})=>{
    return userModel.updateOne({_id},{username,password,role,introduction})
  }
}
module.exports = UserService;