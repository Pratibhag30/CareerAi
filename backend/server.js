// backend/server.js
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const authRoutes = require("./routes/auth.js");
const chatbotRoute = require("./routes/chatbot.js");
const profileRoutes = require("./routes/UserprofileRoute.js");
const recommendationRoutes = require("./routes/careerRecommendatioRoute.js")

require("dotenv").config();
const careerRoutes = require("./careerRoute.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
  origin: 'https://career-ai-c7x4.vercel.app/', // frontend URL
  methods: ['GET','POST'],
  credentials: true
}));

// Routes
app.use("/api", careerRoutes); 

app.use("/api/auth", authRoutes);
app.use("/api/generate", chatbotRoute);
app.use("/api/profile", profileRoutes);
app.use("/api/userCareer", recommendationRoutes);

const dbUrl = process.env.dbURL;

main() 
.then((res)=>{
    console.log("successfully connected");
})
.catch((err)=>{
    console.log("error", err);
})

async function main(){
    await mongoose.connect(dbUrl);
}

// Start Server
const PORT = process.env.PORT;
app.listen(`${PORT}`, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
