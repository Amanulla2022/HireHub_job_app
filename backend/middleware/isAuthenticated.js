const jwt = require("jsonwebtoken");

// Middleware to check if the candidateOrRecruiter is authenticated
const isAuthenticated = async (req, res, next) => {
  try {
    // Retrieve the token from cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Not authorized!",
        success: false,
      });
    }

    // Verify the token using the secret key
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token!",
        success: false,
      });
    }

    // Attach the candidateOrRecruiter's ID to the request object
    req.id = decode.candidateOrRecruiterId;
    next();
  } catch (error) {
    console.log(error);
    // Respond with failure message
    return res
      .status(500)
      .json({ message: "An error occurred!", success: false });
  }
};

module.exports = isAuthenticated;
