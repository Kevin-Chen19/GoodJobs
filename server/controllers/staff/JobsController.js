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
  }
}
module.exports = JobsController