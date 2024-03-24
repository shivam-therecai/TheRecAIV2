const dotenv = require("dotenv");
const mongoose = require("mongoose");

//Load environment variables and store the connection string
dotenv.config();
const connectionString = process.env.DB_STRING;

//Create a function to connect to the Atlas database and export it:
const connectToDB = async () => {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    });
    console.log(connectionString);
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.log(process.env.DB_STRING);
    console.log(connectionString);
    console.error(error);
  }
};

module.exports = connectToDB;
