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
}
}

module.exports = UserController;