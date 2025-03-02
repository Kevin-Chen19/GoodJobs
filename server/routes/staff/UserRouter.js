var express = require('express');
const UserController = require('../../controllers/staff/UserController');
var staffUserRouter = express.Router();

staffUserRouter.post("/staffapi/user/login",UserController.login);
staffUserRouter.post("/staffapi/user/register",UserController.register);
staffUserRouter.post("/staffapi/user/curriculum",UserController.curriculum);
staffUserRouter.get("/staffapi/user/getCurriculum/:username",UserController.getCurriculum);
module.exports = staffUserRouter;