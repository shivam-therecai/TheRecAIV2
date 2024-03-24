// models/userSchema.js

const mongoose = require("mongoose");

//------------------------------------------------------------------- DEFINE THE USER SCHEMA
const accountSchema = new mongoose.Schema({
  //------------------****************************YOU HAVE TO CHANGE THIS TO ACCOUNTS************
  accountName: { type: String},
  ctcPercentage: { type: Number },
  fixedCharge: { type: Number },
  ctcMinValid:{type:Number},
  ctcMaxValid:{type:Number},
  ctcComponents:{type:Number},
  invoiceRaiseDay:{type:Number},
  dueDays:{type:Number},
  location:{type:String}, //can be multiple
  billingName:{type:String},
  billAddress:{type:String},
  gst:{type:Number}
  // Add other fields as needed (e.g., profile picture, role, etc.)
});

accountSchema.index({ctcPercentage:1},{unique:false})

// -----------------------------------------------------------CREATE A MODEL USING THIS SCHEMA
const Account = mongoose.model("Account", accountSchema);
// Account.dropSearchIndex('ctcPercentage_1')

// -------------------------------------------------------------EXPORT THE CREATED MODEL
module.exports = Account;
