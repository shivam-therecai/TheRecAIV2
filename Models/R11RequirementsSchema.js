// models/R11Info.js

const mongoose = require('mongoose');

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
  submittedDate: { type: Date, default: Date.now },
  roleCode: String,

});

module.exports = mongoose.model('R11Schema', R11);
