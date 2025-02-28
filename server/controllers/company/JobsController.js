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
  }
}
module.exports = JobsController