const jsonwebtoken = require('jsonwebtoken');
const secret = 'Kevin';//短期密钥
const refresh_secret = 'Ckx';//长期密钥
let refreshTokens = [];
const JWT = {
  generate(value){//value是要加密的数据
    let accsessToken = jsonwebtoken.sign(value,secret,{expiresIn:'15s'})
    let refreshToken = jsonwebtoken.sign(value,refresh_secret,{expiresIn:'7d'})
    refreshTokens.push(refreshToken)
    // 返回 tokens
    return {
      access_token:accsessToken,
      refresh_token:refreshToken
    }
  },
  verify(token,type){
    try{
      if(type === 0){
        return jsonwebtoken.verify(token,secret)
      }else if(type === 1){
        return jsonwebtoken.verify(token,refresh_secret)
      }
    }catch(err){
      return false
    } 
  }
}
module.exports = JWT;