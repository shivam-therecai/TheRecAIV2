const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    // Object details obtained from initial locked input fields
    companyName: String,
    role: String,
    StartingDate: String,
    location: String,
    technology: String,
    skill: String,

    // Candidate details
    roleCode: String,
    firstName: String,
    lastName: String,
    phoneNumber: String,
    email: String,
    linkedinProfile: String,
    resume: {
      data: Buffer, // Store file data as Buffer
      contentType: String // Store file content type
  },
    experience: String,
    sourceCode: String,
    sourcingCode: String,
    vendorCode: String,
    r12Name: String,
    r12Date: String,
    R13Name:String,
    R14Name:String,
    Remark:String,
    AcceptedOrRejected:String,
    R14AcceptedOrRejected:String,
    R14Remark:String,
    ClientsComment:String
});

module.exports = mongoose.model('Candidate', candidateSchema);

