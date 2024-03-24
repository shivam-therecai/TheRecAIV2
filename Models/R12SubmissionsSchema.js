const mongoose = require('mongoose');


const R12 = new Schema({
    //information gathered from resume
    roleCode: { type: Schema.Types.ObjectId, ref: 'RoleCode' },
    firstName: String,
    lastName: String,
    phoneNumber: String,
    email: String,
    linkedinProfile: String,
    attachResume: String, // Store resume URL or file path
    experience: Number,
    sourceCode: String,
    sourcingCode: String,
    vendorCode: String,
    r12Name: String,
    submittedDate: { type: Date, default: Date.now },
    candidateCode: String
  });

  module.exports = mongoose.model('R12Schema', R12Submission);