// routes/userRoutes.js
const express = require("express");
const router = express.Router();

// Define a route for listing users
router.get("/users", (req, res) => {
  res.send("List of users");
});

// Define a route for creating a new user
router.post("/users", (req, res) => {
  // Handle user data submission
  // Save user data to the database
  res.send("User created successfully");
});

// Add more routes as needed

module.exports = router;
