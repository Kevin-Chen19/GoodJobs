const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companyType = {
    director:String,
    companyName:String,
    companyAddress:String,
    staffNumber:String,
    companyIndustry:String,
    companyLogo:String,
    introduction:String,//企业简介
    contents:String//企业其余介绍内容
  };
  const CompanyModel = mongoose.model("Companys",new Schema(companyType) );
  module.exports = CompanyModel;