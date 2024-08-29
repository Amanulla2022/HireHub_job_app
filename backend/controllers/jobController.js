const Job = require("../models/jobModel");

const postJob = async (req, res) => {
  try {
    // Extracts job details from request body
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const candidateId = req.id; // Logged-in user ID

    // Checks if all required fields are provided
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Something is missing!",
        success: false,
      });
    }

    // Creates a new job with the provided details
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","), // Splits requirements string into an array
      salary: Number(salary), // Converts salary to a number
      experience,
      location,
      jobType,
      position,
      company: companyId,
      createdBy: candidateId,
    });

    // Returns success response with the newly created job
    return res.status(200).json({
      message: "New job created successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// function to fetch all jobs, optionally we can filter by a keyword
const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || ""; // Fetches the keyword from query params

    // Creates a query object to search by title or description
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } }, // Case-insensitive regex search on title
        { description: { $regex: keyword, $options: "i" } }, // Case-insensitive regex search on description
      ],
    };

    // Finds all jobs matching the query and populates company details
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 }); // Sorts jobs by creation date (newest first)

    // If no jobs found, returns a 404 error
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found!",
        success: false,
      });
    }

    // Returns the found jobs
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// function to get a job by its id
const getJobById = async (req, res) => {
  try {
    // Extracts jobId from request params
    const jobId = req.params.id;
    // Finds the job by its ID
    const job = await Job.findById(jobId);

    // If job not found, returns a 404 error
    if (!job) {
      return res.status(404).json({
        message: "Job not found!",
        success: false,
      });
    }

    // Returns the found job
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// function to fetch all jobs posted by recruiter by its id
const getAdminJobs = async (req, res) => {
  try {
    const candidateId = req.id; // logged in candidate id
    // Finds all jobs created by the recruiter
    const jobs = await Job.find({ createdBy: candidateId });

    // If no jobs found, returns a 404 error
    if (!jobs) {
      return res.status(404).json({
        message: "Job not found!",
        success: false,
      });
    }

    // Returns the found jobs
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { postJob, getAllJobs, getJobById, getAdminJobs };
