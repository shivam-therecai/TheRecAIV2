const express = require("express");
const connectToDB = require("./config/db");

const app = express();
connectToDB();

// Start the server after successfully connecting to the database
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
