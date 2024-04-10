// models/Candidate.js
const mongoose = require("mongoose");

const A__candidateSchema = new mongoose.Schema({
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

const Candidate = mongoose.model("A__Candidates", A__candidateSchema);

module.exports = Candidate;
