const express = require("express");
const router = express.Router();
const Candidate = require("./../Models/CandidatesCollnScema");

const mongoose = require("mongoose");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

mongoose.connect(
  // "mongodb+srv://joepratap:TheRecAI4395@therecaidata1.n66eodg.mongodb.net/?retryWrites=true&w=majority",
  "mongodb+srv://Shivam2408:Shivam2408@cluster0.colzssf.mongodb.net/?retryWrites=true&w=majority",
  {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  }
);

router.post("/candidates", upload.single("resume"), async (req, res) => {
  try {
    console.log(req.file)
    const {
      companyName,
      StartingDate,
      role,
      location,
      skill,
      technology,
      roleCode,
      firstName,
      lastName,
      phoneNumber,
      email,
      linkedinProfile,
      experience,
      sourceCode,
      sourcingCode,
      vendorCode,
      r12Name,
      r12Date,
      R13Name,
      R14Name,
      Remark,
      AcceptedOrRejected,
      R14AcceptedOrRejected,
      R14Remark,
      ClientsComment
    } = req.body;

    // Create a new Candidate object with the extracted data
    const candidateData = {
      companyName,
      StartingDate,
      role,
      location,
      skill,
      technology,
      roleCode,
      firstName,
      lastName,
      phoneNumber,
      email,
      linkedinProfile,
      experience,
      sourceCode,
      sourcingCode,
      vendorCode,
      r12Name,
      r12Date,
      R13Name,
      R14Name,
      Remark,
      AcceptedOrRejected,
      R14AcceptedOrRejected,
      R14Remark,
      ClientsComment,
      resume: {
        data: req.file.buffer, // Store file data as Buffer
        contentType: req.file.mimetype // Store file content type
      }
    };

    // Save the candidate data
    const candidate = new Candidate(candidateData);
    await candidate.save();

    res.status(201).send(candidate);
  } catch (error) {
    console.error("Error saving candidate:", error);
    res.status(500).send("Internal Server Error");
  }
});



router.post("/candidates/6", upload.any("resume"), async (req, res) => {
  try {
    let resumeData = null;
    if (req.files) {
      // Filter out duplicate files based on their original names
      const uniqueFiles = req.files.reduce((acc, file) => {
        if (!acc.some(f => f.originalname === file.originalname)) {
          acc.push(file);
        }
        return acc;
      }, []);

      // Map over each unique file object
      resumeData = uniqueFiles.map(file => ({
        data: file.buffer, // Store file data as Buffer
        contentType: file.mimetype // Store file content type
      }));
    }

    //console.log(req.files);
    console.log(resumeData);

    // Extracting candidates array from req.body
    const { candidates } = JSON.parse(JSON.stringify(req.body));

    // Loop through each candidate object
    const candidateDataArray = candidates.map((candidate, index) => {
      const {
        companyName,
        StartingDate,
        role,
        location,
        skill,
        technology,
        roleCode,
        firstName,
        lastName,
        phoneNumber,
        email,
        linkedinProfile,
        experience,
        sourceCode,
        sourcingCode,
        vendorCode,
        r12Name,
        r12Date,
        R13Name,
        R14Name,
        Remark,
        AcceptedOrRejected,
        R14AcceptedOrRejected,
        R14Remark,
        ClientsComment
        
      } = candidate;

      // Find the corresponding resume data for this candidate
      const candidateResume = resumeData.find((resume, idx) => idx === index);

      // Create a new candidate data object for each candidate
      return {
        companyName,
        StartingDate: "",
        role,
        location,
        skill,
        technology,
        roleCode,
        firstName,
        lastName,
        phoneNumber,
        email,
        linkedinProfile,
        experience,
        sourceCode,
        sourcingCode,
        vendorCode,
        r12Name,
        r12Date,
        R13Name: "",
        R14Name: "",
        Remark: "",
        AcceptedOrRejected: "",
        R14AcceptedOrRejected:"",
        R14Remark:"",
        ClientsComment:"",
        resume: candidateResume || null // Assign the corresponding resumeData object, or null if not found
      };
    });

    const savedCandidates = [];
    for (const candidateData of candidateDataArray) {
      const candidate = new Candidate(candidateData);
      const savedCandidate = await candidate.save();
      savedCandidates.push(savedCandidate);
    }

    res.status(201).send(savedCandidates);
  } catch (error) {
    console.error("Error saving candidate:", error);
    res.status(500).send("Internal Server Error");
  }
});


// router.post("/candidates/6", upload.any("resume"), async (req, res) => {
//   try {
//     let resumeData = null;
//     if (req.files) {
//       // Filter out duplicate files based on their original names
//       const uniqueFiles = req.files.reduce((acc, file) => {
//         if (!acc.some(f => f.originalname === file.originalname)) {
//           acc.push(file);
//         }
//         return acc;
//       }, []);

//       // Map over each unique file object
//       resumeData = uniqueFiles.map(file => ({
//         data: file.buffer, // Store file data as Buffer
//         contentType: file.mimetype // Store file content type
//       }));
//     }

//     //console.log(req.files);
//      console.log(resumeData);

//     // Extracting candidates array from req.body
//     const { candidates } = JSON.parse(JSON.stringify(req.body));

//     // Loop through each candidate object
//     const candidateDataArray = candidates.map((candidate, index) => {
//       const {
//         companyName,
//         StartingDate,
//         role,
//         location,
//         skill,
//         technology,
//         roleCode,
//         firstName,
//         lastName,
//         phoneNumber,
//         email,
//         linkedinProfile,
//         experience,
//         sourceCode,
//         sourcingCode,
//         vendorCode,
//         r12Name,
//         r12Date,
//         R13Name,
//         R14Name,
//         Remark,
//         AcceptedOrRejected,
//       } = candidate;

//       // Create a new candidate data object for each candidate
//       return {
//         companyName,
//         StartingDate: "",
//         role,
//         location,
//         skill,
//         technology,
//         roleCode,
//         firstName,
//         lastName,
//         phoneNumber,
//         email,
//         linkedinProfile,
//         experience,
//         sourceCode,
//         sourcingCode,
//         vendorCode,
//         r12Name,
//         r12Date,
//         R13Name: "",
//         R14Name: "",
//         Remark: "",
//         AcceptedOrRejected: "",
//         resume: resumeData[index] // Assign the corresponding resumeData object
//       };
//     });

//     const savedCandidates = [];
//     for (const candidateData of candidateDataArray) {
//       const candidate = new Candidate(candidateData);
//       const savedCandidate = await candidate.save();
//       savedCandidates.push(savedCandidate);
//     }

//     res.status(201).send(savedCandidates);
//   } catch (error) {
//     console.error("Error saving candidate:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

router.get("/candidates/:id/remarks", async (req, res) => {
  try {
    const candidateId = req.params.id;
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    // Assuming remarks are stored in the candidate object with a field named 'remark'
    const remarks = candidate.Remark;
    res.json({ remark: remarks });
  } catch (error) {
    console.error("Error fetching remarks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.get("/resume/:candidateId", async (req, res) => {
  try {
    // Find the candidate by ID
    const candidate = await Candidate.findById(req.params.candidateId);

    // Check if the candidate exists
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // Check if the candidate has a resume
    if (!candidate.resume) {
      return res
        .status(404)
        .json({ message: "Resume not found for this candidate" });
    }

    // Send the resume file as a response
    res.set("Content-Type", candidate.resume.contentType); // Set the content type
    res.send(candidate.resume.data); // Send the resume data
  } catch (error) {
    console.error("Error fetching candidate's resume:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/R12Candidate", async (req, res) => {
  try {
    // Extract the selectedR12Name from the request query
    const { selectedR12Name } = req.query;
    console.log(selectedR12Name);

    // Use the Candidate model to find all candidates with r12Name equal to selectedR12Name
    const filteredCandidates = await Candidate.find({
      r12Name: selectedR12Name,
    });

    // Send the filtered candidates as a response
    res.json(filteredCandidates);
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/candidates", async (req, res) => {
  try {
    console.log("hi there");
    const candidates = await Candidate.find({ R13Name: "" }, { __v: 0 }); // Exclude _id and __v fields
    res.json(candidates);
    console.log("hi there");
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).send("Internal Server Error");
  }
});

// GET candidate details by ID
router.get("/:id", async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    console.log("hi there");
    // Adjust the response according to your needs, sending only required fields
    const { firstName, lastName, roleName /* Add other fields you need */ } =
      candidate;
    res.json({ firstName, lastName, roleName /* Add other fields you need */ });
  } catch (error) {
    console.error("Error fetching candidate details:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.put('/:id/1', async (req, res) => {
  const { id } = req.params; // Extract candidate ID from request params
  const { R14Remark } = req.body; // Extract R14Remark from request body

  try {
    console.log('hey there')
    // Find the candidate by ID
    const candidate = await Candidate.findById(id);

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    // Update the candidate's R14Remark
    candidate.R14Remark = R14Remark;

    // Save the updated candidate
    await candidate.save();

    // Send response indicating success
    res.status(200).json({ message: 'R14Remark updated successfully', candidate });
  } catch (error) {
    console.error('Error updating R14Remark:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/:id/2', async (req, res) => {
  try {
    console.log('hi how are you shivam')
    const candidateId = req.params.id;
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    res.status(200).json({ R14Remark: candidate.R14Remark });
    console.log(candidate.R14Remark)
  } catch (error) {
    console.error("Error fetching R14 remark:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Assuming you have already set up your Express server and imported necessary modules

// Define the route handler for accepting a candidate
router.put('/:candId/5', async (req, res) => {
  const candId = req.params.candId;
  const { R14AcceptedOrRejected } = req.body;

  try {
    console.log('this is accepted')
    // Assuming you have a database model for candidates and you are updating the candidate with the provided candId
    const updatedCandidate = await Candidate.findByIdAndUpdate(
      candId,
      { R14AcceptedOrRejected },
      // { new: true }
      // To return the updated document
    );

    if (!updatedCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.json(updatedCandidate);
  } catch (error) {
    console.error("Error accepting candidate:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.put('/:candId/6', async (req, res) => {
  const candId = req.params.candId;
  const { R14AcceptedOrRejected } = req.body;

  try {
    console.log('this is rejected')
    // Assuming you have a database model for candidates and you are updating the candidate with the provided candId
    const updatedCandidate = await Candidate.findByIdAndUpdate(
      candId,
      { R14AcceptedOrRejected },
      // To return the updated document
    );

    if (!updatedCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.json(updatedCandidate);
  } catch (error) {
    console.error("Error accepting candidate:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.put('/candidates/:candId/7', async (req, res) => {
  const { candId } = req.params;
  const { ClientsComment } = req.body;

  try {
    console.log('yeah buddy')
    // Find the candidate by ID and update the ClientsComment field
    const updatedCandidate = await Candidate.findByIdAndUpdate(
      candId,
      { $set: { ClientsComment } }, // Update the ClientsComment field
      { new: true } // Return the updated document
    );

    if (!updatedCandidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    res.status(200).json(updatedCandidate);
  } catch (error) {
    console.error("Error saving client's comment:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.get('/candidates/:candId/8', async (req, res) => {
  const { candId } = req.params;

  try {
    // Find the candidate by ID
    console.log('no buddy')
    const candidate = await Candidate.findById(candId);

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    res.status(200).json({ ClientsComment: candidate.ClientsComment });
  } catch (error) {
    console.error("Error fetching candidate's ClientsComment:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to handle PUT request to update R13Name of a candidate
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { R13Name } = req.body;

  try {
    // Find the candidate by ID
    const candidate = await Candidate.findById(id);

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // Update the R13Name
    candidate.R13Name = R13Name;

    // Save the updated candidate
    await candidate.save();

    // Respond with the updated candidate
    res.status(200).json(candidate);
  } catch (error) {
    console.error("Error updating candidate:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/r14/:id", async (req, res) => {
  const { id } = req.params;
  const { R14Name } = req.body;
  // console.log(R14Name);
  // console.log(id);
  try {
    const candidate = await Candidate.findByIdAndUpdate(id, { R14Name });
    if (!candidate) {
      res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json(candidate);
  } catch (err) {
    console.error("Error updating candidate", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/candidates/1", async (req, res) => {
  try {
    // Extract query parameters
    const { companyName, AcceptedOrRejected } = req.query;

    // Log the received query parameters
    console.log("Received query parameters:", req.query);

    // Build the query object based on the provided parameters
    const query = {
      companyName,
      AcceptedOrRejected,
    };
    console.log("Constructed query object:", query);

    // Fetch candidates from the database based on the query
    const candidates = await Candidate.find(query);
    console.log(candidates);
    // Send the response with the fetched candidates
    res.json(candidates);
  } catch (error) {
    // Handle errors
    console.error("Error fetching candidates:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/candidates/2", async (req, res) => {
  try {
    // Extract query parameters
    const { companyName, AcceptedOrRejected, roleStatus } = req.query;

    // Log the received query parameters
    console.log("Received query parameters:", req.query);

    // Build the query object based on the provided parameters
    const query = {
      companyName,
      AcceptedOrRejected,
      roleStatus,
    };
    console.log("Constructed query object:", query);

    // Fetch candidates from the database based on the query
    const candidates = await Candidate.find(query);

    // Send the response with the fetched candidates
    res.json(candidates);
  } catch (error) {
    // Handle errors
    console.error("Error fetching candidates:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/candidates/5", async (req, res) => {
  try {
    // Extract query parameters
    const { R14Name, AcceptedOrRejected } = req.query;

    // Log the received query parameters
    console.log("Received query parameters:", req.query);
    console.log("hi");
    // Build the query object based on the provided parameters
    const query = {
      R14Name: { $ne: "" }, // Exclude documents where R14Name is empty or not set
      AcceptedOrRejected: "Accepted",
    };

    // If R14Name is provided, include it in the query
    if (R14Name) {
      query.R14Name = R14Name;
    }
    console.log(R14Name);

    // Fetch candidates from the database based on the query
    const candidates = await Candidate.find(query);

    // Send the response with the fetched candidates
    res.json(candidates);
  } catch (error) {
    // Handle errors
    console.error("Error fetching candidates:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/candidates/6", async (req, res) => {
  try {
    // Fetch candidates from the database
    const candidates = await Candidate.find({
      AcceptedOrRejected: "Accepted",
      R14Name: { $exists: false }, // Filter out candidates with R14Name undefined or null
    });
    console.log("hi there");
    console.log(candidates);
    // Send the filtered candidates as response
    res.json(candidates);
  } catch (error) {
    console.error("Error fetching accepted candidates:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/:category", async (req, res) => {
  const {
    firstName,
    lastName,
    role,
    technology,
    location,
    skill,
    companyName,
  } = req.body;
  const { category } = req.params;

  try {
    let CandidateModel;

    // Determine which model to use based on the category
    switch (category) {
      case "Chandani":
        CandidateModel = Candidate;
        break;
      case "Silfa":
        CandidateModel = Candidate;
        break;
      case "Namrata":
        CandidateModel = Candidate;
        break;
      case "Pradnya":
        CandidateModel = Candidate;
        break;
      default:
        return res
          .status(400)
          .json({ success: false, error: "Invalid category" });
    }

    // Create a new candidate instance
    const newCandidate = new CandidateModel({
      firstName,
      lastName,
      role,
      skill,
      technology,
      location,
      companyName,
      // Add other fields as needed
    });

    // Save the candidate to the database
    await newCandidate.save();

    res
      .status(201)
      .json({ success: true, message: "Candidate created successfully" });
  } catch (error) {
    console.error("Error creating candidate:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;

// router.post("/A", async (req, res) => {
//   const { firstName, lastName, role,
//     technology,
//     location,
//     skill,
//     companyName,
//      } = req.body;

//   try {
//     // Create a new candidate instance
//     const newCandidate = new A__Candidates({
//       firstName,
//       lastName,
//       role,
//       skill,
//       technology,
//       location,
//       skill,
//       companyName,

//       // Add other fields as needed
//     });

//     // Save the candidate to the database
//     await newCandidate.save();

//     res
//       .status(201)
//       .json({ success: true, message: "Candidate created successfully" });
//   } catch (error) {
//     console.error("Error creating candidate:", error);
//     res.status(500).json({ success: false, error: "Internal Server Error" });
//   }
// });
// router.post("/B", async (req, res) => {
//   const { firstName, lastName, role,
//     technology,
//     location,
//     skill,
//     companyName,
//      } = req.body;

//   try {
//     // Create a new candidate instance
//     const newCandidate = new B__Candidates({
//       firstName,
//       lastName,
//       role,
//       skill,
//       technology,
//       location,
//       skill,
//       companyName,

//       // Add other fields as needed
//     });

//     // Save the candidate to the database
//     await newCandidate.save();

//     res
//       .status(201)
//       .json({ success: true, message: "Candidate created successfully" });
//   } catch (error) {
//     console.error("Error creating candidate:", error);
//     res.status(500).json({ success: false, error: "Internal Server Error" });
//   }
// });
// router.post("/C", async (req, res) => {
//   const { firstName, lastName, role,
//     technology,
//     location,
//     skill,
//     companyName,
//      } = req.body;

//   try {
//     // Create a new candidate instance
//     const newCandidate = new C__Candidates({
//       firstName,
//       lastName,
//       role,
//       skill,
//       technology,
//       location,
//       skill,
//       companyName,

//       // Add other fields as needed
//     });

//     // Save the candidate to the database
//     await newCandidate.save();

//     res
//       .status(201)
//       .json({ success: true, message: "Candidate created successfully" });
//   } catch (error) {
//     console.error("Error creating candidate:", error);
//     res.status(500).json({ success: false, error: "Internal Server Error" });
//   }
// });
// router.post("/D", async (req, res) => {
//   const { firstName, lastName, role,
//     technology,
//     location,
//     skill,
//     companyName,
//      } = req.body;

//   try {
//     // Create a new candidate instance
//     const newCandidate = new D__Candidates({
//       firstName,
//       lastName,
//       role,
//       skill,
//       technology,
//       location,
//       skill,
//       companyName,

//       // Add other fields as needed
//     });

//     // Save the candidate to the database
//     await newCandidate.save();

//     res
//       .status(201)
//       .json({ success: true, message: "Candidate created successfully" });
//   } catch (error) {
//     console.error("Error creating candidate:", error);
//     res.status(500).json({ success: false, error: "Internal Server Error" });
//   }
// });

// Define route to handle GET request for fetching candidate details based on category
// router.get("/:category", async (req, res) => {
//   const category = req.params.category;

//   try {
//     let candidates = [];

//     // Determine which schema to query based on the selected category
//     switch (category) {
//       case "A":
//         candidates = await A__Candidates.find();
//         break;
//       case "B":
//         candidates = await B__Candidates.find();
//         break;
//       case "C":
//         candidates = await C__Candidates.find();
//         break;
//       case "D":
//         candidates = await D__Candidates.find();
//         break;
//       default:
//         return res.status(400).json({ message: "Invalid category" });
//     }
//     console.log(candidat)
//     // Return the fetched candidate details as a response
//     res.json(candidates);
//   } catch (error) {
//     console.error("Error fetching candidates:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

module.exports = router;
