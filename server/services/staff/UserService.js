const userModel = require("../../models/UserModel");
const curriculumModel = require("../../models/curriculumVitae");
const UserService = {
  login:async({username,password})=>{
    // 首先查找用户名是否存在
    const user = await userModel.findOne({ username });
    if (!user) {
      return { success: false,code:0};
    }
    //判断是否为求职者
    if(user.role !== 0){
      return { success: false,code:0};
    }
    // 如果用户名存在，验证密码是否正确
    if (user.password === password ) {
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
  },
  deleteAducation:async({username,index})=>{
     // 第一步：将指定索引位置的元素设置为 null
  await curriculumModel.updateOne(
    { username },
    { $unset: { [`education.${index}`]: 1 } }
  );
  // 第二步：移除数组中所有值为 null 的元素
  await curriculumModel.updateOne(
    { username },
    { $pull: { education: null } }
  );
  return await curriculumModel.findOne({ username });
},
updateAducation:async({username,index,education})=>{
  return curriculumModel.updateOne({username},{$set:{[`education.${index}`]:education}})
},
updateJobWant:async({username,jobKinds,jobCity,salary,jobType})=>{
  return curriculumModel.updateOne({username},{$set:{jobKinds,jobCity,salary,jobType}})
},
updateIntroduction:async({username,introduction})=>{
  return curriculumModel.updateOne({username},{$set:{introduction}})
},
addHonorary:async({username,honorary})=>{
  return curriculumModel.updateOne({username},{$push:{honorary}})
},
deleteHonorary:async({username,index})=>{
  // 第一步：将指定索引位置的元素设置为 null
await curriculumModel.updateOne(
  { username },
  { $unset: { [`honorary.${index}`]: 1 } }
);
// 第二步：移除数组中所有值为 null 的元素
await curriculumModel.updateOne(
  { username },
  { $pull: { honorary: null } }
);
return await curriculumModel.findOne({ username });
},
addExperience:async({ username,experience })=>{
  return curriculumModel.updateOne({username},{$push:{experience}})
},
updateExperience:async({username,index,experience})=>{
  return curriculumModel.updateOne({username},{$set:{[`experience.${index}`]:experience}})
},
deleteExperience:async({username,index})=>{
  // 第一步：将指定索引位置的元素设置为 null
await curriculumModel.updateOne(
  { username },
  { $unset: { [`experience.${index}`]: 1 } }
);
// 第二步：移除数组中所有值为 null 的元素
await curriculumModel.updateOne(
  { username },
  { $pull: { experience: null } }
);
return await curriculumModel.findOne({ username });
},
addProjects:async({ username,projects })=>{
  return curriculumModel.updateOne({username},{$push:{projects}})
},
updateProjects:async({username,index,projects})=>{
  return curriculumModel.updateOne({username},{$set:{[`projects.${index}`]:projects}})
},
deleteProjects:async({username,index})=>{
  // 第一步：将指定索引位置的元素设置为 null
await curriculumModel.updateOne(
  { username },
  { $unset: { [`projects.${index}`]: 1 } }
);
// 第二步：移除数组中所有值为 null 的元素
await curriculumModel.updateOne(
  { username },
  { $pull: { projects: null } }
);
return await curriculumModel.findOne({ username });
},
updateAvator:async({username,avator})=>{
  return curriculumModel.updateOne({username},{$set:{avator}})
}
}
module.exports = UserService