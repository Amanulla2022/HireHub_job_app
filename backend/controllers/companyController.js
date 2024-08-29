const Company = require("../models/companyModel");

// function for Register a new company
const registerCompany = async (req, res) => {
  try {
    // extract company name from request body
    const { companyName } = req.body;

    // check if company name is provided or not
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required!",
        success: false,
      });
    }

    // Checks if a company with the same name already exists
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "You can't register same company!",
        success: false,
      });
    }

    // Creates a new company with the candidateId (logged-in user ID)
    company = await Company.create({
      name: companyName,
      candidateId: req.id,
    });

    // Returns success response with the newly created company
    return res.status(200).json({
      message: "Company registered successfully!",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// function to get all companies registered by user
const getCompanies = async (req, res) => {
  try {
    const candidateId = req.id; // logged in user id
    // Finds companies by candidateId
    const companies = await Company.find({ candidateId });

    // If no companies found, returns a 404 error
    if (!companies) {
      return res.status(404).json({
        message: "Companies not found!",
        success: false,
      });
    }

    // Returns the found companies
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// function to get company by it's id
const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    // Finds the company by its ID
    const company = await Company.findOne({ _id: companyId }); // Corrected line

    // If company not found, returns a 404 error
    if (!company) {
      return res.status(404).json({
        message: "Company not found!",
        success: false,
      });
    }

    // Returns the found company
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// function to update the details of a company
const updateCompany = async (req, res) => {
  try {
    // Extracts company details from request body
    const { name, description, website, location } = req.body;

    // update the data
    const updateData = { name, description, website, location };

    // Finds the company by ID and updates its details
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true, // Returns the updated document
    });

    // If company not found, returns a 404 error
    if (!company) {
      return res.status(404).json({
        message: "Company not found!",
        success: false,
      });
    }

    // Returns a success message
    return res.status(200).json({
      message: "Company information updated!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
};
