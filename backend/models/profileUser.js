const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // link to User
  bio: String,
  skills: [String],
  interests: [String],
  education_level: String,
  experience_level: String,
  preferred_work_style: String,
  career_goals: String,
  personality_traits: [String]
}, { timestamps: true });

module.exports = mongoose.model("Profile", profileSchema);
