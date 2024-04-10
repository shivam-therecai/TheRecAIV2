// models/R11Info.js

const mongoose = require('mongoose');

const recruiterSchema = new mongoose.Schema({
  name: String,
  role: String
});

const R11 = new mongoose.Schema({
  companyName: String,
  role: String,
  technology: String,
  skill: String,
  location: String,
  ctc: String,
  minExp: String,
  maxExp: String,
  maxNoticePeriod: String,
  remoteOrHybrid: String,
  workingDays: String,
  StartingDate: {
    type: String, // Store as string since we are using custom format
    
    required: true
  },
  roleCode: String,
  recruiter: {
    type: recruiterSchema,
    required: true
  },
  roleStatus:String

});

module.exports = mongoose.model('RolesCollection', R11);
