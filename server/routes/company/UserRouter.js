var express = require('express');
const UserController = require('../../controllers/company/UserController');
var UserRouter = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
//图片上传模块
const multer = require('multer');
const upload = multer({dest: 'public/avataruploads/'});
/* GET home page. */
UserRouter.post("/companyapi/user/login",UserController.login);
UserRouter.post("/companyapi/user/messageAdd",authMiddleware,upload.single('LogoFile'),UserController.messageAdd)
UserRouter.post("/companyapi/user/messageEdit",authMiddleware,upload.single('LogoFile'),UserController.messageEdit)
UserRouter.post("/companyapi/user/registerCompany",authMiddleware,UserController.registerCompany);
UserRouter.get("/companyapi/user/getMessage/:director",authMiddleware,UserController.getMessage);
module.exports = UserRouter;
