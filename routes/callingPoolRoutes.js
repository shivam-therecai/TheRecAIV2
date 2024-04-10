const express = require("express");
const router = express.Router();

// const A__Candidates = require("../Models/A__candidatesDetailsSchema");
// const B__Candidates =require('./../Models/B__candidatesDetailsSchema')
// const C__Candidates =require('./../Models/C__candidatesDetailsSchema')
// const D__Candidates =require('./../Models/D__candidatesDetailsSchema')

const Candidate = require("./../Models/CandidatesCollnScema");

router.get("/:category", async (req, res) => {
  const { category } = req.params;

  try {
    const candidates = await Candidate.find({ R13Name: category });
    res.json(candidates);
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { Remark } = req.body;

  try {
    const updatedCandidate = await Candidate.findByIdAndUpdate(id, { Remark });

    if (!updatedCandidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    return res.status(200).json(updatedCandidate);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/accepted/:id", async (req, res) => {
  const { id } = req.params;
  const { AcceptedOrRejected } = req.body;

  try {
    // Find the candidate by ID and update the AcceptedOrRejected field
    const updatedCandidate = await Candidate.findByIdAndUpdate(id, {
      AcceptedOrRejected,
    });

    if (!updatedCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    return res.status(200).json(updatedCandidate);
  } catch (error) {
    console.error("Error updating candidate:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/rejected/:id", async (req, res) => {
  const { id } = req.params;
  const { AcceptedOrRejected } = req.body;

  try {
    const updatedCandidate = await Candidate.findByIdAndUpdate(id, {
      AcceptedOrRejected,
    });
    if (!updatedCandidate) {
      return res.status(404).json({ message: "Candidate not found!" });
    }

    return res.status(200).json(updatedCandidate);
  } catch (err) {
    console.log("Error rejecting candidate", err);
    return res.status(500).json({ error: "Internal server error!" });
  }
});

module.exports = router;

// router.get("/:category", async (req, res) => {
//     const category = req.params.category;

//     try {
//       let candidates = [];
//       console.log(category);

//       // Determine which schema to query based on the selected category
//       switch (category) {
//         case "A":
//           candidates = await A__Candidates.find();
//           break;
//         case "B":
//           candidates = await B__Candidates.find();
//           break;
//         case "C":
//           candidates = await C__Candidates.find();
//           break;
//         case "D":
//           candidates = await D__Candidates.find();
//           break;
//         default:
//           return res.status(400).json({ message: "Invalid category" });
//       }
//       console.log(candidates)
//       // Return the fetched candidate details as a response
//       res.json(candidates);
//     } catch (error) {
//       console.error("Error fetching candidates:", error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   });
