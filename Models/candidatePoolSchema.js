// candidatePoolSchema.js

const mongoose = require('mongoose');

const candidatePoolSchema = new mongoose.Schema({
    technology: String,
    skill: String,
    experience: String,
    companyName: String,
    roleName: String,
    location: String,
    // Add other fields as needed
});

module.exports = mongoose.model('CandidatePool', candidatePoolSchema);
