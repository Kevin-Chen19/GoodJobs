var express = require('express');
const UserController = require('../../controllers/staff/UserController');
var staffUserRouter = express.Router();

staffUserRouter.post("/staffapi/user/login",UserController.login);
staffUserRouter.post("/staffapi/user/register",UserController.register);
module.exports = staffUserRouter;