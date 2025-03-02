var express = require('express');
const UserController = require('../../controllers/staff/UserController');
var staffUserRouter = express.Router();

staffUserRouter.post("/staffapi/user/login",UserController.login);
staffUserRouter.post("/staffapi/user/register",UserController.register);
staffUserRouter.post("/staffapi/user/curriculum",UserController.curriculum);
staffUserRouter.get("/staffapi/user/getCurriculum/:username",UserController.getCurriculum);
staffUserRouter.post("/staffapi/user/curriculum/addAducation",UserController.addAducation);
staffUserRouter.post("/staffapi/user/curriculum/updateBase",UserController.updateBase);
staffUserRouter.post("/staffapi/user/curriculum/updatejobStatus",UserController.updatejobStatus);
module.exports = staffUserRouter;