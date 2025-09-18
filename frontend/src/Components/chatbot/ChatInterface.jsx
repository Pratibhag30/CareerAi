
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Send,
  Bot,
  User as UserIcon,
  MessageCircle,
  Lightbulb,
  ArrowLeft
} from "lucide-react";
import { format } from "date-fns";

// Added imports for Markdown
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function ChatInterface({
  messages,
  onSendMessage,
  isLoading,
  user
}) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput("");
    }
  };


  const quickQuestions = [
    "What careers match my skills?",
    "How do I change career paths?",
    "What skills should I learn next?",
    "Tell me about remote work opportunities",
    "How do I negotiate salary?"
  ];

  const handleQuickQuestion = (question) => {
    if (!isLoading) {
      onSendMessage(question);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[600px]">
      {/* Chat Header */}
      <Card className="shadow-lg border-0 mb-4">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center gap-3">
            <div>
              <Link to="/">
                <Button variant="outline" size="sm" className="rounded-full">
                  <ArrowLeft className="w-4 h-4 mr-1" />
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-3">
            <div>
              <Button>
                New chat
              </Button>
            </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Chat Header */}
      <Card className="shadow-lg border-0 mb-4">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 gradient-lavender rounded-2xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">AI Career Mentor 🤖</CardTitle>
              <p className="text-sm text-gray-600">
                Hi {user?.full_name?.split(" ")[0] || "there"}! I'm here to help with your career journey.
              </p>
            </div>
            <div className="ml-auto">
              <Badge className="bg-green-100 text-green-800 animate-pulse">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Online
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Messages Area */}
      <Card className="flex-1 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
        <CardContent className="p-6 h-full flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 gradient-mint rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <p className="text-gray-600 mb-6">
                  Start a conversation with your AI career mentor!
                </p>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700 mb-3">Try asking:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {quickQuestions.slice(0, 3).map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickQuestion(question)}
                        className="text-xs hover:bg-purple-50 border-purple-200"
                      >
                        <Lightbulb className="w-3 h-3 mr-1" />
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                  {message.sender === "ai" && (
                    <div className="w-8 h-8 gradient-lavender rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}

                  <div className={`max-w-[80%] ${message.sender === "user" ? "order-first" : ""}`}>
                    <div
                      className={`p-4 rounded-2xl ${message.sender === "user"
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white ml-auto"
                        : "bg-white border border-purple-100 shadow-sm"
                        }`}
                    >
                      {/*  Markdown rendering */}
                      <div className="prose prose-sm max-w-none leading-relaxed">
                        <ReactMarkdown
                          components={{
                            code({ node, inline, className, children, ...props }) {
                              const match = /language-(\w+)/.exec(className || "");
                              return !inline && match ? (
                                <SyntaxHighlighter
                                  style={oneDark}
                                  language={match[1]}
                                  PreTag="div"
                                  {...props}
                                >
                                  {String(children).replace(/\n$/, "")}
                                </SyntaxHighlighter>
                              ) : (
                                <code className="bg-gray-200 px-1 rounded" {...props}>
                                  {children}
                                </code>
                              );
                            },
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>

                    </div>
                    <p
                      className={`text-xs text-gray-500 mt-1 px-2 ${message.sender === "user" ? "text-right" : "text-left"
                        }`}
                    >
                      {format(new Date(message.created_date || new Date()), "HH:mm")}
                    </p>
                  </div>

                  {message.sender === "user" && (
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <UserIcon className="w-4 h-4 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 gradient-lavender rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white border border-purple-100 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                    <span className="text-xs text-gray-500">AI is thinking...</span>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length > 0 && messages.length < 5 && (
            <div className="mt-4 pt-4 border-t border-purple-100">
              <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.slice(0, 2).map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs hover:bg-purple-50 border-purple-200"
                    disabled={isLoading}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="flex gap-3 mt-4 pt-4 border-t border-purple-100">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about your career..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
