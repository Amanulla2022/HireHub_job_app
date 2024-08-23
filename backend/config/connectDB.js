const mongoose = require("mongoose");

// function to connect to database
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    // if connected to db successfully
    console.log("Mongo Database connected successfully");
  } catch (error) {
    // if not connected to db
    console.log("error while connecting to database");
  }
};

// export connected to database function
module.exports = connectToDB;
