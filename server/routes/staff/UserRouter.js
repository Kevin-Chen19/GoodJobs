var express = require('express');
const UserController = require('../../controllers/staff/UserController');
var staffUserRouter = express.Router();
//图片上传模块
const multer = require('multer');
const upload = multer({dest: 'public/avataruploads/'});

staffUserRouter.post("/staffapi/user/login",UserController.login);
staffUserRouter.post("/staffapi/user/register",UserController.register);
staffUserRouter.post("/staffapi/user/curriculum",UserController.curriculum);
staffUserRouter.get("/staffapi/user/getCurriculum/:username",UserController.getCurriculum);
staffUserRouter.post("/staffapi/user/curriculum/addAducation",UserController.addAducation);
staffUserRouter.post("/staffapi/user/curriculum/updateBase",UserController.updateBase);
staffUserRouter.post("/staffapi/user/curriculum/updatejobStatus",UserController.updatejobStatus);
staffUserRouter.post("/staffapi/user/curriculum/deleteAducation",UserController.deleteAducation);
staffUserRouter.post("/staffapi/user/curriculum/updateAducation",UserController.updateAducation);
staffUserRouter.post("/staffapi/user/curriculum/updateJobWant",UserController.updateJobWant);
staffUserRouter.post("/staffapi/user/curriculum/updateIntroduction",UserController.updateIntroduction);
staffUserRouter.post("/staffapi/user/curriculum/addHonorary",UserController.addHonorary);
staffUserRouter.post("/staffapi/user/curriculum/deleteHonorary",UserController.deleteHonorary);
staffUserRouter.post("/staffapi/user/curriculum/addExperience",UserController.addExperience);
staffUserRouter.post("/staffapi/user/curriculum/updateExperience",UserController.updateExperience);
staffUserRouter.post("/staffapi/user/curriculum/deleteExperience",UserController.deleteExperience);
staffUserRouter.post("/staffapi/user/curriculum/addProjects",UserController.addProjects);
staffUserRouter.post("/staffapi/user/curriculum/updateProjects",UserController.updateProjects);
staffUserRouter.post("/staffapi/user/curriculum/deleteProjects",UserController.deleteProjects);
staffUserRouter.post("/staffapi/user/curriculum/updateAvator",upload.single('avatorFile'),UserController.updateAvator);
staffUserRouter.post("/staffapi/user/curriculum/updateLastLook",UserController.updateLastLook)
module.exports = staffUserRouter;