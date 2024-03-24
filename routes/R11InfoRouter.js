// routes/R11InfoRouter.js

const express = require('express');
const router = express.Router();
const R11Info = require('./../Models/R11RequirementsSchema');

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

// POST request to create new R11Info
router.post('/R11Info', async (req, res) => {
  try {
    const newR11Info = new R11Info(req.body);
    await newR11Info.save();
    res.status(201).json({ message: 'R11Info created successfully' });
  } catch (error) {
    console.error('Error creating R11Info:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
