const Application = require("../models/applicationModel");
const Job = require("../models/jobModel");

// function to apply for job by it's id
const applyJob = async (req, res) => {
  try {
    const candidateId = req.id; // get candidate id from authenticated candidate request
    const jobId = req.params.id; // Get the job ID from the request parameters

    // Check if the jobId is provided in the request
    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required.",
        success: false,
      });
    }

    // checking if candidate already applied or not
    const existingApplication = await Application.findOne({
      job: jobId,
      candidate: candidateId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied!",
        success: false,
      });
    }

    // check if job exists or not
    const job = await Job.findOne({ _id: jobId });
    if (!job) {
      return res.status(404).json({
        message: "Job not found!!",
        success: false,
      });
    }

    // creating new job application
    const newApplication = await Application.create({
      job: jobId,
      candidate: candidateId,
    });

    // Add the application ID to the job's applications array
    job.applications.push(newApplication._id);

    // save the job with updated applications
    await job.save();

    // Return a success response
    return res.status(200).json({
      message: "Job applied successfully!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// function to get all jobs by the camdidate
const getAppliedJob = async (req, res) => {
  try {
    const candidateId = req.id;
    const application = await Application.find({ candidate: candidateId }) // Find all applications by this candidate
      .sort({ createdAt: -1 }) // Sort the applications by creation date in descending order
      .populate({
        path: "job", // Populate the job field in the application documents
        options: { sort: { createdAt: -1 } }, // Sort the populated job documents
        populate: {
          path: "company", // Populate the company field in the job document
          options: { sort: { createdAt: -1 } }, // Sort the populated company documents
        },
      });

    // If no applications are found, return a 404 response
    if (!application) {
      return res.status(404).json({
        message: "No Applications",
        success: false,
      });
    }

    // Return the applications in the response
    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// function for admin to get all applicants by job id
const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "candidate",
      },
    });

    // If the job is not found, return a 404 response
    if (!job) {
      return res.status(404).json({
        message: "Job not found!",
        success: false,
      });
    }

    // Return the job and its applicants in the response
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// function to update the status of the application by specific job id
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    // if status is not provided
    if (!status) {
      return res.status(400).json({
        message: "Status is required!",
        success: false,
      });
    }

    // if applications are not there
    const application = await Application.findOne({ _id: applicationId });

    if (!application) {
      return res.status(404).json({
        message: "Application not found!",
        success: false,
      });
    }

    // update the status of application
    application.status = status.toLowerCase();
    await application.save();

    // Return success response
    return res.status(200).json({
      message: "Status updated successfully!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { applyJob, getAppliedJob, getApplicants, updateStatus };
