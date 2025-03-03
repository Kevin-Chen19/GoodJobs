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
staffUserRouter.post("/staffapi/user/curriculum/deleteAducation",UserController.deleteAducation);
staffUserRouter.post("/staffapi/user/curriculum/updateAducation",UserController.updateAducation);
staffUserRouter.post("/staffapi/user/curriculum/updateJobWant",UserController.updateJobWant);
staffUserRouter.post("/staffapi/user/curriculum/updateIntroduction",UserController.updateIntroduction);
staffUserRouter.post("/staffapi/user/curriculum/addHonorary",UserController.addHonorary);
staffUserRouter.post("/staffapi/user/curriculum/deleteHonorary",UserController.deleteHonorary);
module.exports = staffUserRouter;