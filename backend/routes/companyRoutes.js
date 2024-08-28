const express = require("express");
const {
  registerCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
} = require("../controllers/companyController");
const isAuthenticated = require("../middleware/isAuthenticated");
const router = express.Router();

// POST Route to register a new company
router.post("/register", isAuthenticated, registerCompany);

// GET Route to list of Companies
router.get("/get", isAuthenticated, getCompanies);

// GET Route to get the company by it's id
// Protected route, requires authentication
router.get("/get/:id", isAuthenticated, getCompanyById);

// Route to update the details of a company
// Protected route, requires authentication
router.put("/update/:id", isAuthenticated, updateCompany);

module.exports = router;
