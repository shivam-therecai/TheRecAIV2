// models/userSchema.js

const mongoose = require("mongoose");

//------------------------------------------------------------------- DEFINE THE USER SCHEMA
const accountSchema = new mongoose.Schema({
  //------------------****************************YOU HAVE TO CHANGE THIS TO ACCOUNTS************
  accountName: { type: String},
  ctcPercentage: { type: String },
  fixedCharge: { type: String },
  ctcMinValid:{type:String},
  ctcMaxValid:{type:String},
  ctcComponents:{type:String},
  invoiceRaiseDay:{type:String},
  dueDays:{type:String},
  location:{type:String}, //can be multiple
  billingName:{type:String},
  billAddress:{type:String},
  gst:{type:String}
  // Add other fields as needed (e.g., profile picture, role, etc.)
});

accountSchema.index({ctcPercentage:1},{unique:false})

// -----------------------------------------------------------CREATE A MODEL USING THIS SCHEMA
const Account = mongoose.model("SalesCollection", accountSchema);
// Account.dropSearchIndex('ctcPercentage_1')

// -------------------------------------------------------------EXPORT THE CREATED MODEL
module.exports = Account;
