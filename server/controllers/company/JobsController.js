const JobsService = require("../../services/company/JobsService")
const JobsController = {
  jobsAdd:async(req,res)=>{
    const {pubUser,jobName,salary,address,type,tags,subject,jobKinds,responsibility,requirements,companyMessage} = req.body
    await JobsService.jobsAdd({pubUser,jobName,salary,address,type,tags,subject,jobKinds,responsibility,requirements,companyMessage})
     res.send({
      ActionType:"ok"
    })
  },
  jobsList:async(req,res)=>{
    const {pubUser} = req.params
    const jobsList = await JobsService.getList({pubUser})
    res.send({
      ActionType:"ok",
      jobsList
    })
  },
  jobsUpdate:async(req,res)=>{
    const {_id,pubUser,jobName,salary,address,type,tags,subject,jobKinds,responsibility,requirements} = req.body
    await JobsService.jobsUpdate({_id,pubUser,jobName,salary,address,type,tags,subject,jobKinds,responsibility,requirements,editTime:new Date()})
    res.send({
      ActionType:"ok"
    })
  },
  jobsDelete:async(req,res)=>{
    const {_id} = req.params
    await JobsService.jobsDelete({_id})
    res.send({
      ActionType:"ok"
    })
  },
  refreshToken:async(req,res)=>{
      const refreshToken = req.query.refreshToken
      if(!refreshToken){
        return res.send({
          code:401,
          msg:"Refresh token is required"
        })
      }
      const data = await JobsService.refreshToken(refreshToken)
      if(data.code === 200){
        res.send({
          ActionType:"ok",
          code:200,
          token:data.token
        })
      }else{
        res.send({
          ActionType:"ok",
          code:402,
          msg:data.msg
        })
      }
    }
}
module.exports = JobsController