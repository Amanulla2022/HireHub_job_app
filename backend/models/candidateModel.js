const mongoose = require("mongoose");

// created the mongoose schema for candidate model with fullname, emailid, phno,
// role(candidate, requiter) and profile with bio, skills, resume(url link),
// name of resume file, company, profile photo(url link) and timestamps
const candidateModel = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["candidate", "recruiter"],
      required: true,
    },
    profile: {
      bio: { type: String },
      skills: [{ type: String }],
      resume: { type: String }, // URL to resume files
      resumeOriginalName: { type: String },
      company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
      profilePhoto: {
        type: String, // URL to profile photo
        default: "",
      },
    },
  },
  { timestamps: true }
);

const Candidate = mongoose.model("Candidate", candidateModel);
module.exports = Candidate;
