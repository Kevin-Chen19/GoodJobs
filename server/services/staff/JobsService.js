const JobsModel = require("../../models/JobsModel");
const JobsService = {
  getList:async()=>{
    return  JobsModel.find().sort({editTime:-1}) ;
  },
  getKindList:async(pageNum, subject, address1, kinds, type, select1, select2, select3)=>{
    const query = {};
    if (subject !== "不限") query.subject = { $in:[subject]};
    if(kinds[0] !== "不限") query.jobKinds = { $elemMatch:{2:{ $in:kinds}} };
    if (address1[0] !== "全国"){
      // 创建一个正则表达式，匹配数组中的任何一个城市名称
      const citiesRegex = new RegExp(address1.join('|')); // 'i' 表示不区分大小写
      query.address = { $regex: citiesRegex };
    }
    if (type !== "不限"){
      if(type === "兼职/临时"){
        query.type = "兼职";
      }else{
        query.type = type;
      }
    }
    if (select1 !== "学历") query.tags = { $in:[select1]};
    if (select2 !== "公司行业") query["companyMessage.companyIndustry"] = select2;
    if (select3 !== "公司规模") query["companyMessage.staffNumber"] = select3;
    // 分页处理
    console.log(query);
     const limit = 5; // 每页显示的记录数
     const page = parseInt(pageNum) || 1;
     const skip = (page - 1) * limit;
     return JobsModel.find(query)
      .limit(limit)
      .skip(skip)
      .exec();
  }
}
module.exports = JobsService;