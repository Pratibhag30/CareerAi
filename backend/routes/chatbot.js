const express = require("express");
const router = express.Router();
const axios = require("axios");
const { GoogleAuth } = require("google-auth-library");
require("dotenv").config();

console.log("Chatbot route file is loading...");

// POST /api/generate/chat
router.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt required" });

    const auth = new GoogleAuth({
      keyFile: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS),
      scopes: "https://www.googleapis.com/auth/generative-language",
    });

    const client = await auth.getClient();
    const accessTokenResponse = await client.getAccessToken();
    const accessToken = accessTokenResponse.token;

    const response = await axios.post(
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent",
  {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ]
  },
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  }
);

    // Extract the text safely
    const text = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    res.json({ text });

  } catch (err) {
    console.error("Gemini API error:", err.response?.data || err.message);
    res
      .status(err.response?.status || 500)
      .json({ error: err.response?.data || err.message });
  }
});

module.exports = router;
