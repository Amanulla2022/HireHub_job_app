const express = require("express");
const {
  postJob,
  getAllJobs,
  getJobById,
  getAdminJobs,
} = require("../controllers/jobController");
const isAuthenticated = require("../middleware/isAuthenticated");
const router = express.Router();

// POST Route to create a new job
// Protected route, requires authentication
router.post("/post", isAuthenticated, postJob);

// GET Route to list of Jobs
// Protected route, requires authentication
router.get("/get", isAuthenticated, getAllJobs);

// GET Route to get the job by it's id
// Protected route, requires authentication
router.get("/get/:id", isAuthenticated, getJobById);

// GET Route to get the job by admin post
// Protected route, requires authentication
router.get("/getadminjobs", isAuthenticated, getAdminJobs);

module.exports = router;
