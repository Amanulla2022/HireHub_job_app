const express = require("express");
const {
  register,
  login,
  updateProfile,
  logout,
} = require("../controllers/candidateController");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

// POST Route to register a new candidate or recruiter
router.post("/register", register);

// POST Route to login a candidate or recruiter
router.post("/login", login);

// GET Route to logout a candidate or recruiter
router.get("/logout", logout);

// Route to update the profile of a candidate or recruiter
// Protected route, requires authentication
router.post("/profile/update", isAuthenticated, updateProfile);

module.exports = router;
