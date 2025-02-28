const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobsType = {
  pubUser: String,
  jobName: String,
  salary: String,
  address: String,
  subject: Array,
  jobKinds: Array,
  type: String,
  tags: Array,
  responsibility: String,
  requirements: String,
  companyMessage:{},
  editTime: {
    type: Date,
    default: Date.now
  }
  };
  
  const JobsModel = mongoose.model('Jobs',new Schema(jobsType) );
  module.exports = JobsModel;