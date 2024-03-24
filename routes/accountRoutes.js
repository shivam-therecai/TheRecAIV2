const express = require("express");
const Account = require("../Models/accountSchema");
const router2 = express.Router();
//const app = require("express");

//app.use(express.json());

// router2.get("/accounts", (req, res) => {
//   res.send("List of Accounts");

// });

router2.get("/accounts", async (req, res) => {
  try {
    // Fetch all documents from the MongoDB collection
    const accounts = await Account.find({}, 'accountName'); // Fetch only the accountName field
//aoid blanks and duplocate
    // Extract account names from the fetched documents
    const accountNames = accounts.map(account => account.accountName);
    console.log(accountNames)

    // Send the list of account names as the response
    res.status(200).json(accountNames);
  } catch (error) {
    console.error("Error fetching account names:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



router2.post("/accounts", async (req, res) => {

  try {
    // Create a new user document based on the schema
    console.log(req.body);
    const newAccount = new Account({
      accountName: req.body.accountName,
      ctcPercentage: req.body.ctcPercentage,
      fixedCharge: req.body.fixedCharge,
      ctcMinValid:req.body.ctcMinValid,
      ctcMaxValid:req.body.ctcMaxValid,
      ctcComponents:req.body.ctcComponents,
      invoiceRaiseDay:req.body.invoiceRaiseDay,
      dueDays:req.body.dueDays,
      location:req.body.location,
      billingName:req.body.billingName,
      billAddress:req.body.billAddress,
      gst:req.body.gst
    
    });
    // Save the user data to MongoDB
    await newAccount.save();
    res.status(201).json({ message: "Account created successfully"});
  

  } catch (error) {
    console.error("Error creating Account:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router2;
