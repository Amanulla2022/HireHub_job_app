const Company = require("../models/companyModel");

const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required!",
        success: false,
      });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "You can't register same company!",
        success: false,
      });
    }
    company = await Company.create({
      name: companyName,
      candidateId: req.id,
    });

    return res.status(200).json({
      message: "Company registered successfully!",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const getCompanies = async (req, res) => {
  try {
    const candidateId = req.id; // logged in user id
    const companies = await Company.find({ candidateId });

    if (!companies) {
      return res.status(404).json({
        message: "Companies not found!",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findOne({ _id: companyId }); // Corrected line

    if (!company) {
      return res.status(404).json({
        message: "Company not found!",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    const updateData = { name, description, website, location };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found!",
        success: false,
      });
    }

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
