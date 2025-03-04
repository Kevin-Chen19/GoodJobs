const UserService = require("../../services/staff/UserService");
const JWT = require("../../util/JWT");
const UserController = {
  login:async(req,res)=>{
   var result = await UserService.login(req.body);
   if(result.success===false){
    if(result.code===0){
     res.send({code:0,msg:"用户名不存在"}) 
    }else {
     res.send({code:-1,msg:"用户名和密码不匹配"}) 
    }
   }else{
    //生成token
    const token = JWT.generate({
      _id:result.data._id.toString(),
      username:result.data.username
    },"1d");
    res.header("Authorization",token);
     res.send({
      code:200,
      msg:"登录成功",
      data:{
        username:result.data.username,
        avatar:result.data.avatar,
        role:result.data.role
      },
      token:token
    })
   }
},
register:async(req,res)=>{
  const {username, password} = req.body;
    //调用service模块更新数据
    await UserService.register({username, password, role:0});
      res.send({
      ActionType:"ok"
    })
},
curriculum:async(req,res)=>{
  await UserService.curriculum(req.body);
  res.send({
    ActionType:"ok"
  })
},
getCurriculum:async(req,res)=>{
  const {username} = req.params
  const result = await UserService.getCurriculum({username});
  res.send({
    ActionType:"ok",
    data:result
  })
},
addAducation:async(req,res)=>{
  await UserService.addAducation(req.body);
  res.send({
    ActionType:"ok"
  })
},
updateBase:async(req,res)=>{
  await UserService.updateBase(req.body);
  res.send({
    ActionType:"ok"
  })
},
updatejobStatus:async(req,res)=>{
  await UserService.updatejobStatus(req.body);
  res.send({
    ActionType:"ok"
  })
},
deleteAducation:async(req,res)=>{
  await UserService.deleteAducation(req.body);
  res.send({
    ActionType:"ok"
  })
},
updateAducation:async(req,res)=>{
  await UserService.updateAducation(req.body);
  res.send({
    ActionType:"ok"
  })
},
updateJobWant:async(req,res)=>{
  await UserService.updateJobWant(req.body);
  res.send({
    ActionType:"ok"
  })
},
updateIntroduction:async(req,res)=>{
  await UserService.updateIntroduction(req.body);
  res.send({
    ActionType:"ok"
  })
},
addHonorary:async(req,res)=>{
  await UserService.addHonorary(req.body);
  res.send({
    ActionType:"ok"
  })
},
deleteHonorary:async(req,res)=>{
  await UserService.deleteHonorary(req.body);
  res.send({
    ActionType:"ok"
  })
},
addExperience:async(req,res)=>{
  await UserService.addExperience(req.body);
  res.send({
    ActionType:"ok"
  })
},
updateExperience:async(req,res)=>{
  await UserService.updateExperience(req.body);
  res.send({
    ActionType:"ok"
  })
},
deleteExperience:async(req,res)=>{
  await UserService.deleteExperience(req.body);
  res.send({
    ActionType:"ok"
  })
},
addProjects:async(req,res)=>{
  await UserService.addProjects(req.body);
  res.send({
    ActionType:"ok"
  })
},
updateProjects:async(req,res)=>{
  await UserService.updateProjects(req.body);
  res.send({
    ActionType:"ok"
  })
},
deleteProjects:async(req,res)=>{
  await UserService.deleteProjects(req.body);
  res.send({
    ActionType:"ok"
  })
}
}

module.exports = UserController;