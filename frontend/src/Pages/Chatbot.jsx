
import React from "react";
import XChatbot from "../Components/chatbot/XChatbot";

export default function ChatbotPage() {
  const user = { full_name: "Mahek Khan" }; // replace with real user later

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <XChatbot user={user} />
      </div>
    </div>
  );
}
