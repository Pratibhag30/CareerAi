export class ChatMessage {
  constructor({ content, sender, chat_session_id, message_type = "text", metadata = {} }) {
    this.content = content;
    this.sender = sender; // "user" or "ai"
    this.chat_session_id = chat_session_id;
    this.message_type = message_type; // "text", "career_suggestion", "skill_recommendation"
    this.metadata = metadata;
  }
}
