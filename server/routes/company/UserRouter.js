var express = require('express');
const UserController = require('../../controllers/company/UserController');
var UserRouter = express.Router();

//图片上传模块
const multer = require('multer');
const upload = multer({dest: 'public/avataruploads/'});
/* GET home page. */
UserRouter.post("/companyapi/user/login",UserController.login);
UserRouter.post("/companyapi/user/messageAdd",upload.single('LogoFile'),UserController.messageAdd)
UserRouter.post("/companyapi/user/messageEdit",upload.single('LogoFile'),UserController.messageEdit)
UserRouter.post("/companyapi/user/registerCompany",UserController.registerCompany);
UserRouter.get("/companyapi/user/getMessage/:director",UserController.getMessage);
module.exports = UserRouter;
