
const express = require('express');
const router = express.Router();
require('dotenv').config();

//  Import the Google Generative AI library ---
const { GoogleGenerativeAI } = require("@google/generative-ai");


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// API endpoint for career prediction
router.post('/predict-career', async (req, res) => {
  const { skills, interests, aptitude } = req.body;

  if (!skills || !interests || !aptitude) {
    return res.status(400).json({ success: false, message: 'Missing input fields' });
  }

  const prompt = `
Act as an expert career counselor and data analyst for a student in India. Given the following details:
- Skills: [${skills}]
- Interests: [${interests}]
- Aptitude: [${aptitude}]

Your response MUST be a valid JSON object. Do not include any text or markdown before or after the JSON object.
The JSON object should have a single key "recommendations" which is an array of 3 career objects.
Note- include both tech and non-tech career wether the demand is high or low but main filteration is based on the skills,interest and aptitude.
Each career object must have the following structure:
{
  "careerTitle": "Name of the Career",
  "fitReason": "5 point subheading wise explaining why this career is a good fit for the user.",
  "roadmap": "A step-by-step learning roadmap as a single string with markdown for formatting (e.g., using '\\n- ' for bullet points).",
  "salary": {
    "min": 800000,
    "max": 1500000,
    "currency": "INR",
    "note": "Estimated annual salary for a professional with 0 years of experience."
  },
  "growthPotential": "High,medium,low",
 "growthOutlook": {
  "2025": 100,
  "2026": 110,
  "2027": 95,
  "2028": 120,
  "2029": 115,
  Important: GrowthOutlook values must NOT always increase. Include realistic fluctuations (some years higher, some years flat or slightly lower).
}
  "courses": [
    {
      "title": "Course Name 1",
      "platform": "Coursera",
      "link":"coursera link"
    },
    {
      "title": "Course Name 2",
      "platform": "Udemy",
       "link":"udemy link"
    }
  ]
}
`;

  try {
    //  This is how we call the Gemini API ---
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });// Use the correct model name
    const result = await model.generateContent(prompt);
    const response = await result.response;
    // const responseText = response.text();
    // const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
    // console.log(jsonMatch);
    // // Extract the matched group (the clean JSON) and parse it
    // const cleanJsonString = jsonMatch[1];
    // const parsedJson = JSON.parse(cleanJsonString);

    let responseText = response.text().trim();

    // Agar Gemini ne ```json ... ``` bhej diya ho to clean kar lo
    if (responseText.startsWith("```")) {
      responseText = responseText.replace(/```json|```/g, "").trim();
    }

    let parsedJson;
    try {
      parsedJson = JSON.parse(responseText);
    } catch (err) {
      console.error("❌ Still invalid JSON, raw text:", responseText);
      return res.status(500).json({ success: false, message: "AI did not return valid JSON" });
    }

    return res.json({ success: true, response: parsedJson });



    return res.json({ success: true, response: parsedJson });

  } catch (err) {
    console.error('Gemini API error:', err);
    if (err.status === 503) {
      return res.status(503).json({
        error: "AI service is currently busy. Please try again after a few minutes."
      });
    }
    return res.status(500).json({ success: false, message: 'Server error during prediction' });
  }
});

module.exports = router;