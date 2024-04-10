const express = require('express');
const router = express.Router();
const StandardizedCollection = require('./../Models/StandardCollnSchema');

router.get('/StandardizedCollection', async (req, res) => {
  try {
    const data = await StandardizedCollection.find({});
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
