
const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  session_id: { type: String, required: true },
  user_id: { type: String, required: true },
  messages: [
    {
      sender: { type: String, enum: ["user", "ai"], required: true },
      content: { type: String, required: true },
      created_at: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Chat", chatSchema);
