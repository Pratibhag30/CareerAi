
const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  platform: { type: String },
  link: { type: String }
});

const SalarySchema = new mongoose.Schema({
  min: { type: Number },
  max: { type: Number },
  currency: { type: String },
  note: { type: String }
});

const CareerSchema = new mongoose.Schema({
  careerTitle: { type: String, required: true },
  fitReason: { type: String },
  roadmap: { type: [String], default: [] },
  courses: [CourseSchema],          // array of objects now
  futureGrowth: { type: String },
  salary: SalarySchema,             // object now
  growthOutlook: { type: Map, of: Number } 
});

const RecommendationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  careers: [CareerSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Recommendation", RecommendationSchema);


