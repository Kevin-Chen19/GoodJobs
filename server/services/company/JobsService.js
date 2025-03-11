const JobsModel = require("../../models/JobsModel");
const JWT = require("../../util/JWT");
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
  },
  refreshToken:async(refreshToken)=>{
      const result = JWT.verify(refreshToken,1); 
      console.log(result);
      if(result){
        const accessToken = JWT.generate({
            _id:result._id.toString(),
            username:result.username
        }).access_token;
        return {
          code:200,
          token:accessToken
        }
      }else{
        return {
          code:402,
          msg:"refreshToken失效"
        }
      }
  }
}
module.exports = JobsService;