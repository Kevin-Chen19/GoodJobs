const JobsService = require("../../services/staff/JobsService");
const JobsController = {
  jobsList:async(req,res)=>{
    const jobsList = await JobsService.getList()
    res.send({
      ActionType:"ok",
      jobsList
    })
  },
  jobsKindList:async(req,res)=>{
    const { pageNum, subject, address1, kinds, type, select1, select2, select3 } = req.query;
    const jobsKindList = await JobsService.getKindList(pageNum, subject, address1, kinds, type, select1, select2, select3)
    res.send({
      ActionType:"ok",
      jobsKindList
    })
  },
  searchList:async(req,res)=>{
    const keyword = req.query.keyword
    const pageNum = req.query.pageNum
    const jobsKindList = await JobsService.searchList(pageNum, keyword)
    res.send({
      ActionType:"ok",
      jobsKindList
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