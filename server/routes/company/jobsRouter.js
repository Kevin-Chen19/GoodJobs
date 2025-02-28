var express = require('express');
const JobsController = require('../../controllers/company/JobsController');
var JobsRouter = express.Router();

JobsRouter.post("/companyapi/jobs/jobsAdd",JobsController.jobsAdd);
JobsRouter.get("/companyapi/jobs/list/:pubUser",JobsController.jobsList);
JobsRouter.post("/companyapi/jobs/jobsUpdate",JobsController.jobsUpdate);
JobsRouter.post("/companyapi/jobs/jobsDelete/:_id",JobsController.jobsDelete);
module.exports = JobsRouter;