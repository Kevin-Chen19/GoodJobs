const UserService = require("../../services/company/UserService")
const JWT = require("../../util/JWT")
const UserController = {
  login:async(req,res)=>{
    console.log("获取的数据：",req.body);
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
    }).access_token;
    const refreshToken = JWT.generate({
      _id:result.data._id.toString(),
      username:result.data.username
    }).refresh_token;
    res.header("Authorization",token);
     res.send({
      code:200,
      msg:"登录成功",
      data:{
        username:result.data.username,
        avatar:result.data.avatar,
        role:result.data.role
      },
      token:token,
      refreshToken:refreshToken
    })
   }
  },
  messageAdd:async(req,res)=>{
    console.log("获取的数据：",req.file,req.body);
    const {director,companyName,companyAddress,staffNumber,companyIndustry,introduction} = req.body;
    const companyLogo = req.file?`/avataruploads/${req.file.filename}`:""
    await UserService.messageAdd({director,companyName,companyAddress,staffNumber,companyIndustry,introduction,companyLogo});
    res.send({
      ActionType:"ok"
    })
  },
  getMessage:async(req,res)=>{
    const {director} = req.params
    const Message = await UserService.getMessage({director})
    res.send({
      ActionType:"ok",
      Message
    })
  },
  registerCompany:async(req,res)=>{
    const {username, password} = req.body;
    //调用service模块更新数据
    await UserService.add({username, password, role:1});
      res.send({
      ActionType:"ok"
    })
  },
  messageEdit:async(req,res)=>{
    const {_id,director,companyName,companyAddress,staffNumber,companyIndustry,introduction} = req.body;
    const companyLogo = req.file?`/avataruploads/${req.file.filename}`:""
    await UserService.messageEdit({_id,director,companyName,companyAddress,staffNumber,companyIndustry,introduction,companyLogo});
    res.send({
      ActionType:"ok"
    })
  },
  upload:async(req,res)=>{
    console.log("获取的数据：",req.body,req.file);
    const {username, password, gender, introduction} = req.body;
    const token = req.headers["authorization"].split(" ")[1]
    const avatar =req.file? `/avataruploads/${req.file.filename}`:""
    const payload = JWT.verify(token);
    //调用service模块更新数据
    await UserService.upload({_id:payload._id,username, password, gender:Number(gender), introduction,avatar});
    if(avatar){
       res.send({
      ActionType:"ok",
      data:{
        username,
        gender:Number(gender),
        introduction,
        avatar
      }
    })
    }else{
      res.send({
        ActionType:"ok",
        data:{
          username,
          gender:Number(gender),
          introduction
        }
      })
    }
  },
  add:async(req,res)=>{
    console.log("获取的数据：",req.body,req.file);
    const {username, password, role, gender, introduction} = req.body;
    const avatar =req.file? `/avataruploads/${req.file.filename}`:""
    //调用service模块更新数据
    await UserService.add({username, password, role:Number(role), gender, introduction,avatar});
      res.send({
      ActionType:"ok"
    })
  },
  getList:async(req,res)=>{
    const result = await UserService.getList();
    res.send({
      ActionType:"ok",
      msg:"获取成功",
      data:result
    })
  },
  delList:async(req,res)=>{
    const id = req.params.id;
    const result = await UserService.delList({_id:id});
    res.send({
      ActionType:"ok"
    })
  },
  putList:async(req,res)=>{
    const id = req.params.id;
    const {username, password, role, introduction} = req.body;
    const result = await UserService.putList({_id:id,username, password, role:Number(role), introduction});
    res.send({
      ActionType:"ok"
    })
  }
}

module.exports = UserController;