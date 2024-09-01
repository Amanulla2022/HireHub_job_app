const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectToDB = require("./config/connectDB");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const candidateRoutes = require("./routes/candidateRoutes");
const companyRoutes = require("./routes/companyRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

// config the .env file
dotenv.config();

// port
const PORT = process.env.PORT_URL || 8000;

const corsOptions = {
  origin: "http://localhost:3000", // Allow only your frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Enable Cross-Origin Resource Sharing (CORS) to allow requests from different origins
app.use(cors(corsOptions));

// middleware
app.use(express.json());

// middleware for coockie parser
app.use(cookieParser());

// api's
app.use("/api/v1/person", candidateRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);

// starting the server
app.listen(PORT, () => {
  // connecting to database
  connectToDB();
  console.log(`Server started on ${PORT}`);
});
