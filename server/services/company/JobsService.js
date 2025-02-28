const JobsModel = require("../../models/JobsModel");
const JobsService = {
  jobsAdd:async({pubUser,jobName,salary,address,type,tags,subject,jobKinds,responsibility,requirements,companyMessage})=>{
    return JobsModel.create({pubUser,jobName,salary,address,type,tags,subject,jobKinds,responsibility,requirements,companyMessage})
  },
  getList:async({pubUser})=>{
    return pubUser ? JobsModel.find({pubUser}).sort({editTime:-1}) : JobsModel.find({}).sort({editTime:-1});
  },
  jobsUpdate:async({_id,pubUser,jobName,salary,address,type,tags,subject,jobKinds,responsibility,requirements,editTime})=>{
    return JobsModel.updateOne({_id},{pubUser,jobName,salary,address,type,tags,subject,jobKinds,responsibility,requirements,editTime})
  },
  jobsDelete:async({_id})=>{
    return JobsModel.deleteOne({_id})
  }
}
module.exports = JobsService;