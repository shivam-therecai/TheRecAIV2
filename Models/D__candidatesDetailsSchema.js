// models/Candidate.js
const mongoose = require("mongoose");

const D__candidateSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  roleName: String,
  technology: String,
  skill: String,
  experience: String,
  role: String,
  companyName: String,
  location: String,
  // Add other fields as needed
});

const Candidate = mongoose.model("D__Candidates", D__candidateSchema);

module.exports = Candidate;
