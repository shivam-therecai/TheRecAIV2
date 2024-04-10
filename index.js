//This line imports the Express framework into your application.
const express = require("express");
const userRoutes = require("./routes/userRoutes"); // Import the cors middleware
const accountRoutes = require("./routes/accountRoutes");
const Account = require("./Models/SalesCollnSchema");
const mongoose = require("mongoose");
const R11Routes = require("./routes/R11InfoRouter");
const R11InfoRouter = require("./routes/R11InfoRouter");
const StandardizedCollectionRoute = require("./routes/StandardCollnRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const callingPoolRoutes = require("./routes/callingPoolRoutes");


require("dotenv").config();

//This creates an Express application instance.
//You’ll use this app object to define routes, middleware, and other server-related functionality.
const app = express();
const cors = require("cors");
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));
// Connect to MongoDB (replace with your actual MongoDB URL)------------------------------***********
mongoose.connect(
  // "mongodb+srv://joepratap:TheRecAI4395@therecaidata1.n66eodg.mongodb.net/?retryWrites=true&w=majority",
  "mongodb+srv://Shivam2408:Shivam2408@cluster0.colzssf.mongodb.net/?retryWrites=true&w=majority",
  {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  }
);

// Export the upload middleware

app.use(cors()); // Use the cors middleware

//This sets up a route handler for the HTTP GET request to the root path ('/').
//When a user accesses your server at the root URL (e.g., http://localhost:3000/), this handler will be executed.
//The (req, res) => { ... } part defines an anonymous function (also known as a callback function).
//req (short for request) represents the incoming HTTP request.
//res (short for response) represents the server’s response to send back to the client.
app.get("/", (req, res) => {
  //Inside the route handler, this line sends the string 'Hello World!' as the response to the client.
  //When a user accesses the root URL, they’ll see this message in their browser.

  //***************************YOU NEED TO CREATE THESE REQUESTS FOR THIS TO ACTUALLY WORK ***************************//
  res.send("Hello World, is it this?!");
});
app.use("/api/R11Info", R11InfoRouter);
app.use("/api", userRoutes); // Prefix all user-related routes with '/api'
app.use("/api", accountRoutes);
app.use("/api", R11Routes);
app.use("/api", candidateRoutes);
app.use("/api/candidates", candidateRoutes);

app.use("/api/candidates/details", candidateRoutes);
// app.use('/api/candidates/list', callingPoolRoutes);
app.use("/api/candidates/callingpoollist", callingPoolRoutes);
//  app.use('/api/candidates/callingpoollist', callingPoolRoutes);
// app.use('/api/candidates/details', candidateRoutes)
app.use("/api/candidates/update", candidateRoutes);
app.use("/api/AcceptedR14/candidates/", candidateRoutes);
app.use("/api/candidatepool/candidates", candidateRoutes);
// app.use('/api/candidates/financepeer/candidates', candidateRoutes);

// app.use('/api/candidates', candidateRoutes);

app.use("/api/standard", StandardizedCollectionRoute);
// Other middleware and routes can be added here

//This starts the Express server and makes it listen on port 3000.
app.listen(4000, () => {
  console.log("Server running on port 4000");
});
