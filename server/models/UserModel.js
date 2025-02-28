const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userType = {
    username:String,
    password:String,
    avatar:String,
    role:Number
  };
  
  const UserModel = mongoose.model('User',new Schema(userType) );
  module.exports = UserModel;