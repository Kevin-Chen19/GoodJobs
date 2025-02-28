const jsonwebtoken = require('jsonwebtoken');
const secret = 'Kevin';//密钥
const JWT = {
  generate(value,expires){//value是要加密的数据，expires是过期时间
   return jsonwebtoken.sign(value,secret,{expiresIn:expires})
  },
  verify(token){
    try{
      return jsonwebtoken.verify(token,secret)
    }catch(err){
      return false
    } 
  }
}
module.exports = JWT;