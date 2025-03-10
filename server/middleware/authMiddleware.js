const JWT = require("../util/JWT")
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({
      ActionType: "error",
      msg: "未提供 token",
    });
  }

  if (JWT.verify(token, 0)) {
    next(); // token 验证通过，继续执行下一个中间件或路由处理函数
  } else {
    return res.send({
      code: 401,
      ActionType: "error",
      msg: "token 失效",
    });
  }
};

module.exports = authMiddleware;