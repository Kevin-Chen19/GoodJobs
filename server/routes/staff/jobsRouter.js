var express = require('express');
const JobsController = require('../../controllers/staff/JobsController');
var staffJobsRouter = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');

staffJobsRouter.get("/staffapi/jobs/list",authMiddleware,JobsController.jobsList);
staffJobsRouter.get("/staffapi/jobs/kindList",authMiddleware,JobsController.jobsKindList);
staffJobsRouter.get("/staffapi/jobs/searchList",authMiddleware,JobsController.searchList);
staffJobsRouter.get("/staffapi/refreshToken",JobsController.refreshToken);
module.exports = staffJobsRouter;