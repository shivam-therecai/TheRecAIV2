// models/userSchema.js

const mongoose = require("mongoose");

//------------------------------------------------------------------- DEFINE THE USER SCHEMA
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add other fields as needed (e.g., profile picture, role, etc.)
});

// -----------------------------------------------------------CREATE A MODEL USING THIS SCHEMA
const User = mongoose.model("User", userSchema);

// -------------------------------------------------------------EXPORT THE CREATED MODEL
module.exports = User;
