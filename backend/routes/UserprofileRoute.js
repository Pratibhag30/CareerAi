const express = require("express");
const Profile = require("../models/profileUser.js");
const router = express.Router();

// Save or update profile

router.post("/save", async (req, res) => {
  try {
    // Separate userId and rest of profile fields
    const { userId, ...profileData } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID missing" });
    }

    // Update if exists, create if not
    const profile = await Profile.findOneAndUpdate(
      { userId },
      profileData,   // this contains skills, interests, bio, etc.
      { new: true, upsert: true } 
    );

    res.json({ success: true, profile });

  } catch (err) {
    console.error("Profile save error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Fetch profile
router.get("/:userId", async (req, res) => {
    try {
        const profile = await Profile.findOne({ userId: req.params.userId });
        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch profile" });
    }
});

module.exports = router;
