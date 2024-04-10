// routes/R11InfoRouter.js

const express = require('express');
const router = express.Router();
const R11Info = require('../Models/RolesCollnSchema');

// GET request to fetch R11Info
router.get('/R11Info', async (req, res) => {
  try {
    const r11Info = await R11Info.find();
    res.json(r11Info);
  } catch (error) {
    console.error('Error fetching R11Info:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/4', async (req, res) => {
  try {
    const { companyName, roleName, StartingDate } = req.query;
    // Assuming the date is stored as String in dd/mm/yyyy format
    const normalizedStartingDate = StartingDate;
    console.log(companyName);
    console.log(roleName);
    console.log(StartingDate); 

    const filteredData = await R11Info.find({
      companyName: { $regex: new RegExp(companyName, 'i') }, // Case-insensitive match for companyName
      role: { $regex: new RegExp(roleName, 'i') },
      StartingDate: normalizedStartingDate // Case-insensitive match for roleName
    });

    console.log(filteredData);
    console.log('data from roles collection');

    res.json(filteredData);
  } catch (error) {
    console.error("Error fetching R11Info data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    // Update the document with the given id
    const updatedDocument = await R11Info.findByIdAndUpdate(id, update, {
      new: true, // Return the modified document instead of the original
    });
    console.log('hi');

    res.json(updatedDocument);
  } catch (error) {
    console.error("Error updating role status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// POST request to create new R11Info
router.post('/R11Info', async (req, res) => {
  try {
    const newR11Info = new R11Info(req.body);
    console.log(req.body);
    await newR11Info.save();
    res.status(201).json({ message: 'R11Info created successfully' });
  } catch (error) {
    console.error('Error creating R11Info:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/R11Info/:id', async (req, res) => {
  try {
    // Retrieve the ID from request parameters
    const { id } = req.params;

    // Query MongoDB to find the document by ID
    const document = await R11Info.findById(id);
    console.log(document);

    if (!document) {
      // If document not found, send 404 Not Found response
      return res.status(404).json({ error: 'Document not found' });
    }

    // If document found, send it as a JSON response
    res.json(document);
  } catch (error) {
    // If any error occurs during the process, send 500 Internal Server Error response
    console.error('Error fetching document:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/1', async (req, res) => {
  try {
    // Extract query parameters
    const { companyName, roleStatus } = req.query;

    // Build the query object based on the provided parameters
    const query = {
      companyName,
      roleStatus
    };

    // Fetch R11Info from the database based on the query
    const r11Info = await R11Info.find(query);

    // Send the response with the fetched R11Info
    res.json(r11Info);
  } catch (error) {
    // Handle errors
    console.error("Error fetching R11Info:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get('/2', async (req, res) => {
  try {
    // Extract query parameters
    const { companyName, roleStatus } = req.query;

    // Build the query object based on the provided parameters
    const query = {
      companyName,
      roleStatus
    };

    // Fetch R11Info from the database based on the query
    const r11Info = await R11Info.find(query);

    // Send the response with the fetched R11Info
    res.json(r11Info);
  } catch (error) {
    // Handle errors
    console.error("Error fetching R11Info:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.get('/3', async (req, res) => {
  try {
    // Extract query parameters
    const { companyName, roleStatus } = req.query;

    // Build the query object based on the provided parameters
    const query = {
      companyName,
      roleStatus
    };

    // Fetch R11Info from the database based on the query
    const r11Info = await R11Info.find(query);

    // Send the response with the fetched R11Info
    res.json(r11Info);
  } catch (error) {
    // Handle errors
    console.error("Error fetching R11Info:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
