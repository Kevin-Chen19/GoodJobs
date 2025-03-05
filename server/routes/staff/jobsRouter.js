var express = require('express');
const JobsController = require('../../controllers/staff/JobsController');
var staffJobsRouter = express.Router();

staffJobsRouter.get("/staffapi/jobs/list",JobsController.jobsList);
staffJobsRouter.get("/staffapi/jobs/kindList",JobsController.jobsKindList);
staffJobsRouter.get("/staffapi/jobs/searchList",JobsController.searchList);
module.exports = staffJobsRouter;