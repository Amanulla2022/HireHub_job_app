const Candidate = require("../models/candidateModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a new candidate or recruiter
const register = async (req, res) => {
  try {
    const { fullName, emailId, password, phoneNumber, role } = req.body;

    //  Checking all fields are required
    if (!fullName || !emailId || !password || !phoneNumber || !role) {
      return res.status(400).json({
        message: "Something is missing, Please fill all details!",
        success: false,
      });
    }

    // Checking if the user already exists with the provided emailId
    const candidateOrRecruiter = await Candidate.findOne({ emailId });
    if (candidateOrRecruiter) {
      return res.status(400).json({
        message: "User already exist with this emailid!",
        success: false,
      });
    }

    // Hashing the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating a new candidate or recruiter
    await Candidate.create({
      fullName,
      emailId,
      password: hashedPassword,
      phoneNumber,
      role,
    });

    // Respond with success message
    return res
      .status(200)
      .json({ message: "Account created successfully.", success: true });
  } catch (error) {
    console.log(error);
    // Respond with failure message
    return res
      .status(500)
      .json({ message: "An error occurred!", success: false });
  }
};

// Login a candidate or recruiter
const login = async (req, res) => {
  try {
    const { emailId, password, role } = req.body;

    //  Checking all fields are required
    if (!emailId || !password || !role) {
      return res.status(400).json({
        message: "Something is missing, Please fill all details!",
        success: false,
      });
    }

    // Check if the user exists with the provided emailId
    let candidateOrRecruiter = await Candidate.findOne({ emailId });
    if (!candidateOrRecruiter) {
      return res.status(400).json({
        message: "User not exist with this emailId!",
        success: false,
      });
    }

    // Verify the provided password with the stored hashed password
    const isPasswordMatch = await bcrypt.compare(
      password,
      candidateOrRecruiter.password
    );
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    // Checking that user role matches with the stored role
    if (role !== candidateOrRecruiter.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false,
      });
    }

    // Prepare data to be included in the JWT token
    const tokenData = {
      candidateOrRecruiterId: candidateOrRecruiter._id,
    };

    // Sign a JWT token with the candidateOrRecruiter's ID and role
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // Send the token as a cookie and respond with candidateOrRecruiter data
    candidateOrRecruiter = {
      _id: candidateOrRecruiter._id,
      fullName: candidateOrRecruiter.fullName,
      phoneNumber: candidateOrRecruiter.phoneNumber,
      role: candidateOrRecruiter.role,
      profile: candidateOrRecruiter.profile,
    };
    // Respond with success message
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 100,
        httpOnly: true,
        sameSite: "Strict",
      })
      .json({
        message: `Welcome back ${candidateOrRecruiter.fullName}`,
        candidateOrRecruiter,
        success: true,
      });
  } catch (error) {
    console.log(error);
    // Respond with failure message
    return res
      .status(500)
      .json({ message: "An error occurred!", success: false });
  }
};

// Logout a candidate or recruiter
const logout = async (req, res) => {
  try {
    // Clear the token cookie to log the candidateOrRecruiter out and display success message
    return res.status(200).cookie("token", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    // Respond with failure message
    return res
      .status(500)
      .json({ message: "An error occurred!", success: false });
  }
};

// Update profile details for a candidate or recruiter
const updateProfile = async (req, res) => {
  try {
    const { fullName, emailId, phoneNumber, bio, skills } = req.body;

    // Retrieve the candidateOrRecruiter's ID from the request (set in the authentication middleware)
    const candidateOrRecruiterId = req.id;

    // Find the candidateOrRecruiter by ID
    let candidateOrRecruiter = await Candidate.findById(candidateOrRecruiterId);
    if (!candidateOrRecruiter) {
      return res.status(400).json({
        message: "User not found!",
        success: false,
      });
    }

    // Update the candidateOrRecruiter's details only if provided in the request
    if (fullName) candidateOrRecruiter.fullName = fullName;
    if (emailId) candidateOrRecruiter.emailId = emailId;
    if (phoneNumber) candidateOrRecruiter.phoneNumber = phoneNumber;
    if (bio) candidateOrRecruiter.profile.bio = bio;
    if (skills) candidateOrRecruiter.profile.skills = skills.split(",");

    // Save the updated profile to the database
    await candidateOrRecruiter.save();

    // Respond with the updated user data
    candidateOrRecruiter = {
      _id: candidateOrRecruiter._id,
      fullName: candidateOrRecruiter.fullName,
      phoneNumber: candidateOrRecruiter.phoneNumber,
      role: candidateOrRecruiter.role,
      profile: candidateOrRecruiter.profile,
    };

    // Respond with success message
    return res.status(200).json({
      message: "Profile updated successfully!",
      candidateOrRecruiter,
      success: true,
    });
  } catch (error) {
    console.log(error);
    // Respond with failure message
    return res
      .status(500)
      .json({ message: "An error occurred!", success: false });
  }
};

module.exports = { register, login, logout, updateProfile };
