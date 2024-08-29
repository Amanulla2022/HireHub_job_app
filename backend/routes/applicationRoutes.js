const express = require("express");
const {
  applyJob,
  getAppliedJob,
  getApplicants,
  updateStatus,
} = require("../controllers/applicationController");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

// POST Route to apply for job
// Protected route, requires authentication
router.post("/apply/:id", isAuthenticated, applyJob);

// GET Route to get all aplied jobs
// Protected route, requires authentication
router.get("/get", isAuthenticated, getAppliedJob);

// GET Route to get all applicants by job id
// Protected route, requires authentication
router.get("/:id/applicants", isAuthenticated, getApplicants);

// PUT Route to update the status of the application by admin only with application id
// Protected route, requires authentication
router.put("/status/:id/update", isAuthenticated, updateStatus);

module.exports = router;
