const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectToDB = require("./config/connectDB");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const candidateRoutes = require("./routes/candidateRoutes");
const companyRoutes = require("./routes/companyRoutes");
const jobRoutes = require("./routes/jobRoutes");

// config the .env file
dotenv.config();

// port
const PORT = process.env.PORT_URL || 8000;

// Enable Cross-Origin Resource Sharing (CORS) to allow requests from different origins
app.use(cors());

// middleware
app.use(express.json());

// middleware for coockie parser
app.use(cookieParser());

// api's
app.use("/api/v1/person", candidateRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);

// starting the server
app.listen(PORT, () => {
  // connecting to database
  connectToDB();
  console.log(`Server started on ${PORT}`);
});
