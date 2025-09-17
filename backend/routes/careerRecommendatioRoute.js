
const express = require("express");
const router = express.Router();
const careerRecommendation = require("../models/careerRecommendation.js");

// POST: Save new recommendation(s)
router.post("/save/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { careers } = req.body;

    // Create recommendation
    const rec = await careerRecommendation.findOneAndUpdate(
      { userId },
      {
        // Append new careers to existing array
        $addToSet: { careers: { $each: careers } },
        $set: { createdAt: new Date() } 
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "Careers saved", rec });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET: Fetch all recommendations (latest first)
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const rec = await careerRecommendation.findOne({ userId });
    res.status(200).json(rec ? rec.careers : []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
