import React, { useState ,useEffect } from "react";
import ChatInterface from "./ChatInterface";
import { ChatMessage } from "../../entities/ChatMessage.js";


export default function XChatbot({ user }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSendMessage = async (prompt) => {
    // 1. Add user message
    const userMessage = new ChatMessage({
      content: prompt,
      sender: "user",
    });
    setMessages((prev) => [...prev, userMessage]);

    setIsLoading(true);

    try {
      // 2. Call backend
      const res = await fetch("https://careerai-5ztl.onrender.com/api/generate/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      // 3. Add AI reply
      const aiMessage = new ChatMessage({
        content: data.text,
        sender: "ai",
      });
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      // 4. Fallback error message
      const errorMessage = new ChatMessage({
        content: `⚠️ Error: ${err.message}`,
        sender: "ai",
      });
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  return (
      <ChatInterface
        messages={messages}
        onSendMessage={onSendMessage}
        isLoading={isLoading}
        user={user}
       
      />
  );
}

