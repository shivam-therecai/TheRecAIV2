// models/Candidate.js
const mongoose = require("mongoose");

const C__candidateSchema = new mongoose.Schema({
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

const Candidate = mongoose.model("C__Candidates", C__candidateSchema);

module.exports = Candidate;
